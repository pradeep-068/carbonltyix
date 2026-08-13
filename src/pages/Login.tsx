import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Globe } from 'lucide-react';

function safeNext(raw: string | null): string {
  if (!raw) return '/';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
  return raw;
}

export default function Login() {
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      window.location.href = next;
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}${next}` },
    });
    setBusy(false);
    if (error) return setError(error.message);
    setNotice('Account created. If email confirmation is required, check your inbox, then sign in.');
    setMode('signin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm panel-glow p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-8 w-8 rounded-full border border-primary/40 flex items-center justify-center">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <h1 className="font-display text-sm font-bold tracking-wider">
            <span className="text-foreground">UHV </span>
            <span className="text-primary">SYNC</span>
          </h1>
        </div>

        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          {mode === 'signin' ? 'Operator sign in' : 'Create operator account'}
        </p>

        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-primary"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-muted/30 border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-primary"
          />
          {error && <p className="text-xs font-mono text-destructive">{error}</p>}
          {notice && <p className="text-xs font-mono text-primary">{notice}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-primary/15 border border-primary/40 text-primary text-xs font-mono uppercase tracking-wider py-2.5 hover:bg-primary/25 transition-colors disabled:opacity-50"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          {mode === 'signin' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
