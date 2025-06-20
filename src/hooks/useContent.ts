import { useState, useEffect } from 'react';
import { AboutContent, Skill, Experience, TechStack, Category, TechStackCategory } from '../types';
import { 
  defaultAboutContent, 
  defaultSkills, 
  defaultExperiences, 
  defaultTechStack,
  defaultCategories,
  defaultTechStackCategories
} from '../data/defaultContent';

export const useContent = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [techStack, setTechStack] = useState<TechStack[]>(defaultTechStack);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [techStackCategories, setTechStackCategories] = useState<TechStackCategory[]>(defaultTechStackCategories);

  useEffect(() => {
    // Load content from localStorage
    const savedAbout = localStorage.getItem('aboutContent');
    const savedSkills = localStorage.getItem('skills');
    const savedExperiences = localStorage.getItem('experiences');
    const savedTechStack = localStorage.getItem('techStack');
    const savedCategories = localStorage.getItem('categories');
    const savedTechStackCategories = localStorage.getItem('techStackCategories');

    if (savedAbout) {
      try {
        setAboutContent(JSON.parse(savedAbout));
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    }

    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills));
      } catch (error) {
        console.error('Error loading skills:', error);
      }
    }

    if (savedExperiences) {
      try {
        setExperiences(JSON.parse(savedExperiences));
      } catch (error) {
        console.error('Error loading experiences:', error);
      }
    }

    if (savedTechStack) {
      try {
        setTechStack(JSON.parse(savedTechStack));
      } catch (error) {
        console.error('Error loading tech stack:', error);
      }
    }

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

    if (savedTechStackCategories) {
      try {
        setTechStackCategories(JSON.parse(savedTechStackCategories));
      } catch (error) {
        console.error('Error loading tech stack categories:', error);
      }
    }
  }, []);

  const updateAboutContent = (content: AboutContent) => {
    setAboutContent(content);
    localStorage.setItem('aboutContent', JSON.stringify(content));
  };

  const updateSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
    localStorage.setItem('skills', JSON.stringify(newSkills));
  };

  const updateExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    localStorage.setItem('experiences', JSON.stringify(newExperiences));
  };

  const updateTechStack = (newTechStack: TechStack[]) => {
    setTechStack(newTechStack);
    localStorage.setItem('techStack', JSON.stringify(newTechStack));
  };

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const updateTechStackCategories = (newTechStackCategories: TechStackCategory[]) => {
    setTechStackCategories(newTechStackCategories);
    localStorage.setItem('techStackCategories', JSON.stringify(newTechStackCategories));
  };

  return {
    aboutContent,
    skills,
    experiences,
    techStack,
    categories,
    techStackCategories,
    updateAboutContent,
    updateSkills,
    updateExperiences,
    updateTechStack,
    updateCategories,
    updateTechStackCategories
  };
};