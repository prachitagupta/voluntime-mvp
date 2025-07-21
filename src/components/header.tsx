'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo or Site Name */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Voluntime
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link href="/mentors" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Browse Mentors
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-blue-700"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}