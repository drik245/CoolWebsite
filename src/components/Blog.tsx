import React, { useState } from 'react';
import { Calendar, Clock, Tag, ArrowRight, Search, Filter, Settings, Plus } from 'lucide-react';
import { BlogPost, Category } from '../types';

interface BlogProps {
  posts: BlogPost[];
  categories: Category[];
  onAdminAccess: () => void;
  onReadPost: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ posts, categories, onAdminAccess, onReadPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categoryNames = ['All', ...categories.map(cat => cat.name)];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || 'from-gray-400 to-gray-500';
  };

  const BlogCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({ post, featured = false }) => (
    <article className={`group relative rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer ${
      featured 
        ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-cyan-500/30 hover:border-cyan-400/50' 
        : 'bg-gray-800/40 border border-gray-700/40 hover:border-purple-500/30'
    }`} onClick={() => onReadPost(post)}>
      {/* Glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        featured ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10' : 'bg-gradient-to-br from-purple-500/5 to-pink-500/5'
      }`} />
      
      {/* Featured Image */}
      {post.images && post.images.length > 0 && (
        <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 overflow-hidden">
          <img 
            src={post.images[0]} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="relative p-6">
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-bold text-white">
            Featured
          </div>
        )}

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag size={16} />
            <span className={`bg-gradient-to-r ${getCategoryColor(post.category)} bg-clip-text text-transparent font-medium`}>
              {post.category}
            </span>
          </div>
        </div>

        <h3 className={`font-bold mb-3 group-hover:text-cyan-400 transition-colors ${
          featured ? 'text-2xl text-white' : 'text-xl text-gray-200'
        }`}>
          {post.title}
        </h3>

        <p className="text-gray-400 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Media indicators */}
        {((post.images && post.images.length > 0) || (post.videos && post.videos.length > 0)) && (
          <div className="flex items-center space-x-2 mb-4">
            {post.images && post.images.length > 0 && (
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                {post.images.length} image{post.images.length > 1 ? 's' : ''}
              </span>
            )}
            {post.videos && post.videos.length > 0 && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                {post.videos.length} video{post.videos.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Last updated info */}
        <div className="text-xs text-gray-500 mb-4">
          Last updated: {formatDateTime(post.date)}
        </div>

        <button className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium group-hover:translate-x-2 transition-all duration-300">
          <span>Read More</span>
          <ArrowRight size={16} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </article>
  );

  return (
    <section id="blog" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Blog & Insights
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about technology, development, and the future of digital experiences.
          </p>
          
          {/* Admin Access Button */}
          <button
            onClick={onAdminAccess}
            className="absolute top-0 right-0 flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 group"
            title="Admin Access"
          >
            <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <div className="flex space-x-2 overflow-x-auto">
              {categoryNames.map(category => {
                const categoryColor = category === 'All' ? 'from-cyan-500 to-purple-500' : getCategoryColor(category);
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category
                        ? `bg-gradient-to-r ${categoryColor} text-white shadow-lg`
                        : 'bg-gray-800/50 text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full mr-4" />
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mr-4" />
              All Articles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">No articles found matching your criteria.</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;