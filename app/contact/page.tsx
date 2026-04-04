'use client';

import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';
import HeroVideo from '@/components/HeroVideo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@lynks.com',
      link: 'mailto:hello@lynks.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (234) 567-890',
      link: 'tel:+1234567890',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Serving clients worldwide',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM - 6PM',
      link: '#',
    },
  ];

  const services = [
    'Web Development',
    'App Development',
    'Social Media Management',
    'PPC & Design',
    'Photography',
    'Videography',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="relative bg-[#0c0f17] text-white py-32 pt-56 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="ZIXHiVIQRFw7C1Z1cWDDV585JpCX4AO702hn4j4NDpxQ" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your project? We&apos;d love to hear from you. Let&apos;s create something amazing together.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-[#dbf72c] bg-[#0c0f17] text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#dbf72c] to-[#dbf72c] rounded-2xl p-8 text-[#0c0f17] border-2 border-[#dbf72c]">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                    >
                      <div className="bg-[#0c0f17]/20 p-3 rounded-lg">
                        <info.icon size={24} />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">{info.title}</div>
                        <div className="text-[#0c0f17]/80">{info.details}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Why Choose LYNKS?
                </h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#dbf72c] mt-1">✓</span>
                    <span>15+ years of industry experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dbf72c] mt-1">✓</span>
                    <span>500+ satisfied clients worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dbf72c] mt-1">✓</span>
                    <span>Award-winning creative team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dbf72c] mt-1">✓</span>
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dbf72c] mt-1">✓</span>
                    <span>Transparent pricing & timelines</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prefer to Chat?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation call to discuss your project in detail.
            </p>
            <button className="bg-[#dbf72c] text-[#0c0f17] px-10 py-5 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
