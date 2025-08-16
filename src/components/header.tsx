'use client';

import Link from 'next/link';
import { loginWithGoogle } from '@/lib/loginWithGoogle';

export default function Header() {

  const handleLogin = async () => {
    localStorage.removeItem('voluntime_role'); // Ensure no leftover signup role
    await loginWithGoogle(); // This redirects to Google login
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-6 py-4 flex justify-between items-center">
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
          <button
      onClick={handleLogin}
      className="text-sm font-medium text-gray-600 hover:text-blue-700"
    >
      Log In
    </button>
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