'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote request submitted:', formData);
  };

  const services = [
    'Web Development',
    'App Development',
    'Social Media Management',
    'PPC & Design',
    'Photography',
    'Videography',
    'Full Digital Package',
    'Other',
  ];

  const budgets = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not Sure',
  ];

  const timelines = [
    'ASAP',
    '1-2 months',
    '3-6 months',
    '6+ months',
    'Flexible',
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      <section className="relative bg-[#0c0f17] text-white py-32 pt-56 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="LLggAWTn3TwchZ6dRq92reOpDJliQtBsfklpcPWgyAQ" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get a Quote</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Tell us about your project and we&apos;ll provide you with a detailed quote tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-8">
              Project Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

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
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
                  >
                    <option value="">Select your budget</option>
                    {budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all"
                  >
                    <option value="">Select timeline</option>
                    {timelines.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-[#dbf72c] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#dbf72c]/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Submit Quote Request
                <Send size={20} />
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center">
              <CheckCircle className="mx-auto mb-4 text-[#dbf72c]" size={40} />
              <h3 className="text-xl font-bold text-white mb-2">Fast Response</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll get back to you within 24 hours with a detailed quote
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center">
              <CheckCircle className="mx-auto mb-4 text-[#dbf72c]" size={40} />
              <h3 className="text-xl font-bold text-white mb-2">No Obligation</h3>
              <p className="text-gray-400 text-sm">
                Free quotes with no commitment required
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 text-center">
              <CheckCircle className="mx-auto mb-4 text-[#dbf72c]" size={40} />
              <h3 className="text-xl font-bold text-white mb-2">Transparent Pricing</h3>
              <p className="text-gray-400 text-sm">
                Clear breakdown of costs with no hidden fees
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
