import React from 'react';
import BlogCard from './BlogCard';

const BlogList = ({ blogs, loading, isOwner, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3].map((n) => (
          <div 
            key={n} 
            className="animate-pulse flex flex-col md:flex-row gap-8 pb-10 border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="bg-neutral-100 dark:bg-neutral-900 w-full md:w-1/3 aspect-[4/3]"></div>
            <div className="flex-1 space-y-4 py-2">
              <div className="h-3 bg-neutral-200 dark:bg-neutral-800 w-1/4"></div>
              <div className="h-8 bg-neutral-200 dark:bg-neutral-800 w-3/4"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-5/6"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-sans">
          No records discovered in this catalog feed.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          isOwner={isOwner}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BlogList;