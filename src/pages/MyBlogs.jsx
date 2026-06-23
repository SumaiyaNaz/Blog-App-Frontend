import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogService } from "../services/blogService";
import { useAuth } from "../hooks/useAuth";
import BlogCard from "../components/blogs/BlogCard";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const MyBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

 const fetchUserBlogs = async () => {
  try {
    console.log("User object:", user);
    
     const response = await blogService.getUserBlogs();
    console.log("Response from /my-blogs:", response);
    
    if (response && response.data) {
      setBlogs(response.data);
    } else if (Array.isArray(response)) {
      setBlogs(response);
    } else {
      setBlogs([]);
    }
  } catch (err) {
    console.error("Failed to fetch user blogs:", err);
    setBlogs([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchUserBlogs();
  }, [user]);

  const handleEdit = (id) => navigate(`/edit-blog/${id}`);

  const handleDeleteConfirm = async () => {
    try {
      await blogService.deleteBlog(deleteId);
      toast.success("Document purged from layout archive.");
      setDeleteId(null);
      fetchUserBlogs();
    } catch (err) {
      toast.error("Failed to purge data asset.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-neutral-900 dark:text-white px-6 max-w-5xl mx-auto py-12">
      <h2 className="font-serif text-4xl uppercase tracking-tight mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        Your Archives
      </h2>

      {loading ? (
        <p className="uppercase tracking-widest text-xs text-neutral-400">
          Loading catalog...
        </p>
      ) : blogs.length > 0 ? (
        <div className="flex flex-col">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              isOwner={true}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      ) : (
        <p className="uppercase tracking-widest text-sm text-neutral-400 py-12">
          No document designs published by you yet.
        </p>
      )}

      {/* Structured Minimal Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#151515] p-8 max-w-sm w-full border border-neutral-200 dark:border-neutral-800 text-center"
            >
              <h3 className="font-serif text-xl font-bold uppercase mb-4 text-neutral-950 dark:text-white">
                Confirm Purge
              </h3>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-8">
                This action structurally de-allocates the essay completely.
              </p>
              <div className="flex justify-center gap-4 text-xs tracking-widest uppercase">
                <button
                  onClick={() => setDeleteId(null)}
                  className="border border-neutral-300 dark:border-neutral-700 px-4 py-2"
                >
                  Abort
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-700 text-white px-4 py-2"
                >
                  Purge Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBlogs;
