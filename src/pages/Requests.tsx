import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, AlertTriangle, Shield, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type RequestStatus = 'pending' | 'approved_level1' | 'approved' | 'rejected' | 'dispensed';
type HazardLevel = 'low' | 'medium' | 'high' | 'critical';

interface RequestRow {
  id: string;
  chemical_id: string;
  requester_id: string;
  quantity: number;
  unit: string;
  justification: string;
  experiment_ref: string | null;
  hazard_level: HazardLevel;
  status: RequestStatus;
  reviewer_comment: string | null;
  reviewer_id: string | null;
  created_at: string;
  updated_at: string;
}

interface ChemicalOption {
  id: string;
  name: string;
  formula: string;
  hazard_level: HazardLevel;
}

const statusConfig: Record<RequestStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Në Pritje', color: 'border-warning/30 text-warning', icon: Clock },
  approved_level1: { label: 'Aprovuar Niv.1', color: 'border-accent/30 text-accent-foreground', icon: CheckCircle },
  approved: { label: 'Aprovuar', color: 'border-primary/30 text-primary', icon: CheckCircle },
  rejected: { label: 'Refuzuar', color: 'border-destructive/30 text-destructive', icon: XCircle },
  dispensed: { label: 'Shpërndarë', color: 'border-primary/30 text-primary', icon: CheckCircle },
};

export default function RequestsPage() {
  const { user, hasRole } = useAuth();
  const canReview = hasRole('admin') || hasRole('lab_manager') || hasRole('professor');

  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [chemicals, setChemicals] = useState<ChemicalOption[]>([]);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [reviewDialog, setReviewDialog] = useState<RequestRow | null>(null);
  const [comment, setComment] = useState('');

  const [form, setForm] = useState({
    chemical_id: '', quantity: '', unit: 'mL', justification: '', experiment_ref: '',
  });

  const fetchData = async () => {
    const [reqRes, chemRes, profRes] = await Promise.all([
      supabase.from('chemical_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('chemicals').select('id, name, formula, hazard_level'),
      supabase.from('profiles').select('user_id, full_name'),
    ]);
    if (reqRes.data) setRequests(reqRes.data as any[]);
    if (chemRes.data) setChemicals(chemRes.data as any[]);
    if (profRes.data) {
      const map: Record<string, string> = {};
      profRes.data.forEach((p: any) => { map[p.user_id] = p.full_name; });
      setProfiles(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const chemicalMap = useMemo(() => {
    const m: Record<string, ChemicalOption> = {};
    chemicals.forEach(c => { m[c.id] = c; });
    return m;
  }, [chemicals]);

  const handleAdd = async () => {
    if (!form.chemical_id || !form.quantity || !form.justification) {
      toast.error('Plotëso të gjitha fushat e detyrueshme');
      return;
    }
    const chem = chemicalMap[form.chemical_id];
    const { error } = await supabase.from('chemical_requests').insert({
      chemical_id: form.chemical_id,
      requester_id: user!.id,
      quantity: Number(form.quantity),
      unit: form.unit as any,
      justification: form.justification,
      experiment_ref: form.experiment_ref || null,
      hazard_level: chem?.hazard_level || 'low',
    } as any);
    if (error) { toast.error('Gabim në shtim'); return; }
    toast.success('Kërkesa u shtua me sukses');
    setAddOpen(false);
    setForm({ chemical_id: '', quantity: '', unit: 'mL', justification: '', experiment_ref: '' });
    fetchData();
  };

  const handleDecision = async (status: 'approved' | 'approved_level1' | 'rejected') => {
    if (!reviewDialog || !comment.trim()) return;
    const { error } = await supabase.from('chemical_requests').update({
      status,
      reviewer_comment: comment,
      reviewer_id: user!.id,
    } as any).eq('id', reviewDialog.id);
    if (error) { toast.error('Gabim'); return; }
    toast.success(status === 'rejected' ? 'Kërkesa u refuzua' : 'Kërkesa u aprovua');
    setReviewDialog(null);
    setComment('');
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
      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
          {(['pending', 'approved_level1', 'approved', 'rejected'] as RequestStatus[]).map(status => {
            const count = requests.filter(r => r.status === status).length;
            const cfg = statusConfig[status];
            return (
              <Card key={status} className="bg-card border-border">
                <CardContent className="p-3 flex items-center gap-3">
                  <cfg.icon className={`w-4 h-4 ${cfg.color.split(' ')[1]}`} />
                  <div>
                    <p className="text-lg font-display font-bold">{count}</p>
                    <p className="text-[10px] text-muted-foreground">{cfg.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)} className="ml-3 gap-1.5 shrink-0">
          <Plus className="w-3.5 h-3.5" /> Shto Kërkesë
        </Button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {requests.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Nuk ka kërkesa ende</p>
            </CardContent>
          </Card>
        ) : requests.map(req => {
          const cfg = statusConfig[req.status];
          const chem = chemicalMap[req.chemical_id];
          const isHighRisk = req.hazard_level === 'high' || req.hazard_level === 'critical';
          return (
            <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-card border-border hover:border-border/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{chem?.name || 'Kimikat'}</p>
                        {chem && <span className="text-[10px] text-muted-foreground font-mono-code">{chem.formula}</span>}
                        {isHighRisk && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-destructive">
                            <Shield className="w-3 h-3" /> High-Risk
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                        <span>Kërkues: <span className="text-foreground">{profiles[req.requester_id] || 'N/A'}</span></span>
                        <span>Sasia: <span className="text-foreground font-mono-code">{req.quantity} {req.unit}</span></span>
                        {req.experiment_ref && <span>Ref: <span className="text-foreground font-mono-code">{req.experiment_ref}</span></span>}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">{req.justification}</p>
                      {req.reviewer_comment && (
                        <p className="text-[11px] mt-1.5 px-2 py-1 rounded bg-muted/50 border border-border/50">
                          <span className="text-muted-foreground">Koment: </span>
                          <span className="text-foreground">{req.reviewer_comment}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge variant="outline" className={`text-[10px] ${cfg.color}`}>{cfg.label}</Badge>
                      {canReview && (req.status === 'pending' || (req.status === 'approved_level1' && isHighRisk)) && (
                        <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => setReviewDialog(req)}>
                          Shqyrto
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Add Request Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-base">Shto Kërkesë të Re</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">Plotëso detajet e kërkesës për substancën kimike.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">Substanca Kimike *</Label>
              <Select value={form.chemical_id} onValueChange={v => setForm(f => ({ ...f, chemical_id: v }))}>
                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Zgjidh substancën" /></SelectTrigger>
                <SelectContent>
                  {chemicals.map(c => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">{c.name} ({c.formula})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label className="text-xs">Sasia *</Label>
                <Input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} className="h-8 text-xs" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Njësia</Label>
                <Select value={form.unit} onValueChange={v => setForm(f => ({ ...f, unit: v }))}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mL" className="text-xs">mL</SelectItem>
                    <SelectItem value="L" className="text-xs">L</SelectItem>
                    <SelectItem value="g" className="text-xs">g</SelectItem>
                    <SelectItem value="kg" className="text-xs">kg</SelectItem>
                    <SelectItem value="mol" className="text-xs">mol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Justifikimi / Arsyeja *</Label>
              <Textarea value={form.justification} onChange={e => setForm(f => ({ ...f, justification: e.target.value }))} className="text-xs min-h-[60px]" placeholder="Pse keni nevojë për këtë substancë..." />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Referenca e Eksperimentit</Label>
              <Input value={form.experiment_ref} onChange={e => setForm(f => ({ ...f, experiment_ref: e.target.value }))} className="h-8 text-xs" placeholder="p.sh. EXP-001" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setAddOpen(false)}>Anulo</Button>
            <Button size="sm" onClick={handleAdd}>Dërgo Kërkesën</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={!!reviewDialog} onOpenChange={() => { setReviewDialog(null); setComment(''); }}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-base">Shqyrto Kërkesën</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {chemicalMap[reviewDialog?.chemical_id || '']?.name} — {reviewDialog?.quantity} {reviewDialog?.unit}
            </DialogDescription>
          </DialogHeader>
          {reviewDialog && (
            <div className="space-y-3">
              <div className="p-2.5 rounded bg-muted/50 border border-border/50 text-xs space-y-1">
                <p><span className="text-muted-foreground">Kërkues:</span> {profiles[reviewDialog.requester_id] || 'N/A'}</p>
                <p><span className="text-muted-foreground">Justifikim:</span> {reviewDialog.justification}</p>
                {reviewDialog.experiment_ref && <p><span className="text-muted-foreground">Eksperiment:</span> {reviewDialog.experiment_ref}</p>}
              </div>
              {(reviewDialog.hazard_level === 'high' || reviewDialog.hazard_level === 'critical') && (
                <div className="flex items-center gap-2 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-destructive">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Kimikat me rrezikshmëri {reviewDialog.hazard_level === 'critical' ? 'kritike' : 'të lartë'} — kërkohet aprovim i dytë</span>
                </div>
              )}
              <Textarea
                placeholder="Komenti i shqyrtimit (i detyrueshëm)..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="text-sm bg-muted border-border min-h-[80px]"
              />
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30" onClick={() => handleDecision('rejected')} disabled={!comment.trim()}>
              <XCircle className="w-3.5 h-3.5 mr-1" /> Refuzo
            </Button>
            <Button size="sm" onClick={() => {
              const isHighRisk = reviewDialog?.hazard_level === 'high' || reviewDialog?.hazard_level === 'critical';
              const isFirstLevel = reviewDialog?.status === 'pending';
              handleDecision(isHighRisk && isFirstLevel ? 'approved_level1' : 'approved');
            }} disabled={!comment.trim()}>
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Aprovo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
