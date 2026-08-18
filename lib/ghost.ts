export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  excerpt: string;
  reading_time: number;
  tags?: Array<{ name: string; slug: string }>;
  authors?: Array<{ name: string }>;
}

export interface GhostAPIResponse {
  posts: GhostPost[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
    };
  };
}

const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL || "https://blog.nodoserrano.org";
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

export async function getGhostPosts({
  page = 1,
  limit = 6,
}: { page?: number; limit?: number } = {}): Promise<GhostAPIResponse> {
  if (!GHOST_KEY) {
    return { posts: [], meta: { pagination: { page, limit, pages: 0, total: 0 } } };
  }

  const url = `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&include=tags,authors&limit=${limit}&page=${page}&order=published_at%20DESC`;
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Ghost API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getGhostPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!GHOST_KEY) return null;

  const url = `${GHOST_URL}/ghost/api/content/posts/slug/${encodeURIComponent(slug)}/?key=${GHOST_KEY}&include=tags,authors`;
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Ghost API error: ${response.status} ${response.statusText}`);
  }

  const data: GhostAPIResponse = await response.json();
  return data.posts[0] ?? null;
}
