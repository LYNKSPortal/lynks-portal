'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  client: string;
  project_date: string;
  duration: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  features: string[];
  gallery_urls: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function PortfolioManagement() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image_url: '',
    card_image_url: '',
    tags: '',
    client: '',
    project_date: '',
    duration: '',
    overview: '',
    challenge: '',
    solution: '',
    results: '',
    features: '',
    gallery_urls: '',
    is_published: false,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadingCard, setUploadingCard] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const services = [
    'Web Development',
    'Mobile Apps',
    'Social Media Management',
    'PPC',
    'Design',
    'Photography',
    'Videography',
    'Print',
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !currentStatus }),
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description || '',
      image_url: project.image_url || '',
      card_image_url: (project as any).card_image_url || '',
      tags: project.tags?.join(', ') || '',
      client: project.client || '',
      project_date: project.project_date || '',
      duration: project.duration || '',
      overview: project.overview || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || '',
      features: project.features?.join(', ') || '',
      gallery_urls: project.gallery_urls?.join(', ') || '',
      is_published: project.is_published,
    });
    setSelectedServices(project.category ? project.category.split(', ') : []);
    setShowForm(true);
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Starting image upload...', file.name);
    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      console.log('Upload response:', data);
      
      if (!response.ok) {
        console.error('Upload error:', data);
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
        return;
      }
      
      if (data.secure_url) {
        console.log('Setting image URL to:', data.secure_url);
        setFormData(prev => {
          const updated = { ...prev, image_url: data.secure_url };
          console.log('Updated formData:', updated);
          return updated;
        });
      } else {
        console.error('No secure_url in response:', data);
        alert('Failed to get image URL');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleCardImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Starting card image upload...', file.name);
    setUploadingCard(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      console.log('Upload response:', data);
      
      if (!response.ok) {
        console.error('Upload error:', data);
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
        return;
      }
      
      if (data.secure_url) {
        console.log('Setting card image URL to:', data.secure_url);
        setFormData(prev => {
          const updated = { ...prev, card_image_url: data.secure_url };
          console.log('Updated formData:', updated);
          return updated;
        });
      } else {
        console.error('No secure_url in response:', data);
        alert('Failed to get image URL');
      }
    } catch (error) {
      console.error('Error uploading card image:', error);
      alert('Failed to upload card image');
    } finally {
      setUploadingCard(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    console.log('Starting gallery upload...', files.length, 'files');
    setUploadingGallery(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const data = await response.json();
        
        if (response.ok && data.secure_url) {
          uploadedUrls.push(data.secure_url);
          console.log(`Uploaded ${i + 1}/${files.length}:`, data.secure_url);
        } else {
          console.error(`Failed to upload ${file.name}:`, data);
        }
      }

      if (uploadedUrls.length > 0) {
        const currentUrls = formData.gallery_urls ? formData.gallery_urls.split(',').map(u => u.trim()).filter(u => u) : [];
        const allUrls = [...currentUrls, ...uploadedUrls];
        setFormData(prev => ({
          ...prev,
          gallery_urls: allUrls.join(', ')
        }));
        console.log('Gallery updated with', uploadedUrls.length, 'new images');
      }
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      alert('Failed to upload some images');
    } finally {
      setUploadingGallery(false);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    const projectData = {
      ...formData,
      category: selectedServices.join(', '),
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
      gallery_urls: formData.gallery_urls ? formData.gallery_urls.split(',').map(u => u.trim()) : [],
    };

    console.log('Submitting project data:', projectData);
    console.log('Image URL:', formData.image_url);

    try {
      const isEditing = editingProject !== null;
      const url = '/api/admin/portfolio';
      const method = isEditing ? 'PATCH' : 'POST';
      const body = isEditing 
        ? JSON.stringify({ id: editingProject.id, ...projectData })
        : JSON.stringify(projectData);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (response.ok) {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
          title: '',
          category: '',
          description: '',
          image_url: '',
          card_image_url: '',
          tags: '',
          client: '',
          project_date: '',
          duration: '',
          overview: '',
          challenge: '',
          solution: '',
          results: '',
          features: '',
          gallery_urls: '',
          is_published: false,
        });
        setSelectedServices([]);
        fetchProjects();
      } else {
        const error = await response.json();
        alert(`Failed to ${isEditing ? 'update' : 'create'} project: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`Error ${editingProject ? 'updating' : 'creating'} project:`, error);
      alert(`Failed to ${editingProject ? 'update' : 'create'} project. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-400">Loading projects...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#dbf72c] text-black rounded-lg hover:bg-[#c5e028] transition-colors font-semibold"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="text-gray-400 text-sm mb-1">Total Projects</div>
          <div className="text-3xl font-bold text-white">{projects.length}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="text-gray-400 text-sm mb-1">Published</div>
          <div className="text-3xl font-bold text-[#dbf72c]">
            {projects.filter(p => p.is_published).length}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="text-gray-400 text-sm mb-1">Drafts</div>
          <div className="text-3xl font-bold text-orange-400">
            {projects.filter(p => !p.is_published).length}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No projects found. Create your first project to get started.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.image_url && (
                          <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-white">{project.title}</div>
                          <div className="text-sm text-gray-400 line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{project.client || '-'}</td>
                    <td className="px-6 py-4 text-gray-300">{project.project_date || '-'}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublished(project.id, project.is_published)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          project.is_published
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                        }`}
                      >
                        {project.is_published ? (
                          <>
                            <Eye size={14} />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-gray-400 hover:text-[#dbf72c] hover:bg-gray-800 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* 1. Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                />
              </div>

              {/* 2. Services */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Services Used * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:border-[#dbf72c] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#dbf72c] focus:ring-[#dbf72c]"
                      />
                      <span className="text-sm text-gray-300">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                />
              </div>

              {/* 4. Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image *
                </label>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#dbf72c] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#dbf72c] file:text-black file:font-semibold hover:file:bg-[#c5e028] file:cursor-pointer"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      Upload a high-quality image for your project (recommended: 1200x800px)
                    </p>
                  </div>
                  {uploading && (
                    <div className="flex items-center justify-center gap-2 text-[#dbf72c]">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#dbf72c]"></div>
                      <p className="text-sm">Uploading to Cloudinary...</p>
                    </div>
                  )}
                  {formData.image_url && (
                    <div className="relative">
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-lg border-2 border-[#dbf72c]"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image_url: '' })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 5. Portfolio Card Image */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Portfolio Card Image *
                </label>
                <p className="text-sm text-gray-400 mb-3">
                  This image appears on the portfolio listing page as the card thumbnail
                </p>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#dbf72c] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCardImageUpload}
                      disabled={uploadingCard}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#dbf72c] file:text-black file:font-semibold hover:file:bg-[#c5e028] file:cursor-pointer"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      Upload card image (recommended: 600x400px)
                    </p>
                  </div>
                  {uploadingCard && (
                    <div className="flex items-center justify-center gap-2 text-[#dbf72c]">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#dbf72c]"></div>
                      <p className="text-sm">Uploading card image...</p>
                    </div>
                  )}
                  {formData.card_image_url && (
                    <div className="relative">
                      <img 
                        src={formData.card_image_url} 
                        alt="Card Preview" 
                        className="w-full h-48 object-cover rounded-lg border-2 border-[#dbf72c]"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, card_image_url: '' })}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Client, Date, Duration */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="e.g., Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.project_date}
                    onChange={(e) => setFormData({ ...formData, project_date: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="e.g., 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>

              {/* 6. Business Overview */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Overview
                </label>
                <textarea
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  placeholder="Describe the business overview..."
                />
              </div>

              {/* 7. The Challenge */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  The Challenge
                </label>
                <textarea
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  placeholder="What challenges did the project face?"
                />
              </div>

              {/* 8. Our Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Our Solution
                </label>
                <textarea
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  placeholder="How did you solve the challenges?"
                />
              </div>

              {/* 9. Key Results */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Key Results
                </label>
                <textarea
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  placeholder="List key results (one per line)&#10;e.g.&#10;45% increase in conversion rate&#10;60% faster page load times"
                />
              </div>

              {/* 10. Features Delivered */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features Delivered (comma-separated)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                  placeholder="Real-time inventory, Personalized recommendations, One-click checkout"
                />
              </div>

              {/* 11. Project Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Gallery
                </label>
                <div className="space-y-3">
                  <textarea
                    value={formData.gallery_urls}
                    onChange={(e) => setFormData({ ...formData, gallery_urls: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c]"
                    placeholder="Paste image URLs (comma-separated)"
                  />
                  <p className="text-sm text-gray-400 text-center">OR</p>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#dbf72c] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryUpload}
                      disabled={uploadingGallery}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#dbf72c] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#dbf72c] file:text-black file:font-semibold hover:file:bg-[#c5e028] file:cursor-pointer"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      Upload multiple images for the project gallery
                    </p>
                  </div>
                  {uploadingGallery && (
                    <div className="flex items-center justify-center gap-2 text-[#dbf72c]">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#dbf72c]"></div>
                      <p className="text-sm">Uploading gallery images...</p>
                    </div>
                  )}
                  {formData.gallery_urls && (
                    <div className="grid grid-cols-3 gap-3">
                      {formData.gallery_urls.split(',').map((url, index) => {
                        const trimmedUrl = url.trim();
                        if (!trimmedUrl) return null;
                        return (
                          <div key={index} className="relative">
                            <img 
                              src={trimmedUrl} 
                              alt={`Gallery ${index + 1}`} 
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-700"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const urls = formData.gallery_urls.split(',').map(u => u.trim()).filter((u, i) => i !== index);
                                setFormData({ ...formData, gallery_urls: urls.join(', ') });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#dbf72c] focus:ring-[#dbf72c]"
                  />
                  <span className="text-sm text-gray-300">Publish immediately</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#dbf72c] text-black rounded-lg hover:bg-[#c5e028] transition-colors font-semibold"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProject(null);
                    setFormData({
                      title: '',
                      category: '',
                      description: '',
                      image_url: '',
                      card_image_url: '',
                      tags: '',
                      client: '',
                      project_date: '',
                      duration: '',
                      overview: '',
                      challenge: '',
                      solution: '',
                      results: '',
                      features: '',
                      gallery_urls: '',
                      is_published: false,
                    });
                    setSelectedServices([]);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
