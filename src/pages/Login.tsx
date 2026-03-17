import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Lock, KeyRound, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

type LoginStep = 'credentials' | 'otp';

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState<LoginStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Plotëso të gjitha fushat');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleOtp = () => {
    if (otp.length === 6) {
      onLogin();
    } else {
      setError('Fut kodin 6-shifror');
    }
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
          {step === 'credentials' ? (
            <form onSubmit={handleCredentials} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-primary" />
                <h2 className="font-display text-sm font-semibold">Identifikimi</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@uni.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="h-9 text-sm bg-muted border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs">Fjalëkalimi</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-9 text-sm bg-muted border-border pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button type="submit" className="w-full h-9 text-sm font-medium">
                Vazhdo
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <KeyRound className="w-4 h-4 text-primary" />
                <h2 className="font-display text-sm font-semibold">Verifikimi 2FA</h2>
              </div>

              <p className="text-xs text-muted-foreground">
                Kodi 6-shifror u dërgua në <span className="text-foreground font-medium">{email}</span>
              </p>

              <div className="flex justify-center py-2">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button onClick={handleOtp} className="w-full h-9 text-sm font-medium">
                Verifiko & Hyr
              </Button>

              <button
                onClick={() => { setStep('credentials'); setOtp(''); setError(''); }}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Kthehu pas
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-6 font-mono-code">
          CLMS v1.0 · Secure Access
        </p>
      </motion.div>
    </div>
  );
}
