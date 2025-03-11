declare namespace NodeJS {
  interface ProcessEnv {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    // Site
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SITE_NAME: string;
    NEXT_PUBLIC_SITE_DESCRIPTION: string;

    // Images
    NEXT_PUBLIC_DEFAULT_AVATAR: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
    NEXT_PUBLIC_CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;

    // SEO
    NEXT_PUBLIC_DEFAULT_TITLE: string;
    NEXT_PUBLIC_DEFAULT_DESCRIPTION: string;
    NEXT_PUBLIC_DEFAULT_KEYWORDS: string;

    // API
    REVALIDATE_SECRET_TOKEN: string;
  }
} 