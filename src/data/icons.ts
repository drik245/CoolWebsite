export const skillIcons = [
  // Electronics & Communication
  'Cpu', 'Zap', 'Radio', 'Wifi', 'Antenna', 'Satellite', 'Tower', 'Signal',
  'Activity', 'BarChart3', 'TrendingUp', 'Gauge', 'Thermometer', 'Battery',
  'BatteryCharging', 'Power', 'Plug', 'Cable', 'HardDrive', 'Microchip',
  
  // Engineering & Technical
  'Settings', 'Cog', 'Wrench', 'Hammer', 'Screwdriver', 'Drill', 'Ruler',
  'Calculator', 'Compass', 'Triangle', 'Square', 'Circle', 'Hexagon',
  'Grid3x3', 'Layers', 'Component', 'Puzzle', 'Combine',
  
  // Research & Analysis
  'Microscope', 'TestTube', 'Beaker', 'FlaskConical', 'Search', 'Telescope',
  'Target', 'Focus', 'Eye', 'ScanLine', 'BarChart', 'PieChart', 'LineChart',
  'TrendingUp', 'TrendingDown', 'Activity', 'Pulse',
  
  // Communication & Networks
  'Phone', 'Smartphone', 'Tablet', 'Monitor', 'Tv', 'Radio', 'Headphones',
  'Mic', 'Speaker', 'Volume2', 'VolumeX', 'Bluetooth', 'Wifi', 'WifiOff',
  'Antenna', 'Satellite', 'Tower', 'Broadcast', 'Cast', 'Share2', 'Send',
  
  // Measurement & Testing
  'Ruler', 'Scale', 'Gauge', 'Thermometer', 'Timer', 'Clock', 'Stopwatch',
  'Calendar', 'BarChart2', 'BarChart3', 'Activity', 'Pulse', 'Waves',
  'Sine', 'Cosine', 'Function', 'Variable',
  
  // Power & Energy
  'Battery', 'BatteryCharging', 'BatteryFull', 'BatteryLow', 'Power',
  'PowerOff', 'Plug', 'Unplug', 'Cable', 'Zap', 'Lightning', 'Sun',
  'Wind', 'Flame', 'Fuel', 'Engine',
  
  // Manufacturing & Production
  'Factory', 'Building2', 'Warehouse', 'Crane', 'Truck', 'Package',
  'Box', 'Container', 'Layers', 'Stack', 'Grid3x3', 'Layout',
  
  // Medical & Biomedical Electronics
  'Heart', 'Activity', 'Pulse', 'Stethoscope', 'Cross', 'Plus',
  'Thermometer', 'Syringe', 'Pill', 'Shield', 'ShieldCheck',
  
  // Automotive & Transportation
  'Car', 'Truck', 'Bus', 'Plane', 'Ship', 'Train', 'Bike', 'Motorcycle',
  'Navigation', 'MapPin', 'Route', 'Compass', 'Fuel', 'Gauge',
  
  // Aerospace & Defense
  'Plane', 'Rocket', 'Satellite', 'Radar', 'Shield', 'Target', 'Crosshair',
  'Scope', 'Binoculars', 'Navigation', 'Compass', 'Map',
  
  // Industrial Automation
  'Settings', 'Cog', 'Gear', 'Factory', 'Building2', 'Crane', 'Conveyor',
  'Robot', 'Cpu', 'HardDrive', 'Server', 'Database', 'Network',
  
  // Environmental & Safety
  'Thermometer', 'Droplets', 'Wind', 'Sun', 'Cloud', 'CloudRain',
  'Shield', 'ShieldAlert', 'AlertTriangle', 'AlertCircle', 'Bell',
  
  // Education & Research
  'GraduationCap', 'Book', 'BookOpen', 'Library', 'School', 'Award',
  'Medal', 'Trophy', 'Star', 'Bookmark', 'NotebookPen', 'FileText',
  
  // Project Management
  'Briefcase', 'Users', 'UserCheck', 'Target', 'Flag', 'CheckCircle',
  'Clock', 'Calendar', 'Timer', 'Stopwatch', 'PlayCircle', 'PauseCircle',
  
  // Innovation & Design
  'Lightbulb', 'Zap', 'Sparkles', 'Star', 'Wand2', 'Palette', 'Brush',
  'PenTool', 'Edit', 'Scissors', 'Crop', 'Move', 'RotateCw',
  
  // Quality & Testing
  'CheckCircle', 'XCircle', 'AlertCircle', 'AlertTriangle', 'Shield',
  'ShieldCheck', 'Verified', 'Badge', 'Award', 'Medal', 'Trophy'
];

export const iconColors = [
  'from-blue-400 to-cyan-400',
  'from-green-400 to-emerald-400',
  'from-purple-400 to-pink-400',
  'from-orange-400 to-red-400',
  'from-indigo-400 to-purple-400',
  'from-teal-400 to-blue-400',
  'from-yellow-400 to-orange-400',
  'from-pink-400 to-rose-400',
  'from-cyan-400 to-teal-400',
  'from-violet-400 to-purple-400',
  'from-lime-400 to-green-400',
  'from-amber-400 to-yellow-400',
  'from-rose-400 to-pink-400',
  'from-sky-400 to-blue-400',
  'from-emerald-400 to-teal-400'
];

// Utility function to get a random color that's different from existing ones
export const getRandomColor = (existingColors: string[] = []): string => {
  const availableColors = iconColors.filter(color => !existingColors.includes(color));
  if (availableColors.length === 0) {
    // If all colors are used, return a random one
    return iconColors[Math.floor(Math.random() * iconColors.length)];
  }
  return availableColors[Math.floor(Math.random() * availableColors.length)];
};