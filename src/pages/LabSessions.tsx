import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Plus, ClipboardCheck, AlertTriangle, CheckCircle, Clock, User, Beaker, Wrench, MapPin,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const labLocations = [
  'Lab - Kimi e Përgjithshme', 'Lab - Kimi Fizike 1', 'Lab - Kimi Fizike 2',
  'Lab - Kimi Organike 1', 'Lab - Kimi Organike 2', 'Lab - Kimi Organike 3',
  'Lab - Kimi Analitike 1', 'Lab - Kimi Analitike 2', 'Lab - Bioteknologji',
  'Lab - Kimia e Mjedisit', 'Lab - Biokimia 1',
];

const statusConfig: Record<string, { label: string; color: string }> = {
  scheduled: { label: 'I Planifikuar', color: 'border-muted-foreground/30 text-muted-foreground' },
  in_progress: { label: 'Në Progres', color: 'border-warning/30 text-warning' },
  completed: { label: 'Përfunduar', color: 'border-primary/30 text-primary' },
  checked: { label: 'I Kontrolluar', color: 'border-primary/30 text-primary' },
};

const equipStatusConfig: Record<string, { label: string; color: string }> = {
  pending_check: { label: 'Pret Kontroll', color: 'border-warning/30 text-warning' },
  all_ok: { label: 'Të gjitha OK', color: 'border-primary/30 text-primary' },
  damaged: { label: 'Ka Dëmtime', color: 'border-destructive/30 text-destructive' },
};

interface LabSession {
  id: string;
  student_name: string;
  student_id: string;
  experiment_title: string;
  experiment_description: string | null;
  lab_name: string;
  chemicals_used: any[];
  equipment_used: any[];
  equipment_status: string;
  equipment_notes: string | null;
  supervisor_name: string | null;
  status: string;
  session_date: string;
  created_at: string;
}

export default function LabSessionsPage() {
  const { user, profile, hasRole } = useAuth();
  const canManage = hasRole('admin') || hasRole('lab_manager') || hasRole('lab_supervisor') || hasRole('lab_technician');

  const [sessions, setSessions] = useState<LabSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [checkDialog, setCheckDialog] = useState<LabSession | null>(null);

  const [form, setForm] = useState({
    student_name: '', experiment_title: '', experiment_description: '',
    lab_name: '', chemicals_text: '', equipment_text: '', session_date: new Date().toISOString().slice(0, 10),
  });

  const [checkForm, setCheckForm] = useState({ equipment_status: 'all_ok', equipment_notes: '' });

  const fetchSessions = async () => {
    const { data, error } = await supabase.from('lab_sessions').select('*').order('session_date', { ascending: false });
    if (data) setSessions(data as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchSessions(); }, []);

  const handleAdd = async () => {
    if (!form.student_name || !form.experiment_title || !form.lab_name) {
      toast.error('Plotëso fushat e detyrueshme'); return;
    }
    const chemicals = form.chemicals_text.split(',').map(s => s.trim()).filter(Boolean).map(name => ({ name }));
    const equipment = form.equipment_text.split(',').map(s => s.trim()).filter(Boolean).map(name => ({ name }));

    const { error } = await supabase.from('lab_sessions').insert({
      student_name: form.student_name,
      student_id: user!.id,
      experiment_title: form.experiment_title,
      experiment_description: form.experiment_description || null,
      lab_name: form.lab_name,
      chemicals_used: chemicals,
      equipment_used: equipment,
      supervisor_id: user!.id,
      supervisor_name: profile?.full_name || 'Supervisor',
      session_date: form.session_date,
    } as any);
    if (error) { toast.error('Gabim në shtim'); return; }
    toast.success('Sesioni u shtua');
    setAddOpen(false);
    setForm({ student_name: '', experiment_title: '', experiment_description: '', lab_name: '', chemicals_text: '', equipment_text: '', session_date: new Date().toISOString().slice(0, 10) });
    fetchSessions();
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from('lab_sessions').update({ status } as any).eq('id', id);
    if (error) { toast.error('Gabim'); return; }
    toast.success('Statusi u përditësua');
    fetchSessions();
  };

  const handleEquipmentCheck = async () => {
    if (!checkDialog) return;
    const { error } = await supabase.from('lab_sessions').update({
      equipment_status: checkForm.equipment_status,
      equipment_notes: checkForm.equipment_notes || null,
      status: 'checked',
    } as any).eq('id', checkDialog.id);
    if (error) { toast.error('Gabim'); return; }
    toast.success('Kontrolli u regjistrua');
    setCheckDialog(null);
    setCheckForm({ equipment_status: 'all_ok', equipment_notes: '' });
    fetchSessions();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">Mbikëqyrja e Laboratorit</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Menaxho sesionet laboratorike, eksperimentet dhe kontrollin e pajisjeve</p>
        </div>
        {canManage && (
          <Button size="sm" onClick={() => setAddOpen(true)} className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Shto Sesion
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Të Planifikuara', count: sessions.filter(s => s.status === 'scheduled').length, icon: Clock, color: 'text-muted-foreground' },
          { label: 'Në Progres', count: sessions.filter(s => s.status === 'in_progress').length, icon: Beaker, color: 'text-warning' },
          { label: 'Përfunduara', count: sessions.filter(s => s.status === 'completed').length, icon: CheckCircle, color: 'text-primary' },
          { label: 'Ka Dëmtime', count: sessions.filter(s => s.equipment_status === 'damaged').length, icon: AlertTriangle, color: 'text-destructive' },
        ].map(stat => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-3 flex items-center gap-3">
              <stat.icon className={cn('w-4 h-4', stat.color)} />
              <div>
                <p className="text-lg font-display font-bold">{stat.count}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <ClipboardCheck className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nuk ka sesione laboratorike ende</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {sessions.map(session => {
            const sCfg = statusConfig[session.status] || statusConfig.scheduled;
            const eCfg = equipStatusConfig[session.equipment_status] || equipStatusConfig.pending_check;
            return (
              <Card key={session.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{session.experiment_title}</p>
                        <Badge variant="outline" className={`text-[10px] ${sCfg.color}`}>{sCfg.label}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-2.5 h-2.5" /> {session.student_name}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {session.lab_name.replace('Lab - ', '')}</span>
                        <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {new Date(session.session_date).toLocaleDateString('sq-AL')}</span>
                      </div>
                      {session.experiment_description && (
                        <p className="text-[11px] text-muted-foreground mt-1">{session.experiment_description}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(session.chemicals_used as any[])?.map((c: any, i: number) => (
                          <Badge key={i} variant="outline" className="text-[9px] gap-0.5">
                            <Beaker className="w-2 h-2" /> {c.name}
                          </Badge>
                        ))}
                        {(session.equipment_used as any[])?.map((e: any, i: number) => (
                          <Badge key={i} variant="secondary" className="text-[9px] gap-0.5">
                            <Wrench className="w-2 h-2" /> {e.name}
                          </Badge>
                        ))}
                      </div>
                      {session.equipment_status !== 'pending_check' && (
                        <div className="mt-2">
                          <Badge variant="outline" className={`text-[10px] ${eCfg.color}`}>
                            Pajisjet: {eCfg.label}
                          </Badge>
                          {session.equipment_notes && (
                            <p className="text-[10px] text-muted-foreground mt-0.5">{session.equipment_notes}</p>
                          )}
                        </div>
                      )}
                    </div>
                    {canManage && (
                      <div className="flex flex-col gap-1 shrink-0">
                        {session.status === 'scheduled' && (
                          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleStatusChange(session.id, 'in_progress')}>
                            Fillo
                          </Button>
                        )}
                        {session.status === 'in_progress' && (
                          <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleStatusChange(session.id, 'completed')}>
                            Përfundo
                          </Button>
                        )}
                        {session.status === 'completed' && session.equipment_status === 'pending_check' && (
                          <Button size="sm" className="h-7 text-[11px] gap-1" onClick={() => setCheckDialog(session)}>
                            <ClipboardCheck className="w-3 h-3" /> Kontroll
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Session Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-sm">Shto Sesion Laboratorik</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Regjistro eksperimentin dhe mjetet për studentin</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">Studenti *</Label>
              <Input value={form.student_name} onChange={e => setForm(f => ({ ...f, student_name: e.target.value }))} className="h-8 text-xs" placeholder="Emri i studentit" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Eksperimenti *</Label>
              <Input value={form.experiment_title} onChange={e => setForm(f => ({ ...f, experiment_title: e.target.value }))} className="h-8 text-xs" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Përshkrimi</Label>
              <Textarea value={form.experiment_description} onChange={e => setForm(f => ({ ...f, experiment_description: e.target.value }))} className="text-xs min-h-[50px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Laboratori *</Label>
                <Select value={form.lab_name} onValueChange={v => setForm(f => ({ ...f, lab_name: v }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Zgjidh" /></SelectTrigger>
                  <SelectContent>
                    {labLocations.map(l => <SelectItem key={l} value={l} className="text-xs">{l.replace('Lab - ', '')}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Data</Label>
                <Input type="date" value={form.session_date} onChange={e => setForm(f => ({ ...f, session_date: e.target.value }))} className="h-8 text-xs" />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Reagjentët kimiké (ndarë me presje)</Label>
              <Input value={form.chemicals_text} onChange={e => setForm(f => ({ ...f, chemicals_text: e.target.value }))} className="h-8 text-xs" placeholder="p.sh. HCl, NaOH, H₂SO₄" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Pajisjet laboratorike (ndarë me presje)</Label>
              <Input value={form.equipment_text} onChange={e => setForm(f => ({ ...f, equipment_text: e.target.value }))} className="h-8 text-xs" placeholder="p.sh. Byretë, Erlenmajer, Pipetë" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setAddOpen(false)}>Anulo</Button>
            <Button size="sm" onClick={handleAdd}>Regjistro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Equipment Check Dialog */}
      <Dialog open={!!checkDialog} onOpenChange={() => setCheckDialog(null)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-sm">Kontroll i Pajisjeve</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {checkDialog?.experiment_title} — {checkDialog?.student_name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {checkDialog && (checkDialog.equipment_used as any[])?.length > 0 && (
              <div className="space-y-1">
                <Label className="text-xs">Pajisjet e përdorura:</Label>
                <div className="flex flex-wrap gap-1">
                  {(checkDialog.equipment_used as any[]).map((e: any, i: number) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{e.name}</Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="grid gap-1.5">
              <Label className="text-xs">Gjendja e Pajisjeve</Label>
              <Select value={checkForm.equipment_status} onValueChange={v => setCheckForm(f => ({ ...f, equipment_status: v }))}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_ok" className="text-xs">Të gjitha OK</SelectItem>
                  <SelectItem value="damaged" className="text-xs">Ka dëmtime</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Shënime</Label>
              <Textarea value={checkForm.equipment_notes} onChange={e => setCheckForm(f => ({ ...f, equipment_notes: e.target.value }))} className="text-xs min-h-[60px]" placeholder="Detaje për gjendjen e pajisjeve..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setCheckDialog(null)}>Anulo</Button>
            <Button size="sm" onClick={handleEquipmentCheck}>Regjistro Kontrollin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
