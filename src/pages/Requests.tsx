import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import { mockRequests } from '@/data/mockData';
import type { ChemicalRequest, RequestStatus } from '@/types/clms';

const statusConfig: Record<RequestStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Në Pritje', color: 'border-warning/30 text-warning', icon: Clock },
  approved_level1: { label: 'Aprovuar Niv.1', color: 'border-accent/30 text-accent', icon: CheckCircle },
  approved: { label: 'Aprovuar', color: 'border-success/30 text-success', icon: CheckCircle },
  rejected: { label: 'Refuzuar', color: 'border-destructive/30 text-destructive', icon: XCircle },
  dispensed: { label: 'Shpërndarë', color: 'border-primary/30 text-primary', icon: CheckCircle },
};

export default function RequestsPage() {
  const [requests, setRequests] = useState(mockRequests);
  const [reviewDialog, setReviewDialog] = useState<ChemicalRequest | null>(null);
  const [comment, setComment] = useState('');

  const handleDecision = (status: 'approved' | 'approved_level1' | 'rejected') => {
    if (!reviewDialog || !comment.trim()) return;
    setRequests(prev => prev.map(r =>
      r.id === reviewDialog.id
        ? { ...r, status, reviewerComment: comment, reviewerName: 'Dr. Elena Hoxha', updatedAt: new Date().toISOString() }
        : r
    ));
    setReviewDialog(null);
    setComment('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

      <div className="space-y-2">
        {requests.map(req => {
          const cfg = statusConfig[req.status];
          const isHighRisk = req.hazardLevel === 'high' || req.hazardLevel === 'critical';
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="bg-card border-border hover:border-border/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{req.chemicalName}</p>
                        {isHighRisk && (
                          <span className="inline-flex items-center gap-0.5 text-[9px] text-destructive">
                            <Shield className="w-3 h-3" /> High-Risk
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                        <span>Kërkues: <span className="text-foreground">{req.requesterName}</span></span>
                        <span>Sasia: <span className="text-foreground font-mono-code">{req.quantity}{req.unit}</span></span>
                        <span>Ref: <span className="text-foreground font-mono-code">{req.experimentRef}</span></span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">{req.justification}</p>
                      {req.reviewerComment && (
                        <p className="text-[11px] mt-1.5 px-2 py-1 rounded bg-muted/50 border border-border/50">
                          <span className="text-muted-foreground">Koment: </span>
                          <span className="text-foreground">{req.reviewerComment}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <Badge variant="outline" className={`text-[10px] ${cfg.color}`}>
                        {cfg.label}
                      </Badge>
                      {(req.status === 'pending' || (req.status === 'approved_level1' && isHighRisk)) && (
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

      {/* Review Dialog */}
      <Dialog open={!!reviewDialog} onOpenChange={() => { setReviewDialog(null); setComment(''); }}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-base">Shqyrto Kërkesën</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {reviewDialog?.chemicalName} — {reviewDialog?.quantity}{reviewDialog?.unit}
            </DialogDescription>
          </DialogHeader>
          {reviewDialog && (
            <div className="space-y-3">
              <div className="p-2.5 rounded bg-muted/50 border border-border/50 text-xs space-y-1">
                <p><span className="text-muted-foreground">Kërkues:</span> {reviewDialog.requesterName}</p>
                <p><span className="text-muted-foreground">Justifikim:</span> {reviewDialog.justification}</p>
                <p><span className="text-muted-foreground">Eksperiment:</span> {reviewDialog.experimentRef}</p>
              </div>
              {(reviewDialog.hazardLevel === 'high' || reviewDialog.hazardLevel === 'critical') && (
                <div className="flex items-center gap-2 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-destructive">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Kimikat me rrezikshmëri {reviewDialog.hazardLevel === 'critical' ? 'kritike' : 'të lartë'} — kërkohet aprovim i dytë</span>
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
              const isHighRisk = reviewDialog?.hazardLevel === 'high' || reviewDialog?.hazardLevel === 'critical';
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
