import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, X, Cloud, CloudOff, Loader2, LogOut, Trash2 } from 'lucide-react';
import type { User as AuthUser } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  deleteCloudData,
  signInWithMagicLink,
  signOut,
  type SyncStatus,
} from '../lib/sync';

interface AccountProps {
  syncStatus: SyncStatus;
  lastSyncAt: string | null;
  syncError: string | null;
  onUserChange: (user: AuthUser | null) => void;
  onRequestSync: () => void;
  onToast: (msg: string) => void;
}

export function Account({
  syncStatus,
  lastSyncAt,
  syncError,
  onUserChange,
  onRequestSync,
  onToast,
}: AccountProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    if (!supabase) {
      onUserChange(null);
      return;
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const u = data.session?.user ?? null;
      setUser(u);
      onUserChange(u);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      onUserChange(u);
      if (u) setLinkSent(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [onUserChange]);

  const statusLabel = (() => {
    if (!isSupabaseConfigured) return 'Cloud sync unavailable';
    if (syncStatus === 'syncing') return 'Syncing…';
    if (syncStatus === 'error') return syncError || 'Sync error';
    if (syncStatus === 'synced' && lastSyncAt) {
      return `Synced ${new Date(lastSyncAt).toLocaleString()}`;
    }
    if (user) return 'Signed in — local-first sync';
    return 'Local only — sign in to sync';
  })();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    const result = await signInWithMagicLink(email);
    setBusy(false);
    if (!result.ok) {
      onToast(result.error || 'Could not send magic link');
      return;
    }
    setLinkSent(true);
    onToast('Check your email for the sign-in link.');
  };

  const handleSignOut = async () => {
    setBusy(true);
    const result = await signOut();
    setBusy(false);
    if (!result.ok) {
      onToast(result.error || 'Sign out failed');
      return;
    }
    onToast('Signed out. Local notes stay on this device.');
    setOpen(false);
  };

  const handleDeleteCloud = async () => {
    if (!user) return;
    const ok = window.confirm(
      'Delete all synced notes and explored progress from your account in the cloud? Data on this device will NOT be deleted.'
    );
    if (!ok) return;
    setBusy(true);
    const result = await deleteCloudData();
    setBusy(false);
    if (!result.ok) {
      onToast(result.error || 'Could not delete cloud data');
      return;
    }
    onToast('Cloud study data deleted. Local copy kept.');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1c1917] border border-[#3b3834] text-[#e3ddce] text-[10px] font-semibold uppercase tracking-widest rounded-sm hover:border-[#d4af37]/40 transition-colors"
        aria-label="Account and sync"
      >
        <User className="w-4 h-4 text-[#d4af37]" aria-hidden="true" />
        <span className="hidden sm:inline">{user ? 'Account' : 'Sign in'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/65"
              aria-label="Close account panel"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="account-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md border border-[#ded5be]/40 bg-[#f3eedb] text-[#24221f] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.55)] p-6 sm:p-7"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#8a7b66] hover:text-[#2b251e]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8a7b66] mb-2">
                Account
              </p>
              <h2 id="account-title" className="font-serif text-2xl font-bold text-[#2b251e] mb-1">
                Sync &amp; sign-in
              </h2>
              <p className="font-sans text-xs text-[#5c5448] mb-5 leading-relaxed">
                Optional cloud sync. The Study Desk always works offline with local notes — accounts never block reading.
              </p>

              <div className="flex items-start gap-2 mb-5 p-3 bg-[#efe8d4] border border-[#ded5be]/80 rounded-sm">
                {syncStatus === 'syncing' ? (
                  <Loader2 className="w-4 h-4 text-[#18392b] animate-spin shrink-0 mt-0.5" />
                ) : user ? (
                  <Cloud className="w-4 h-4 text-[#18392b] shrink-0 mt-0.5" />
                ) : (
                  <CloudOff className="w-4 h-4 text-[#8a7b66] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-sans text-xs text-[#2b251e] font-semibold">{statusLabel}</p>
                  {user && (
                    <p className="font-sans text-[11px] text-[#5c5448] mt-0.5 break-all">{user.email}</p>
                  )}
                  {!isSupabaseConfigured && (
                    <p className="font-sans text-[11px] text-[#8a7b66] mt-1">
                      Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local to enable.
                    </p>
                  )}
                </div>
              </div>

              {!user && isSupabaseConfigured && (
                <form onSubmit={handleSignIn} className="space-y-3">
                  <label className="block">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#8a7b66] font-semibold">
                      Email magic link
                    </span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full min-h-[44px] px-3 py-2 bg-white border border-[#ded5be] rounded-sm text-sm text-[#2b251e] placeholder-[#a39a8c] focus:outline-none focus:border-[#18392b]"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#18392b] text-[#f2edd9] border border-[#d4af37]/45 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#1f4a38] disabled:opacity-60 transition-colors"
                  >
                    {busy ? 'Sending…' : linkSent ? 'Link sent — check email' : 'Email me a sign-in link'}
                  </button>
                </form>
              )}

              {user && (
                <div className="space-y-3">
                  <button
                    type="button"
                    disabled={busy || syncStatus === 'syncing'}
                    onClick={onRequestSync}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#18392b] text-[#f2edd9] border border-[#d4af37]/45 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#1f4a38] disabled:opacity-60 transition-colors"
                  >
                    Sync now
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleSignOut}
                    className="w-full min-h-[44px] px-4 py-2.5 inline-flex items-center justify-center gap-2 bg-transparent text-[#2b251e] border border-[#8a7b66]/50 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-[#2b251e] disabled:opacity-60 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleDeleteCloud}
                    className="w-full min-h-[44px] px-4 py-2.5 inline-flex items-center justify-center gap-2 bg-transparent text-[#7a3b32] border border-[#7a3b32]/40 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-[#2b251e] disabled:opacity-60 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete my cloud data
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
