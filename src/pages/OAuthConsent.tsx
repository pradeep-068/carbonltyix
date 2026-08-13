import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Globe } from 'lucide-react';

type OAuthNamespace = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: any }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: any }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: any }>;
};

function oauth(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get('authorization_id') ?? '';
  const [details, setDetails] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError('Missing authorization_id');
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = '/login?next=' + encodeURIComponent(next);
        return;
      }
      if (active) setAccount(sess.session.user.email ?? null);
      const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await oauth().approveAuthorization(authorizationId)
      : await oauth().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError('No redirect returned by the authorization server.');
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? details?.client?.client_name ?? 'this client';
  const scopes: string[] = (details?.scope ?? '').split(' ').filter(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md panel-glow p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-8 w-8 rounded-full border border-primary/40 flex items-center justify-center">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <h1 className="font-display text-sm font-bold tracking-wider">
            <span className="text-foreground">UHV </span>
            <span className="text-primary">SYNC</span>
          </h1>
        </div>

        {error ? (
          <p className="text-xs font-mono text-destructive">
            Could not complete this authorization request: {error}
          </p>
        ) : !details ? (
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Loading…</p>
        ) : (
          <>
            <h2 className="text-base font-display font-bold mb-2">
              Connect {clientName} to Smart Carbon Grid
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              This lets {clientName} use this app as you.
            </p>

            <div className="space-y-1.5 mb-4">
              {account && (
                <div className="flex items-center justify-between py-1 border-b border-border/30">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Signed in as</span>
                  <span className="text-[11px] font-mono">{account}</span>
                </div>
              )}
              {details?.client?.redirect_uri && (
                <div className="flex items-center justify-between py-1 border-b border-border/30 gap-3">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Redirect</span>
                  <span className="text-[11px] font-mono truncate">{details.client.redirect_uri}</span>
                </div>
              )}
              {scopes.map((s) => (
                <div key={s} className="flex items-center justify-between py-1 border-b border-border/30">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Permission</span>
                  <span className="text-[11px] font-mono">
                    {s === 'email'
                      ? 'Share your email address'
                      : s === 'profile' || s === 'openid'
                        ? 'Share your basic profile'
                        : `Additional permission requested: ${s}`}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-mono text-muted-foreground mb-4">
              This does not bypass this app's permissions or backend policies.
            </p>

            <div className="flex gap-2">
              <button
                disabled={busy}
                onClick={() => decide(true)}
                className="flex-1 rounded-md bg-primary/15 border border-primary/40 text-primary text-xs font-mono uppercase tracking-wider py-2.5 hover:bg-primary/25 transition-colors disabled:opacity-50"
              >
                Approve
              </button>
              <button
                disabled={busy}
                onClick={() => decide(false)}
                className="flex-1 rounded-md border border-border text-muted-foreground text-xs font-mono uppercase tracking-wider py-2.5 hover:text-foreground transition-colors disabled:opacity-50"
              >
                Cancel connection
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
