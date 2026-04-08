import { useAuth } from '@/contexts/AuthContext';
import DashboardAdmin from './DashboardAdmin';
import DashboardLabManager from './DashboardLabManager';
import DashboardProfessor from './DashboardProfessor';
import DashboardStudent from './DashboardStudent';
import DashboardTechnician from './DashboardTechnician';

export default function Dashboard() {
  const { roles } = useAuth();

  if (roles.includes('admin')) return <DashboardAdmin />;
  if (roles.includes('lab_manager')) return <DashboardLabManager />;
  if (roles.includes('professor')) return <DashboardProfessor />;
  if (roles.includes('lab_technician')) return <DashboardTechnician />;
  if (roles.includes('lab_supervisor')) return <DashboardTechnician />;
  return <DashboardStudent />;
}
