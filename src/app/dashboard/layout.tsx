// app/dashboard/layout.tsx

import { ReactNode } from 'react';
import DashboardLayoutClient from '@/app/dashboard/DashboardLayoutClient';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}