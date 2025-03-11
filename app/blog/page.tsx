import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { getPosts } from '@/lib/api';
import { Pagination } from '@/components/Pagination';

export const revalidate = 600; // 10分钟重新验证

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 12;
  
  const { posts, total } = await getPosts(currentPage, pageSize);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">博客文章</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            探索最新的技术趋势、开发技巧和行业见解
          </p>
        </div>
      </div>
      
      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-12">
        {/* 文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              {/* 特色图片 */}
              <div className="relative h-52">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                {/* 分类标签 - 放在图片上方 */}
                <Link 
                  href={`/categories/${post.category.slug}`}
                  className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                >
                  {post.category.name}
                </Link>
              </div>
              
              <div className="p-6">
                {/* 标题 */}
                <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                {/* 摘要 */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  {/* 作者信息 */}
                  <div className="flex items-center">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-gray-100"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {post.author.name}
                    </span>
                  </div>
                  
                  {/* 发布日期 */}
                  <time className="text-sm text-gray-500">
                    {format(new Date(post.published_at), 'yyyy年MM月dd日', { locale: zhCN })}
                  </time>
                </div>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* 如果没有文章 */}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-600">暂无文章</h3>
            <p className="mt-2 text-gray-500">请稍后再来查看</p>
          </div>
        )}
        
        {/* 分页 */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
} 