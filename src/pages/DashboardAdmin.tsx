import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Package, Shield, BarChart3, AlertTriangle, FileText,
  Beaker, CalendarDays, TrendingUp, Clock, Wrench, Trash2,
  ChevronRight, Activity, FlaskConical, MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

interface LabStock {
  lab_name: string;
  chemical_count: number;
  total_quantity: number;
}

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0, totalChemicals: 0, pendingRequests: 0,
    openIncidents: 0, activeExperiments: 0, totalEquipment: 0,
    totalSchedules: 0, totalLabSessions: 0, lowStockCount: 0,
    equipmentMaintenance: 0,
  });
  const [recentAudit, setRecentAudit] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [labStocks, setLabStocks] = useState<LabStock[]>([]);
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const load = async () => {
      const [
        profiles, chemicals, requests, experiments, equipment, audit, alertsRes,
        schedules, labSessions, lowStock, eqMaintenance, recentReqs,
        chemLocations, roles
      ] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('chemicals').select('id', { count: 'exact', head: true }),
        supabase.from('chemical_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('experiments').select('id', { count: 'exact', head: true }).in('status', ['draft', 'in_progress']),
        supabase.from('equipment').select('id', { count: 'exact', head: true }),
        supabase.from('audit_log').select('*').order('created_at', { ascending: false }).limit(6),
        supabase.from('alerts').select('*').eq('is_read', false).order('created_at', { ascending: false }).limit(5),
        supabase.from('schedules').select('id', { count: 'exact', head: true }),
        supabase.from('lab_sessions').select('id', { count: 'exact', head: true }),
        supabase.from('chemicals').select('id', { count: 'exact', head: true }).lt('quantity', 100),
        supabase.from('equipment').select('id', { count: 'exact', head: true }).eq('status', 'maintenance'),
        supabase.from('chemical_requests').select('*, chemicals(name)').order('created_at', { ascending: false }).limit(5),
        supabase.from('chemical_locations').select('lab_name, quantity'),
        supabase.from('user_roles').select('role'),
      ]);

      setStats({
        totalUsers: profiles.count ?? 0,
        totalChemicals: chemicals.count ?? 0,
        pendingRequests: requests.count ?? 0,
        activeExperiments: experiments.count ?? 0,
        totalEquipment: equipment.count ?? 0,
        openIncidents: 0,
        totalSchedules: schedules.count ?? 0,
        totalLabSessions: labSessions.count ?? 0,
        lowStockCount: lowStock.count ?? 0,
        equipmentMaintenance: eqMaintenance.count ?? 0,
      });
      setRecentAudit(audit.data ?? []);
      setAlerts(alertsRes.data ?? []);
      setRecentRequests(recentReqs.data ?? []);

      // Aggregate lab stocks
      const labMap: Record<string, { count: number; qty: number }> = {};
      (chemLocations.data ?? []).forEach((loc: any) => {
        if (!labMap[loc.lab_name]) labMap[loc.lab_name] = { count: 0, qty: 0 };
        labMap[loc.lab_name].count++;
        labMap[loc.lab_name].qty += Number(loc.quantity);
      });
      setLabStocks(Object.entries(labMap).map(([name, v]) => ({
        lab_name: name, chemical_count: v.count, total_quantity: v.qty
      })).sort((a, b) => b.chemical_count - a.chemical_count).slice(0, 8));

      // Role counts
      const rc: Record<string, number> = {};
      (roles.data ?? []).forEach((r: any) => {
        rc[r.role] = (rc[r.role] || 0) + 1;
      });
      setRoleCounts(rc);
    };
    load();
  }, []);

  const statCards = [
    { label: 'Përdorues', value: stats.totalUsers, icon: Users, color: 'text-primary', bg: 'bg-primary/10', path: '/users' },
    { label: 'Kimikate', value: stats.totalChemicals, icon: Package, color: 'text-accent', bg: 'bg-accent/10', path: '/inventory' },
    { label: 'Kërkesa Pritje', value: stats.pendingRequests, icon: FileText, color: 'text-warning', bg: 'bg-warning/10', path: '/requests' },
    { label: 'Eksperimente', value: stats.activeExperiments, icon: Beaker, color: 'text-success', bg: 'bg-success/10', path: '/experiments' },
    { label: 'Pajisje', value: stats.totalEquipment, icon: Wrench, color: 'text-primary', bg: 'bg-primary/10', path: '/equipment' },
    { label: 'Orare', value: stats.totalSchedules, icon: CalendarDays, color: 'text-accent', bg: 'bg-accent/10', path: '/schedule' },
    { label: 'Sesione Lab', value: stats.totalLabSessions, icon: FlaskConical, color: 'text-success', bg: 'bg-success/10', path: '/lab-sessions' },
    { label: 'Stok i Ulët', value: stats.lowStockCount, icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', path: '/inventory' },
  ];

  const roleLabels: Record<string, string> = {
    admin: 'Administrator', lab_manager: 'Lab Manager', professor: 'Profesor',
    lab_technician: 'Teknik', lab_supervisor: 'Supervizor', student: 'Student', auditor: 'Auditor',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-warning/10 text-warning border-warning/20',
    approved: 'bg-success/10 text-success border-success/20',
    approved_level1: 'bg-accent/10 text-accent border-accent/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/20',
    dispensed: 'bg-primary/10 text-primary border-primary/20',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Në Pritje', approved: 'Aprovuar', approved_level1: 'Nivel 1',
    rejected: 'Refuzuar', dispensed: 'Dhënë',
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">Paneli i Administratorit</h1>
          <p className="text-xs text-muted-foreground">Pamje e plotë e sistemit CLMS</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate('/audit')}>
            <Clock className="w-3.5 h-3.5 mr-1.5" /> Audit Log
          </Button>
          <Button size="sm" onClick={() => navigate('/users')}>
            <Users className="w-3.5 h-3.5 mr-1.5" /> Përdoruesit
          </Button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map(stat => (
          <motion.div key={stat.label} variants={item}>
            <Card
              className="bg-card border-border cursor-pointer hover:border-primary/30 transition-colors group"
              onClick={() => navigate(stat.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Middle Row: Role Distribution + Lab Stocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Shpërndarja e Roleve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(roleCounts).length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">Asnjë përdorues</p>
              )}
              {Object.entries(roleCounts).sort((a, b) => b[1] - a[1]).map(([role, count]) => {
                const total = Object.values(roleCounts).reduce((s, v) => s + v, 0);
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={role} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{roleLabels[role] || role}</span>
                      <span className="text-xs text-muted-foreground">{count} ({pct}%)</span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Kimikatet sipas Laboratorit
                </CardTitle>
                <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => navigate('/inventory')}>
                  Shiko të gjitha <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {labStocks.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">Asnjë lokacion</p>
              )}
              {labStocks.map(lab => (
                <div key={lab.lab_name} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center">
                      <FlaskConical className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{lab.lab_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground">{lab.chemical_count} kimikate</span>
                    <Badge variant="outline" className="text-[10px]">{lab.total_quantity.toFixed(0)} njësi</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row: Recent Requests + Alerts + Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Requests */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <FileText className="w-4 h-4 text-warning" />
                  Kërkesat e Fundit
                </CardTitle>
                <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => navigate('/requests')}>
                  Shiko <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentRequests.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë kërkesë</p>}
              {recentRequests.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{r.chemicals?.name || 'Kimikat'}</p>
                    <p className="text-[11px] text-muted-foreground">{r.quantity} {r.unit}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] shrink-0 ${statusColors[r.status] || ''}`}>
                    {statusLabels[r.status] || r.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Alerts */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Alarme të Palexuara
                {alerts.length > 0 && (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]">{alerts.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {alerts.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë alarm</p>}
              {alerts.map(a => (
                <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    a.severity === 'critical' ? 'bg-destructive' : a.severity === 'warning' ? 'bg-warning' : 'bg-accent'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{a.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Audit Log */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Audit Log
                </CardTitle>
                <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => navigate('/audit')}>
                  Shiko <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentAudit.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë veprim</p>}
              {recentAudit.map(log => (
                <div key={log.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{log.action}</p>
                    <p className="text-[11px] text-muted-foreground">{log.user_name} · {log.module}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono-code shrink-0">
                    {new Date(log.created_at).toLocaleDateString('sq')}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Veprime të Shpejta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {[
                { label: 'Përdoruesit', icon: Users, path: '/users' },
                { label: 'Inventari', icon: Package, path: '/inventory' },
                { label: 'Kërkesat', icon: FileText, path: '/requests' },
                { label: 'Eksperimentet', icon: Beaker, path: '/experiments' },
                { label: 'Pajisjet', icon: Wrench, path: '/equipment' },
                { label: 'Orari', icon: CalendarDays, path: '/schedule' },
                { label: 'Sesionet', icon: FlaskConical, path: '/lab-sessions' },
                { label: 'Incidentet', icon: Shield, path: '/incidents' },
                { label: 'Mbetjet', icon: Trash2, path: '/waste' },
                { label: 'Analitika', icon: BarChart3, path: '/analytics' },
                { label: 'Audit Log', icon: Clock, path: '/audit' },
                { label: 'Alarmet', icon: AlertTriangle, path: '/' },
              ].map(action => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-auto py-3 flex flex-col items-center gap-1.5 text-xs hover:border-primary/30 hover:bg-primary/5"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="w-4 h-4 text-muted-foreground" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
