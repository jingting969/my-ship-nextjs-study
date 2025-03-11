import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/api';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';

// 设置重新验证时间
export const revalidate = 3600; // 1小时

// 定义文章类型，确保类型安全
interface PostDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  updated_at?: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  author: {
    id: string;
    name: string;
    bio?: string;
    avatar: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

// 动态生成元数据
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    // 确保 params 是可用的
    const slug = params?.slug;
    if (!slug) {
      return {
        title: '文章不存在',
        description: '找不到请求的文章',
      };
    }

    const postData = await getPostBySlug(slug);
    const post = {
      ...postData,
      author: postData.author[0],
      category: postData.category[0]
    } as PostDetail;
    
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        images: [post.featured_image],
        type: 'article',
        publishedTime: post.published_at,
        modifiedTime: post.updated_at,
        authors: [post.author.name],
        tags: post.tags,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '文章不存在',
      description: '找不到请求的文章',
    };
  }
}

// 博客文章详情页组件
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log('Rendering blog post page with params:', params);
  
  try {
    // 确保 params 是可用的
    const slug = params?.slug;
    if (!slug) {
      console.error('No slug provided in params');
      notFound();
    }

    console.log(`Fetching post data for slug: ${slug}`);
    const postData = await getPostBySlug(slug);
    console.log('Post data received:', postData);

    // 检查数据结构
    if (!postData.author || !postData.category) {
      console.error('Invalid post data structure:', postData);
      notFound();
    }

    const post = {
      ...postData,
      author: Array.isArray(postData.author) ? postData.author[0] : postData.author,
      category: Array.isArray(postData.category) ? postData.category[0] : postData.category
    } as PostDetail;
    
    console.log('Processed post data:', post);
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* 文章头部 - 特色图片 */}
        <div className="relative h-[40vh] min-h-[300px] w-full">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* 文章标题和元信息 */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto max-w-4xl">
              <Link 
                href={`/categories/${post.category.slug}`}
                className="inline-block bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full mb-4 hover:bg-blue-700 transition-colors"
              >
                {post.category.name}
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* 作者信息 */}
                <div className="flex items-center">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{post.author.name}</div>
                    {post.author.bio && (
                      <div className="text-sm opacity-90">{post.author.bio.substring(0, 60)}</div>
                    )}
                  </div>
                </div>
                
                {/* 发布日期 */}
                <div className="text-sm">
                  发布于 {format(new Date(post.published_at), 'yyyy年MM月dd日', { locale: zhCN })}
                  {post.updated_at && post.updated_at !== post.published_at && (
                    <span> · 更新于 {format(new Date(post.updated_at), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 文章内容 */}
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
            {/* 文章摘要 */}
            <div className="text-xl text-gray-600 mb-8 border-l-4 border-blue-600 pl-4 italic">
              {post.excerpt}
            </div>
            
            {/* 文章正文 - 使用 Suspense 包裹 Markdown 渲染 */}
            <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded"></div>}>
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </Suspense>
            
            {/* 标签 */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">标签</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 作者信息卡片 */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{post.author.name}</h3>
                  {post.author.bio && (
                    <p className="mt-2 text-gray-600">{post.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* 返回按钮 */}
          <div className="mt-8 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回博客列表
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    notFound();
  }
} 