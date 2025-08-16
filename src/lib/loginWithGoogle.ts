// lib/loginWithGoogle.ts
'use client';

import { supabase } from './supabaseClient';

export async function loginWithGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}