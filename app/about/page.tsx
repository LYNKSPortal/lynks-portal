import { Globe, Users, Award, Target, Heart, Zap } from 'lucide-react';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering solutions that exceed expectations.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our team is passionate about technology and creating meaningful digital experiences.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with clients as partners to achieve shared success.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative solutions to stay ahead.',
    },
  ];

  const stats = [
    { number: '50+', label: 'Countries Served' },
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
      name: 'David Kim',
      role: 'Head of Development',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="relative bg-[#0c0f17] text-white py-32 pt-56 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="RWDou02QSyKnxYN0101T01KdhBajqZ5mkvYtHwWRXzuBbaw" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About LYNKS</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              A global team of digital experts passionate about transforming businesses through technology and creativity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-400">
                <p>
                  Founded with a vision to bridge the gap between technology and business success, 
                  LYNKS has grown from a small startup to a global digital agency serving clients 
                  across 50+ countries.
                </p>
                <p>
                  Our journey began with a simple belief: every business deserves access to 
                  world-class digital solutions. Today, we&apos;re proud to have helped hundreds of 
                  companies transform their digital presence and achieve remarkable growth.
                </p>
                <p>
                  From cutting-edge web development to stunning visual content, our multidisciplinary 
                  team brings together expertise across all aspects of digital marketing and technology. 
                  We don&apos;t just build websites and apps—we create experiences that drive real business results.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and client success.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-[#dbf72c] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-2xl p-8 text-center border border-gray-800 hover:border-[#dbf72c] transition-all duration-300"
              >
                <div className="bg-[#dbf72c] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-[#0c0f17]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="mx-auto mb-6" size={64} />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Global Reach, Local Expertise
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            With clients spanning 50+ countries, we bring international experience 
            combined with personalized service to every project.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#dbf72c] text-[#0c0f17] px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
          >
            Join Our Success Story
          </a>
        </div>
      </section>
    </div>
  );
}
