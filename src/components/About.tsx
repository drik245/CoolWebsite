import React from 'react';
import * as LucideIcons from 'lucide-react';
import { AboutContent, Skill, Experience, TechStack, TechStackCategory } from '../types';

interface AboutProps {
  aboutContent: AboutContent;
  skills: Skill[];
  experiences: Experience[];
  techStack: TechStack[];
  techStackCategories: TechStackCategory[];
}

const About: React.FC<AboutProps> = ({ aboutContent, skills, experiences, techStack, techStackCategories }) => {
  const renderIcon = (iconName: string, size = 24) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={size} /> : <LucideIcons.Code2 size={size} />;
  };

  // Group tech stack by category using the categories data
  const groupedTechStack = techStack.reduce((acc, tech) => {
    const category = techStackCategories.find(cat => cat.value === tech.category);
    const categoryName = category ? category.name : tech.category;
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(tech);
    return acc;
  }, {} as Record<string, TechStack[]>);

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {aboutContent.bio}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />
              <div className="pl-8">
                <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed whitespace-pre-line">
                  {aboutContent.journey}
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-8">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative group">
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full group-hover:scale-125 transition-transform" />
                    <div className="pl-8 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:bg-gray-800/70">
                      <h4 className="font-bold text-cyan-400 text-lg">{exp.role}</h4>
                      <p className="text-purple-400 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                      <p className="text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Skills & Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="group relative p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:bg-gray-800/70"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skill.color} mb-4 group-hover:scale-110 transition-transform`}>
                    {renderIcon(skill.icon, 24)}
                  </div>
                  <h4 className="font-semibold text-white text-lg mb-2">{skill.name}</h4>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-400 mt-1">
                    {skill.proficiency}%
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
              <h4 className="font-bold text-white text-lg mb-4">Current Tech Stack</h4>
              <div className="space-y-4">
                {Object.entries(groupedTechStack).map(([category, techs]) => (
                  <div key={category}>
                    <h5 className="text-sm font-medium text-gray-400 mb-2">{category}</h5>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech.id}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300 hover:bg-cyan-500/30 transition-colors cursor-default"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;