import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Designing Next-Generation 5G Antenna Arrays",
    excerpt: "Exploring advanced beamforming techniques and MIMO antenna design for enhanced 5G communication systems.",
    content: "The evolution of 5G technology demands sophisticated antenna designs that can handle massive data throughput while maintaining signal integrity. In this post, I'll walk through the design process of a 28 GHz antenna array, covering simulation techniques, fabrication considerations, and real-world testing results.\n\nKey topics covered:\n- Beamforming algorithms and their implementation\n- MIMO antenna spacing optimization\n- RF simulation using HFSS and CST Studio\n- Practical considerations for PCB antenna design\n\nThe results show a 15% improvement in signal-to-noise ratio compared to conventional designs.",
    date: "2024-01-15",
    category: "RF Engineering",
    readTime: 8,
    featured: true
  },
  {
    id: 2,
    title: "IoT Sensor Network Design for Smart Cities",
    excerpt: "Building robust wireless sensor networks using LoRaWAN and implementing efficient power management strategies.",
    content: "Smart city applications require reliable, low-power sensor networks that can operate for years without maintenance. This project demonstrates the design and deployment of a city-wide environmental monitoring system.\n\nProject highlights:\n- LoRaWAN network topology optimization\n- Ultra-low power circuit design\n- Solar energy harvesting implementation\n- Real-time data processing and visualization\n\nThe deployed network achieved 99.2% uptime over 6 months of operation.",
    date: "2024-01-10",
    category: "Embedded Systems",
    readTime: 6,
    featured: true
  },
  {
    id: 3,
    title: "Advanced Signal Processing for Radar Applications",
    excerpt: "Implementing digital signal processing algorithms for automotive radar systems with enhanced target detection.",
    content: "Modern automotive radar systems require sophisticated signal processing to distinguish between multiple targets in complex environments. This post explores advanced DSP techniques for improved target detection and classification.\n\nTechnical details:\n- FMCW radar signal processing\n- Doppler shift analysis\n- Machine learning for target classification\n- Real-time implementation on ARM Cortex processors\n\nThe implemented system achieved 95% accuracy in vehicle detection under various weather conditions.",
    date: "2024-01-05",
    category: "Signal Processing",
    readTime: 7,
    featured: false
  },
  {
    id: 4,
    title: "PCB Design Best Practices for High-Frequency Circuits",
    excerpt: "Essential guidelines for designing PCBs that maintain signal integrity at microwave frequencies.",
    content: "High-frequency PCB design requires careful consideration of transmission line effects, impedance matching, and electromagnetic interference. This comprehensive guide covers the essential techniques for successful RF PCB design.\n\nKey topics:\n- Controlled impedance design\n- Via stitching and ground plane optimization\n- Component placement strategies\n- EMI/EMC considerations\n- Testing and validation techniques\n\nFollowing these guidelines resulted in a 40% reduction in signal loss at 10 GHz.",
    date: "2023-12-28",
    category: "Circuit Design",
    readTime: 10,
    featured: false
  }
];