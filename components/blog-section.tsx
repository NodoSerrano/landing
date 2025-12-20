"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import BlogCard from "./blog-card";
import FeaturedPost from "./featured-post";
import BlogModal from "./blog-modal";
import { motion } from "framer-motion";
import type { BlogPostWithSlug } from "@/lib/blog/schema";
import { Button } from "@/components/ui/button";

// Helper function for skeleton divs
const SkeletonDiv = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-slate-700 ${className}`} />
);

// Skeleton component for loading state
function BlogSectionSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured post skeleton */}
      <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-sm lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <SkeletonDiv className="h-48 w-full rounded-lg lg:h-64 lg:w-80" />
          <div className="flex-1 space-y-4">
            <SkeletonDiv className="h-3 w-20" />
            <SkeletonDiv className="h-8 w-3/4" />
            <div className="space-y-2">
              <SkeletonDiv className="h-4 w-full" />
              <SkeletonDiv className="h-4 w-5/6" />
            </div>
            <div className="flex gap-4 pt-4">
              <SkeletonDiv className="h-4 w-24" />
              <SkeletonDiv className="h-4 w-20" />
              <SkeletonDiv className="h-4 w-16" />
            </div>
            <div className="flex gap-2 pt-2">
              <SkeletonDiv className="h-6 w-16 rounded-full" />
              <SkeletonDiv className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest posts skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/60 p-4 backdrop-blur-sm"
          >
            <div className="flex gap-4">
              <SkeletonDiv className="h-20 w-20 flex-shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <SkeletonDiv className="h-5 w-full" />
                <SkeletonDiv className="h-3 w-4/5" />
                <div className="flex gap-2 pt-2">
                  <SkeletonDiv className="h-3 w-16" />
                  <SkeletonDiv className="h-3 w-12" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className="text-center">
        <SkeletonDiv className="inline-block h-12 w-48 rounded-lg" />
      </div>
    </div>
  );
}

// Wrapper component for consistent section structure
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="bg-slate-800 py-12 md:py-16">
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function BlogSection() {
  const [featuredPost, setFeaturedPost] = useState<BlogPostWithSlug | null>(
    null
  );
  const [posts, setPosts] = useState<BlogPostWithSlug[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<BlogPostWithSlug[]>([]);
  const [modalPost, setModalPost] = useState<BlogPostWithSlug | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const [postsResponse, allPostsResponse] = await Promise.all([
          fetch("/api/blog/posts"),
          fetch("/api/blog/all"),
        ]);

        if (postsResponse.ok) {
          const data = await postsResponse.json();
          setFeaturedPost(data.featured);
          setPosts(data.latest);
        }

        if (allPostsResponse.ok) {
          const allData = await allPostsResponse.json();
          setAllPosts(allData);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const openModal = (post: BlogPostWithSlug) => {
    setModalPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalPost(null);
  };

  const getCurrentPostIndex = () => {
    if (!modalPost) return -1;
    return allPosts.findIndex((post) => post.slug === modalPost.slug);
  };

  const navigateModal = (direction: "prev" | "next") => {
    if (allPosts.length === 0) return;

    const currentIndex = getCurrentPostIndex();
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? currentIndex > 0
          ? currentIndex - 1
          : allPosts.length - 1
        : currentIndex < allPosts.length - 1
        ? currentIndex + 1
        : 0;

    setModalPost(allPosts[newIndex]);
  };

  const getNavigationState = () => {
    const hasMultiplePosts = allPosts.length > 1;
    return {
      prev: hasMultiplePosts,
      next: hasMultiplePosts,
    };
  };

  if (loading) {
    return (
      <SectionWrapper>
        <BlogSectionSkeleton />
      </SectionWrapper>
    );
  }

  if (!featuredPost && posts.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      {featuredPost && (
        <div className="mb-12">
          <FeaturedPost post={featuredPost} onOpen={openModal} />
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
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              onOpen={openModal}
            />
          ))}
        </motion.div>
      )}

      <Button href="/blog">
        Ver todos los artículos
        <ArrowRight className="h-4 w-4" />
      </Button>

      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        post={modalPost}
        onNavigate={navigateModal}
        canNavigate={getNavigationState()}
      />
    </SectionWrapper>
  );
}
