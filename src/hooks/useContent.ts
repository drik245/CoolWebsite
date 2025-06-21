import { useState, useEffect } from 'react';
import { AboutContent, Skill, Experience, TechStack, Category, TechStackCategory } from '../types';
import { supabase } from '../lib/supabase';
import { getRandomColor } from '../data/icons';

export const useContent = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    name: '',
    title: '',
    bio: '',
    journey: '',
    contactEmail: '',
    contactLabel: 'Get In Touch',
    socialLinks: { github: '', linkedin: '', instagram: '' }
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [techStackCategories, setTechStackCategories] = useState<TechStackCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      await Promise.all([
        fetchAboutContent(),
        fetchSkills(),
        fetchExperiences(),
        fetchTechStack(),
        fetchCategories(),
        fetchTechStackCategories()
      ]);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAboutContent = async () => {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching about content:', error);
      return;
    }

    if (data) {
      setAboutContent({
        name: data.name,
        title: data.title,
        bio: data.bio,
        journey: data.journey,
        contactEmail: data.contact_email,
        contactLabel: data.contact_label,
        socialLinks: {
          github: data.github_url || '',
          linkedin: data.linkedin_url || '',
          instagram: data.instagram_url || ''
        }
      });
    }
  };

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching skills:', error);
      return;
    }

    if (data) {
      setSkills(data.map(skill => ({
        id: skill.id,
        name: skill.name,
        icon: skill.icon,
        color: skill.color,
        proficiency: skill.proficiency
      })));
    }
  };

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching experiences:', error);
      return;
    }

    if (data) {
      setExperiences(data.map(exp => ({
        id: exp.id,
        role: exp.role,
        company: exp.company,
        period: exp.period,
        description: exp.description
      })));
    }
  };

  const fetchTechStack = async () => {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching tech stack:', error);
      return;
    }

    if (data) {
      setTechStack(data.map(tech => ({
        id: tech.id,
        name: tech.name,
        category: tech.category
      })));
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }

    if (data) {
      setCategories(data.map(cat => ({
        id: cat.id,
        name: cat.name,
        color: cat.color
      })));
    }
  };

  const fetchTechStackCategories = async () => {
    const { data, error } = await supabase
      .from('tech_stack_categories')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching tech stack categories:', error);
      return;
    }

    if (data) {
      setTechStackCategories(data.map(cat => ({
        id: cat.id,
        name: cat.name,
        value: cat.value
      })));
    }
  };

  const updateAboutContent = async (content: AboutContent) => {
    try {
      const { error } = await supabase
        .from('about_content')
        .update({
          name: content.name,
          title: content.title,
          bio: content.bio,
          journey: content.journey,
          contact_email: content.contactEmail,
          contact_label: content.contactLabel,
          github_url: content.socialLinks.github,
          linkedin_url: content.socialLinks.linkedin,
          instagram_url: content.socialLinks.instagram,
          updated_at: new Date().toISOString()
        })
        .eq('id', (await supabase.from('about_content').select('id').single()).data?.id);

      if (error) throw error;

      setAboutContent(content);
    } catch (error) {
      console.error('Error updating about content:', error);
      throw error;
    }
  };

  const updateSkills = async (newSkills: Skill[]) => {
    try {
      // Delete all existing skills
      await supabase.from('skills').delete().neq('id', 0);

      // Insert new skills with random colors
      const skillsToInsert = newSkills.map(skill => ({
        name: skill.name,
        icon: skill.icon,
        color: skill.color || getRandomColor(),
        proficiency: skill.proficiency
      }));

      const { data, error } = await supabase
        .from('skills')
        .insert(skillsToInsert)
        .select();

      if (error) throw error;

      if (data) {
        setSkills(data.map(skill => ({
          id: skill.id,
          name: skill.name,
          icon: skill.icon,
          color: skill.color,
          proficiency: skill.proficiency
        })));
      }
    } catch (error) {
      console.error('Error updating skills:', error);
      throw error;
    }
  };

  const updateExperiences = async (newExperiences: Experience[]) => {
    try {
      // Delete all existing experiences
      await supabase.from('experiences').delete().neq('id', 0);

      // Insert new experiences
      const experiencesToInsert = newExperiences.map(exp => ({
        role: exp.role,
        company: exp.company,
        period: exp.period,
        description: exp.description
      }));

      const { data, error } = await supabase
        .from('experiences')
        .insert(experiencesToInsert)
        .select();

      if (error) throw error;

      if (data) {
        setExperiences(data.map(exp => ({
          id: exp.id,
          role: exp.role,
          company: exp.company,
          period: exp.period,
          description: exp.description
        })));
      }
    } catch (error) {
      console.error('Error updating experiences:', error);
      throw error;
    }
  };

  const updateTechStack = async (newTechStack: TechStack[]) => {
    try {
      // Delete all existing tech stack items
      await supabase.from('tech_stack').delete().neq('id', 0);

      // Insert new tech stack items
      const techStackToInsert = newTechStack.map(tech => ({
        name: tech.name,
        category: tech.category
      }));

      const { data, error } = await supabase
        .from('tech_stack')
        .insert(techStackToInsert)
        .select();

      if (error) throw error;

      if (data) {
        setTechStack(data.map(tech => ({
          id: tech.id,
          name: tech.name,
          category: tech.category
        })));
      }
    } catch (error) {
      console.error('Error updating tech stack:', error);
      throw error;
    }
  };

  const updateCategories = async (newCategories: Category[]) => {
    try {
      // Delete all existing categories
      await supabase.from('categories').delete().neq('id', 0);

      // Insert new categories with random colors
      const categoriesToInsert = newCategories.map(cat => ({
        name: cat.name,
        color: cat.color || getRandomColor()
      }));

      const { data, error } = await supabase
        .from('categories')
        .insert(categoriesToInsert)
        .select();

      if (error) throw error;

      if (data) {
        setCategories(data.map(cat => ({
          id: cat.id,
          name: cat.name,
          color: cat.color
        })));
      }
    } catch (error) {
      console.error('Error updating categories:', error);
      throw error;
    }
  };

  const updateTechStackCategories = async (newTechStackCategories: TechStackCategory[]) => {
    try {
      // Delete all existing tech stack categories
      await supabase.from('tech_stack_categories').delete().neq('id', 0);

      // Insert new tech stack categories
      const categoriesToInsert = newTechStackCategories.map(cat => ({
        name: cat.name,
        value: cat.value
      }));

      const { data, error } = await supabase
        .from('tech_stack_categories')
        .insert(categoriesToInsert)
        .select();

      if (error) throw error;

      if (data) {
        setTechStackCategories(data.map(cat => ({
          id: cat.id,
          name: cat.name,
          value: cat.value
        })));
      }
    } catch (error) {
      console.error('Error updating tech stack categories:', error);
      throw error;
    }
  };

  return {
    aboutContent,
    skills,
    experiences,
    techStack,
    categories,
    techStackCategories,
    loading,
    updateAboutContent,
    updateSkills,
    updateExperiences,
    updateTechStack,
    updateCategories,
    updateTechStackCategories,
    refetch: fetchAllContent
  };
};