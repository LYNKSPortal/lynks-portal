'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/' || pathname === '/services' || pathname === '/portfolio' || pathname === '/about' || pathname === '/contact' || pathname === '/quote';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`w-full z-50 border-b transition-colors duration-300 ${
      isHomepage 
        ? 'bg-transparent border-transparent absolute top-0 left-0 right-0' 
        : 'bg-[#0c0f17]/95 backdrop-blur-md border-gray-800'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-auto py-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-light-version.png"
              alt="LYNKS Logo"
              width={300}
              height={100}
              priority
              className="h-auto w-[300px]"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#dbf72c] transition-colors font-medium"
                style={{ fontSize: 'inherit' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://wa.me/447624000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-6 py-2 rounded-full hover:text-[#dbf72c] transition-all duration-300 font-semibold flex items-center gap-2"
              style={{ fontSize: 'inherit' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              +44 7624 000000
            </Link>
            <Link
              href="/quote"
              className="bg-[#dbf72c] text-[#0c0f17] px-6 py-2 rounded-full hover:shadow-lg hover:shadow-[#dbf72c]/50 transition-all duration-300 font-semibold"
              style={{ fontSize: 'inherit' }}
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0c0f17] border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white hover:text-[#dbf72c] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="block bg-[#dbf72c] text-[#0c0f17] px-6 py-3 rounded-full text-center font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
