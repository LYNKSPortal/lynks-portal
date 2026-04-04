import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';

export default function Portfolio() {
  const projects = [
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce solution with real-time inventory and seamless checkout experience.',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Stripe', 'Tailwind CSS'],
    },
    {
      id: 'fitness-tracking-app',
      title: 'Fitness Tracking App',
      category: 'App Development',
      description: 'Cross-platform mobile app helping users track workouts and achieve fitness goals.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
      tags: ['React Native', 'Firebase', 'HealthKit'],
    },
    {
      id: 'brand-campaign',
      title: 'Brand Campaign',
      category: 'Social Media',
      description: 'Viral social media campaign generating 5M+ impressions and 200K+ engagements.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      tags: ['Instagram', 'TikTok', 'Content Strategy'],
    },
    {
      id: 'saas-dashboard',
      title: 'SaaS Dashboard',
      category: 'Web Development',
      description: 'Enterprise analytics dashboard with real-time data visualization and reporting.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'D3.js', 'Node.js'],
    },
    {
      id: 'restaurant-app',
      title: 'Restaurant App',
      category: 'App Development',
      description: 'Mobile ordering and reservation system serving 50K+ monthly active users.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      tags: ['Flutter', 'GraphQL', 'Payment Integration'],
    },
    {
      id: 'product-photography',
      title: 'Product Photography',
      category: 'Photography',
      description: 'High-end product photography for luxury fashion brand catalog.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      tags: ['Studio Photography', 'Retouching', 'Catalog'],
    },
    {
      id: 'corporate-video',
      title: 'Corporate Video',
      category: 'Videography',
      description: 'Brand story video showcasing company culture and values.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
      tags: ['Corporate Video', 'Storytelling', 'Post-Production'],
    },
    {
      id: 'ppc-campaign',
      title: 'PPC Campaign',
      category: 'PPC & Design',
      description: 'Google Ads campaign achieving 450% ROI for B2B SaaS client.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Google Ads', 'Landing Pages', 'Conversion Optimization'],
    },
    {
      id: 'real-estate-platform',
      title: 'Real Estate Platform',
      category: 'Web Development',
      description: 'Property listing platform with advanced search and virtual tours.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Maps API', 'Virtual Tours'],
    },
  ];

  const categories = ['All', 'Web Development', 'App Development', 'Social Media', 'PPC & Design', 'Photography', 'Videography'];

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="relative bg-[#0c0f17] text-white py-32 pt-56 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="7VugvEYjaIOdAUwmxJtuWAWGixv028EE2BEAP641r4Xw" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest projects and see how we&apos;ve helped businesses transform their digital presence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={index}
                href={`/portfolio/${project.id}`}
                className="group bg-gray-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#dbf72c]/20 transition-all duration-300 border border-gray-800 hover:border-[#dbf72c] block"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium flex items-center gap-2">
                      View Project
                      <ExternalLink size={16} />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#dbf72c] font-semibold mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to See Your Project Here?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s create something amazing together. Get in touch to discuss your project.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#dbf72c] text-[#0c0f17] px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
}
