import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

type LoginStep = 'login' | 'register';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [step, setStep] = useState<LoginStep>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) { setError('Shkruaj emailin tënd'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Plotëso të gjitha fushat'); return; }
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) setError(error);
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) { setError('Plotëso të gjitha fushat'); return; }
    if (password.length < 6) { setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere'); return; }
    setLoading(true);
    setError('');
    const { error } = await signUp(email, password, fullName);
    if (error) {
      setError(error);
    } else {
      setSuccess('Llogaria u krijua! Kontrollo emailin për konfirmim.');
      setStep('login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 status-glow-primary">
            <FlaskConical className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">CLMS</h1>
          <p className="text-xs text-muted-foreground mt-1">Chemical Laboratory Management System</p>
        </div>

        <div className="card-elevated p-6">
          {step === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-primary" />
                <h2 className="font-display text-sm font-semibold">Identifikimi</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input id="email" type="email" placeholder="email@uni.edu" value={email}
                  onChange={e => setEmail(e.target.value)} className="h-9 text-sm bg-muted border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs">Fjalëkalimi</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    className="h-9 text-sm bg-muted border-border pr-9" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}
              {success && <p className="text-xs text-success">{success}</p>}

              <Button type="submit" className="w-full h-9 text-sm font-medium" disabled={loading}>
                {loading ? 'Duke hyrë...' : 'Hyr'}
              </Button>

              <button type="button" onClick={() => { setStep('register'); setError(''); setSuccess(''); }}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                Nuk ke llogari? <span className="text-primary">Regjistrohu</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="w-4 h-4 text-primary" />
                <h2 className="font-display text-sm font-semibold">Regjistrimi</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs">Emri i plotë</Label>
                <Input id="fullName" placeholder="Emri Mbiemri" value={fullName}
                  onChange={e => setFullName(e.target.value)} className="h-9 text-sm bg-muted border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regEmail" className="text-xs">Email</Label>
                <Input id="regEmail" type="email" placeholder="email@uni.edu" value={email}
                  onChange={e => setEmail(e.target.value)} className="h-9 text-sm bg-muted border-border" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regPassword" className="text-xs">Fjalëkalimi</Label>
                <Input id="regPassword" type="password" placeholder="Min. 6 karaktere" value={password}
                  onChange={e => setPassword(e.target.value)} className="h-9 text-sm bg-muted border-border" />
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button type="submit" className="w-full h-9 text-sm font-medium" disabled={loading}>
                {loading ? 'Duke regjistruar...' : 'Regjistrohu'}
              </Button>

              <button type="button" onClick={() => { setStep('login'); setError(''); }}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Kthehu te identifikimi
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-6 font-mono-code">
          CLMS v1.0 · Secure Access
        </p>
      </motion.div>
    </div>
  );
}
