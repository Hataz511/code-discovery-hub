import { mockExperiments } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker, FlaskConical } from 'lucide-react';

const statusColors: Record<string, string> = {
  draft: 'border-muted-foreground/30 text-muted-foreground',
  in_progress: 'border-accent/30 text-accent',
  completed: 'border-success/30 text-success',
  confirmed: 'border-primary/30 text-primary',
};

export default function ExperimentsPage() {
  return (
    <div className="space-y-3">
      {mockExperiments.map(exp => (
        <Card key={exp.id} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Beaker className="w-4 h-4 text-accent shrink-0" />
                  <p className="text-sm font-medium text-foreground">{exp.title}</p>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2">{exp.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                  <span>Student: <span className="text-foreground">{exp.studentName}</span></span>
                  <span>Data: <span className="text-foreground font-mono-code">{exp.date}</span></span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {exp.chemicals.map(ch => (
                    <span key={ch.chemicalId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-[10px] text-foreground border border-border/50">
                      <FlaskConical className="w-2.5 h-2.5 text-primary" />
                      {ch.chemicalName} · {ch.quantityUsed}{ch.unit}
                    </span>
                  ))}
                </div>
              </div>
              <Badge variant="outline" className={`text-[10px] shrink-0 ${statusColors[exp.status]}`}>
                {exp.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
