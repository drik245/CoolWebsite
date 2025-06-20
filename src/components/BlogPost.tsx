import React from 'react';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </button>

        {/* Article Header */}
        <article className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden">
          {/* Featured Image */}
          {post.images && post.images.length > 0 && (
            <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
              <img 
                src={post.images[0]} 
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
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
                <span className="text-cyan-400">{post.category}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User size={16} />
                <span>Alex</span>
              </div>
              {post.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-bold text-white">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Media Gallery */}
            {((post.images && post.images.length > 1) || (post.videos && post.videos.length > 0)) && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6">Media</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Additional Images */}
                  {post.images && post.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-700/50 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${post.title} - Image ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                  
                  {/* Videos */}
                  {post.videos && post.videos.map((video, index) => (
                    <div key={index} className="aspect-video bg-gray-700/50 rounded-lg overflow-hidden">
                      <video 
                        src={video} 
                        controls
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;