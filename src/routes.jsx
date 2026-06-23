// src/routes.jsx
import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));
const MyBlogs = lazy(() => import('./pages/MyBlogs'));
const CreateBlog = lazy(() => import('./components/blogs/CreateBlog'));
const EditBlog = lazy(() => import('./components/blogs/EditBlog'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const Profile = lazy(() => import('./components/user/Profile'));
const UpdateProfile = lazy(() => import('./components/user/UpdateProfile')); 

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/blog/:id" element={<BlogDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Area */}
    <Route element={<ProtectedRoute />}>
      <Route path="/my-blogs" element={<MyBlogs />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/edit-blog/:id" element={<EditBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
    </Route>
  </Routes>
);