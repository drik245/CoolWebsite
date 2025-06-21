/*
  # Portfolio Database Schema

  1. New Tables
    - `about_content` - Stores personal information and bio
    - `skills` - Skills and expertise with proficiency levels
    - `experiences` - Work experience timeline
    - `tech_stack` - Current technology stack
    - `categories` - Blog post categories
    - `tech_stack_categories` - Categories for organizing tech stack
    - `blog_posts` - Blog posts with content and media

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access

  3. Features
    - Support for images and videos in blog posts
    - Flexible category system for both blog and tech stack
    - Rich content support with proper data types
*/

-- About Content Table
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  journey text NOT NULL DEFAULT '',
  contact_email text NOT NULL DEFAULT '',
  contact_label text NOT NULL DEFAULT 'Get In Touch',
  github_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  instagram_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id serial PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Zap',
  color text NOT NULL DEFAULT 'from-blue-400 to-cyan-400',
  proficiency integer NOT NULL DEFAULT 80 CHECK (proficiency >= 0 AND proficiency <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id serial PRIMARY KEY,
  role text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tech Stack Categories Table
CREATE TABLE IF NOT EXISTS tech_stack_categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  value text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tech Stack Table
CREATE TABLE IF NOT EXISTS tech_stack (
  id serial PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL REFERENCES tech_stack_categories(value) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories Table (for blog posts)
CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  color text NOT NULL DEFAULT 'from-blue-400 to-cyan-400',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id serial PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL REFERENCES categories(name) ON DELETE CASCADE,
  read_time integer NOT NULL DEFAULT 5,
  featured boolean NOT NULL DEFAULT false,
  images text[] DEFAULT '{}',
  videos text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read about content"
  ON about_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read experiences"
  ON experiences FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read tech stack categories"
  ON tech_stack_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read tech stack"
  ON tech_stack FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin write policies (authenticated users can modify)
CREATE POLICY "Authenticated can modify about content"
  ON about_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can modify skills"
  ON skills FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can modify experiences"
  ON experiences FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can modify tech stack categories"
  ON tech_stack_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can modify tech stack"
  ON tech_stack FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can modify categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can modify blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default data
INSERT INTO about_content (name, title, bio, journey, contact_email, contact_label, github_url, linkedin_url, instagram_url) VALUES (
  'Drik',
  'Aspiring Engineer',
  'I''m a passionate Electronics & Communication Engineer who thrives at the intersection of hardware and innovation, designing systems that connect and empower the world.',
  'My journey in Electronics and Communication Engineering began over 4 years ago when I discovered the fascinating world of signals, circuits, and communication systems. What started as curiosity about how electronic devices work evolved into a deep passion for designing cutting-edge communication systems and embedded solutions.

I specialize in RF design, signal processing, embedded systems, and wireless communication technologies. My approach focuses on innovative circuit design, efficient signal processing algorithms, and robust communication protocols.

When I''m not working on circuit designs, you''ll find me exploring the latest in 5G technology, IoT systems, experimenting with antenna designs, or contributing to open-source hardware projects that make communication technology more accessible and efficient.',
  'hello@example.com',
  'Get In Touch',
  'https://github.com',
  'https://linkedin.com',
  'https://instagram.com'
) ON CONFLICT DO NOTHING;

-- Insert default tech stack categories
INSERT INTO tech_stack_categories (name, value) VALUES
  ('Simulation Software', 'simulation'),
  ('PCB Design Tools', 'pcb-design'),
  ('RF Simulation', 'rf-simulation'),
  ('Instrumentation', 'instrumentation'),
  ('Test Equipment', 'test-equipment'),
  ('Microcontrollers', 'microcontrollers'),
  ('Programming Languages', 'programming'),
  ('CAD Tools', 'cad-tools'),
  ('Communication Protocols', 'communication-protocols'),
  ('FPGA Tools', 'fpga-tools'),
  ('Measurement Tools', 'measurement-tools'),
  ('Power Electronics', 'power-electronics'),
  ('Antenna Design', 'antenna-design'),
  ('IoT Platforms', 'iot-platforms'),
  ('Automotive Systems', 'automotive'),
  ('Medical Devices', 'medical-devices')
ON CONFLICT (value) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, color) VALUES
  ('Circuit Design', 'from-blue-400 to-cyan-400'),
  ('RF Engineering', 'from-purple-400 to-pink-400'),
  ('Signal Processing', 'from-green-400 to-emerald-400'),
  ('Embedded Systems', 'from-orange-400 to-red-400'),
  ('Communication Systems', 'from-indigo-400 to-purple-400'),
  ('Project Updates', 'from-teal-400 to-blue-400')
ON CONFLICT (name) DO NOTHING;

-- Insert default skills
INSERT INTO skills (name, icon, color, proficiency) VALUES
  ('Circuit Design', 'Zap', 'from-blue-400 to-cyan-400', 90),
  ('Signal Processing', 'Activity', 'from-green-400 to-emerald-400', 85),
  ('RF Engineering', 'Radio', 'from-purple-400 to-pink-400', 80),
  ('Embedded Systems', 'Cpu', 'from-orange-400 to-red-400', 88),
  ('Communication Systems', 'Antenna', 'from-indigo-400 to-purple-400', 92),
  ('PCB Design', 'Layers', 'from-teal-400 to-blue-400', 75)
ON CONFLICT DO NOTHING;

-- Insert default experiences
INSERT INTO experiences (role, company, period, description) VALUES
  ('Senior RF Engineer', 'TelecomTech Solutions', '2022 - Present', 'Leading RF system design and optimization for 5G communication infrastructure and IoT applications.'),
  ('Electronics Design Engineer', 'Innovation Electronics', '2020 - 2022', 'Designed and developed embedded systems for automotive and industrial automation applications.'),
  ('Communication Systems Engineer', 'SignalWave Corp', '2018 - 2020', 'Implemented digital signal processing algorithms and communication protocols for wireless systems.')
ON CONFLICT DO NOTHING;

-- Insert default tech stack
INSERT INTO tech_stack (name, category) VALUES
  ('MATLAB', 'simulation'),
  ('Simulink', 'simulation'),
  ('Altium Designer', 'pcb-design'),
  ('KiCad', 'pcb-design'),
  ('HFSS', 'rf-simulation'),
  ('CST Studio', 'rf-simulation'),
  ('LabVIEW', 'instrumentation'),
  ('Oscilloscope', 'test-equipment'),
  ('Spectrum Analyzer', 'test-equipment'),
  ('ARM Cortex', 'microcontrollers'),
  ('Arduino', 'microcontrollers'),
  ('Raspberry Pi', 'microcontrollers')
ON CONFLICT DO NOTHING;

-- Insert default blog posts
INSERT INTO blog_posts (title, excerpt, content, category, read_time, featured, images, videos) VALUES
  ('Designing Next-Generation 5G Antenna Arrays', 'Exploring advanced beamforming techniques and MIMO antenna design for enhanced 5G communication systems.', 'The evolution of 5G technology demands sophisticated antenna designs that can handle massive data throughput while maintaining signal integrity. In this post, I''ll walk through the design process of a 28 GHz antenna array, covering simulation techniques, fabrication considerations, and real-world testing results.

Key topics covered:
- Beamforming algorithms and their implementation
- MIMO antenna spacing optimization
- RF simulation using HFSS and CST Studio
- Practical considerations for PCB antenna design

The results show a 15% improvement in signal-to-noise ratio compared to conventional designs.', 'RF Engineering', 8, true, '{}', '{}'),
  ('IoT Sensor Network Design for Smart Cities', 'Building robust wireless sensor networks using LoRaWAN and implementing efficient power management strategies.', 'Smart city applications require reliable, low-power sensor networks that can operate for years without maintenance. This project demonstrates the design and deployment of a city-wide environmental monitoring system.

Project highlights:
- LoRaWAN network topology optimization
- Ultra-low power circuit design
- Solar energy harvesting implementation
- Real-time data processing and visualization

The deployed network achieved 99.2% uptime over 6 months of operation.', 'Embedded Systems', 6, true, '{}', '{}'),
  ('Advanced Signal Processing for Radar Applications', 'Implementing digital signal processing algorithms for automotive radar systems with enhanced target detection.', 'Modern automotive radar systems require sophisticated signal processing to distinguish between multiple targets in complex environments. This post explores advanced DSP techniques for improved target detection and classification.

Technical details:
- FMCW radar signal processing
- Doppler shift analysis
- Machine learning for target classification
- Real-time implementation on ARM Cortex processors

The implemented system achieved 95% accuracy in vehicle detection under various weather conditions.', 'Signal Processing', 7, false, '{}', '{}'),
  ('PCB Design Best Practices for High-Frequency Circuits', 'Essential guidelines for designing PCBs that maintain signal integrity at microwave frequencies.', 'High-frequency PCB design requires careful consideration of transmission line effects, impedance matching, and electromagnetic interference. This comprehensive guide covers the essential techniques for successful RF PCB design.

Key topics:
- Controlled impedance design
- Via stitching and ground plane optimization
- Component placement strategies
- EMI/EMC considerations
- Testing and validation techniques

Following these guidelines resulted in a 40% reduction in signal loss at 10 GHz.', 'Circuit Design', 10, false, '{}', '{}')
ON CONFLICT DO NOTHING;