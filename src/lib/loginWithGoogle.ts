// lib/loginWithGoogle.ts
'use client';

import { supabase } from './supabaseClient';

export async function loginWithGoogle() {
  const redirectTo = typeof window !== 'undefined' && window.location.origin
    ? `${window.location.origin}/auth/callback`
    : 'https://voluntime-mvp.vercel.app/auth/callback';


  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTo,
    },
  });
}