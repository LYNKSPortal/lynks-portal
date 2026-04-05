'use client';

import { useState, FormEvent } from 'react';
import { Calendar, Clock, Video, Phone, MessageSquare } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';

export default function BookAMeeting() {
  const [activeTab, setActiveTab] = useState<'online' | 'callback'>('online');
  const [onlineFormData, setOnlineFormData] = useState({
    name: '',
    email: '',
    phone: '',
    platform: 'zoom',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [callbackFormData, setCallbackFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'GMT',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleOnlineSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'online', ...onlineFormData }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Meeting request submitted successfully! We\'ll contact you shortly to confirm.');
        setOnlineFormData({
          name: '',
          email: '',
          phone: '',
          platform: 'zoom',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to submit request');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit request. Please try again.');
    }
  };

  const handleCallbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'callback', ...callbackFormData }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Call back request submitted successfully! We\'ll call you at your preferred time.');
        setCallbackFormData({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          timezone: 'GMT',
          message: ''
        });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to submit request');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      {/* Hero Section */}
      <section className="relative bg-[#0c0f17] text-white py-32 pt-56 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <HeroVideo playbackId="7VugvEYjaIOdAUwmxJtuWAWGixv028EE2BEAP641r4Xw" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Book a Meeting</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Choose how you&apos;d like to connect with us - schedule an online meeting or request a call back at your convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Selection */}
      <section className="py-12 bg-gray-900 border-b border-gray-800">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('online')}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'online'
                  ? 'bg-[#dbf72c] text-[#0c0f17]'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Video size={20} />
              Online Meeting
            </button>
            <button
              onClick={() => setActiveTab('callback')}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'callback'
                  ? 'bg-[#dbf72c] text-[#0c0f17]'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Phone size={20} />
              Request Call Back
            </button>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-20 bg-[#0c0f17]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'online' ? (
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="text-center mb-8">
                <Video size={48} className="mx-auto mb-4 text-[#dbf72c]" />
                <h2 className="text-3xl font-bold text-white mb-4">Schedule an Online Meeting</h2>
                <p className="text-gray-400">
                  Book a video call with us via Zoom, WhatsApp, or your preferred platform
                </p>
              </div>

              <form onSubmit={handleOnlineSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={onlineFormData.name}
                      onChange={(e) => setOnlineFormData({ ...onlineFormData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={onlineFormData.email}
                      onChange={(e) => setOnlineFormData({ ...onlineFormData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={onlineFormData.phone}
                    onChange={(e) => setOnlineFormData({ ...onlineFormData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="+44 1234 567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Platform *
                  </label>
                  <select
                    value={onlineFormData.platform}
                    onChange={(e) => setOnlineFormData({ ...onlineFormData, platform: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  >
                    <option value="zoom">Zoom</option>
                    <option value="whatsapp">WhatsApp Video</option>
                    <option value="teams">Microsoft Teams</option>
                    <option value="google-meet">Google Meet</option>
                    <option value="other">Other (specify in message)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={onlineFormData.preferredDate}
                      onChange={(e) => setOnlineFormData({ ...onlineFormData, preferredDate: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      value={onlineFormData.preferredTime}
                      onChange={(e) => setOnlineFormData({ ...onlineFormData, preferredTime: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={onlineFormData.message}
                    onChange={(e) => setOnlineFormData({ ...onlineFormData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="Tell us what you'd like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#dbf72c]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting...' : 'Schedule Meeting'}
                </button>

                {message && (
                  <p className={`text-center ${status === 'success' ? 'text-[#dbf72c]' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="text-center mb-8">
                <Phone size={48} className="mx-auto mb-4 text-[#dbf72c]" />
                <h2 className="text-3xl font-bold text-white mb-4">Request a Call Back</h2>
                <p className="text-gray-400">
                  Let us know when works best for you, and we&apos;ll call you back
                </p>
              </div>

              <form onSubmit={handleCallbackSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={callbackFormData.name}
                      onChange={(e) => setCallbackFormData({ ...callbackFormData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={callbackFormData.email}
                      onChange={(e) => setCallbackFormData({ ...callbackFormData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={callbackFormData.phone}
                    onChange={(e) => setCallbackFormData({ ...callbackFormData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="+44 1234 567890"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={callbackFormData.preferredDate}
                      onChange={(e) => setCallbackFormData({ ...callbackFormData, preferredDate: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      value={callbackFormData.preferredTime}
                      onChange={(e) => setCallbackFormData({ ...callbackFormData, preferredTime: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Timezone *
                  </label>
                  <select
                    value={callbackFormData.timezone}
                    onChange={(e) => setCallbackFormData({ ...callbackFormData, timezone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  >
                    <option value="GMT">GMT (London)</option>
                    <option value="EST">EST (New York)</option>
                    <option value="PST">PST (Los Angeles)</option>
                    <option value="CET">CET (Paris)</option>
                    <option value="IST">IST (India)</option>
                    <option value="AEST">AEST (Sydney)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={callbackFormData.message}
                    onChange={(e) => setCallbackFormData({ ...callbackFormData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="Tell us what you'd like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#dbf72c] text-[#0c0f17] px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#dbf72c]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Call Back'}
                </button>

                {message && (
                  <p className={`text-center ${status === 'success' ? 'text-[#dbf72c]' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
