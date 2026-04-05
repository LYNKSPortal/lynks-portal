'use client';

import { useEffect, useState } from 'react';
import { Trash2, Download } from 'lucide-react';

interface Subscriber {
  id: number;
  name: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter');
      const data = await response.json();
      setSubscribers(data.data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    try {
      const response = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Subscribed At', 'Active'];
    const rows = subscribers.map(s => [
      s.name,
      s.email,
      new Date(s.subscribed_at).toLocaleString(),
      s.is_active ? 'Yes' : 'No'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-400">Manage your newsletter subscriber list</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 bg-[#dbf72c] text-[#0c0f17] px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#dbf72c]/50 transition-all"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="text-white">Loading subscribers...</div>
      ) : subscribers.length === 0 ? (
        <div className="bg-gray-900/50 rounded-2xl p-12 border border-gray-800 text-center">
          <p className="text-gray-400">No subscribers yet</p>
        </div>
      ) : (
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Subscribed</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-white">{subscriber.name}</td>
                    <td className="px-6 py-4 text-gray-300">{subscriber.email}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.is_active 
                          ? 'bg-green-400/10 text-green-400' 
                          : 'bg-gray-400/10 text-gray-400'
                      }`}>
                        {subscriber.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-4 text-gray-400 text-sm">
        Total subscribers: {subscribers.length}
      </div>
    </div>
  );
}
