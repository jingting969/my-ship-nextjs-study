export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL,
  name: process.env.NEXT_PUBLIC_SITE_NAME,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  defaultTitle: process.env.NEXT_PUBLIC_DEFAULT_TITLE,
  defaultDescription: process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION,
  defaultKeywords: process.env.NEXT_PUBLIC_DEFAULT_KEYWORDS,
};

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export const imageConfig = {
  defaultAvatar: process.env.NEXT_PUBLIC_DEFAULT_AVATAR,
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
}; 