import { motion } from 'framer-motion';
import {
  Package, AlertTriangle, Clock, FileText, Beaker, TrendingUp,
  ArrowUpRight, ArrowDownRight, FlaskConical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDashboardStats, mockAlerts, mockRequests, mockChemicals } from '@/data/mockData';

const statCards = [
  { label: 'Total Kimikate', value: mockDashboardStats.totalChemicals, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Stok i Ulët', value: mockDashboardStats.lowStockCount, icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'Skadojnë Së Shpejti', value: mockDashboardStats.expiringCount, icon: Clock, color: 'text-destructive', bg: 'bg-destructive/10' },
  { label: 'Kërkesa në Pritje', value: mockDashboardStats.pendingRequests, icon: FileText, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'Eksperimente Aktive', value: mockDashboardStats.activeExperiments, icon: Beaker, color: 'text-success', bg: 'bg-success/10' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical' && !a.isRead);
  const pendingRequests = mockRequests.filter(r => r.status === 'pending' || r.status === 'approved_level1');
  const expiringChemicals = mockChemicals.filter(c => {
    const days = (new Date(c.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return days <= 30;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map(stat => (
          <motion.div key={stat.label} variants={item}>
            <Card className="bg-card border-border hover:border-primary/20 transition-colors">
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Critical Alerts */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Alarme Kritike
                {criticalAlerts.length > 0 && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                    {criticalAlerts.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockAlerts.slice(0, 5).map(alert => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-2.5 rounded-md bg-muted/50 border border-border/50"
                >
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    alert.severity === 'critical' ? 'bg-destructive' :
                    alert.severity === 'warning' ? 'bg-warning' : 'bg-accent'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{alert.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{alert.message}</p>
                  </div>
                  <Badge variant="outline" className={`text-[9px] shrink-0 ${
                    alert.severity === 'critical' ? 'border-destructive/30 text-destructive' :
                    alert.severity === 'warning' ? 'border-warning/30 text-warning' : 'border-accent/30 text-accent'
                  }`}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending Requests */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Kërkesat në Pritje
                {pendingRequests.length > 0 && (
                  <Badge className="text-[10px] px-1.5 py-0 bg-accent/10 text-accent border-0">
                    {pendingRequests.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingRequests.map(req => (
                <div key={req.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{req.chemicalName}</p>
                    <p className="text-[11px] text-muted-foreground">{req.requesterName} · {req.quantity}{req.unit}</p>
                  </div>
                  <Badge variant="outline" className={`text-[9px] shrink-0 ${
                    req.status === 'pending' ? 'border-warning/30 text-warning' : 'border-accent/30 text-accent'
                  }`}>
                    {req.status === 'pending' ? 'Në Pritje' : 'Nivel 1'}
                  </Badge>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">Asnjë kërkesë në pritje</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Expiring Chemicals */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning" />
                Kimikate që Skadojnë
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {expiringChemicals.map(chem => {
                const daysLeft = Math.ceil((new Date(chem.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={chem.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                    <div>
                      <p className="text-xs font-medium text-foreground">{chem.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono-code">{chem.formula} · {chem.casNumber}</p>
                    </div>
                    <span className={`text-[11px] font-mono-code font-medium ${daysLeft <= 10 ? 'text-destructive' : 'text-warning'}`}>
                      {daysLeft} ditë
                    </span>
                  </div>
                );
              })}
              {expiringChemicals.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">Asnjë kimikat afër skadimit</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Usage Chart (simple bar) */}
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Përdorimi Mujor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1.5 h-32">
                {mockDashboardStats.monthlyUsage.map((m, i) => {
                  const maxUsage = Math.max(...mockDashboardStats.monthlyUsage.map(x => x.usage));
                  const height = (m.usage / maxUsage) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm bg-primary/20 hover:bg-primary/40 transition-colors relative group"
                        style={{ height: `${height}%` }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono-code text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {m.usage}
                        </span>
                      </div>
                      <span className="text-[8px] text-muted-foreground font-mono-code">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
