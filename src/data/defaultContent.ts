import { AboutContent, Skill, Experience, TechStack, Category, TechStackCategory } from '../types';

export const defaultAboutContent: AboutContent = {
  name: 'Alex',
  title: 'Electronics & Communication Engineer',
  bio: "I'm a passionate Electronics & Communication Engineer who thrives at the intersection of hardware and innovation, designing systems that connect and empower the world.",
  journey: "My journey in Electronics and Communication Engineering began over 4 years ago when I discovered the fascinating world of signals, circuits, and communication systems. What started as curiosity about how electronic devices work evolved into a deep passion for designing cutting-edge communication systems and embedded solutions.\n\nI specialize in RF design, signal processing, embedded systems, and wireless communication technologies. My approach focuses on innovative circuit design, efficient signal processing algorithms, and robust communication protocols.\n\nWhen I'm not working on circuit designs, you'll find me exploring the latest in 5G technology, IoT systems, experimenting with antenna designs, or contributing to open-source hardware projects that make communication technology more accessible and efficient.",
  contactEmail: 'hello@example.com',
  contactLabel: 'Get In Touch',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  }
};

export const defaultSkills: Skill[] = [
  { id: 1, name: 'Circuit Design', icon: 'Zap', color: 'from-blue-400 to-cyan-400', proficiency: 90 },
  { id: 2, name: 'Signal Processing', icon: 'Activity', color: 'from-green-400 to-emerald-400', proficiency: 85 },
  { id: 3, name: 'RF Engineering', icon: 'Radio', color: 'from-purple-400 to-pink-400', proficiency: 80 },
  { id: 4, name: 'Embedded Systems', icon: 'Cpu', color: 'from-orange-400 to-red-400', proficiency: 88 },
  { id: 5, name: 'Communication Systems', icon: 'Antenna', color: 'from-indigo-400 to-purple-400', proficiency: 92 },
  { id: 6, name: 'PCB Design', icon: 'Layers', color: 'from-teal-400 to-blue-400', proficiency: 75 }
];

export const defaultExperiences: Experience[] = [
  {
    id: 1,
    role: 'Senior RF Engineer',
    company: 'TelecomTech Solutions',
    period: '2022 - Present',
    description: 'Leading RF system design and optimization for 5G communication infrastructure and IoT applications.'
  },
  {
    id: 2,
    role: 'Electronics Design Engineer',
    company: 'Innovation Electronics',
    period: '2020 - 2022',
    description: 'Designed and developed embedded systems for automotive and industrial automation applications.'
  },
  {
    id: 3,
    role: 'Communication Systems Engineer',
    company: 'SignalWave Corp',
    period: '2018 - 2020',
    description: 'Implemented digital signal processing algorithms and communication protocols for wireless systems.'
  }
];

export const defaultTechStack: TechStack[] = [
  { id: 1, name: 'MATLAB', category: 'simulation' },
  { id: 2, name: 'Simulink', category: 'simulation' },
  { id: 3, name: 'Altium Designer', category: 'pcb-design' },
  { id: 4, name: 'KiCad', category: 'pcb-design' },
  { id: 5, name: 'HFSS', category: 'rf-simulation' },
  { id: 6, name: 'CST Studio', category: 'rf-simulation' },
  { id: 7, name: 'LabVIEW', category: 'instrumentation' },
  { id: 8, name: 'Oscilloscope', category: 'test-equipment' },
  { id: 9, name: 'Spectrum Analyzer', category: 'test-equipment' },
  { id: 10, name: 'ARM Cortex', category: 'microcontrollers' },
  { id: 11, name: 'Arduino', category: 'microcontrollers' },
  { id: 12, name: 'Raspberry Pi', category: 'microcontrollers' }
];

export const defaultCategories: Category[] = [
  { id: 1, name: 'Circuit Design', color: 'from-blue-400 to-cyan-400' },
  { id: 2, name: 'RF Engineering', color: 'from-purple-400 to-pink-400' },
  { id: 3, name: 'Signal Processing', color: 'from-green-400 to-emerald-400' },
  { id: 4, name: 'Embedded Systems', color: 'from-orange-400 to-red-400' },
  { id: 5, name: 'Communication Systems', color: 'from-indigo-400 to-purple-400' },
  { id: 6, name: 'Project Updates', color: 'from-teal-400 to-blue-400' }
];

export const defaultTechStackCategories: TechStackCategory[] = [
  { id: 1, name: 'Simulation Software', value: 'simulation' },
  { id: 2, name: 'PCB Design Tools', value: 'pcb-design' },
  { id: 3, name: 'RF Simulation', value: 'rf-simulation' },
  { id: 4, name: 'Instrumentation', value: 'instrumentation' },
  { id: 5, name: 'Test Equipment', value: 'test-equipment' },
  { id: 6, name: 'Microcontrollers', value: 'microcontrollers' },
  { id: 7, name: 'Programming Languages', value: 'programming' },
  { id: 8, name: 'CAD Tools', value: 'cad-tools' },
  { id: 9, name: 'Communication Protocols', value: 'communication-protocols' },
  { id: 10, name: 'FPGA Tools', value: 'fpga-tools' },
  { id: 11, name: 'Measurement Tools', value: 'measurement-tools' },
  { id: 12, name: 'Power Electronics', value: 'power-electronics' },
  { id: 13, name: 'Antenna Design', value: 'antenna-design' },
  { id: 14, name: 'IoT Platforms', value: 'iot-platforms' },
  { id: 15, name: 'Automotive Systems', value: 'automotive' },
  { id: 16, name: 'Medical Devices', value: 'medical-devices' }
];