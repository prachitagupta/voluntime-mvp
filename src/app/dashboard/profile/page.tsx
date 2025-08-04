// app/dashboard/profile/page.tsx

import MentorProfile from '@/components/dashboard/mentor/MentorProfile';
import MenteeProfile from '@/components/dashboard/mentee/MenteeProfile';
import { getUserRole } from '@/lib/auth';

export default async function ProfilePage() {
  const role = await getUserRole();

  if (role === 'mentor') return <MentorProfile />;
  if (role === 'mentee') return <MenteeProfile />;

  return <p className="text-red-500">Unable to detect user role.</p>;
}