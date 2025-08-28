// components/dashboard/MenteeSidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function MentorSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Bookings', href: '/dashboard/bookings' },
    { name: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <div className="h-full p-6">
      <div className="mb-8">
        {/* <h1 className="text-2xl font-bold text-blue-600">Voluntime</h1> */}
        <p className="text-sm text-gray-500 mt-1">Mentor Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
              pathname === link.href
                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
