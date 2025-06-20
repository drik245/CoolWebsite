import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Calendar, Clock, Tag, LogOut, Eye, Settings,
  User, Code2, Briefcase, Layers, Palette, Globe, FolderTree
} from 'lucide-react';
import { BlogPost, AboutContent, Skill, Experience, TechStack, Category, TechStackCategory } from '../types';

interface AdminDashboardProps {
  posts: BlogPost[];
  aboutContent: AboutContent;
  skills: Skill[];
  experiences: Experience[];
  techStack: TechStack[];
  categories: Category[];
  techStackCategories: TechStackCategory[];
  onCreatePost: () => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: number) => void;
  onEditAbout: () => void;
  onEditSkills: () => void;
  onEditExperiences: () => void;
  onEditTechStack: () => void;
  onEditCategories: () => void;
  onEditTechStackCategories: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  posts,
  aboutContent,
  skills,
  experiences,
  techStack,
  categories,
  techStackCategories,
  onCreatePost,
  onEditPost,
  onDeletePost,
  onEditAbout,
  onEditSkills,
  onEditExperiences,
  onEditTechStack,
  onEditCategories,
  onEditTechStackCategories,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'about' | 'categories' | 'techstack'>('overview');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      onDeletePost(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'posts', label: 'Blog Posts', icon: Edit },
    { id: 'about', label: 'About Content', icon: User },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'techstack', label: 'Tech Stack', icon: FolderTree }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your portfolio content and blog posts</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 p-1 rounded-lg overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Posts</p>
                    <p className="text-2xl font-bold text-white">{posts.length}</p>
                  </div>
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Eye size={24} className="text-cyan-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Categories</p>
                    <p className="text-2xl font-bold text-white">{categories.length}</p>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Tag size={24} className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Skills</p>
                    <p className="text-2xl font-bold text-white">{skills.length}</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Code2 size={24} className="text-green-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Experience</p>
                    <p className="text-2xl font-bold text-white">{experiences.length}</p>
                  </div>
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Briefcase size={24} className="text-orange-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={onCreatePost}
                className="p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              >
                <Plus size={32} className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Create New Post</h3>
                <p className="text-gray-400">Write and publish a new blog post</p>
              </button>

              <button
                onClick={onEditAbout}
                className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              >
                <User size={32} className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Edit About Section</h3>
                <p className="text-gray-400">Update your personal information and bio</p>
              </button>

              <button
                onClick={onEditSkills}
                className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              >
                <Code2 size={32} className="text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Manage Skills</h3>
                <p className="text-gray-400">Add, edit, or remove your skills and expertise</p>
              </button>

              <button
                onClick={onEditExperiences}
                className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              >
                <Briefcase size={32} className="text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Edit Experience</h3>
                <p className="text-gray-400">Update your work experience and timeline</p>
              </button>

              <button
                onClick={onEditTechStack}
                className="p-6 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              >
                <Layers size={32} className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Tech Stack</h3>
                <p className="text-gray-400">Manage your current technology stack</p>
              </button>

              <button
                onClick={onEditCategories}
                className="p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              >
                <Tag size={32} className="text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2">Categories</h3>
                <p className="text-gray-400">Manage blog post categories</p>
              </button>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Blog Posts</h2>
              <button
                onClick={onCreatePost}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                <Plus size={18} />
                <span>New Post</span>
              </button>
            </div>
            
            {posts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 text-lg mb-4">No posts yet</div>
                <button
                  onClick={onCreatePost}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Create your first post
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Media</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-700/20 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-white truncate max-w-xs">{post.title}</div>
                            <div className="text-sm text-gray-400 truncate max-w-xs">{post.excerpt}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {post.featured ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                              Featured
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            {post.images && post.images.length > 0 && (
                              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                                {post.images.length} img
                              </span>
                            )}
                            {post.videos && post.videos.length > 0 && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                                {post.videos.length} vid
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => onEditPost(post)}
                              className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                              title="Edit post"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                deleteConfirm === post.id
                                  ? 'text-red-400 bg-red-500/20 hover:bg-red-500/30'
                                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                              }`}
                              title={deleteConfirm === post.id ? 'Click again to confirm' : 'Delete post'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Personal Info</h3>
                  <button
                    onClick={onEditAbout}
                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-medium">{aboutContent.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Title</p>
                    <p className="text-white font-medium">{aboutContent.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Contact Email</p>
                    <p className="text-cyan-400">{aboutContent.contactEmail}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Social Links</h3>
                  <button
                    onClick={onEditAbout}
                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <p className="text-cyan-400 truncate">{aboutContent.socialLinks.github}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <p className="text-cyan-400 truncate">{aboutContent.socialLinks.linkedin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Instagram</p>
                    <p className="text-cyan-400 truncate">{aboutContent.socialLinks.instagram}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Skills ({skills.length})</h3>
                  <button
                    onClick={onEditSkills}
                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-cyan-400">{skill.proficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Experience ({experiences.length})</h3>
                  <button
                    onClick={onEditExperiences}
                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                  >
                    <Edit size={18} />
                  </button>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <p className="text-white font-medium">{exp.role}</p>
                      <p className="text-cyan-400 text-sm">{exp.company}</p>
                      <p className="text-gray-400 text-xs">{exp.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Blog Categories</h3>
              <button
                onClick={onEditCategories}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                <Plus size={18} />
                <span>Add Category</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span className="text-white font-medium">{category.name}</span>
                    </div>
                    <button
                      onClick={onEditCategories}
                      className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {posts.filter(p => p.category === category.name).length} posts
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tab */}
        {activeTab === 'techstack' && (
          <div className="space-y-6">
            {/* Tech Stack Categories Management */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Tech Stack Categories</h3>
                <button
                  onClick={onEditTechStackCategories}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  <Plus size={18} />
                  <span>Manage Categories</span>
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {techStackCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{category.name}</span>
                      <span className="text-xs text-gray-400">
                        {techStack.filter(t => t.category === category.value).length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Items */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Tech Stack Items</h3>
                <button
                  onClick={onEditTechStack}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  <Plus size={18} />
                  <span>Add Technology</span>
                </button>
              </div>
              
              {/* Group tech stack by category */}
              {techStackCategories.map((category) => {
                const categoryItems = techStack.filter(item => item.category === category.value);
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category.id} className="mb-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">{category.name}</h4>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:border-cyan-500/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">{item.name}</span>
                            <button
                              onClick={onEditTechStack}
                              className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                              <Edit size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;