import { useState, useMemo } from 'react';
import { scheduleData, days, type ProgramSchedule, type ScheduleEntry } from '@/data/scheduleData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, BookOpen, Clock, MapPin, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function SchedulePage() {
  const [level, setLevel] = useState<'bachelor' | 'master'>('bachelor');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('1');
  const [selectedSemester, setSelectedSemester] = useState<'1' | '2'>('1');

  const programs = useMemo(() => scheduleData.filter(p => p.level === level), [level]);

  // Reset program when level changes
  const currentProgram = useMemo(() => {
    const found = programs.find(p => p.program === selectedProgram);
    return found || programs[0];
  }, [programs, selectedProgram]);

  const currentYear = useMemo(() => {
    if (!currentProgram) return null;
    const y = parseInt(selectedYear);
    return currentProgram.years.find(yr => yr.year === y) || currentProgram.years[0];
  }, [currentProgram, selectedYear]);

  const entries = useMemo(() => {
    if (!currentYear) return [];
    return selectedSemester === '1' ? currentYear.semester1 : currentYear.semester2;
  }, [currentYear, selectedSemester]);

  // Group by day
  const byDay = useMemo(() => {
    const map = new Map<string, ScheduleEntry[]>();
    for (const d of days) map.set(d, []);
    for (const e of entries) {
      map.get(e.day)?.push(e);
    }
    // Sort each day by time
    for (const [, arr] of map) {
      arr.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [entries]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">Orari i Ligjëratave</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Orari javor i ligjëratave, ushtrimeve dhe laboratorëve</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={level} onValueChange={v => { setLevel(v as 'bachelor' | 'master'); setSelectedProgram(''); setSelectedYear('1'); }}>
            <TabsList className="h-8">
              <TabsTrigger value="bachelor" className="text-xs px-3 gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" /> Bachelor
              </TabsTrigger>
              <TabsTrigger value="master" className="text-xs px-3 gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Master
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={currentProgram?.program || ''} onValueChange={v => { setSelectedProgram(v); setSelectedYear('1'); }}>
            <SelectTrigger className="h-8 text-xs w-48">
              <SelectValue placeholder="Programi" />
            </SelectTrigger>
            <SelectContent>
              {programs.map(p => (
                <SelectItem key={p.program} value={p.program} className="text-xs">{p.program}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="h-8 text-xs w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentProgram?.years.map(y => (
                <SelectItem key={y.year} value={String(y.year)} className="text-xs">Viti {y.year}</SelectItem>
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
                        className={cn(
                          'rounded-md border p-2 space-y-1',
                          typeColors[entry.type]
                        )}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-[11px] font-semibold leading-tight">{entry.subject}</p>
                          <Badge variant="outline" className="text-[8px] shrink-0 h-4 px-1">
                            {typeLabels[entry.type]}
                          </Badge>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[10px] flex items-center gap-1 opacity-80">
                            <Clock className="w-2.5 h-2.5" /> {entry.startTime} – {entry.endTime}
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
    </div>
  );
}
