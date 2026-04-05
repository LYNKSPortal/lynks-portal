'use client';

import { useEffect, useState } from 'react';
import { Users, Mail, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newsletter: 0,
    contacts: 0,
    quotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [newsletterRes, contactsRes, quotesRes] = await Promise.all([
          fetch('/api/admin/newsletter'),
          fetch('/api/admin/contacts'),
          fetch('/api/admin/quotes'),
        ]);

        const newsletter = await newsletterRes.json();
        const contacts = await contactsRes.json();
        const quotes = await quotesRes.json();

        setStats({
          newsletter: newsletter.data?.length || 0,
          contacts: contacts.data?.length || 0,
          quotes: quotes.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Newsletter Subscribers',
      count: stats.newsletter,
      icon: Mail,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Contact Submissions',
      count: stats.contacts,
      icon: Users,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Quote Requests',
      count: stats.quotes,
      icon: FileText,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your LYNKS admin panel</p>
      </div>

      {loading ? (
        <div className="text-white">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-[#dbf72c] transition-colors"
            >
              <div className={`${card.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <card.icon className={card.color} size={24} />
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{card.count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
