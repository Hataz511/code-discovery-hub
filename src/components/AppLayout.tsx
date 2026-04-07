import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  FlaskConical, LayoutDashboard, Package, FileText, Beaker,
  Shield, Wrench, Trash2, BarChart3, ScrollText, Users,
  ChevronLeft, Bell, LogOut, Menu, CalendarDays, ClipboardCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Inventari', icon: Package, path: '/inventory' },
  { label: 'Kërkesat', icon: FileText, path: '/requests' },
  { label: 'Eksperimentet', icon: Beaker, path: '/experiments' },
  { label: 'Orari', icon: CalendarDays, path: '/schedule' },
  { label: 'Mbikëqyrja', icon: ClipboardCheck, path: '/lab-sessions' },
  { label: 'Pajisjet', icon: Wrench, path: '/equipment' },
  { label: 'Incidentet', icon: Shield, path: '/incidents' },
  { label: 'Mbetjet', icon: Trash2, path: '/waste' },
  { label: 'Analitika', icon: BarChart3, path: '/analytics' },
  { label: 'Audit Log', icon: ScrollText, path: '/audit' },
  { label: 'Përdoruesit', icon: Users, path: '/users' },
];

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  lab_manager: 'Lab Manager',
  professor: 'Profesor',
  lab_technician: 'Teknik',
  lab_supervisor: 'Supervizor',
  student: 'Student',
  auditor: 'Auditor',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile, roles, signOut } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:relative",
        collapsed ? "w-16" : "w-60",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center gap-3 px-4 h-14 border-b border-sidebar-border shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-display font-bold text-sidebar-accent-foreground truncate">CLMS</p>
              <p className="text-[10px] text-muted-foreground font-mono-code truncate">Lab Management</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors group",
                  isActive
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3 shrink-0">
          {!collapsed && profile && (
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-sidebar-accent-foreground truncate">{profile.full_name}</p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {roles.length > 0 ? roleLabels[roles[0]] || roles[0] : 'User'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-full py-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 shrink-0 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="font-display text-sm font-semibold text-foreground">
              {navItems.find(n => n.path === location.pathname)?.label || 'CLMS'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
