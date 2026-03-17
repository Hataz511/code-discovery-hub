import { mockEquipment } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench } from 'lucide-react';
import type { EquipmentStatus } from '@/types/clms';

const statusConfig: Record<EquipmentStatus, { label: string; color: string }> = {
  available: { label: 'Disponueshme', color: 'border-success/30 text-success' },
  in_use: { label: 'Në Përdorim', color: 'border-accent/30 text-accent' },
  maintenance: { label: 'Mirëmbajtje', color: 'border-warning/30 text-warning' },
  out_of_order: { label: 'Jashtë Funksionit', color: 'border-destructive/30 text-destructive' },
};

export default function EquipmentPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {mockEquipment.map(eq => {
        const cfg = statusConfig[eq.status];
        return (
          <Card key={eq.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{eq.name}</p>
                  </div>
                  <div className="space-y-0.5 text-[11px] text-muted-foreground">
                    <p>Model: <span className="text-foreground">{eq.model}</span></p>
                    <p>Lokacioni: <span className="text-foreground">{eq.location}</span></p>
                    <p>Kalibrim pasardhës: <span className="text-foreground font-mono-code">{eq.nextCalibration}</span></p>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] ${cfg.color}`}>{cfg.label}</Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
