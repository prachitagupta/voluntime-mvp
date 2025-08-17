'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { loginWithGoogle } from '@/lib/loginWithGoogle';
import { logout } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let manuallyLoggedOut = false;

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!manuallyLoggedOut) {
        setUser(user);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!manuallyLoggedOut) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      manuallyLoggedOut = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    localStorage.removeItem('voluntime_role');
    await loginWithGoogle(); // Redirects to Google login
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setUser(null); // Immediately clear user to prevent flicker
    setLoading(true);

    try {
      await logout();
      setLoading(false);
      setIsLoggingOut(false);
      router.push('/'); // Optional: redirect to homepage
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
      setIsLoggingOut(false);
    }
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

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Log Out
              </button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}