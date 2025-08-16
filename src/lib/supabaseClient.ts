/**
 * supabaseClient.ts
 *
 * This file initializes a Supabase client for use in the browser (client-side).
 * 
 * Why do we need this?
 * - Client components (React hooks, UI interactions) run in the user's browser,
 *   so we must use a client-side Supabase instance that can handle authentication
 *   (e.g., using cookies/localStorage for session).
 * - This ensures that end-users can perform actions like login, signup, and fetching
 *   their own data securely.
 */

'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);