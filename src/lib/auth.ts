// src/lib/auth.ts
'use client';

import { supabase } from '@/lib/supabaseClient';

export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Exception in getCurrentUser:', error);
    return null;
  }
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/';
}