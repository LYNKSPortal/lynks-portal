'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  budget_range: string | null;
  project_description: string | null;
  timeline: string | null;
  submitted_at: string;
  status: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();
      setQuotes(data.data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote request?')) return;

    try {
      const response = await fetch(`/api/admin/quotes?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuotes(quotes.filter(q => q.id !== id));
        if (selectedQuote?.id === id) setSelectedQuote(null);
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q));
        if (selectedQuote?.id === id) {
          setSelectedQuote({ ...selectedQuote, status });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Quote Requests</h1>
        <p className="text-gray-400">Manage quote requests from potential clients</p>
      </div>

      {loading ? (
        <div className="text-white">Loading quotes...</div>
      ) : quotes.length === 0 ? (
        <div className="bg-gray-900/50 rounded-2xl p-12 border border-gray-800 text-center">
          <p className="text-gray-400">No quote requests yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full">
                <thead className="bg-gray-800/50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Client</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {quotes.map((quote) => (
                    <tr 
                      key={quote.id} 
                      className={`hover:bg-gray-800/30 transition-colors cursor-pointer ${
                        selectedQuote?.id === quote.id ? 'bg-gray-800/50' : ''
                      }`}
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{quote.name}</div>
                        <div className="text-gray-400 text-sm">{quote.company || 'No company'}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{quote.service_type || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          quote.status === 'new' ? 'bg-blue-400/10 text-blue-400' :
                          quote.status === 'quoted' ? 'bg-yellow-400/10 text-yellow-400' :
                          quote.status === 'accepted' ? 'bg-green-400/10 text-green-400' :
                          'bg-gray-400/10 text-gray-400'
                        }`}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(quote.id);
                          }}
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

          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
            {selectedQuote ? (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Quote Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedQuote.email}</p>
                  </div>
                  {selectedQuote.phone && (
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <p className="text-white">{selectedQuote.phone}</p>
                    </div>
                  )}
                  {selectedQuote.company && (
                    <div>
                      <label className="text-sm text-gray-400">Company</label>
                      <p className="text-white">{selectedQuote.company}</p>
                    </div>
                  )}
                  {selectedQuote.service_type && (
                    <div>
                      <label className="text-sm text-gray-400">Service Type</label>
                      <p className="text-white">{selectedQuote.service_type}</p>
                    </div>
                  )}
                  {selectedQuote.budget_range && (
                    <div>
                      <label className="text-sm text-gray-400">Budget Range</label>
                      <p className="text-white">{selectedQuote.budget_range}</p>
                    </div>
                  )}
                  {selectedQuote.timeline && (
                    <div>
                      <label className="text-sm text-gray-400">Timeline</label>
                      <p className="text-white">{selectedQuote.timeline}</p>
                    </div>
                  )}
                  {selectedQuote.project_description && (
                    <div>
                      <label className="text-sm text-gray-400">Project Description</label>
                      <p className="text-white whitespace-pre-wrap">{selectedQuote.project_description}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-400">Submitted</label>
                    <p className="text-white">{new Date(selectedQuote.submitted_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Status</label>
                    <select
                      value={selectedQuote.status}
                      onChange={(e) => updateStatus(selectedQuote.id, e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#dbf72c]"
                    >
                      <option value="new">New</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="quoted">Quoted</option>
                      <option value="accepted">Accepted</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                Select a quote to view details
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-gray-400 text-sm">
        Total quote requests: {quotes.length}
      </div>
    </div>
  );
}
