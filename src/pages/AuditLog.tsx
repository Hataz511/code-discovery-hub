import { mockAuditLog } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollText, Lock } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const actionColors: Record<string, string> = {
  LOGIN: 'text-primary',
  REQUEST_CREATED: 'text-accent',
  REQUEST_APPROVED_L1: 'text-success',
  CHEMICAL_UPDATED: 'text-warning',
  ACCESS_DENIED: 'text-destructive',
  USER_CREATED: 'text-primary',
};

export default function AuditLogPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="w-3.5 h-3.5" />
        <span>Audit log i pandryshueshëm — çdo veprim regjistrohet dhe nuk mund të fshihet</span>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs">Koha</TableHead>
                <TableHead className="text-xs">Përdoruesi</TableHead>
                <TableHead className="text-xs">Veprimi</TableHead>
                <TableHead className="text-xs">Moduli</TableHead>
                <TableHead className="text-xs">Detajet</TableHead>
                <TableHead className="text-xs">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLog.map(entry => (
                <TableRow key={entry.id} className="border-border">
                  <TableCell className="text-[11px] font-mono-code text-muted-foreground whitespace-nowrap">
                    {new Date(entry.timestamp).toLocaleString('sq-AL', { dateStyle: 'short', timeStyle: 'short' })}
                  </TableCell>
                  <TableCell className="text-xs">{entry.userName}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-mono-code font-medium ${actionColors[entry.action] || 'text-foreground'}`}>
                      {entry.action}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{entry.module}</TableCell>
                  <TableCell className="text-[11px] text-muted-foreground max-w-[200px] truncate">{entry.details}</TableCell>
                  <TableCell className="text-[10px] font-mono-code text-muted-foreground">{entry.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
