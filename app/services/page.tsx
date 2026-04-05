import { Code, Smartphone, Share2, Target, Camera, Video, CheckCircle, ArrowRight, Palette, Printer } from 'lucide-react';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';

export default function Services() {
  const services = [
    {
      id: 'web-development',
      icon: Code,
      title: 'Web Development',
      description: 'Build powerful, scalable websites that drive business growth and deliver exceptional user experiences.',
      features: [
        'Custom website design & development',
        'E-commerce solutions',
        'CMS integration (WordPress, Contentful)',
        'Progressive Web Apps (PWA)',
        'API development & integration',
        'Performance optimization',
      ],
      technologies: ['React', 'Next.js', 'Vue', 'Node.js', 'PHP', 'Python'],
    },
    {
      id: 'app-development',
      icon: Smartphone,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications that engage users and scale with your business.',
      features: [
        'iOS & Android native apps',
        'Cross-platform development',
        'UI/UX design for mobile',
        'App store optimization',
        'Backend & API development',
        'Maintenance & support',
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    },
    {
      id: 'social-media',
      icon: Share2,
      title: 'Social Media Management',
      description: 'Strategic social media presence that builds community, drives engagement, and grows your brand.',
      features: [
        'Content strategy & planning',
        'Daily posting & scheduling',
        'Community management',
        'Influencer partnerships',
        'Analytics & reporting',
        'Paid social advertising',
      ],
      technologies: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok'],
    },
    {
      id: 'ppc',
      icon: Target,
      title: 'PPC (Pay-Per-Click)',
      description: 'Data-driven advertising campaigns that convert clicks into customers and maximize your ROI.',
      features: [
        'Google Ads management',
        'Facebook & Instagram ads',
        'Landing page optimization',
        'A/B testing & optimization',
        'Conversion rate optimization',
        'Campaign analytics & reporting',
      ],
      technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Analytics'],
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design',
      description: 'Stunning visual design that brings your brand to life and captivates your audience.',
      features: [
        'Logo design & branding',
        'Brand identity design',
        'Illustrations',
        'Car wrap designs',
        'Mock-ups & prototypes',
        'Clothing designs',
      ],
      technologies: ['Figma', 'Adobe Creative Suite', 'Illustrator', 'Photoshop'],
    },
    {
      id: 'print',
      icon: Printer,
      title: 'Print',
      description: 'Professional print services that bring your designs to life with high-quality materials and finishes.',
      features: [
        'Business cards',
        'Stickers and labels',
        'Leaflets',
        'Booklets',
        'Stationery',
        'Calendars',
      ],
      technologies: ['Offset Printing', 'Digital Printing', 'Large Format', 'Finishing'],
    },
    {
      id: 'photography',
      icon: Camera,
      title: 'Photography',
      description: 'Professional photography that captures your brand essence and tells your story visually.',
      features: [
        'Product photography',
        'Corporate headshots',
        'Event coverage',
        'Lifestyle & brand photography',
        'Real estate photography',
        'Photo editing & retouching',
      ],
      technologies: ['Canon', 'Sony', 'Lightroom', 'Photoshop', 'Capture One'],
    },
    {
      id: 'videography',
      icon: Video,
      title: 'Videography',
      description: 'Cinematic video production that engages audiences and elevates your brand storytelling.',
      features: [
        'Commercial video production',
        'Corporate videos',
        'Social media content',
        'Event videography',
        'Animation & motion graphics',
        'Video editing & post-production',
      ],
      technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema 4D'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="relative bg-[#0c0f17] text-white py-32 pt-56 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="MdDAiHzbGGNIMsrXy7M4dBIT4Kq2tpvHBALoeteVPgY" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions designed to transform your business and drive measurable results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="flex-1">
                  <div className="bg-[#dbf72c] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="text-[#0c0f17]" size={32} />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-[#dbf72c]/20 text-[#dbf72c] px-3 py-1 rounded-full text-sm font-medium border border-[#dbf72c]/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 bg-[#dbf72c] text-[#0c0f17] px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight size={20} />
                  </Link>
                </div>

                <div className="flex-1">
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                    <h3 className="text-2xl font-bold text-white mb-6">
                      What We Offer
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="text-[#dbf72c] flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our services can help you achieve your business goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#dbf72c] text-[#0c0f17] px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
          >
            Contact Us Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
