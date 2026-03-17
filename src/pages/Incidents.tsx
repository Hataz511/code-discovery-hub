import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function IncidentsPage() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-12 text-center">
        <Shield className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-display font-semibold text-foreground mb-1">Menaxhimi i Incidenteve</p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Regjistrimi i incidenteve të sigurisë do të aktivizohet së shpejti.
        </p>
      </CardContent>
    </Card>
  );
}
