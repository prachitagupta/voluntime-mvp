'use client';

import MentorBookings from '@/components/dashboard/mentor/MentorBookings';
import MenteeBookings from '@/components/dashboard/mentee/MenteeBookings';
import { useUserRole } from '@/context/user-role-context';

export default function BookingsPage() {
  const role = useUserRole();

  if (role === 'mentor') return <MentorBookings />;
  if (role === 'mentee') return <MenteeBookings />;

  return <div className="text-center py-8">Loading...</div>;
}