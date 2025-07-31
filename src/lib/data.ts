import { supabase } from '@/lib/supabaseClient';
import { Mentor } from '@/types/Mentor';


export async function getAllMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase.from('mentors').select('*');
  if (error || !data) {
    throw new Error('Failed to fetch mentors');
  }
  return data;
}

export async function fetchMentorById(id: string) {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Failed to fetch mentor');
  }

  return data;
}