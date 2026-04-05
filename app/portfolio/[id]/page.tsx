import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Tag, CheckCircle } from 'lucide-react';
import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';

const sql = neon(process.env.DATABASE_URL!);

async function getProject(id: string) {
  try {
    const projects = await sql`
      SELECT * FROM portfolio_projects 
      WHERE id = ${id} AND is_published = true
    `;
    
    return projects[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dbProject = await getProject(id);
  
  if (!dbProject) {
    notFound();
  }

  // Fallback hardcoded projects for backward compatibility
  const hardcodedProjects = [
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce solution with real-time inventory and seamless checkout experience.',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1600&h=900&fit=crop',
      tags: ['Web Development', 'Design', 'Photography'],
      client: 'RetailCo',
      date: 'March 2024',
      duration: '3 months',
      overview: 'We partnered with RetailCo to build a cutting-edge e-commerce platform that handles thousands of daily transactions. The platform features real-time inventory management, personalized product recommendations, and a streamlined checkout process that increased conversion rates by 45%.',
      challenge: 'The client needed a scalable solution that could handle high traffic during peak shopping seasons while maintaining fast load times and a smooth user experience across all devices.',
      solution: 'We implemented a headless commerce architecture using Next.js for the frontend and a robust backend API. We integrated Stripe for secure payments, implemented advanced caching strategies, and optimized images for fast loading.',
      results: [
        '45% increase in conversion rate',
        '60% faster page load times',
        '99.9% uptime during peak seasons',
        '200% increase in mobile transactions',
      ],
      features: [
        'Real-time inventory management',
        'Personalized product recommendations',
        'One-click checkout',
        'Advanced search and filtering',
        'Wishlist and favorites',
        'Order tracking and notifications',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      ],
    },
    {
      id: 'fitness-tracking-app',
      title: 'Fitness Tracking App',
      category: 'App Development',
      description: 'Cross-platform mobile app helping users track workouts and achieve fitness goals.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&h=900&fit=crop',
      tags: ['App Development', 'Design', 'Social Media'],
      client: 'FitLife',
      date: 'February 2024',
      duration: '4 months',
      overview: 'FitLife approached us to create a comprehensive fitness tracking application that would help users monitor their workouts, nutrition, and progress towards their fitness goals.',
      challenge: 'Creating a seamless cross-platform experience while integrating with native health APIs on both iOS and Android platforms.',
      solution: 'Built with React Native for cross-platform compatibility, integrated with HealthKit and Google Fit, and implemented Firebase for real-time data synchronization.',
      results: [
        '50,000+ downloads in first month',
        '4.8 star rating on app stores',
        '85% user retention rate',
        'Featured in App Store',
      ],
      features: [
        'Workout tracking and logging',
        'Nutrition and calorie tracking',
        'Progress photos and measurements',
        'Custom workout plans',
        'Social sharing and challenges',
        'Integration with wearables',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
      ],
    },
    {
      id: 'brand-campaign',
      title: 'Brand Campaign',
      category: 'Social Media',
      description: 'Viral social media campaign generating 5M+ impressions and 200K+ engagements.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=900&fit=crop',
      tags: ['Social Media', 'Design', 'Videography'],
      client: 'TrendyBrand',
      date: 'January 2024',
      duration: '2 months',
      overview: 'TrendyBrand wanted to launch a new product line with a viral social media campaign that would resonate with Gen Z and millennial audiences.',
      challenge: 'Creating authentic, engaging content that would stand out in crowded social media feeds and drive both awareness and conversions.',
      solution: 'Developed a multi-platform content strategy featuring user-generated content, influencer partnerships, and interactive challenges that encouraged audience participation.',
      results: [
        '5M+ total impressions',
        '200K+ engagements',
        '50K+ user-generated posts',
        '300% increase in brand awareness',
      ],
      features: [
        'Multi-platform content strategy',
        'Influencer partnerships',
        'User-generated content campaigns',
        'Interactive challenges',
        'Real-time engagement monitoring',
        'Performance analytics',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=600&fit=crop',
      ],
    },
  ];

  // Map database project to expected format
  const project = {
    id: dbProject.id.toString(),
    title: dbProject.title,
    category: dbProject.category,
    description: dbProject.description || '',
    image: dbProject.image_url || 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1600&h=900&fit=crop',
    tags: dbProject.tags || [],
    client: dbProject.client || 'Client',
    date: dbProject.project_date || 'Recent',
    duration: dbProject.duration || 'N/A',
    overview: dbProject.overview || dbProject.description || '',
    challenge: dbProject.challenge || '',
    solution: dbProject.solution || '',
    results: dbProject.results ? dbProject.results.split('\n').filter((r: string) => r.trim()) : [],
    features: dbProject.features || [],
    gallery: dbProject.gallery_urls || [],
  };

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      {/* Hero Section with Full-Width Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{ objectPosition: 'center center' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0c0f17]"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-white hover:text-[#dbf72c] transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.category.split(', ').map((service: string, index: number) => (
                <span key={index} className="bg-[#dbf72c] text-[#0c0f17] px-4 py-1 rounded-full text-sm font-semibold">
                  {service}
                </span>
              ))}
              {project.tags.map((tag: string, tagIndex: number) => (
                <span key={tagIndex} className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="bg-gray-900 border-y border-gray-800">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="text-gray-400 text-sm mb-1">Client</div>
              <div className="text-white font-semibold text-lg">{project.client}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Date</div>
              <div className="text-white font-semibold text-lg flex items-center justify-center md:justify-start gap-2">
                <Calendar size={18} className="text-[#dbf72c]" />
                {project.date}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Duration</div>
              <div className="text-white font-semibold text-lg">{project.duration}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Business Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {project.overview}
              </p>
              
              <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                {project.challenge}
              </p>
              
              <h3 className="text-2xl font-bold text-white mb-4">Our Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-[#dbf72c]/10 to-transparent border border-[#dbf72c]/30 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Key Results</h3>
                <ul className="space-y-4">
                  {project.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-[#dbf72c] flex-shrink-0 mt-1" size={24} />
                      <span className="text-white text-lg font-medium">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">Features Delivered</h3>
                <ul className="space-y-3">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#dbf72c] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image: string, index: number) => (
              <div key={index} className="relative h-80 rounded-2xl overflow-hidden group">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create something amazing together. Get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
            >
              Get In Touch
              <ExternalLink size={20} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#dbf72c] text-[#dbf72c] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#dbf72c] hover:text-[#0c0f17] transition-all duration-300"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
