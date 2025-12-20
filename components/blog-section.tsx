"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import BlogCard from "./blog-card";
import FeaturedPost from "./featured-post";
import BlogModal from "./blog-modal";
import { motion } from "framer-motion";
import type { BlogPostWithSlug } from "@/lib/blog/schema";
import { Button } from "@/components/ui/button";


// Wrapper component for consistent section structure
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="bg-slate-800 py-12 md:py-16">
    <div className="container mx-auto px-4 max-w-content">{children}</div>
  </section>
);

// Skeleton component for loading state
function BlogSectionSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured post skeleton */}
      <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-sm lg:p-8">
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
              <div className="h-4 w-16 animate-pulse rounded bg-slate-700" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 rounded-full animate-pulse bg-slate-700" />
              <div className="h-6 w-20 rounded-full animate-pulse bg-slate-700" />
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

      {/* Button skeleton */}
      <div className="text-center">
        <div className="inline-block h-12 w-48 rounded-lg animate-pulse bg-slate-700" />
      </div>
    </div>
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

export default function BlogSection() {
  const [featuredPost, setFeaturedPost] = useState<BlogPostWithSlug | null>(
    null
  );
  const [posts, setPosts] = useState<BlogPostWithSlug[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<BlogPostWithSlug[]>([]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    post: BlogPostWithSlug | null;
  }>({ isOpen: false, post: null });

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
    setModalState({ isOpen: true, post });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, post: null });
  };

  const navigateModal = (direction: "prev" | "next") => {
    if (!modalState.post || allPosts.length === 0) return;

    const currentIndex = allPosts.findIndex((post) => post.slug === modalState.post!.slug);
    if (currentIndex === -1) return;

    const newIndex =
      direction === "prev"
        ? currentIndex > 0 ? currentIndex - 1 : allPosts.length - 1
        : currentIndex < allPosts.length - 1 ? currentIndex + 1 : 0;

    setModalState({ ...modalState, post: allPosts[newIndex] });
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
