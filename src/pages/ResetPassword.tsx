import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    return hash.includes('type=recovery') || path === '/reset-password';
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere'); return; }
    if (password !== confirm) { setError('Fjalëkalimet nuk përputhen'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (!isRecovery) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p className="text-muted-foreground text-sm">Link i pavlefshëm ose i skaduar. Kërko një link të ri.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <FlaskConical className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">CLMS</h1>
        </div>

        <div className="card-elevated p-6">
          {success ? (
            <div className="text-center space-y-3">
              <p className="text-sm text-foreground font-medium">Fjalëkalimi u ndryshua me sukses!</p>
              <Button className="w-full h-9 text-sm" onClick={() => window.location.href = '/'}>
                Hyr në sistem
              </Button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <KeyRound className="w-4 h-4 text-primary" />
                <h2 className="font-display text-sm font-semibold">Ndrysho Fjalëkalimin</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPass" className="text-xs">Fjalëkalimi i ri</Label>
                <Input id="newPass" type="password" placeholder="Min. 6 karaktere"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="h-9 text-sm bg-muted border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPass" className="text-xs">Konfirmo fjalëkalimin</Label>
                <Input id="confirmPass" type="password" placeholder="Përsërit fjalëkalimin"
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  className="h-9 text-sm bg-muted border-border" />
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button type="submit" className="w-full h-9 text-sm font-medium" disabled={loading}>
                {loading ? 'Duke ndryshuar...' : 'Ndrysho Fjalëkalimin'}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
