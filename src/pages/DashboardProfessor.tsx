import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, CalendarDays, FileText, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DashboardProfessor() {
  const { user } = useAuth();
  const [experiments, setExperiments] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [pendingReqs, setPendingReqs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [exps, sched, reqs] = await Promise.all([
        supabase.from('experiments').select('*').eq('supervisor_id', user.id).order('date', { ascending: false }).limit(10),
        supabase.from('schedules').select('*').order('start_time', { ascending: true }).limit(10),
        supabase.from('chemical_requests').select('*').eq('status', 'pending').order('created_at', { ascending: false }).limit(5),
      ]);
      setExperiments(exps.data ?? []);
      setSchedules(sched.data ?? []);
      setPendingReqs(reqs.data ?? []);
    };
    load();
  }, [user]);

  const today = new Date().toLocaleDateString('sq', { weekday: 'long' });
  const todaySchedules = schedules.filter(s => s.day.toLowerCase() === today.toLowerCase());

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Paneli i Profesorit</h1>
        <p className="text-xs text-muted-foreground">Eksperimentet, orari dhe aprovimi i kërkesave</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Eksperimente', value: experiments.length, icon: Beaker, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Orari Sot', value: todaySchedules.length, icon: CalendarDays, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Kërkesa Pritje', value: pendingReqs.length, icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
        ].map(stat => (
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
                <CalendarDays className="w-4 h-4 text-success" />
                Orari i Sotëm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {todaySchedules.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë orar sot</p>}
              {todaySchedules.map(s => (
                <div key={s.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div>
                    <p className="text-xs font-medium text-foreground">{s.subject}</p>
                    <p className="text-[11px] text-muted-foreground">{s.room} · {s.type}</p>
                  </div>
                  <span className="text-[11px] font-mono-code text-muted-foreground">{s.start_time}-{s.end_time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Beaker className="w-4 h-4 text-primary" />
                Eksperimentet e Fundit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {experiments.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë eksperiment</p>}
              {experiments.slice(0, 5).map(e => (
                <div key={e.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{e.title}</p>
                    <p className="text-[11px] text-muted-foreground">{new Date(e.date).toLocaleDateString('sq')}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px]">{e.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
