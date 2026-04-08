import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Package, Shield, BarChart3, AlertTriangle, FileText,
  Beaker, CalendarDays, TrendingUp, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    totalUsers: 0, totalChemicals: 0, pendingRequests: 0,
    openIncidents: 0, activeExperiments: 0, totalEquipment: 0,
  });
  const [recentAudit, setRecentAudit] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [profiles, chemicals, requests, experiments, equipment, audit, alertsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('chemicals').select('id', { count: 'exact', head: true }),
        supabase.from('chemical_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('experiments').select('id', { count: 'exact', head: true }).in('status', ['draft', 'in_progress']),
        supabase.from('equipment').select('id', { count: 'exact', head: true }),
        supabase.from('audit_log').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('alerts').select('*').eq('is_read', false).order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({
        totalUsers: profiles.count ?? 0,
        totalChemicals: chemicals.count ?? 0,
        pendingRequests: requests.count ?? 0,
        activeExperiments: experiments.count ?? 0,
        totalEquipment: equipment.count ?? 0,
        openIncidents: 0,
      });
      setRecentAudit(audit.data ?? []);
      setAlerts(alertsRes.data ?? []);
    };
    load();
  }, []);

  const statCards = [
    { label: 'Përdorues', value: stats.totalUsers, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Kimikate', value: stats.totalChemicals, icon: Package, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Kërkesa Pritje', value: stats.pendingRequests, icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Eksperimente', value: stats.activeExperiments, icon: Beaker, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pajisje', value: stats.totalEquipment, icon: Shield, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Paneli i Shefit të Departamentit</h1>
        <p className="text-xs text-muted-foreground">Pamje e përgjithshme e departamentit</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map(stat => (
          <motion.div key={stat.label} variants={item}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Alarme të Palexuara
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

        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Audit Log i Fundit
              </CardTitle>
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
    </motion.div>
  );
}
