'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Code, Smartphone, Share2, Target, Camera, Video, Palette, Printer } from 'lucide-react';

export default function ServicePage() {
  const params = useParams();
  const id = params.id as string;

  const servicesData: any = {
    'web-development': {
      icon: Code,
      title: 'Web Development',
      tagline: 'Build powerful, scalable websites that drive business growth',
      description: 'Transform your digital presence with cutting-edge web development solutions. We create custom websites that are not only visually stunning but also optimized for performance, scalability, and user experience.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&h=900&fit=crop',
      overview: 'Our web development services combine modern technologies with proven methodologies to deliver websites that exceed expectations. Whether you need a simple landing page or a complex web application, our team has the expertise to bring your vision to life.',
      approach: 'We follow an agile development process, ensuring transparency and collaboration at every stage. From initial planning and design to development, testing, and deployment, we keep you involved and informed throughout the journey.',
      technologies: ['React', 'Next.js', 'Vue', 'Node.js', 'PHP', 'Python', 'WordPress', 'Shopify'],
      features: [
        'Custom website design & development',
        'E-commerce solutions',
        'CMS integration (WordPress, Contentful)',
        'Progressive Web Apps (PWA)',
        'API development & integration',
        'Performance optimization',
        'SEO optimization',
        'Responsive design',
      ],
      benefits: [
        'Increased online visibility',
        'Better user engagement',
        'Higher conversion rates',
        'Scalable infrastructure',
        'Mobile-first approach',
        'Fast loading times',
      ],
      process: [
        { step: 'Discovery', description: 'Understanding your business goals and requirements' },
        { step: 'Planning', description: 'Creating a detailed project roadmap and timeline' },
        { step: 'Design', description: 'Crafting beautiful, user-friendly interfaces' },
        { step: 'Development', description: 'Building your website with clean, efficient code' },
        { step: 'Testing', description: 'Rigorous quality assurance and bug fixing' },
        { step: 'Launch', description: 'Deploying your website and monitoring performance' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      ],
    },
    'app-development': {
      icon: Smartphone,
      title: 'App Development',
      tagline: 'Native and cross-platform mobile apps that engage users',
      description: 'Create powerful mobile applications that deliver exceptional user experiences across iOS and Android platforms. Our app development services help you reach your audience wherever they are.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=900&fit=crop',
      overview: 'We specialize in building mobile applications that are fast, reliable, and user-friendly. From concept to launch, we handle every aspect of app development, ensuring your app stands out in the crowded app marketplace.',
      approach: 'Our mobile-first approach ensures your app is optimized for performance and user experience. We use the latest technologies and best practices to create apps that users love and businesses rely on.',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS', 'GraphQL'],
      features: [
        'iOS & Android native apps',
        'Cross-platform development',
        'UI/UX design for mobile',
        'App store optimization',
        'Backend & API development',
        'Maintenance & support',
        'Push notifications',
        'In-app purchases',
      ],
      benefits: [
        'Reach mobile-first audiences',
        'Increase customer engagement',
        'Build brand loyalty',
        'Generate new revenue streams',
        'Improve customer service',
        'Gather valuable user data',
      ],
      process: [
        { step: 'Ideation', description: 'Defining your app concept and target audience' },
        { step: 'Wireframing', description: 'Creating app structure and user flows' },
        { step: 'Design', description: 'Designing beautiful, intuitive interfaces' },
        { step: 'Development', description: 'Building your app with native or cross-platform tech' },
        { step: 'Testing', description: 'Comprehensive testing on real devices' },
        { step: 'Deployment', description: 'Publishing to App Store and Google Play' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=600&fit=crop',
      ],
    },
    'social-media': {
      icon: Share2,
      title: 'Social Media Management',
      tagline: 'Build community, drive engagement, and grow your brand',
      description: 'Strategic social media management that builds authentic connections with your audience. We help you create compelling content, engage with your community, and achieve measurable results.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=900&fit=crop',
      overview: 'Social media is more than just posting content—it\'s about building relationships and creating value for your audience. Our comprehensive social media management services help you establish a strong presence across all major platforms.',
      approach: 'We develop data-driven strategies tailored to your brand and audience. From content creation to community management, we handle all aspects of your social media presence, allowing you to focus on your business.',
      technologies: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'Pinterest'],
      features: [
        'Content strategy & planning',
        'Daily posting & scheduling',
        'Community management',
        'Influencer partnerships',
        'Analytics & reporting',
        'Paid social advertising',
        'Content creation',
        'Social listening',
      ],
      benefits: [
        'Increased brand awareness',
        'Higher engagement rates',
        'More website traffic',
        'Better customer insights',
        'Improved brand loyalty',
        'Lead generation',
      ],
      process: [
        { step: 'Audit', description: 'Analyzing your current social media presence' },
        { step: 'Strategy', description: 'Developing a comprehensive content strategy' },
        { step: 'Content Creation', description: 'Creating engaging posts, images, and videos' },
        { step: 'Scheduling', description: 'Planning and scheduling content for optimal reach' },
        { step: 'Engagement', description: 'Responding to comments and messages' },
        { step: 'Reporting', description: 'Tracking metrics and optimizing performance' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=600&fit=crop',
      ],
    },
    'ppc': {
      icon: Target,
      title: 'PPC (Pay-Per-Click)',
      tagline: 'Data-driven advertising that maximizes your ROI',
      description: 'Strategic pay-per-click advertising campaigns that convert clicks into customers. We optimize every aspect of your PPC campaigns to ensure maximum return on investment.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop',
      overview: 'PPC advertising offers immediate visibility and measurable results. Our team of certified experts manages your campaigns across Google Ads, Meta Ads, and other platforms to drive qualified traffic and conversions.',
      approach: 'We use advanced targeting, compelling ad copy, and continuous optimization to ensure your ads reach the right audience at the right time. Every campaign is backed by data and focused on achieving your business goals.',
      technologies: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Google Analytics', 'Tag Manager'],
      features: [
        'Google Ads management',
        'Facebook & Instagram ads',
        'Landing page optimization',
        'A/B testing & optimization',
        'Conversion rate optimization',
        'Campaign analytics & reporting',
        'Keyword research',
        'Bid management',
      ],
      benefits: [
        'Immediate traffic and visibility',
        'Highly targeted advertising',
        'Measurable ROI',
        'Complete budget control',
        'Quick results',
        'Scalable campaigns',
      ],
      process: [
        { step: 'Research', description: 'Analyzing your market and competitors' },
        { step: 'Strategy', description: 'Developing campaign structure and targeting' },
        { step: 'Setup', description: 'Creating ads and landing pages' },
        { step: 'Launch', description: 'Launching campaigns with proper tracking' },
        { step: 'Optimization', description: 'Continuous testing and improvement' },
        { step: 'Reporting', description: 'Providing detailed performance insights' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      ],
    },
    'design': {
      icon: Palette,
      title: 'Design',
      tagline: 'Stunning visual design that captivates your audience',
      description: 'Creative design services that bring your brand to life. From logos to car wraps, we create visually stunning designs that make a lasting impression.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop',
      overview: 'Great design is more than aesthetics—it\'s about communicating your brand\'s message effectively. Our design team combines creativity with strategic thinking to deliver designs that resonate with your audience.',
      approach: 'We start by understanding your brand, target audience, and goals. Then we create designs that not only look beautiful but also serve a purpose, whether it\'s building brand recognition or driving conversions.',
      technologies: ['Figma', 'Adobe Creative Suite', 'Illustrator', 'Photoshop', 'InDesign'],
      features: [
        'Logo design & branding',
        'Brand identity design',
        'Illustrations',
        'Car wrap designs',
        'Mock-ups & prototypes',
        'Clothing designs',
        'Packaging design',
        'Marketing materials',
      ],
      benefits: [
        'Strong brand identity',
        'Professional appearance',
        'Increased brand recognition',
        'Consistent visual language',
        'Better customer perception',
        'Competitive advantage',
      ],
      process: [
        { step: 'Brief', description: 'Understanding your design requirements' },
        { step: 'Research', description: 'Analyzing your industry and competitors' },
        { step: 'Concepts', description: 'Creating initial design concepts' },
        { step: 'Refinement', description: 'Refining designs based on feedback' },
        { step: 'Finalization', description: 'Delivering final files in all formats' },
        { step: 'Guidelines', description: 'Providing brand guidelines for consistency' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=600&fit=crop',
      ],
    },
    'print': {
      icon: Printer,
      title: 'Print',
      tagline: 'Professional print services with high-quality materials',
      description: 'Bring your designs to life with our professional print services. From business cards to calendars, we deliver high-quality printed materials that make an impact.',
      image: 'https://images.unsplash.com/photo-1565022536102-b5c35c6c2f4f?w=1600&h=900&fit=crop',
      overview: 'Quality printing makes a difference. We use state-of-the-art printing technology and premium materials to ensure your printed materials look professional and leave a lasting impression.',
      approach: 'We handle everything from design to delivery. Our team ensures color accuracy, proper finishing, and timely delivery of all your print materials, whether you need 10 business cards or 10,000 leaflets.',
      technologies: ['Offset Printing', 'Digital Printing', 'Large Format', 'Finishing', 'UV Printing'],
      features: [
        'Business cards',
        'Stickers and labels',
        'Leaflets',
        'Booklets',
        'Stationery',
        'Calendars',
        'Brochures',
        'Posters',
      ],
      benefits: [
        'Professional quality',
        'Fast turnaround',
        'Competitive pricing',
        'Wide material selection',
        'Custom finishing options',
        'Reliable delivery',
      ],
      process: [
        { step: 'Consultation', description: 'Discussing your print requirements' },
        { step: 'Design', description: 'Creating or refining your print-ready files' },
        { step: 'Proofing', description: 'Reviewing digital proofs for approval' },
        { step: 'Printing', description: 'Printing with high-quality equipment' },
        { step: 'Finishing', description: 'Applying finishing touches (lamination, etc.)' },
        { step: 'Delivery', description: 'Delivering your printed materials' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1565022536102-b5c35c6c2f4f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=800&h=600&fit=crop',
      ],
    },
    'photography': {
      icon: Camera,
      title: 'Photography',
      tagline: 'Professional photography that tells your story',
      description: 'Capture your brand essence with professional photography services. From product shots to corporate events, we create images that engage and inspire.',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=900&fit=crop',
      overview: 'High-quality photography is essential for modern businesses. Our experienced photographers use professional equipment and techniques to create stunning images that showcase your products, services, and brand.',
      approach: 'We work closely with you to understand your vision and requirements. Whether it\'s a studio shoot or on-location photography, we ensure every shot meets your expectations and serves your business goals.',
      technologies: ['Canon', 'Sony', 'Lightroom', 'Photoshop', 'Capture One', 'Professional Lighting'],
      features: [
        'Product photography',
        'Corporate headshots',
        'Event coverage',
        'Lifestyle & brand photography',
        'Real estate photography',
        'Photo editing & retouching',
        'Studio photography',
        'On-location shoots',
      ],
      benefits: [
        'Professional image quality',
        'Consistent brand visuals',
        'Increased engagement',
        'Better marketing materials',
        'Enhanced online presence',
        'Versatile usage rights',
      ],
      process: [
        { step: 'Planning', description: 'Discussing your photography needs and vision' },
        { step: 'Preparation', description: 'Scouting locations and planning shots' },
        { step: 'Shoot', description: 'Capturing high-quality images' },
        { step: 'Selection', description: 'Choosing the best shots' },
        { step: 'Editing', description: 'Professional retouching and color correction' },
        { step: 'Delivery', description: 'Providing final images in required formats' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      ],
    },
    'videography': {
      icon: Video,
      title: 'Videography',
      tagline: 'Cinematic video production that elevates your brand',
      description: 'Professional video production services that engage audiences and tell compelling stories. From corporate videos to social media content, we create videos that deliver results.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop',
      overview: 'Video is the most engaging form of content. Our videography services combine creative storytelling with technical expertise to produce videos that captivate your audience and achieve your marketing goals.',
      approach: 'From concept to final edit, we handle every aspect of video production. Our team uses professional equipment and proven techniques to create videos that look great and deliver your message effectively.',
      technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema 4D', 'Professional Cameras'],
      features: [
        'Commercial video production',
        'Corporate videos',
        'Social media content',
        'Event videography',
        'Animation & motion graphics',
        'Video editing & post-production',
        'Drone footage',
        'Live streaming',
      ],
      benefits: [
        'Higher engagement rates',
        'Better message retention',
        'Increased conversions',
        'Versatile content',
        'Improved SEO',
        'Professional brand image',
      ],
      process: [
        { step: 'Pre-production', description: 'Planning, scripting, and storyboarding' },
        { step: 'Production', description: 'Filming with professional equipment' },
        { step: 'Post-production', description: 'Editing, color grading, and sound design' },
        { step: 'Review', description: 'Client feedback and revisions' },
        { step: 'Finalization', description: 'Delivering final video in all formats' },
        { step: 'Distribution', description: 'Optimizing for various platforms' },
      ],
      gallery: [
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=600&fit=crop',
      ],
    },
  };

  const service = servicesData[id] || servicesData['web-development'];
  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0c0f17]"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 text-white hover:text-[#dbf72c] transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Back to Services
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#dbf72c] w-16 h-16 rounded-2xl flex items-center justify-center">
                <ServiceIcon className="text-[#0c0f17]" size={32} />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-300 mt-2">
                  {service.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-gray-900 border-b border-gray-800">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      {/* Overview & Approach */}
      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {service.overview}
              </p>
              
              <h3 className="text-2xl font-bold text-white mb-4">Our Approach</h3>
              <p className="text-gray-300 leading-relaxed">
                {service.approach}
              </p>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-[#dbf72c]/10 to-transparent border border-[#dbf72c]/30 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Key Benefits</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-[#dbf72c] flex-shrink-0 mt-1" size={24} />
                      <span className="text-white text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Technologies */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-3xl font-bold text-white mb-6">What We Offer</h3>
              <ul className="space-y-3">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#dbf72c] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-3xl font-bold text-white mb-6">Technologies We Use</h3>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-[#dbf72c]/20 text-[#dbf72c] px-4 py-2 rounded-full font-medium border border-[#dbf72c]/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((item: any, index: number) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-[#dbf72c] transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#dbf72c] text-[#0c0f17] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-bold text-white">{item.step}</h4>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
            >
              Get In Touch
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#dbf72c] text-[#dbf72c] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#dbf72c] hover:text-[#0c0f17] transition-all duration-300"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
