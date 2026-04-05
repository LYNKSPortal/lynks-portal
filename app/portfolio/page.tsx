import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function getProjects() {
  try {
    const dbProjects = await sql`
      SELECT * FROM portfolio_projects 
      WHERE is_published = true
      ORDER BY created_at DESC
    `;
    
    return dbProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Portfolio() {
  const dbProjects = await getProjects();
  
  // Map database projects to match the expected format
  const projects = dbProjects.map((project: any) => ({
    id: project.id.toString(),
    title: project.title,
    category: project.category,
    description: project.description || '',
    image: project.card_image_url || project.image_url || 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
    tags: project.tags || [],
  }));

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
                <div className="square-aspect">
                  <div className="relative overflow-hidden">
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
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white portfolio-card-title">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.category.split(', ').map((service: string, serviceIndex: number) => (
                      <span
                        key={serviceIndex}
                        className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-700"
                      >
                        {service}
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
