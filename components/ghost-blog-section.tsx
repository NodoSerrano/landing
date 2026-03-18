"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GhostBlogModal from "./ghost-blog-modal";

// Ghost API types - exported for use in modal
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

interface GhostAPIResponse {
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

// Wrapper component for consistent section structure
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="py-12 md:py-16" id="blog">
    <div className="container mx-auto px-4 max-w-content">{children}</div>
  </section>
);

// Skeleton component for loading state
function BlogSectionSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured post skeleton */}
      <div className="overflow-hidden rounded-lg neumorphism-shadow neumorphism-border p-6 lg:p-8 layer2">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8 mx-auto">
          <div className="h-48 w-full rounded-lg lg:h-64 lg:w-80 animate-pulse bg-slate-700" />
          <div className="flex-1 space-y-4">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-700" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-slate-700" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-slate-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-700" />
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-700" />
              <div className="h-4 w-20 animate-pulse rounded bg-slate-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest posts skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg neumorphism-shadow neumorphism-border p-4 layer2"
          >
            <div className="flex gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-lg animate-pulse bg-slate-700" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-full animate-pulse bg-slate-700" />
                <div className="h-3 w-4/5 animate-pulse bg-slate-700" />
                <div className="flex gap-2 pt-2">
                  <div className="h-3 w-16 animate-pulse bg-slate-700" />
                  <div className="h-3 w-12 animate-pulse bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Featured Post Component
function FeaturedGhostPost({
  post,
  onOpen,
}: {
  post: GhostPost;
  onOpen: (post: GhostPost) => void;
}) {
  const formattedDate = new Date(post.published_at).toLocaleDateString(
    "es-AR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpen(post);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div onClick={handleClick} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-xl neumorphism-shadow neumorphism-border p-8 layer2 transition-shadow duration-300">
          <div className="absolute right-4 top-4 rounded-full bg-cyan-600 border border-cyan-500 px-4 py-2 text-sm font-medium">
            ⭐ Destacado
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thumbnail */}
            {post.feature_image && (
              <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl leading-tight transition-colors">
                {post.title}
              </h2>

              <p className="mb-4 text-lg leading-relaxed text-slate-300">
                {post.excerpt}
              </p>
            </div>
          </div>

          <div className="mt-4 mb-6 flex flex-wrap items-center gap-6 text-sm opacity-80">
            {post.authors && post.authors[0] && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.authors[0].name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.published_at}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.reading_time} min de lectura</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag.slug}
                  className="rounded-full neumorphism-shadow neumorphism-border px-4 py-2 text-sm layer3"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <Button className="font-medium">
            Leer artículo completo <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// Blog Card Component
function GhostBlogCard({
  post,
  index,
  onOpen,
}: {
  post: GhostPost;
  index: number;
  onOpen: (post: GhostPost) => void;
}) {
  const formattedDate = new Date(post.published_at).toLocaleDateString(
    "es-AR",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpen(post);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative h-full"
    >
      <div onClick={handleClick} className="block cursor-pointer h-full">
        <div className="relative h-full layer2 overflow-hidden rounded-xl neumorphism-shadow neumorphism-border p-4 transition-shadow duration-300">
          {post.featured && (
            <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-sm">
              ⭐
            </div>
          )}

          <div className="flex gap-4">
            {/* Thumbnail */}
            {post.feature_image && (
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg neumorphism-border">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="mb-2 text-lg font-bold leading-tight hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>

              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
                {post.excerpt}
              </p>

              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs opacity-80">
                {post.authors && post.authors[0] && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="font-medium">{post.authors[0].name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.published_at}>{formattedDate}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.reading_time} min</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag.slug}
                      className="rounded-full layer3 neumorphism-shadow neumorphism-border px-2 py-1 text-xs opacity-80"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function GhostBlogSection() {
  const [allPosts, setAllPosts] = useState<GhostPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<GhostPost | null>(null);
  const [posts, setPosts] = useState<GhostPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    post: GhostPost | null;
  }>({ isOpen: false, post: null });

  useEffect(() => {
    async function fetchGhostPosts() {
      try {
        const ghostUrl =
          process.env.NEXT_PUBLIC_GHOST_URL || "https://blog.nodoserrano.org";
        const apiKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

        if (!apiKey) {
          console.warn("Ghost API key not configured. Using fallback.");
          setError("Blog configuration pending");
          return;
        }

        // Ghost Content API URL format
        const apiUrl = `${ghostUrl}/ghost/api/content/posts/?key=${apiKey}&include=tags,authors&limit=10&order=published_at%20DESC`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Ghost API error:", response.status, errorText);
          throw new Error(
            `Failed to fetch posts: ${response.status} ${response.statusText}`
          );
        }

        const data: GhostAPIResponse = await response.json();

        if (!data.posts || data.posts.length === 0) {
          setError("No posts available");
          return;
        }

        // Store all posts for modal navigation
        setAllPosts(data.posts);

        // Find featured post
        const featured = data.posts.find((post) => post.featured);
        setFeaturedPost(featured || data.posts[0] || null);

        // Get latest posts (excluding featured)
        const latestPosts = data.posts
          .filter((post) => !post.featured || post.id !== featured?.id)
          .slice(0, 4);

        setPosts(latestPosts);
      } catch (err) {
        console.error("Error fetching Ghost blog posts:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load blog posts"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGhostPosts();
  }, []);

  const openModal = (post: GhostPost) => {
    setModalState({ isOpen: true, post });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, post: null });
  };

  const navigateModal = (direction: "prev" | "next") => {
    if (!modalState.post || allPosts.length === 0) return;

    const currentIndex = allPosts.findIndex(
      (post) => post.id === modalState.post!.id
    );
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? currentIndex > 0
          ? currentIndex - 1
          : allPosts.length - 1
        : currentIndex < allPosts.length - 1
          ? currentIndex + 1
          : 0;

    setModalState({ ...modalState, post: allPosts[newIndex] });
  };

  if (loading) {
    return (
      <SectionWrapper>
        <BlogSectionSkeleton />
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper>
        <div className="text-center py-12">
          <p className="text-slate-400">
            No se pudieron cargar los artículos del blog.
          </p>
          <p className="text-sm text-slate-500 mt-2">{error}</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!featuredPost && posts.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Nuestro Blog</h2>
        <p className="text-lg text-slate-300">
          Últimas novedades y artículos sobre Ethereum
        </p>
      </div>

      {featuredPost && (
        <div className="mb-12">
          <FeaturedGhostPost post={featuredPost} onOpen={openModal} />
        </div>
      )}

      {posts.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 grid gap-6 md:grid-cols-2"
        >
          {posts.map((post, index) => (
            <GhostBlogCard
              key={post.id}
              post={post}
              index={index}
              onOpen={openModal}
            />
          ))}
        </motion.div>
      )}

      <div className="text-center">
        <Button
          href="https://blog.nodoserrano.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          Ver todos los artículos
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <GhostBlogModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        post={modalState.post}
        onNavigate={navigateModal}
        canNavigate={{
          prev: allPosts.length > 1,
          next: allPosts.length > 1,
        }}
      />
    </SectionWrapper>
  );
}
