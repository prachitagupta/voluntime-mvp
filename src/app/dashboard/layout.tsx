// app/dashboard/layout.tsx

import MenteeSidebar from '@/components/dashboard/mentee/MenteeSidebar';
import MentorSidebar from '@/components/dashboard/mentor/MentorSidebar';
import { getUserRole } from '@/lib/auth';
import { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const role = await getUserRole();

  return (
    <div className="absolute top-16 left-0 right-0 bottom-0 flex bg-gray-50">
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
        {role === 'mentor' ? <MentorSidebar /> : <MenteeSidebar />}
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}