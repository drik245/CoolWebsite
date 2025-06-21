import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { supabase } from '../lib/supabase';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: BlogPost[] = data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.created_at,
        category: post.category,
        readTime: post.read_time,
        featured: post.featured,
        images: post.images || [],
        videos: post.videos || []
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData: Omit<BlogPost, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          category: postData.category,
          read_time: postData.readTime,
          featured: postData.featured,
          images: postData.images || [],
          videos: postData.videos || []
        })
        .select()
        .single();

      if (error) throw error;

      const newPost: BlogPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: data.created_at,
        category: data.category,
        readTime: data.read_time,
        featured: data.featured,
        images: data.images || [],
        videos: data.videos || []
      };

      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  };

  const updatePost = async (id: number, postData: Omit<BlogPost, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          category: postData.category,
          read_time: postData.readTime,
          featured: postData.featured,
          images: postData.images || [],
          videos: postData.videos || [],
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedPost: BlogPost = {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: data.created_at,
        category: data.category,
        readTime: data.read_time,
        featured: data.featured,
        images: data.images || [],
        videos: data.videos || []
      };

      setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const deletePost = async (id: number) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  return {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
};