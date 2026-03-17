import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function WastePage() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-12 text-center">
        <Trash2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-display font-semibold text-foreground mb-1">Menaxhimi i Mbetjeve</p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Regjistrimi i mbetjeve kimike do të aktivizohet së shpejti.
        </p>
      </CardContent>
    </Card>
  );
}
