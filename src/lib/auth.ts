// lib/auth.ts

// import { cookies } from 'next/headers';
// import { supabase } from './supabaseClient';

// export async function getCurrentUser() {
//   const cookieStore = cookies();
//   const token = cookieStore.get('sb-access-token')?.value;
//   if (!token) return null;

//   const { data, error } = await supabase.auth.getUser(token);
//   if (error) return null;

//   return data.user;
// }

// export async function getUserRole(): Promise<'mentor' | 'mentee' | null> {
//   const user = await getCurrentUser();
//   if (!user) return null;

//   // Example: role stored in metadata
//   return user.user_metadata?.role ?? null;
// }

export async function getUserRole(): Promise<'mentor' | 'mentee'> {
    // TODO: Replace with real auth logic (from Supabase, Clerk, Firebase, etc.)
    return 'mentee'; // or 'mentor' (hardcoded for now)
  }