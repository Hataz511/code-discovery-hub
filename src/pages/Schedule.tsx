import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, BookOpen, Clock, MapPin, User, Calendar, Plus, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const days = ['E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte'] as const;

const typeColors: Record<string, string> = {
  'ligjëratë': 'bg-primary/15 text-primary border-primary/30',
  'ushtrim': 'bg-accent/15 text-accent-foreground border-accent/30',
  'laborator': 'bg-destructive/15 text-destructive border-destructive/30',
};

const typeLabels: Record<string, string> = {
  'ligjëratë': 'L',
  'ushtrim': 'U',
  'laborator': 'Lab',
};

interface ScheduleRow {
  id: string;
  subject: string;
  type: string;
  day: string;
  start_time: string;
  end_time: string;
  professor: string;
  room: string;
  program: string;
  level: string;
  year: number;
  semester: number;
}

const emptyForm: Omit<ScheduleRow, 'id'> = {
  subject: '', type: 'ligjëratë', day: 'E Hënë', start_time: '09:00', end_time: '11:00',
  professor: '', room: '', program: '', level: 'bachelor', year: 1, semester: 1,
};

export default function SchedulePage() {
  const { hasRole } = useAuth();
  const canEdit = hasRole('admin') || hasRole('lab_manager') || hasRole('professor');

  const [level, setLevel] = useState<'bachelor' | 'master'>('bachelor');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('1');
  const [selectedSemester, setSelectedSemester] = useState<'1' | '2'>('1');

  const [allData, setAllData] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchSchedules = async () => {
    const { data, error } = await supabase.from('schedules').select('*').order('start_time');
    if (error) { toast.error('Gabim në ngarkim'); return; }
    setAllData((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchSchedules(); }, []);

  // Derive programs for current level
  const programs = useMemo(() => {
    const set = new Set(allData.filter(d => d.level === level).map(d => d.program));
    return Array.from(set).sort();
  }, [allData, level]);

  const currentProgram = useMemo(() => {
    return programs.includes(selectedProgram) ? selectedProgram : programs[0] || '';
  }, [programs, selectedProgram]);

  // Derive available years
  const availableYears = useMemo(() => {
    const set = new Set(allData.filter(d => d.level === level && d.program === currentProgram).map(d => d.year));
    return Array.from(set).sort();
  }, [allData, level, currentProgram]);

  const entries = useMemo(() => {
    return allData.filter(d =>
      d.level === level &&
      d.program === currentProgram &&
      d.year === parseInt(selectedYear) &&
      d.semester === parseInt(selectedSemester)
    );
  }, [allData, level, currentProgram, selectedYear, selectedSemester]);

  const byDay = useMemo(() => {
    const map = new Map<string, ScheduleRow[]>();
    for (const d of days) map.set(d, []);
    for (const e of entries) map.get(e.day)?.push(e);
    for (const [, arr] of map) arr.sort((a, b) => a.start_time.localeCompare(b.start_time));
    return map;
  }, [entries]);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, program: currentProgram, level, year: parseInt(selectedYear), semester: parseInt(selectedSemester) });
    setDialogOpen(true);
  };

  const openEdit = (entry: ScheduleRow) => {
    setEditingId(entry.id);
    setForm({
      subject: entry.subject, type: entry.type, day: entry.day,
      start_time: entry.start_time, end_time: entry.end_time,
      professor: entry.professor, room: entry.room,
      program: entry.program, level: entry.level,
      year: entry.year, semester: entry.semester,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.subject || !form.professor || !form.room) {
      toast.error('Plotëso të gjitha fushat');
      return;
    }
    if (editingId) {
      const { error } = await supabase.from('schedules').update(form as any).eq('id', editingId);
      if (error) { toast.error('Gabim në përditësim'); return; }
      toast.success('Orari u përditësua');
    } else {
      const { error } = await supabase.from('schedules').insert(form as any);
      if (error) { toast.error('Gabim në shtim'); return; }
      toast.success('Orari u shtua');
    }
    setDialogOpen(false);
    fetchSchedules();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('schedules').delete().eq('id', id);
    if (error) { toast.error('Gabim në fshirje'); return; }
    toast.success('Orari u fshi');
    fetchSchedules();
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
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">Orari i Ligjëratave</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Orari javor i ligjëratave, ushtrimeve dhe laboratorëve</p>
          </div>
          {canEdit && (
            <Button size="sm" onClick={openAdd} className="gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Shto
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={level} onValueChange={v => { setLevel(v as any); setSelectedProgram(''); setSelectedYear('1'); }}>
            <TabsList className="h-8">
              <TabsTrigger value="bachelor" className="text-xs px-3 gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Bachelor
              </TabsTrigger>
              <TabsTrigger value="master" className="text-xs px-3 gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Master
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={currentProgram} onValueChange={v => { setSelectedProgram(v); setSelectedYear('1'); }}>
            <SelectTrigger className="h-8 text-xs w-48">
              <SelectValue placeholder="Programi" />
            </SelectTrigger>
            <SelectContent>
              {programs.map(p => (
                <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="h-8 text-xs w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map(y => (
                <SelectItem key={y} value={String(y)} className="text-xs">Viti {y}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={selectedSemester} onValueChange={v => setSelectedSemester(v as '1' | '2')}>
            <TabsList className="h-8">
              <TabsTrigger value="1" className="text-xs px-3">Semestri I</TabsTrigger>
              <TabsTrigger value="2" className="text-xs px-3">Semestri II</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          {Object.entries(typeColors).map(([type, cls]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={cn('inline-block w-3 h-3 rounded-sm border', cls)} />
              <span className="text-[10px] text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Grid */}
      {entries.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nuk ka orare për këtë semestër</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {days.map(day => {
            const dayEntries = byDay.get(day) || [];
            return (
              <Card key={day} className="bg-card border-border">
                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-xs font-semibold text-foreground">{day}</CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 space-y-2">
                  {dayEntries.length === 0 ? (
                    <p className="text-[10px] text-muted-foreground italic py-4 text-center">Ditë e lirë</p>
                  ) : (
                    dayEntries.map(entry => (
                      <div
                        key={entry.id}
                        className={cn('rounded-md border p-2 space-y-1 group relative', typeColors[entry.type])}
                      >
                        {canEdit && (
                          <div className="absolute top-1 right-1 hidden group-hover:flex gap-0.5">
                            <button onClick={() => openEdit(entry)} className="p-0.5 rounded hover:bg-background/50">
                              <Pencil className="w-2.5 h-2.5" />
                            </button>
                            <button onClick={() => handleDelete(entry.id)} className="p-0.5 rounded hover:bg-destructive/20">
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-[11px] font-semibold leading-tight">{entry.subject}</p>
                          <Badge variant="outline" className="text-[8px] shrink-0 h-4 px-1">
                            {typeLabels[entry.type]}
                          </Badge>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] flex items-center gap-1 opacity-80">
                            <Clock className="w-2.5 h-2.5" /> {entry.start_time} – {entry.end_time}
                          </p>
                          <p className="text-[10px] flex items-center gap-1 opacity-80">
                            <MapPin className="w-2.5 h-2.5" /> {entry.room}
                          </p>
                          <p className="text-[10px] flex items-center gap-1 opacity-80">
                            <User className="w-2.5 h-2.5" /> {entry.professor}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm">{editingId ? 'Modifiko Orarin' : 'Shto Orar të Ri'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">Lënda</Label>
              <Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="h-8 text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Lloji</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ligjëratë" className="text-xs">Ligjëratë</SelectItem>
                    <SelectItem value="ushtrim" className="text-xs">Ushtrim</SelectItem>
                    <SelectItem value="laborator" className="text-xs">Laborator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Dita</Label>
                <Select value={form.day} onValueChange={v => setForm(f => ({ ...f, day: v }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {days.map(d => <SelectItem key={d} value={d} className="text-xs">{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Ora e fillimit</Label>
                <Input type="time" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} className="h-8 text-xs" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Ora e mbarimit</Label>
                <Input type="time" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} className="h-8 text-xs" />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Profesori</Label>
              <Input value={form.professor} onChange={e => setForm(f => ({ ...f, professor: e.target.value }))} className="h-8 text-xs" />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Salla / Laboratori</Label>
              <Input value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} className="h-8 text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Programi</Label>
                <Input value={form.program} onChange={e => setForm(f => ({ ...f, program: e.target.value }))} className="h-8 text-xs" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Niveli</Label>
                <Select value={form.level} onValueChange={v => setForm(f => ({ ...f, level: v }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor" className="text-xs">Bachelor</SelectItem>
                    <SelectItem value="master" className="text-xs">Master</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Viti</Label>
                <Input type="number" min={1} max={5} value={form.year} onChange={e => setForm(f => ({ ...f, year: parseInt(e.target.value) || 1 }))} className="h-8 text-xs" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Semestri</Label>
                <Select value={String(form.semester)} onValueChange={v => setForm(f => ({ ...f, semester: parseInt(v) }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1" className="text-xs">Semestri I</SelectItem>
                    <SelectItem value="2" className="text-xs">Semestri II</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Anulo</Button>
            <Button size="sm" onClick={handleSave}>{editingId ? 'Ruaj' : 'Shto'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
