export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  author: {
    name: string;
    avatar: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
}

export interface PostsResponse {
  posts: Post[];
  total: number;
} 