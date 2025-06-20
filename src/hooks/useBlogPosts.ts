import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { blogPosts as initialBlogPosts } from '../data/blogs';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load posts from localStorage or use initial data
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error loading saved posts:', error);
        setPosts(initialBlogPosts);
      }
    } else {
      setPosts(initialBlogPosts);
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const addPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Math.max(...posts.map(p => p.id), 0) + 1,
    };
    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
  };

  const updatePost = (id: number, postData: Omit<BlogPost, 'id'>) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...postData, id } : post
    );
    savePosts(updatedPosts);
  };

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    savePosts(updatedPosts);
  };

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
  };
};