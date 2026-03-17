import { BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-12 text-center">
        <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-display font-semibold text-foreground mb-1">Analitika & AI</p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Parashikimi i konsumit dhe detektimi i anomalive do të aktivizohen kur sistemi të lidhet me backend.
        </p>
      </CardContent>
    </Card>
  );
}
