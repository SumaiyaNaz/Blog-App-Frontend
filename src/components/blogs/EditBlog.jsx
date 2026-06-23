import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const EditBlog = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogById(id);
        setValue('title', data.title);
        setValue('content', data.content);
        setPreview(data.image);
      } catch (err) {
        toast.error('Failed to load essay data.');
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (imageFile) formData.append('image', imageFile);

    try {
      await blogService.updateBlog(id, formData);
      toast.success('Essay structured update complete.');
      navigate('/my-blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-neutral-900 dark:text-white max-w-3xl mx-auto py-16 px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="font-serif text-4xl font-bold uppercase tracking-tight mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          Refine Essay
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Essay Title</label>
            <input 
              type="text"
              {...register('title', { required: 'Title configuration missing' })}
              className="w-full font-serif text-2xl border-b border-neutral-300 dark:border-neutral-700 bg-transparent py-2 focus:outline-none focus:border-neutral-900 dark:focus:border-white"
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 uppercase">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Update Header Image (Optional)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-300 file:text-xs file:uppercase file:bg-transparent dark:file:text-white"
            />
            {preview && (
              <div className="mt-4 aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Essay Content Layout</label>
            <textarea 
              rows="12"
              {...register('content', { required: 'Content is structured blank' })}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm font-sans leading-relaxed focus:outline-none focus:border-neutral-900 dark:focus:border-white"
            />
            {errors.content && <p className="text-xs text-red-600 mt-1 uppercase">{errors.content.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 py-4 text-xs uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Applying shifts...' : 'Apply Document Overhauls'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditBlog;