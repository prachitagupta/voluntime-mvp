'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { ReactNode } from 'react';
import MenteeSidebar from '@/components/dashboard/mentee/MenteeSidebar';
import MentorSidebar from '@/components/dashboard/mentor/MentorSidebar';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';

type UserRole = 'mentor' | 'mentee' | null;

// Create context for user role
const UserRoleContext = createContext<UserRole | null>(null);

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export default function DashboardLayoutClient({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        // First check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        const user = await getCurrentUser();
        
        if (!user) {
          setError('No authenticated user found. Please log in.');
          setLoading(false);
          return;
        }

        // Check if user is a mentor
        const { data: mentor, error: mentorError } = await supabase
          .from('mentors')
          .select('id')
          .eq('id', user.id)
          .single();

        if (mentor) {
          setRole('mentor');
        } else {
          // Check if user is a mentee
          const { data: mentee, error: menteeError } = await supabase
            .from('mentees')
            .select('id')
            .eq('id', user.id)
            .single();

          if (mentee) {
            setRole('mentee');
          } else {
            setError('User profile not found. Please complete your profile setup.');
          }
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setError('Error detecting user role. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Authentication Required</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <p className="text-sm text-red-600 mb-4">
            You need to sign in to access the dashboard. Please use the login button in the header.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">Profile Setup Required</h2>
          <p className="text-yellow-700 mb-4">Your account is authenticated but your profile is not yet set up.</p>
          <p className="text-sm text-yellow-600 mb-4">
            Please complete your profile to access the dashboard.
          </p>
          <div className="space-y-2">
            <button 
              onClick={() => window.location.href = '/onboarding/mentee'}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Complete Profile
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <UserRoleContext.Provider value={role}>
      <div className="absolute top-16 left-0 right-0 bottom-0 flex bg-gray-50">
        <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
          {role === 'mentor' ? <MentorSidebar /> : <MenteeSidebar />}
        </aside>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </UserRoleContext.Provider>
  );
}
