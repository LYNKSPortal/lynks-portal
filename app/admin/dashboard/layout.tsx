'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Mail, FileText, LogOut, LayoutDashboard, Briefcase } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0c0f17] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0c0f17]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <div className="mb-2">
            <img src="/logo-light-version.png" alt="LYNKS" className="h-10 w-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#dbf72c]">LYNKS Admin</h1>
          </div>
          <p className="text-gray-400 text-sm">Welcome, {session.user?.name}</p>
        </div>

        <nav className="px-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#dbf72c] transition-colors"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/dashboard/newsletter"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#dbf72c] transition-colors"
          >
            <Mail size={20} />
            <span>Newsletter</span>
          </Link>
          <Link
            href="/admin/dashboard/contacts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#dbf72c] transition-colors"
          >
            <Users size={20} />
            <span>Contacts</span>
          </Link>
          <Link
            href="/admin/dashboard/quotes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#dbf72c] transition-colors"
          >
            <FileText size={20} />
            <span>Quotes</span>
          </Link>
          <Link
            href="/admin/dashboard/portfolio"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-[#dbf72c] transition-colors"
          >
            <Briefcase size={20} />
            <span>Portfolio</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
