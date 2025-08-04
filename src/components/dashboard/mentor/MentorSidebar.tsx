// components/dashboard/MentorSidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function MentorSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/dashboard/mentor' },
    { name: 'My Bookings', href: '/dashboard/mentor/bookings' },
    { name: 'Edit Profile', href: '/dashboard/mentor/profile' },
  ];

  return (
    <div>
      <div className="mb-8 text-xl font-bold text-blue-600">Voluntime</div>
      <nav className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'block px-4 py-2 rounded-md text-sm font-medium',
              pathname === link.href
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}