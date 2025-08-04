// app/dashboard/page.tsx

import MenteeDashboard from '@/components/dashboard/mentee/MenteeDashboard';
import MentorDashboard from '@/components/dashboard/mentor/MentorDashboard';
import { getUserRole } from '@/lib/auth';


export default async function DashboardHomePage() {
  const role = await getUserRole();

  if (role === 'mentor') return <MentorDashboard />;
  if (role === 'mentee') return <MenteeDashboard />;

  return <p className="text-red-500">Unable to detect user role.</p>;
}