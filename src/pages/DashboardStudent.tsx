import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, CalendarDays, FileText, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DashboardStudent() {
  const { user } = useAuth();
  const [experiments, setExperiments] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [exps, reqs, sess, sched] = await Promise.all([
        supabase.from('experiments').select('*').eq('student_id', user.id).order('date', { ascending: false }).limit(5),
        supabase.from('chemical_requests').select('*').eq('requester_id', user.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('lab_sessions').select('*').eq('student_id', user.id).order('session_date', { ascending: false }).limit(5),
        supabase.from('schedules').select('*').order('start_time', { ascending: true }).limit(15),
      ]);
      setExperiments(exps.data ?? []);
      setRequests(reqs.data ?? []);
      setSessions(sess.data ?? []);
      setSchedules(sched.data ?? []);
    };
    load();
  }, [user]);

  const today = new Date().toLocaleDateString('sq', { weekday: 'long' });
  const todaySchedules = schedules.filter(s => s.day.toLowerCase() === today.toLowerCase());

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Paneli i Studentit</h1>
        <p className="text-xs text-muted-foreground">Eksperimentet, kërkesat dhe orari yt</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Eksperimentet e Mia', value: experiments.length, icon: Beaker, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Kërkesat e Mia', value: requests.length, icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Sesione Lab', value: sessions.length, icon: ClipboardCheck, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Orari Sot', value: todaySchedules.length, icon: CalendarDays, color: 'text-accent', bg: 'bg-accent/10' },
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
                <CalendarDays className="w-4 h-4 text-accent" />
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
                Eksperimentet e Mia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {experiments.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë eksperiment</p>}
              {experiments.map(e => (
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

        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-warning" />
                Kërkesat e Mia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {requests.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë kërkesë</p>}
              {requests.map(r => (
                <div key={r.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{r.quantity} {r.unit}</p>
                    <p className="text-[11px] text-muted-foreground">{r.justification?.slice(0, 50)}</p>
                  </div>
                  <Badge variant="outline" className={`text-[9px] ${
                    r.status === 'approved' ? 'text-success border-success/30' :
                    r.status === 'rejected' ? 'text-destructive border-destructive/30' :
                    'text-warning border-warning/30'
                  }`}>{r.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
