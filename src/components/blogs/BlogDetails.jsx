import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import LoadingSpinner from '../common/LoadingSpinner';
import { getRelativeTime } from '../../utils/helpers';
import { motion } from 'framer-motion';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await blogService.getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error("Error retrieving essay artifact:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#111111] px-6 text-center">
        <h2 className="font-serif text-2xl uppercase tracking-wider mb-4 text-neutral-950 dark:text-white">
          Artifact Missing
        </h2>
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">
          The requested narrative stream has expired or does not exist.
        </p>
        <Link to="/" className="text-xs uppercase tracking-widest border-b border-neutral-950 dark:border-white pb-1 font-bold">
          Return to home index
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#111111] text-neutral-900 dark:text-neutral-100 min-h-screen py-16 px-6 transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white block mb-12"
        >
          ← Back to index
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-neutral-500 border-y border-neutral-200 dark:border-neutral-800 py-4">
            <span>By {blog.author?.name || 'Anonymous Contributor'}</span>
            <span>•</span>
            <span>{getRelativeTime(blog.createdAt)}</span>
          </div>
        </header>

        {blog.image && (
          <div className="w-full aspect-[16/10] mb-12 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none font-sans text-base md:text-lg leading-relaxed text-neutral-800 dark:text-neutral-300 space-y-6 whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogDetails;