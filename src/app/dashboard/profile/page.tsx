'use client';

import MentorProfile from '@/components/dashboard/mentor/MentorProfile';
import MenteeProfile from '@/components/dashboard/mentee/MenteeProfile';
import { useUserRole } from '@/context/user-role-context';

export default function ProfilePage() {
  const role = useUserRole();

  if (role === 'mentor') return <MentorProfile />;
  if (role === 'mentee') return <MenteeProfile />;

  return <div className="text-center py-8">Loading...</div>;
}