// app/dashboard/bookings/page.tsx
import MentorBookings from '@/components/dashboard/mentor/MentorBookings';
import MenteeBookings from '@/components/dashboard/mentee/MenteeBookings';

import { getUserRole } from '@/lib/auth';

export default async function BookingsPage() {
  const role = await getUserRole();

  if (role === 'mentor') return <MentorBookings />;
  if (role === 'mentee') return <MenteeBookings />;

  return <p className="text-red-500">Unable to detect user role.</p>;
}