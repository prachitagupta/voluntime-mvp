export type BookingStatus = 'upcoming' | 'past' | 'cancelled' | 'accepted' | 'pending';

export type BookingRow = {
  id: string;
  topic: string;
  date_time: string;
  status: string;
  mentors: {
    full_name: string;
  } | null;
};

export type Booking = {
  id: string;
  topic: string;
  date_time: string;
  mentorName: string;
  status: BookingStatus;
};

// For mentee view - shows mentor info
export type MenteeBooking = {
  id: string;
  topic: string;
  date_time: string;
  status: string;
  mentor: {
    full_name: string;
    timezone: string;
  } | null;
};

// For mentor view - shows mentee info
export type MentorBooking = {
  id: string;
  topic: string;
  date_time: string;
  status: string;
  mentee: {
    full_name: string;
    timezone: string;
  } | null;
};