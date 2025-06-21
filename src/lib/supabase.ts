import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      about_content: {
        Row: {
          id: string;
          name: string;
          title: string;
          bio: string;
          journey: string;
          contact_email: string;
          contact_label: string;
          github_url: string | null;
          linkedin_url: string | null;
          instagram_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          title: string;
          bio: string;
          journey: string;
          contact_email: string;
          contact_label?: string;
          github_url?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string;
          bio?: string;
          journey?: string;
          contact_email?: string;
          contact_label?: string;
          github_url?: string | null;
          linkedin_url?: string | null;
          instagram_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: number;
          name: string;
          icon: string;
          color: string;
          proficiency: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          icon?: string;
          color?: string;
          proficiency?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          icon?: string;
          color?: string;
          proficiency?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: number;
          role: string;
          company: string;
          period: string;
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          role: string;
          company: string;
          period: string;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          role?: string;
          company?: string;
          period?: string;
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tech_stack_categories: {
        Row: {
          id: number;
          name: string;
          value: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          value: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          value?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tech_stack: {
        Row: {
          id: number;
          name: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: number;
          name: string;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          color?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          read_time: number;
          featured: boolean;
          images: string[];
          videos: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          read_time?: number;
          featured?: boolean;
          images?: string[];
          videos?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          read_time?: number;
          featured?: boolean;
          images?: string[];
          videos?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}