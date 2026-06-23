import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, isOwner, onEdit, onDelete }) => {
  const relativeTime = (dateString) => {
    if (!dateString) return 'Centuries ago';
    const msgDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - msgDate) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return msgDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-neutral-200 dark:border-neutral-800 pb-10 pt-6 flex flex-col md:flex-row gap-8 items-start"
    >
      <div className="w-full md:w-1/3 aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img 
          src={blog.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80'} 
          alt={blog.title} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-neutral-500 mb-3">
            <span>By {blog.author?.name || 'Anonymous'}</span>
            <span>•</span>
            <span>{relativeTime(blog.createdAt)}</span>
          </div>
          <Link to={`/blog/${blog._id}`}>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold hover:text-amber-600 dark:hover:text-amber-400 mb-3 text-neutral-900 dark:text-neutral-100 leading-tight">
              {blog.title}
            </h3>
          </Link>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
            {blog.content ? `${blog.content.substring(0, 160)}...` : ''}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <Link to={`/blog/${blog._id}`} className="text-xs uppercase tracking-widest border-b border-neutral-900 dark:border-white pb-1 font-bold">
            Read Essay
          </Link>

          {isOwner && (
            <div className="flex gap-4 text-xs tracking-widest uppercase">
              <button onClick={() => onEdit(blog._id)} className="text-amber-600 dark:text-amber-400 font-medium">Edit</button>
              <button onClick={() => onDelete(blog._id)} className="text-red-600 font-medium">Delete</button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogCard;