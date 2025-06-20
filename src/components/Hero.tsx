import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Code, Zap, Instagram } from 'lucide-react';
import { AboutContent } from '../types';

interface HeroProps {
  aboutContent: AboutContent;
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ aboutContent, onNavigate }) => {
  const [typedText, setTypedText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const phrases = [
    aboutContent.title || 'Creative Technologist',
    'Digital Artist',
    'Tech Enthusiast',
    'Problem Solver',
    'Just a curious human'
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const phrase = phrases[currentPhrase];
    
    if (typedText.length < phrase.length) {
      timeout = setTimeout(() => {
        setTypedText(phrase.substring(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [typedText, currentPhrase, phrases]);

  const handleContactClick = () => {
    if (aboutContent.socialLinks?.instagram) {
      window.open(aboutContent.socialLinks.instagram, '_blank');
    } else {
      window.open(`mailto:${aboutContent.contactEmail}`, '_blank');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Glowing orb effect */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Hello, I'm {aboutContent.name}
          </h1>
          
          <div className="h-12 mb-8">
            <p className="text-2xl md:text-3xl text-gray-300">
              I'm a{' '}
              <span className="text-cyan-400 font-semibold relative">
                {typedText}
                <span className="animate-ping absolute -right-1 top-0 text-cyan-400">|</span>
              </span>
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {aboutContent.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onNavigate('about')}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <Code size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Explore My Work</span>
          </button>
          
          <button
            onClick={handleContactClick}
            className="group px-8 py-4 border-2 border-cyan-500/50 rounded-lg font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Zap size={20} className="group-hover:scale-110 transition-transform" />
            <span>{aboutContent.contactLabel || 'Get In Touch'}</span>
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          {aboutContent.socialLinks?.github && (
            <a
              href={aboutContent.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          )}
          {aboutContent.socialLinks?.linkedin && (
            <a
              href={aboutContent.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          )}
          {aboutContent.socialLinks?.instagram && (
            <a
              href={aboutContent.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          )}
          {aboutContent.contactEmail && (
            <a
              href={`mailto:${aboutContent.contactEmail}`}
              className="group p-3 rounded-full border border-gray-700 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          )}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => onNavigate('about')}
          className="animate-bounce text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <ChevronDown size={32} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-1/3 right-16 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-40" />
      <div className="absolute bottom-1/4 left-20 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-50" />
      <div className="absolute bottom-1/3 right-10 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-spin opacity-30" style={{ animationDuration: '8s' }} />
    </section>
  );
};

export default Hero;
