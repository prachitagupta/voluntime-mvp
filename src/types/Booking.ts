export type BookingStatus = 'upcoming' | 'past' | 'cancelled' | 'accepted' | 'pending';

// from supabase
export type BookingRow = {
  id: string;
  topic: string;
  date_time: string;
  status: string;
  mentors: {
    full_name: string;
  } | null;
};

// from frontend
export type Booking = {
  id: string;
  topic: string;
  date_time: string;
  mentorName: string;
  status: BookingStatus;
}; 