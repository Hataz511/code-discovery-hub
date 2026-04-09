import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users as UsersIcon, Search, UserPlus, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  department: string | null;
  hazard_clearance_level: string | null;
  is_active: boolean | null;
  roles: AppRole[];
}

const roleLabels: Record<AppRole, string> = {
  admin: 'Administrator', lab_manager: 'Lab Manager', professor: 'Profesor',
  lab_technician: 'Teknik', lab_supervisor: 'Supervizor', student: 'Student', auditor: 'Auditor',
};

const roleColors: Record<AppRole, string> = {
  admin: 'bg-destructive/10 text-destructive border-destructive/20',
  lab_manager: 'bg-primary/10 text-primary border-primary/20',
  professor: 'bg-accent/10 text-accent border-accent/20',
  lab_technician: 'bg-warning/10 text-warning border-warning/20',
  lab_supervisor: 'bg-warning/10 text-warning border-warning/20',
  student: 'bg-secondary text-secondary-foreground border-border',
  auditor: 'bg-muted text-muted-foreground border-border',
};

const allRoles: AppRole[] = ['admin', 'lab_manager', 'professor', 'lab_technician', 'lab_supervisor', 'student', 'auditor'];

export default function UsersPage() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole('admin');
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [editUser, setEditUser] = useState<UserWithRole | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole>('student');

  const fetchUsers = async () => {
    setLoading(true);
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('user_roles').select('*'),
    ]);

    const rolesMap: Record<string, AppRole[]> = {};
    (rolesRes.data ?? []).forEach((r: any) => {
      if (!rolesMap[r.user_id]) rolesMap[r.user_id] = [];
      rolesMap[r.user_id].push(r.role);
    });

    const merged: UserWithRole[] = (profilesRes.data ?? []).map((p: any) => ({
      id: p.id,
      user_id: p.user_id,
      full_name: p.full_name,
      email: p.email,
      department: p.department,
      hazard_clearance_level: p.hazard_clearance_level,
      is_active: p.is_active,
      roles: rolesMap[p.user_id] || [],
    }));

    setUsers(merged);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChangeRole = async () => {
    if (!editUser) return;
    // Delete existing roles and insert new one
    const { error: delError } = await supabase.from('user_roles').delete().eq('user_id', editUser.user_id);
    if (delError) { toast.error('Gabim në fshirjen e rolit'); return; }

    const { error: insError } = await supabase.from('user_roles').insert({ user_id: editUser.user_id, role: selectedRole });
    if (insError) { toast.error('Gabim në caktimin e rolit'); return; }

    toast.success(`Roli u ndryshua në ${roleLabels[selectedRole]}`);
    setEditUser(null);
    fetchUsers();
  };

  const filtered = users.filter(u => {
    const matchSearch = u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || u.roles.includes(filterRole as AppRole);
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-4">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Kërko përdorues..."
              className="pl-9 h-9 text-xs"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue placeholder="Filtro sipas rolit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Të gjithë</SelectItem>
              {allRoles.map(r => (
                <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge variant="outline" className="text-xs">{filtered.length} përdorues</Badge>
      </div>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs">Përdoruesi</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Roli</TableHead>
                  <TableHead className="text-xs">Departamenti</TableHead>
                  <TableHead className="text-xs">Clearance</TableHead>
                  <TableHead className="text-xs">Statusi</TableHead>
                  {isAdmin && <TableHead className="text-xs">Veprime</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 7 : 6} className="text-center text-xs text-muted-foreground py-8">
                      Asnjë përdorues i gjetur
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map(user => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell className="text-xs font-medium">{user.full_name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono-code">{user.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {user.roles.map(role => (
                          <Badge key={role} variant="outline" className={`text-[10px] ${roleColors[role]}`}>
                            {roleLabels[role]}
                          </Badge>
                        ))}
                        {user.roles.length === 0 && (
                          <span className="text-[10px] text-muted-foreground">Pa rol</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{user.department || '—'}</TableCell>
                    <TableCell>
                      <span className="text-[10px] font-mono-code text-muted-foreground">{user.hazard_clearance_level || 'low'}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${user.is_active !== false ? 'bg-success' : 'bg-muted-foreground'}`} />
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs"
                          onClick={() => {
                            setEditUser(user);
                            setSelectedRole(user.roles[0] || 'student');
                          }}
                        >
                          <Shield className="w-3 h-3 mr-1" /> Ndrysho Rolin
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Role Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-display">Ndrysho Rolin</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-foreground">{editUser.full_name}</p>
                <p className="text-[11px] text-muted-foreground">{editUser.email}</p>
              </div>
              <Select value={selectedRole} onValueChange={v => setSelectedRole(v as AppRole)}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allRoles.map(r => (
                    <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditUser(null)}>Anulo</Button>
            <Button size="sm" onClick={handleChangeRole}>Ruaj</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
