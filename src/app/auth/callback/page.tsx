'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUserRoleAndRedirect = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
        return;
      }

      const userId = user.id;

      const { data: mentor } = await supabase
        .from('mentors')
        .select('id')
        .eq('id', userId)
        .single();

      if (mentor) {
        router.push('/dashboard');
        return;
      }

      const { data: mentee } = await supabase
        .from('mentees')
        .select('id')
        .eq('id', userId)
        .single();

      if (mentee) {
        router.push('/dashboard');
        return;
      }

      // 🔽 NEW — get stored role
      const storedRole = localStorage.getItem('voluntime_role');
      
      if (storedRole === 'mentor') {
        router.push('/onboarding/mentor');
      } else if (storedRole === 'mentee') {
        router.push('/onboarding/mentee');
      } else {
        router.push('/'); // fallback
      }
    };

    checkUserRoleAndRedirect();
  }, [router]);

  return <p className="text-center mt-10">Redirecting...</p>;
}