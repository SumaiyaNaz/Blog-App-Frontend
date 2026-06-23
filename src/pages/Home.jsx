import React, { useState, useEffect } from "react";
import { blogService } from "../services/blogService";
import BlogCard from "../components/blogs/BlogCard";
import { motion } from "framer-motion";
import Footer from "../components/common/Footer";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAllBlogs();

        // Access response.data since the backend nesting object contains the payload
        if (response && response.data) {
          setBlogs(response.data);
        } else if (Array.isArray(response)) {
          setBlogs(response);
        }
      } catch (err) {
        console.error("Failed to map API stream to layout state:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      blog.content?.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-neutral-900 dark:text-neutral-100 px-6 max-w-5xl mx-auto py-12">
      {/* Editorial Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 border-b border-neutral-900 dark:border-neutral-800 mb-12"
      >
        <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-tighter font-extrabold mb-4">
          The Workspace Edition
        </h1>
        <p className="font-serif italic text-lg text-neutral-500 max-w-xl mx-auto">
          Provocative commentary, minimal design, and structural ideas framing
          tomorrow's digital landscapes.
        </p>
      </motion.div>

      {/* Modern Search Control Bar */}
      <div className="mb-12">
        <input
          type="text"
          placeholder="Search archives..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm tracking-widest uppercase focus:outline-none focus:border-amber-600 transition-all"
        />
      </div>

      {/* Article Feed */}
      {loading ? (
        <div className="space-y-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="animate-pulse flex flex-col md:flex-row gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800"
            >
              <div className="bg-neutral-200 dark:bg-neutral-800 w-full md:w-1/3 aspect-[4/3]"></div>
              <div className="flex-1 space-y-4 py-2">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-1/4"></div>
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 w-3/4"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="flex flex-col">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 uppercase tracking-widest text-neutral-400">
          No records matched your search parameters.
        </div>
      )}


      <Footer />
    </div>
  );
};

export default Home;
