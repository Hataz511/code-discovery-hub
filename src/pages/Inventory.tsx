import { useState, useMemo, useEffect } from 'react';
import {
  Search, Plus, Filter, AlertTriangle, Clock, Package, MapPin, Eye,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type HazardLevel = 'low' | 'medium' | 'high' | 'critical';

const hazardColors: Record<HazardLevel, string> = {
  low: 'bg-primary/10 text-primary border-primary/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive/20 text-destructive border-destructive/40',
};

const hazardLabels: Record<HazardLevel, string> = {
  low: 'I Ulët', medium: 'Mesatar', high: 'I Lartë', critical: 'Kritik',
};

const labLocations = [
  'Lab - Kimi e Përgjithshme', 'Lab - Kimi Fizike 1', 'Lab - Kimi Fizike 2',
  'Lab - Kimi Organike 1', 'Lab - Kimi Organike 2', 'Lab - Kimi Organike 3',
  'Lab - Kimi Analitike 1', 'Lab - Kimi Analitike 2', 'Lab - Bioteknologji',
  'Lab - Kimia e Mjedisit', 'Lab - Biokimia 1', 'Hazard Vault',
];

interface ChemRow {
  id: string; name: string; formula: string; cas_number: string;
  hazard_level: HazardLevel; quantity: number; unit: string;
  minimum_stock: number; location: string; expiry_date: string;
  supplier: string | null;
}

interface LocationRow {
  id: string; chemical_id: string; lab_name: string; quantity: number; unit: string; notes: string | null;
}

export default function InventoryPage() {
  const { user, hasRole } = useAuth();
  const canManage = hasRole('admin') || hasRole('lab_manager') || hasRole('lab_technician');

  const [search, setSearch] = useState('');
  const [hazardFilter, setHazardFilter] = useState<HazardLevel | 'all'>('all');
  const [labFilter, setLabFilter] = useState<string>('all');
  const [chemicals, setChemicals] = useState<ChemRow[]>([]);
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showLocDialog, setShowLocDialog] = useState<string | null>(null);
  const [addLocDialog, setAddLocDialog] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', casNumber: '', formula: '', hazardLevel: 'low' as HazardLevel,
    quantity: '', unit: 'mL', minimumStock: '', locations: [] as string[],
    expiryDate: '', supplier: '',
  });

  const [locForm, setLocForm] = useState({ lab_name: '', quantity: '', unit: 'mL', notes: '' });

  const fetchData = async () => {
    const [chemRes, locRes] = await Promise.all([
      supabase.from('chemicals').select('*').order('name'),
      supabase.from('chemical_locations').select('*'),
    ]);
    if (chemRes.data) setChemicals(chemRes.data as any[]);
    if (locRes.data) setLocations(locRes.data as any[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const locationsByChemical = useMemo(() => {
    const map: Record<string, LocationRow[]> = {};
    locations.forEach(l => {
      if (!map[l.chemical_id]) map[l.chemical_id] = [];
      map[l.chemical_id].push(l);
    });
    return map;
  }, [locations]);

  const filtered = useMemo(() => {
    return chemicals.filter(c => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.cas_number.includes(search) || c.formula.toLowerCase().includes(search.toLowerCase());
      const matchHazard = hazardFilter === 'all' || c.hazard_level === hazardFilter;
      const matchLab = labFilter === 'all' || c.location === labFilter ||
        (locationsByChemical[c.id] || []).some(l => l.lab_name === labFilter);
      return matchSearch && matchHazard && matchLab;
    });
  }, [chemicals, search, hazardFilter, labFilter, locationsByChemical]);

  const handleAdd = async () => {
    if (!form.name || !form.casNumber || !form.formula) {
      toast.error('Plotëso fushat e detyrueshme'); return;
    }
    const { data, error } = await supabase.from('chemicals').insert({
      name: form.name, cas_number: form.casNumber, formula: form.formula,
      hazard_level: form.hazardLevel, quantity: Number(form.quantity), unit: form.unit as any,
      minimum_stock: Number(form.minimumStock), location: form.locations[0] || 'Lab - Kimi e Përgjithshme',
      expiry_date: form.expiryDate, supplier: form.supplier || null, created_by: user?.id,
    } as any).select().single();
    if (error) { toast.error('Gabim në shtim'); return; }

    // Add locations
    if (data && form.locations.length > 0) {
      const locInserts = form.locations.map(lab => ({
        chemical_id: (data as any).id, lab_name: lab,
        quantity: Number(form.quantity) / form.locations.length,
        unit: form.unit,
      }));
      await supabase.from('chemical_locations').insert(locInserts as any);
    }

    toast.success('Kimikati u regjistrua');
    setShowAddDialog(false);
    setForm({ name: '', casNumber: '', formula: '', hazardLevel: 'low', quantity: '', unit: 'mL', minimumStock: '', locations: [], expiryDate: '', supplier: '' });
    fetchData();
  };

  const handleAddLocation = async () => {
    if (!addLocDialog || !locForm.lab_name || !locForm.quantity) {
      toast.error('Plotëso fushat'); return;
    }
    const { error } = await supabase.from('chemical_locations').insert({
      chemical_id: addLocDialog, lab_name: locForm.lab_name,
      quantity: Number(locForm.quantity), unit: locForm.unit,
      notes: locForm.notes || null, updated_by: user?.id,
    } as any);
    if (error) { toast.error('Gabim'); return; }
    toast.success('Lokacioni u shtua');
    setAddLocDialog(null);
    setLocForm({ lab_name: '', quantity: '', unit: 'mL', notes: '' });
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input placeholder="Kërko kimikat, CAS, formulë..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-sm bg-muted border-border" />
          </div>
          <Select value={hazardFilter} onValueChange={v => setHazardFilter(v as any)}>
            <SelectTrigger className="w-36 h-9 text-sm bg-muted border-border">
              <Filter className="w-3.5 h-3.5 mr-2" /><SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Të gjitha</SelectItem>
              <SelectItem value="low">I Ulët</SelectItem>
              <SelectItem value="medium">Mesatar</SelectItem>
              <SelectItem value="high">I Lartë</SelectItem>
              <SelectItem value="critical">Kritik</SelectItem>
            </SelectContent>
          </Select>
          <Select value={labFilter} onValueChange={v => setLabFilter(v)}>
            <SelectTrigger className="w-48 h-9 text-sm bg-muted border-border">
              <Package className="w-3.5 h-3.5 mr-2" /><SelectValue placeholder="Laboratori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Të gjitha laboratorët</SelectItem>
              {labLocations.map(lab => (
                <SelectItem key={lab} value={lab}>{lab.replace('Lab - ', '')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {canManage && (
          <Button onClick={() => setShowAddDialog(true)} size="sm" className="h-9">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Shto Kimikat
          </Button>
        )}
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs">Emri</TableHead>
                <TableHead className="text-xs">Formula</TableHead>
                <TableHead className="text-xs">CAS</TableHead>
                <TableHead className="text-xs">Rreziku</TableHead>
                <TableHead className="text-xs text-right">Sasia Totale</TableHead>
                <TableHead className="text-xs">Lokacionet</TableHead>
                <TableHead className="text-xs">Skadimi</TableHead>
                <TableHead className="text-xs">Statusi</TableHead>
                {canManage && <TableHead className="text-xs">Veprime</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(chem => {
                const isLowStock = chem.quantity <= chem.minimum_stock;
                const daysToExpiry = Math.ceil((new Date(chem.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const isExpiring = daysToExpiry <= 30;
                const locs = locationsByChemical[chem.id] || [];
                return (
                  <TableRow key={chem.id} className="border-border">
                    <TableCell className="text-xs font-medium">{chem.name}</TableCell>
                    <TableCell className="text-xs font-mono-code text-muted-foreground">{chem.formula}</TableCell>
                    <TableCell className="text-xs font-mono-code text-muted-foreground">{chem.cas_number}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${hazardColors[chem.hazard_level]}`}>
                        {hazardLabels[chem.hazard_level]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono-code">
                      <span className={isLowStock ? 'text-destructive font-semibold' : ''}>{chem.quantity}</span>
                      <span className="text-muted-foreground"> {chem.unit}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {locs.length > 0 ? locs.map(l => (
                          <Badge key={l.id} variant="outline" className="text-[9px] gap-0.5">
                            <MapPin className="w-2 h-2" /> {l.lab_name.replace('Lab - ', '')} ({l.quantity}{l.unit})
                          </Badge>
                        )) : (
                          <span className="text-[10px] text-muted-foreground">{chem.location.replace('Lab - ', '')}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono-code">
                      <span className={isExpiring ? (daysToExpiry <= 10 ? 'text-destructive' : 'text-warning') : 'text-muted-foreground'}>
                        {new Date(chem.expiry_date).toLocaleDateString('sq-AL')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {isLowStock && <span className="inline-flex items-center gap-0.5 text-[9px] text-destructive"><AlertTriangle className="w-3 h-3" /> Low</span>}
                        {isExpiring && <span className="inline-flex items-center gap-0.5 text-[9px] text-warning"><Clock className="w-3 h-3" /> {daysToExpiry}d</span>}
                      </div>
                    </TableCell>
                    {canManage && (
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowLocDialog(chem.id)}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setAddLocDialog(chem.id)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-[11px] text-muted-foreground font-mono-code">{filtered.length} kimikate nga {chemicals.length} total</p>

      {/* Add Chemical Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-base">Regjistro Kimikat të Ri</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Plotëso fushat e detyrueshme.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Emri *</Label>
                <Input className="h-8 text-sm bg-muted" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Formula *</Label>
                <Input className="h-8 text-sm bg-muted" value={form.formula} onChange={e => setForm(f => ({ ...f, formula: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">CAS Number *</Label>
                <Input className="h-8 text-sm bg-muted" placeholder="XXXX-XX-X" value={form.casNumber} onChange={e => setForm(f => ({ ...f, casNumber: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Niveli i Rrezikut *</Label>
                <Select value={form.hazardLevel} onValueChange={v => setForm(f => ({ ...f, hazardLevel: v as HazardLevel }))}>
                  <SelectTrigger className="h-8 text-sm bg-muted"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">I Ulët</SelectItem>
                    <SelectItem value="medium">Mesatar</SelectItem>
                    <SelectItem value="high">I Lartë</SelectItem>
                    <SelectItem value="critical">Kritik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Sasia *</Label>
                <Input type="number" className="h-8 text-sm bg-muted" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Njësia</Label>
                <Select value={form.unit} onValueChange={v => setForm(f => ({ ...f, unit: v }))}>
                  <SelectTrigger className="h-8 text-sm bg-muted"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mL">mL</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Min. Stok *</Label>
                <Input type="number" className="h-8 text-sm bg-muted" value={form.minimumStock} onChange={e => setForm(f => ({ ...f, minimumStock: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Laboratorët ku gjendet *</Label>
              <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-2 rounded bg-muted/50 border border-border">
                {labLocations.map(lab => (
                  <label key={lab} className="flex items-center gap-1.5 text-[11px] cursor-pointer">
                    <Checkbox
                      checked={form.locations.includes(lab)}
                      onCheckedChange={checked => {
                        setForm(f => ({
                          ...f,
                          locations: checked
                            ? [...f.locations, lab]
                            : f.locations.filter(l => l !== lab),
                        }));
                      }}
                    />
                    {lab.replace('Lab - ', '')}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Data e Skadimit *</Label>
                <Input type="date" className="h-8 text-sm bg-muted" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Furnizuesi</Label>
                <Input className="h-8 text-sm bg-muted" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowAddDialog(false)}>Anulo</Button>
            <Button size="sm" onClick={handleAdd} disabled={!form.name || !form.casNumber || !form.formula}>Regjistro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Locations Dialog */}
      <Dialog open={!!showLocDialog} onOpenChange={() => setShowLocDialog(null)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-sm">Lokacionet e Kimikatit</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {(locationsByChemical[showLocDialog || ''] || []).length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">Nuk ka lokacione të regjistruara</p>
            ) : (locationsByChemical[showLocDialog || ''] || []).map(loc => (
              <div key={loc.id} className="flex items-center justify-between p-2 rounded bg-muted/50 border border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-primary" />
                  <span className="text-xs">{loc.lab_name.replace('Lab - ', '')}</span>
                </div>
                <span className="text-xs font-mono-code">{loc.quantity} {loc.unit}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Location Dialog */}
      <Dialog open={!!addLocDialog} onOpenChange={() => setAddLocDialog(null)}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-sm">Shto Lokacion</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Dërgo substancën në një laborator tjetër</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">Laboratori</Label>
              <Select value={locForm.lab_name} onValueChange={v => setLocForm(f => ({ ...f, lab_name: v }))}>
                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Zgjidh laboratorin" /></SelectTrigger>
                <SelectContent>
                  {labLocations.map(lab => (
                    <SelectItem key={lab} value={lab} className="text-xs">{lab.replace('Lab - ', '')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Sasia</Label>
                <Input type="number" value={locForm.quantity} onChange={e => setLocForm(f => ({ ...f, quantity: e.target.value }))} className="h-8 text-xs" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Njësia</Label>
                <Select value={locForm.unit} onValueChange={v => setLocForm(f => ({ ...f, unit: v }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mL">mL</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Shënime</Label>
              <Input value={locForm.notes} onChange={e => setLocForm(f => ({ ...f, notes: e.target.value }))} className="h-8 text-xs" placeholder="Opsionale" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setAddLocDialog(null)}>Anulo</Button>
            <Button size="sm" onClick={handleAddLocation}>Dërgo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
