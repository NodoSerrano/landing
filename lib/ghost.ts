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

function emptyResponse(page: number, limit: number): GhostAPIResponse {
  return { posts: [], meta: { pagination: { page, limit, pages: 0, total: 0 } } };
}

export async function getGhostPosts({
  page = 1,
  limit = 6,
}: { page?: number; limit?: number } = {}): Promise<GhostAPIResponse> {
  if (!GHOST_KEY) {
    return emptyResponse(page, limit);
  }

  const url = `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&include=tags,authors&limit=${limit}&page=${page}&order=published_at%20DESC`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) {
      // Bad key / rate limit / Ghost outage: degrade to an empty list rather
      // than throwing an unhandled 500 in the server component.
      console.error(`[ghost] getGhostPosts: ${response.status} ${response.statusText}`);
      return emptyResponse(page, limit);
    }

    return response.json();
  } catch (error) {
    console.error("[ghost] getGhostPosts: request failed", error);
    return emptyResponse(page, limit);
  }
}

export async function getGhostPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!GHOST_KEY) return null;

  const url = `${GHOST_URL}/ghost/api/content/posts/slug/${encodeURIComponent(slug)}/?key=${GHOST_KEY}&include=tags,authors`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });

    // 404 (unknown slug) and any other non-OK status (bad key, rate limit,
    // outage) both resolve to null -> the page renders notFound() instead of
    // throwing an unhandled 500.
    if (!response.ok) {
      if (response.status !== 404) {
        console.error(`[ghost] getGhostPostBySlug(${slug}): ${response.status} ${response.statusText}`);
      }
      return null;
    }

    const data: GhostAPIResponse = await response.json();
    return data.posts[0] ?? null;
  } catch (error) {
    console.error(`[ghost] getGhostPostBySlug(${slug}): request failed`, error);
    return null;
  }
}
