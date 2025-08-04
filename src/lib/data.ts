import { supabase } from '@/lib/supabaseClient';
import { Mentee } from '@/types/Mentee';
import { Mentor } from '@/types/Mentor';
import { BookingRow } from '@/types/Booking';

export async function getAllMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase.from('mentors').select('*');
  if (error || !data) {
    throw new Error('Failed to fetch mentors');
  }
  return data;
}

export async function getMentorById(id: string): Promise<Mentor | null> {
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

export async function getMenteeById(id: string): Promise<Mentee | null> {
  const { data, error } = await supabase
  .from('mentees')
  .select('*')
  .eq('id', id)
  .single();
  
  if (error) throw new Error(error.message);
  return data;
}

export const getBookingsByMenteeId = async (menteeId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, topic, date_time, status, mentors:mentor_id (full_name)')
    .eq('mentee_id', menteeId);

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  return (data as unknown as BookingRow[]).map((b) => ({
    id: b.id,
    topic: b.topic,
    date_time: b.date_time,
    status: b.status,
    mentorName: b.mentors?.full_name || 'Unknown Mentor',
  }));
};