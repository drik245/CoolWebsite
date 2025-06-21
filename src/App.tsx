import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import BlogEditor from './components/BlogEditor';
import ContentEditor from './components/ContentEditor';
import CursorTrail from './components/CursorTrail';
import ParticleBackground from './components/ParticleBackground';
import { useBlogPosts } from './hooks/useBlogPosts';
import { useContent } from './hooks/useContent';
import { BlogPost as BlogPostType } from './types';

type AppView = 'main' | 'blog-post' | 'admin-login' | 'admin-dashboard' | 'blog-editor' | 'content-editor';
type ContentEditorType = 'about' | 'skills' | 'experiences' | 'techstack' | 'categories' | 'techstack-categories';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
  const [currentPost, setCurrentPost] = useState<BlogPostType | null>(null);
  const [contentEditorType, setContentEditorType] = useState<ContentEditorType>('about');
  
  const { posts, loading: postsLoading, addPost, updatePost, deletePost } = useBlogPosts();
  const { 
    aboutContent, 
    skills, 
    experiences, 
    techStack, 
    categories,
    techStackCategories,
    loading: contentLoading,
    updateAboutContent,
    updateSkills,
    updateExperiences,
    updateTechStack,
    updateCategories,
    updateTechStackCategories
  } = useContent();

  // Handle smooth scrolling to sections
  const handleNavigate = (sectionId: string) => {
    if (currentView !== 'main') {
      setCurrentView('main');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        setActiveSection(sectionId);
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      setActiveSection(sectionId);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    if (currentView !== 'main') return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'blog'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Admin functions
  const handleAdminAccess = () => {
    setCurrentView('admin-login');
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdminLoggedIn(true);
      setCurrentView('admin-dashboard');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('main');
    setEditingPost(null);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setCurrentView('blog-editor');
  };

  const handleEditPost = (post: BlogPostType) => {
    setEditingPost(post);
    setCurrentView('blog-editor');
  };

  const handleSavePost = async (postData: Omit<BlogPostType, 'id'>) => {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
      } else {
        await addPost(postData);
      }
      setCurrentView('admin-dashboard');
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setCurrentView('admin-dashboard');
    setEditingPost(null);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const handleReadPost = (post: BlogPostType) => {
    setCurrentPost(post);
    setCurrentView('blog-post');
  };

  const handleBackToBlog = () => {
    setCurrentPost(null);
    setCurrentView('main');
    setTimeout(() => {
      const element = document.getElementById('blog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Content editor functions
  const handleEditContent = (type: ContentEditorType) => {
    setContentEditorType(type);
    setCurrentView('content-editor');
  };

  const handleSaveContent = async (data: any) => {
    try {
      switch (contentEditorType) {
        case 'about':
          await updateAboutContent(data);
          break;
        case 'skills':
          await updateSkills(data);
          break;
        case 'experiences':
          await updateExperiences(data);
          break;
        case 'techstack':
          await updateTechStack(data);
          break;
        case 'categories':
          await updateCategories(data);
          break;
        case 'techstack-categories':
          await updateTechStackCategories(data);
          break;
      }
      setCurrentView('admin-dashboard');
    } catch (error) {
      console.error('Error saving content:', error);
      throw error; // Re-throw to be handled by ContentEditor
    }
  };

  const handleCancelContentEdit = () => {
    setCurrentView('admin-dashboard');
  };

  // Show loading state
  if (contentLoading || postsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Render different views
  if (currentView === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={handleBackToMain} />;
  }

  if (currentView === 'admin-dashboard' && isAdminLoggedIn) {
    return (
      <AdminDashboard
        posts={posts}
        aboutContent={aboutContent}
        skills={skills}
        experiences={experiences}
        techStack={techStack}
        categories={categories}
        techStackCategories={techStackCategories}
        onCreatePost={handleCreatePost}
        onEditPost={handleEditPost}
        onDeletePost={deletePost}
        onEditAbout={() => handleEditContent('about')}
        onEditSkills={() => handleEditContent('skills')}
        onEditExperiences={() => handleEditContent('experiences')}
        onEditTechStack={() => handleEditContent('techstack')}
        onEditCategories={() => handleEditContent('categories')}
        onEditTechStackCategories={() => handleEditContent('techstack-categories')}
        onLogout={handleAdminLogout}
      />
    );
  }

  if (currentView === 'blog-editor' && isAdminLoggedIn) {
    return (
      <BlogEditor
        post={editingPost || undefined}
        categories={categories}
        onSave={handleSavePost}
        onCancel={handleCancelEdit}
      />
    );
  }

  if (currentView === 'content-editor' && isAdminLoggedIn) {
    return (
      <ContentEditor
        type={contentEditorType}
        aboutContent={contentEditorType === 'about' ? aboutContent : undefined}
        skills={contentEditorType === 'skills' ? skills : undefined}
        experiences={contentEditorType === 'experiences' ? experiences : undefined}
        techStack={contentEditorType === 'techstack' ? techStack : undefined}
        categories={contentEditorType === 'categories' ? categories : undefined}
        techStackCategories={contentEditorType === 'techstack-categories' ? techStackCategories : undefined}
        onSave={handleSaveContent}
        onCancel={handleCancelContentEdit}
      />
    );
  }

  if (currentView === 'blog-post' && currentPost) {
    return (
      <BlogPost
        post={currentPost}
        onBack={handleBackToBlog}
      />
    );
  }

  // Main application view
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <CursorTrail />
      
      {/* Navigation */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Main Content */}
      <main>
        <Hero aboutContent={aboutContent} onNavigate={handleNavigate} />
        <About 
          aboutContent={aboutContent}
          skills={skills}
          experiences={experiences}
          techStack={techStack}
          techStackCategories={techStackCategories}
        />
        <Blog 
          posts={posts} 
          categories={categories}
          onAdminAccess={handleAdminAccess}
          onReadPost={handleReadPost}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-6">
            Crafting digital experiences with passion and precision.
          </p>
          <div className="text-sm text-gray-500">
            © 2024 {aboutContent.name} Portfolio. Built with React & TypeScript.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;