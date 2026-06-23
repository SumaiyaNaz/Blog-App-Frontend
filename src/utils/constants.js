export const APP_NAME = "CHRONICLE";
export const APP_TAGLINE = "The Structural Imperative of Raw Form & Thought";

export const ROLES = {
  CONTRIBUTOR: "user",
  LEAD_EDITOR: "admin",
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/user",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: (id) => `/auth/user/${id}`,
  },
  BLOGS: {
    CREATE: "/blog/create",
    DELETE: (id) => `/blog/delete/${id}`,
    ALL: "/blog/",
    SINGLE: (id) => `/blog/${id}`,
    USER: "/blog/my-blogs",  // Changed this
  },
};