'use client';

import { useEffect, useState } from 'react';
import { Trash2, Eye } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  submitted_at: string;
  status: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      const data = await response.json();
      setContacts(data.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Submissions</h1>
        <p className="text-gray-400">Manage contact form submissions</p>
      </div>

      {loading ? (
        <div className="text-white">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-gray-900/50 rounded-2xl p-12 border border-gray-800 text-center">
          <p className="text-gray-400">No contact submissions yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full">
                <thead className="bg-gray-800/50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {contacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      className={`hover:bg-gray-800/30 transition-colors cursor-pointer ${
                        selectedContact?.id === contact.id ? 'bg-gray-800/50' : ''
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{contact.name}</div>
                        <div className="text-gray-400 text-sm">{contact.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          contact.status === 'new' ? 'bg-blue-400/10 text-blue-400' :
                          contact.status === 'contacted' ? 'bg-green-400/10 text-green-400' :
                          'bg-gray-400/10 text-gray-400'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
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
            {selectedContact ? (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <p className="text-white">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div>
                      <label className="text-sm text-gray-400">Company</label>
                      <p className="text-white">{selectedContact.company}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-400">Message</label>
                    <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Submitted</label>
                    <p className="text-white">{new Date(selectedContact.submitted_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Status</label>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#dbf72c]"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                Select a contact to view details
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-gray-400 text-sm">
        Total contacts: {contacts.length}
      </div>
    </div>
  );
}
