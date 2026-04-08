import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, AlertTriangle, ArrowRightLeft, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DashboardTechnician() {
  const [stats, setStats] = useState({ chemicals: 0, locations: 0, lowStock: 0, equipment: 0 });
  const [recentLocations, setRecentLocations] = useState<any[]>([]);
  const [lowStockChems, setLowStockChems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [chems, locs, equip, locsData, chemsData] = await Promise.all([
        supabase.from('chemicals').select('id', { count: 'exact', head: true }),
        supabase.from('chemical_locations').select('id', { count: 'exact', head: true }),
        supabase.from('equipment').select('id', { count: 'exact', head: true }),
        supabase.from('chemical_locations').select('*, chemicals(name, formula)').order('updated_at', { ascending: false }).limit(8),
        supabase.from('chemicals').select('*').order('quantity', { ascending: true }).limit(5),
      ]);
      setStats({
        chemicals: chems.count ?? 0,
        locations: locs.count ?? 0,
        lowStock: 0,
        equipment: equip.count ?? 0,
      });
      setRecentLocations(locsData.data ?? []);
      setLowStockChems(chemsData.data ?? []);
    };
    load();
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div>
        <h1 className="text-lg font-display font-bold text-foreground">Paneli i Teknikut Laborant</h1>
        <p className="text-xs text-muted-foreground">Menaxhimi i inventarit, shpërndarja e substancave nëpër laboratore</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Kimikate', value: stats.chemicals, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Lokacione', value: stats.locations, icon: MapPin, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Pajisje', value: stats.equipment, icon: Wrench, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Stok i Ulët', value: lowStockChems.filter(c => c.quantity <= c.minimum_stock).length, icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
        ].map(stat => (
          <motion.div key={stat.label} variants={item}>
            <Card className="bg-card border-border">
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
        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-accent" />
                Shpërndarjet e Fundit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentLocations.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë shpërndarje</p>}
              {recentLocations.map(loc => (
                <div key={loc.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground">{(loc.chemicals as any)?.name ?? '—'}</p>
                    <p className="text-[11px] text-muted-foreground">{loc.lab_name}</p>
                  </div>
                  <span className="text-[11px] font-mono-code text-muted-foreground">{loc.quantity} {loc.unit}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Stoku më i Ulët
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lowStockChems.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Asnjë</p>}
              {lowStockChems.map(c => (
                <div key={c.id} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 border border-border/50">
                  <div>
                    <p className="text-xs font-medium text-foreground">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono-code">{c.formula}</p>
                  </div>
                  <span className={`text-[11px] font-mono-code font-medium ${c.quantity <= c.minimum_stock ? 'text-destructive' : 'text-foreground'}`}>
                    {c.quantity} {c.unit}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
