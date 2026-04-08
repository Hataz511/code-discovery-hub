import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, Beaker, FileText, Wrench, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DashboardLabManager() {
  const [stats, setStats] = useState({ chemicals: 0, lowStock: 0, pending: 0, sessions: 0, equipment: 0 });
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);
  const [expiring, setExpiring] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [chems, requests, sessions, equip, chemsData, reqsData] = await Promise.all([
        supabase.from('chemicals').select('id', { count: 'exact', head: true }),
        supabase.from('chemical_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('lab_sessions').select('id', { count: 'exact', head: true }).eq('status', 'scheduled'),
        supabase.from('equipment').select('id', { count: 'exact', head: true }),
        supabase.from('chemicals').select('*').order('expiry_date', { ascending: true }).limit(5),
        supabase.from('chemical_requests').select('*').eq('status', 'pending').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({
        chemicals: chems.count ?? 0,
        lowStock: 0,
        pending: requests.count ?? 0,
        sessions: sessions.count ?? 0,
        equipment: equip.count ?? 0,
      });
      setExpiring(chemsData.data ?? []);
      setPendingReqs(reqsData.data ?? []);
    };
    load();
  }, []);

  const statCards = [
    { label: 'Kimikate', value: stats.chemicals, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Kërkesa Pritje', value: stats.pending, icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Sesione Lab', value: stats.sessions, icon: Beaker, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Pajisje', value: stats.equipment, icon: Wrench, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Paneli i Laborantit Kryesor</h1>
        <p className="text-xs text-muted-foreground">Menaxhimi i laboratorëve, analizave dhe detyrave eksperimentale</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                <FileText className="w-4 h-4 text-warning" />
                Kërkesa për Aprovim
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingReqs.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë kërkesë</p>}
              {pendingReqs.map(r => (
                <div key={r.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{r.quantity} {r.unit}</p>
                    <p className="text-[11px] text-muted-foreground">{r.justification?.slice(0, 60)}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px] border-warning/30 text-warning">Pritje</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-destructive" />
                Kimikate që Skadojnë
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {expiring.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë</p>}
              {expiring.map(c => {
                const days = Math.ceil((new Date(c.expiry_date).getTime() - Date.now()) / 86400000);
                return (
                  <div key={c.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                    <div>
                      <p className="text-xs font-medium text-foreground">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono-code">{c.formula}</p>
                    </div>
                    <span className={`text-[11px] font-mono-code font-medium ${days <= 10 ? 'text-destructive' : 'text-warning'}`}>
                      {days} ditë
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
