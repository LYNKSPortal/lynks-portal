import Link from 'next/link';
import { Code, Smartphone, Share2, Target, Palette, Printer, ArrowRight, Globe, Zap, Users } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';

export default function Home() {
  const services = [
    {
      id: 'web-development',
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites built with cutting-edge technologies for optimal performance and user experience.',
    },
    {
      id: 'app-development',
      icon: Smartphone,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications that scale from startups to enterprise.',
    },
    {
      id: 'social-media',
      icon: Share2,
      title: 'Social Media',
      description: 'Strategic social media management and content creation that drives engagement and growth.',
    },
    {
      id: 'ppc',
      icon: Target,
      title: 'PPC',
      description: 'Data-driven pay-per-click advertising campaigns that maximize your ROI and drive conversions.',
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design',
      description: 'Stunning visual design from logos to car wraps that brings your brand to life.',
    },
    {
      id: 'print',
      icon: Printer,
      title: 'Print',
      description: 'Professional print services including business cards, stickers, leaflets, and more.',
    },
  ];

  const stats = [
    { icon: Globe, value: '50+', label: 'Countries Served' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Zap, value: '1000+', label: 'Projects Delivered' },
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="relative bg-[#0c0f17] text-white overflow-hidden min-h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="gUEDogsuS802LfA74yM3eJSdHqKLVWVYAhXcQYenx00t8" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative w-full py-24 md:py-32 min-h-screen flex flex-col justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Transform Your <span className="text-[#dbf72c]">Digital</span>
              <span className="block">
                <span className="text-[#dbf72c]">Presence</span> Globally
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              World-class IT and marketing solutions. From stunning websites to viral campaigns, 
              we deliver excellence across every digital touchpoint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300 flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/portfolio"
                className="border-2 border-[#dbf72c] text-[#dbf72c] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#dbf72c] hover:text-[#0c0f17] transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <stat.icon className="mx-auto mb-4" size={40} />
                <div className="text-4xl font-bold mb-2 text-[#dbf72c]">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to elevate your brand and drive measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-[#dbf72c]/20 transition-all duration-300 border border-gray-800 hover:border-[#dbf72c] flex flex-col"
              >
                <div className="bg-[#dbf72c] w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="text-[#0c0f17]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 text-[#dbf72c] font-semibold hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#dbf72c] font-semibold text-lg hover:gap-4 transition-all"
            >
              Explore All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients worldwide who trust LYNKS for their digital success.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#dbf72c] text-[#0c0f17] px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300"
          >
            Get Started Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
