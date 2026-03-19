import { useState } from 'react';
import { experimentCatalog, type Program, type CatalogExperiment } from '@/data/experimentCatalog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Beaker, FlaskConical, Wrench, Clock, GraduationCap, BookOpen } from 'lucide-react';

export default function ExperimentsPage() {
  const [level, setLevel] = useState<'bachelor' | 'master'>('bachelor');

  const programs = experimentCatalog.filter(p => p.level === level);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-display font-bold text-foreground">Katalogu i Eksperimenteve</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Lista e plotë e eksperimenteve laboratorike sipas programit dhe vitit</p>
        </div>
        <Tabs value={level} onValueChange={v => setLevel(v as 'bachelor' | 'master')}>
          <TabsList className="h-8">
            <TabsTrigger value="bachelor" className="text-xs px-3 gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Bachelor
            </TabsTrigger>
            <TabsTrigger value="master" className="text-xs px-3 gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Master
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Programs */}
      {programs.map(program => (
        <ProgramSection key={program.name} program={program} />
      ))}
    </div>
  );
}

function ProgramSection({ program }: { program: Program }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Beaker className="w-4 h-4 text-primary" />
          {program.name}
          <Badge variant="outline" className="text-[10px] ml-auto">
            {program.years.reduce((acc, y) => acc + y.experiments.length, 0)} eksperimente
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {program.years.map(yearData => (
          <div key={yearData.year}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-medium text-muted-foreground px-2 bg-card">
                Viti {yearData.year}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <Accordion type="multiple" className="space-y-1.5">
              {yearData.experiments.map(exp => (
                <ExperimentItem key={exp.id} experiment={exp} />
              ))}
            </Accordion>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ExperimentItem({ experiment }: { experiment: CatalogExperiment }) {
  return (
    <AccordionItem value={experiment.id} className="border border-border rounded-md overflow-hidden bg-muted/30">
      <AccordionTrigger className="px-3 py-2.5 hover:no-underline hover:bg-muted/50 text-left [&[data-state=open]]:bg-muted/50">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Beaker className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-foreground">{experiment.title}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{experiment.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="text-[9px] gap-1 hidden sm:inline-flex">
              <Clock className="w-2.5 h-2.5" /> {experiment.duration}
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-3 pb-3">
        <div className="space-y-3 pt-1">
          {/* Description */}
          <p className="text-[11px] text-muted-foreground">{experiment.description}</p>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" /> Kohëzgjatja: <span className="text-foreground font-medium">{experiment.duration}</span>
            <span className="mx-1">·</span>
            Laboratori: <span className="text-foreground font-medium">{experiment.lab}</span>
          </div>

          {/* Equipment */}
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-3 h-3" /> Mjetet laboratorike
            </p>
            <div className="flex flex-wrap gap-1.5">
              {experiment.equipment.map((eq, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-[10px] text-foreground border border-border/50">
                  <Wrench className="w-2.5 h-2.5 text-muted-foreground" />
                  {eq.name} <span className="text-muted-foreground">×{eq.quantity}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Chemicals */}
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FlaskConical className="w-3 h-3" /> Kimikatet & sasitë
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-1 pr-3 font-medium text-muted-foreground">Kimikati</th>
                    <th className="text-left py-1 pr-3 font-medium text-muted-foreground">Formula</th>
                    <th className="text-right py-1 font-medium text-muted-foreground">Sasia</th>
                  </tr>
                </thead>
                <tbody>
                  {experiment.chemicals.map((ch, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0">
                      <td className="py-1 pr-3 text-foreground flex items-center gap-1.5">
                        <FlaskConical className="w-2.5 h-2.5 text-primary shrink-0" />
                        {ch.name}
                      </td>
                      <td className="py-1 pr-3 font-mono-code text-muted-foreground">{ch.formula}</td>
                      <td className="py-1 text-right text-foreground font-medium">{ch.quantity} {ch.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
