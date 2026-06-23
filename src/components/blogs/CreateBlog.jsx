import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const CreateBlog = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!imageFile) {
      toast.error('Editorial header image is required.');
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('image', imageFile);

    try {
      await blogService.createBlog(formData);
      toast.success('Article submitted successfully.');
      navigate('/my-blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failure.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-neutral-900 dark:text-white max-w-3xl mx-auto py-16 px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="font-serif text-4xl font-bold uppercase tracking-tight mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          Draft New Essay
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Essay Title</label>
            <input 
              type="text"
              {...register('title', { required: 'Title is mandatory' })}
              className="w-full font-serif text-2xl border-b border-neutral-300 dark:border-neutral-700 bg-transparent py-2 focus:outline-none focus:border-neutral-900 dark:focus:border-white"
              placeholder="The Structural Imperative of Art..."
            />
            {errors.title && <p className="text-xs text-red-600 mt-1 uppercase">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Display Header Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-300 file:text-xs file:uppercase file:tracking-wider file:bg-transparent hover:file:bg-neutral-50 dark:file:text-white"
            />
            {preview && (
              <div className="mt-4 aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Essay Content</label>
            <textarea 
              rows="12"
              {...register('content', { required: 'Content layout is empty' })}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 text-sm font-sans leading-relaxed focus:outline-none focus:border-neutral-900 dark:focus:border-white"
              placeholder="Begin writing your narrative layout here..."
            />
            {errors.content && <p className="text-xs text-red-600 mt-1 uppercase">{errors.content.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 py-4 text-xs uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Publishing Narrative...' : 'Publish Essay to Archive'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlog;