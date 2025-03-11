import { supabase } from './supabase';
import type { Post, PostsResponse } from '../types/blog';

interface SupabasePost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  tags: string[];
  authors: {
    name: string;
    avatar: string;
  };
  categories: {
    name: string;
    slug: string;
  };
}

export async function getPosts(page = 1, limit = 10): Promise<PostsResponse> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // 获取文章总数
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  // 获取文章列表
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      featured_image,
      published_at,
      tags,
      authors (
        name,
        avatar
      ),
      categories (
        name,
        slug
      )
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(start, end);

  if (error) {
    throw new Error(error.message);
  }

  const posts = (data as SupabasePost[]).map((post) => ({
    ...post,
    author: post.authors,
    category: post.categories,
  }));

  return {
    posts,
    total: count || 0,
  };
}

// 获取单篇文章详情
export async function getPostBySlug(slug: string) {
  console.log(`Fetching post with slug: ${slug}`);
  
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        content,
        excerpt,
        featured_image,
        published_at,
        updated_at,
        tags,
        meta_title,
        meta_description,
        authors (
          id,
          name,
          bio,
          avatar
        ),
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error(`Error fetching post: ${error.message}`);
      throw new Error(error.message);
    }

    if (!data) {
      console.error(`No post found with slug: ${slug}`);
      throw new Error(`Post not found: ${slug}`);
    }

    console.log(`Post found:`, data);
    
    // 确保 authors 和 categories 是数组
    const author = Array.isArray(data.authors) ? data.authors : [data.authors];
    const category = Array.isArray(data.categories) ? data.categories : [data.categories];

    return {
      ...data,
      author,
      category,
    };
  } catch (error) {
    console.error(`Error in getPostBySlug:`, error);
    throw error;
  }
} 