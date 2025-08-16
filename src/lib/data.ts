import { supabase } from '@/lib/supabaseClient';
import { Mentee } from '@/types/Mentee';
import { Mentor } from '@/types/Mentor';
import { MenteeBooking, MentorBooking } from '@/types/Booking';

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
    // Handle "not found" errors gracefully
    if (error.code === 'PGRST116') {
      return null; // Mentor not found
    }
    console.error('Error fetching mentor:', error);
    return null; // Return null instead of throwing
  }

  return data;
}

export async function getMenteeById(id: string): Promise<Mentee | null> {
  const { data, error } = await supabase
  .from('mentees')
  .select('*')
  .eq('id', id)
  .single();
  
  if (error) {
    // Handle "not found" errors gracefully
    if (error.code === 'PGRST116') {
      return null; // Mentee not found
    }
    console.error('Error fetching mentee:', error);
    return null; // Return null instead of throwing
  }
  return data;
}

// For MENTEE view: join mentors to get mentor tz
export async function getBookingsByMenteeId(menteeId: string): Promise<MenteeBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, topic, date_time, status, mentor:mentor_id (full_name, timezone)')
    .eq('mentee_id', menteeId)
    .order('date_time', { ascending: true });

  if (error) {
    console.error('getBookingsByMenteeId error:', error);
    return [];
  }

  return (data ?? []).map((b: any) => ({
    id: b.id,
    topic: b.topic,
    date_time: b.date_time,
    status: b.status,
    mentor: b.mentor ? { full_name: b.mentor.full_name, timezone: b.mentor.timezone } : null,
  }));
}

// For MENTOR view: join mentees to get mentee tz
export async function getBookingsByMentorId(mentorId: string): Promise<MentorBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, topic, date_time, status, mentee:mentee_id (full_name, timezone)')
    .eq('mentor_id', mentorId)
    .order('date_time', { ascending: true });

  if (error) {
    console.error('getBookingsByMentorId error:', error);
    return [];
  }

  return (data ?? []).map((b: any) => ({
    id: b.id,
    topic: b.topic,
    date_time: b.date_time,
    status: b.status,
    mentee: b.mentee ? { full_name: b.mentee.full_name, timezone: b.mentee.timezone } : null,
  }));
}

// Simple profile completeness % (tweak as you like)
export const getMentorDashboardKpis = async (mentorId: string) => {
  // pending count
  const { count: pendingCount } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('mentor_id', mentorId)
    .eq('status', 'pending');

  // upcoming next 7d (accepted only)
  const { count: upcomingWeekCount } = await supabase
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('mentor_id', mentorId)
    .eq('status', 'accepted')
    .gte('date_time', new Date().toISOString())
    .lte('date_time', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());

  // quick profile % (adjust fields/weight later)
  const mentor = await getMentorById(mentorId);
  const fields = [
    !!mentor?.full_name,
    !!mentor?.timezone,
    !!mentor?.title,
    !!mentor?.bio,
    Array.isArray(mentor?.expertise) && mentor!.expertise.length > 0,
  ];
  const profilePercent = Math.round((fields.filter(Boolean).length / fields.length) * 100);

  return {
    pending: pendingCount || 0,
    upcomingWeek: upcomingWeekCount || 0,
    profilePercent,
  };
};

// Pending requests (join mentee names)
export const getMentorPending = async (mentorId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('id, topic, date_time, status, mentees:mentee_id (full_name)')
    .eq('mentor_id', mentorId)
    .eq('status', 'pending')
    .order('date_time', { ascending: true });
  if (error) { console.error(error); return []; }
  return data?.map((b) => ({
    id: b.id,
    topic: b.topic,
    date_time: b.date_time,
    status: b.status,
    mentees: b.mentees as { full_name?: string } | null,
  })) as any[];
};

// Today’s schedule (accepted only)
export const getMentorToday = async (mentorId: string) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('bookings')
    .select('id, topic, date_time, status, meeting_url, mentees:mentee_id (full_name)')
    .eq('mentor_id', mentorId)
    .eq('status', 'accepted')
    .gte('date_time', start.toISOString())
    .lte('date_time', end.toISOString())
    .order('date_time', { ascending: true });

  if (error) { console.error(error); return []; }
  return data?.map((b) => ({
    id: b.id,
    topic: b.topic,
    date_time: b.date_time,
    status: b.status,
    meeting_url: (b as any).meeting_url ?? null,
    mentees: b.mentees as { full_name?: string } | null,
  })) as any[];
};

// Upcoming (next 14 days, accepted only)
export const getMentorUpcoming = async (mentorId: string) => {
  const start = new Date();
  const end = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  const { data, error } = await supabase
    .from('bookings')
    .select('id, topic, date_time, status, mentees:mentee_id (full_name)')
    .eq('mentor_id', mentorId)
    .eq('status', 'accepted')
    .gte('date_time', start.toISOString())
    .lte('date_time', end.toISOString())
    .order('date_time', { ascending: true });

  if (error) { console.error(error); return []; }
  return data?.map((b) => ({
    id: b.id,
    topic: b.topic,
    date_time: b.date_time,
    status: b.status,
    mentees: b.mentees as { full_name?: string } | null,
  })) as any[];
};

export const updateBookingStatus = async (bookingId: string, status: 'accepted' | 'rejected') => {
  const { error } = await supabase.from('bookings').update({ status }).eq('id', bookingId);
  return { ok: !error, error };
};