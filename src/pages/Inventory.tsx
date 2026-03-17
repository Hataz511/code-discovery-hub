import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Plus, Filter, AlertTriangle, Clock, Package,
  ChevronDown, MoreHorizontal, FileText, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockChemicals } from '@/data/mockData';
import type { Chemical, HazardLevel, ChemicalUnit } from '@/types/clms';

const hazardColors: Record<HazardLevel, string> = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive/20 text-destructive border-destructive/40',
};

const hazardLabels: Record<HazardLevel, string> = {
  low: 'I Ulët', medium: 'Mesatar', high: 'I Lartë', critical: 'Kritik',
};

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [hazardFilter, setHazardFilter] = useState<HazardLevel | 'all'>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [chemicals, setChemicals] = useState(mockChemicals);

  // Form state
  const [form, setForm] = useState({
    name: '', casNumber: '', formula: '', hazardLevel: 'low' as HazardLevel,
    quantity: '', unit: 'mL' as ChemicalUnit, minimumStock: '', location: '',
    expiryDate: '', supplier: '',
  });

  const filtered = useMemo(() => {
    return chemicals.filter(c => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.casNumber.includes(search) || c.formula.toLowerCase().includes(search.toLowerCase());
      const matchHazard = hazardFilter === 'all' || c.hazardLevel === hazardFilter;
      return matchSearch && matchHazard;
    });
  }, [chemicals, search, hazardFilter]);

  const handleAdd = () => {
    const newChem: Chemical = {
      id: `c-${Date.now()}`,
      name: form.name,
      casNumber: form.casNumber,
      formula: form.formula,
      hazardLevel: form.hazardLevel,
      quantity: Number(form.quantity),
      unit: form.unit,
      minimumStock: Number(form.minimumStock),
      location: form.location,
      expiryDate: form.expiryDate,
      supplier: form.supplier,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setChemicals(prev => [newChem, ...prev]);
    setShowAddDialog(false);
    setForm({ name: '', casNumber: '', formula: '', hazardLevel: 'low', quantity: '', unit: 'mL', minimumStock: '', location: '', expiryDate: '', supplier: '' });
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Kërko kimikat, CAS, formulë..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm bg-muted border-border"
            />
          </div>
          <Select value={hazardFilter} onValueChange={v => setHazardFilter(v as HazardLevel | 'all')}>
            <SelectTrigger className="w-36 h-9 text-sm bg-muted border-border">
              <Filter className="w-3.5 h-3.5 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Të gjitha</SelectItem>
              <SelectItem value="low">I Ulët</SelectItem>
              <SelectItem value="medium">Mesatar</SelectItem>
              <SelectItem value="high">I Lartë</SelectItem>
              <SelectItem value="critical">Kritik</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowAddDialog(true)} size="sm" className="h-9">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Shto Kimikat
        </Button>
      </div>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs">Emri</TableHead>
                <TableHead className="text-xs">Formula</TableHead>
                <TableHead className="text-xs">CAS</TableHead>
                <TableHead className="text-xs">Rreziku</TableHead>
                <TableHead className="text-xs text-right">Sasia</TableHead>
                <TableHead className="text-xs">Lokacioni</TableHead>
                <TableHead className="text-xs">Skadimi</TableHead>
                <TableHead className="text-xs">Statusi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(chem => {
                const isLowStock = chem.quantity <= chem.minimumStock;
                const daysToExpiry = Math.ceil((new Date(chem.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const isExpiring = daysToExpiry <= 30;
                return (
                  <TableRow key={chem.id} className="border-border">
                    <TableCell className="text-xs font-medium">{chem.name}</TableCell>
                    <TableCell className="text-xs font-mono-code text-muted-foreground">{chem.formula}</TableCell>
                    <TableCell className="text-xs font-mono-code text-muted-foreground">{chem.casNumber}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${hazardColors[chem.hazardLevel]}`}>
                        {hazardLabels[chem.hazardLevel]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-right font-mono-code">
                      <span className={isLowStock ? 'text-destructive font-semibold' : ''}>
                        {chem.quantity}
                      </span>
                      <span className="text-muted-foreground"> {chem.unit}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{chem.location}</TableCell>
                    <TableCell className="text-xs font-mono-code">
                      <span className={isExpiring ? (daysToExpiry <= 10 ? 'text-destructive' : 'text-warning') : 'text-muted-foreground'}>
                        {new Date(chem.expiryDate).toLocaleDateString('sq-AL')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {isLowStock && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-destructive">
                            <AlertTriangle className="w-3 h-3" /> Low
                          </span>
                        )}
                        {isExpiring && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-warning">
                            <Clock className="w-3 h-3" /> {daysToExpiry}d
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-[11px] text-muted-foreground font-mono-code">
        {filtered.length} kimikate nga {chemicals.length} total
      </p>

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
                <Select value={form.unit} onValueChange={v => setForm(f => ({ ...f, unit: v as ChemicalUnit }))}>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Lokacioni *</Label>
                <Input className="h-8 text-sm bg-muted" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Data e Skadimit *</Label>
                <Input type="date" className="h-8 text-sm bg-muted" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Furnizuesi</Label>
              <Input className="h-8 text-sm bg-muted" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShowAddDialog(false)}>Anulo</Button>
            <Button size="sm" onClick={handleAdd} disabled={!form.name || !form.casNumber || !form.formula}>Regjistro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
