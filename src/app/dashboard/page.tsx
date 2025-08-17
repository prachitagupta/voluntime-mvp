'use client';

import MenteeDashboard from '@/components/dashboard/mentee/MenteeDashboard';
import MentorDashboard from '@/components/dashboard/mentor/MentorDashboard';
import { useUserRole } from '@/context/user-role-context';

export default function DashboardHomePage() {
  const role = useUserRole();

  if (role === 'mentor') return <MentorDashboard />;
  if (role === 'mentee') return <MenteeDashboard />;

  return <div className="text-center py-8">Loading...</div>;
}