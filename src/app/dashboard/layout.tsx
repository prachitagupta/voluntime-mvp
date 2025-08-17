import { ReactNode } from 'react';
import { UserRoleProvider } from '@/context/user-role-context';
import DashboardLayout from './dashboard-layout';

export default function DashboardLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <UserRoleProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </UserRoleProvider>
  );
}