import React, { useState, useEffect } from 'react';
import { Save, X, ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AboutContent, Skill, Experience, TechStack, Category, TechStackCategory } from '../types';
import { skillIcons, getRandomColor } from '../data/icons';

interface ContentEditorProps {
  type: 'about' | 'skills' | 'experiences' | 'techstack' | 'categories' | 'techstack-categories';
  aboutContent?: AboutContent;
  skills?: Skill[];
  experiences?: Experience[];
  techStack?: TechStack[];
  categories?: Category[];
  techStackCategories?: TechStackCategory[];
  onSave: (data: any) => void;
  onCancel: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  type,
  aboutContent,
  skills,
  experiences,
  techStack,
  categories,
  techStackCategories,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<any>({});
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    switch (type) {
      case 'about':
        setFormData(aboutContent || {});
        break;
      case 'skills':
        setFormData({ items: skills || [] });
        break;
      case 'experiences':
        setFormData({ items: experiences || [] });
        break;
      case 'techstack':
        setFormData({ items: techStack || [] });
        break;
      case 'categories':
        setFormData({ items: categories || [] });
        break;
      case 'techstack-categories':
        setFormData({ items: techStackCategories || [] });
        break;
    }
  }, [type, aboutContent, skills, experiences, techStack, categories, techStackCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (type === 'about') {
        await onSave(formData);
      } else {
        await onSave(formData.items);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    const newItem = getNewItemTemplate();
    setEditingItem(newItem);
  };

  const editItem = (item: any) => {
    setEditingItem({ ...item });
  };

  const saveItem = () => {
    if (!editingItem) return;

    const items = [...(formData.items || [])];
    const existingIndex = items.findIndex(item => item.id === editingItem.id);

    // Auto-assign random color for skills and categories
    if ((type === 'skills' || type === 'categories') && !editingItem.id) {
      const existingColors = items.map(item => item.color);
      editingItem.color = getRandomColor(existingColors);
    }

    // Generate unique value for tech stack categories
    if (type === 'techstack-categories' && !editingItem.id) {
      editingItem.value = editingItem.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    if (existingIndex >= 0) {
      items[existingIndex] = editingItem;
    } else {
      editingItem.id = Math.max(...items.map((item: any) => item.id || 0), 0) + 1;
      items.push(editingItem);
    }

    setFormData({ ...formData, items });
    setEditingItem(null);
  };

  const deleteItem = (id: number) => {
    const items = formData.items.filter((item: any) => item.id !== id);
    setFormData({ ...formData, items });
  };

  const getNewItemTemplate = () => {
    switch (type) {
      case 'skills':
        return { name: '', icon: 'Zap', proficiency: 80 };
      case 'experiences':
        return { role: '', company: '', period: '', description: '' };
      case 'techstack':
        return { name: '', category: techStackCategories?.[0]?.value || 'simulation' };
      case 'categories':
        return { name: '' };
      case 'techstack-categories':
        return { name: '', value: '' };
      default:
        return {};
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'about': return 'Edit About Content';
      case 'skills': return 'Manage Skills & Expertise';
      case 'experiences': return 'Manage Experience';
      case 'techstack': return 'Manage Tech Stack';
      case 'categories': return 'Manage Categories';
      case 'techstack-categories': return 'Manage Tech Stack Categories';
      default: return 'Edit Content';
    }
  };

  const renderIcon = (iconName: string, size = 20) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={size} /> : <LucideIcons.Zap size={size} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            {getTitle()}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-8">
            
            {/* About Content Form */}
            {type === 'about' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Journey</label>
                  <textarea
                    value={formData.journey || ''}
                    onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Button Label</label>
                    <input
                      type="text"
                      value={formData.contactLabel || ''}
                      onChange={(e) => setFormData({ ...formData, contactLabel: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Social Links</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                      <input
                        type="url"
                        value={formData.socialLinks?.github || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialLinks: { ...formData.socialLinks, github: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.socialLinks?.linkedin || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                      <input
                        type="url"
                        value={formData.socialLinks?.instagram || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* List-based content (skills, experiences, etc.) */}
            {type !== 'about' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {formData.items?.length || 0} {
                      type === 'experiences' ? 'Experiences' : 
                      type === 'techstack' ? 'Technologies' : 
                      type === 'techstack-categories' ? 'Categories' :
                      type
                    }
                  </h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                  >
                    <Plus size={18} />
                    <span>Add {
                      type === 'experiences' ? 'Experience' : 
                      type === 'techstack' ? 'Technology' : 
                      type === 'techstack-categories' ? 'Category' :
                      type.slice(0, -1)
                    }</span>
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {formData.items?.map((item: any) => (
                    <div key={item.id} className="p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {type === 'skills' && (
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                                {renderIcon(item.icon, 20)}
                              </div>
                              <div>
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-gray-400 text-sm">{item.proficiency}% proficiency</p>
                              </div>
                            </div>
                          )}
                          {type === 'experiences' && (
                            <div>
                              <p className="text-white font-medium">{item.role}</p>
                              <p className="text-cyan-400">{item.company}</p>
                              <p className="text-gray-400 text-sm">{item.period}</p>
                            </div>
                          )}
                          {type === 'techstack' && (
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm capitalize">{item.category.replace('-', ' ')}</p>
                            </div>
                          )}
                          {type === 'categories' && (
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`} />
                              <p className="text-white font-medium">{item.name}</p>
                            </div>
                          )}
                          {type === 'techstack-categories' && (
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">{item.value}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => editItem(item)}
                            className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all duration-300"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700/50">
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center space-x-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Item Editor Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-6">
                {editingItem.id ? 'Edit' : 'Add'} {
                  type === 'experiences' ? 'Experience' : 
                  type === 'techstack' ? 'Technology' : 
                  type === 'techstack-categories' ? 'Category' :
                  type.slice(0, -1)
                }
              </h3>

              <div className="space-y-4">
                {/* Common fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {type === 'experiences' ? 'Role' : 'Name'}
                  </label>
                  <input
                    type="text"
                    value={editingItem.name || editingItem.role || ''}
                    onChange={(e) => setEditingItem({ 
                      ...editingItem, 
                      [type === 'experiences' ? 'role' : 'name']: e.target.value 
                    })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Tech Stack Categories specific fields */}
                {type === 'techstack-categories' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Value (URL-friendly)</label>
                    <input
                      type="text"
                      value={editingItem.value || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, value: e.target.value })}
                      placeholder="e.g., simulation-software"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">Used internally for categorization</p>
                  </div>
                )}

                {/* Skills specific fields */}
                {type === 'skills' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowIconPicker(!showIconPicker)}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white flex items-center space-x-2 hover:border-cyan-500/50 transition-all"
                        >
                          {renderIcon(editingItem.icon)}
                          <span>{editingItem.icon}</span>
                        </button>
                        {showIconPicker && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-700 border border-gray-600 rounded-lg p-4 max-h-48 overflow-y-auto z-10">
                            <div className="grid grid-cols-6 gap-2">
                              {skillIcons.map((iconName) => (
                                <button
                                  key={iconName}
                                  type="button"
                                  onClick={() => {
                                    setEditingItem({ ...editingItem, icon: iconName });
                                    setShowIconPicker(false);
                                  }}
                                  className="p-2 hover:bg-gray-600 rounded transition-colors"
                                >
                                  {renderIcon(iconName, 16)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Proficiency: {editingItem.proficiency}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editingItem.proficiency || 80}
                        onChange={(e) => setEditingItem({ ...editingItem, proficiency: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </>
                )}

                {/* Experience specific fields */}
                {type === 'experiences' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        value={editingItem.company || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
                      <input
                        type="text"
                        value={editingItem.period || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={editingItem.description || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                      />
                    </div>
                  </>
                )}

                {/* Tech Stack specific fields */}
                {type === 'techstack' && techStackCategories && techStackCategories.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={editingItem.category || techStackCategories[0]?.value || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    >
                      {techStackCategories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveItem}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;