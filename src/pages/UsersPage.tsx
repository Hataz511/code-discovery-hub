import { mockUsers } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users as UsersIcon, Shield } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import type { UserRole, HazardLevel } from '@/types/clms';

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator', lab_manager: 'Lab Manager', professor: 'Profesor',
  lab_technician: 'Teknik', lab_supervisor: 'Supervizor', student: 'Student', auditor: 'Auditor',
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-destructive/10 text-destructive border-destructive/20',
  lab_manager: 'bg-primary/10 text-primary border-primary/20',
  professor: 'bg-accent/10 text-accent border-accent/20',
  lab_technician: 'bg-warning/10 text-warning border-warning/20',
  lab_supervisor: 'bg-warning/10 text-warning border-warning/20',
  student: 'bg-secondary text-secondary-foreground border-border',
  auditor: 'bg-muted text-muted-foreground border-border',
};

export default function UsersPage() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs">Përdoruesi</TableHead>
              <TableHead className="text-xs">Email</TableHead>
              <TableHead className="text-xs">Roli</TableHead>
              <TableHead className="text-xs">Departamenti</TableHead>
              <TableHead className="text-xs">Clearance</TableHead>
              <TableHead className="text-xs">Statusi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map(user => (
              <TableRow key={user.id} className="border-border">
                <TableCell className="text-xs font-medium">{user.fullName}</TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono-code">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{user.department}</TableCell>
                <TableCell>
                  <span className="text-[10px] font-mono-code text-muted-foreground">{user.hazardClearanceLevel}</span>
                </TableCell>
                <TableCell>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-success' : 'bg-muted-foreground'}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
