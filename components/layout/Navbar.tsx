'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Eye, AlertTriangle, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/shared/PageContainer';
import { AnimatePresence, motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    const getInitialSession = async () => {
      try {
        const { data: { user: initialUser } } = await supabase.auth.getUser();
        setUser(initialUser);
      } catch (err) {
        console.error('Error fetching user session:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Nav links based on auth state
  const navLinks = user
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'My Reports', href: '/my-reports' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Explore Issues', href: '/#explore' },
        { name: 'How It Works', href: '/#how-it-works' },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-md">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-brand-navy dark:text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-white shadow-md shadow-brand-blue/20">
              <Eye className="h-5 w-5" />
            </div>
            <span>
              Civic<span className="text-brand-blue">Eye</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {!loading && navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2 border border-border/40 bg-muted/20 px-3 py-1.5 rounded-full font-medium">
                      <UserIcon className="h-3.5 w-3.5" />
                      <span className="max-w-[120px] truncate">{user.email}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="font-semibold cursor-pointer">
                      Sign Out
                    </Button>
                    <Link href="/dashboard">
                      <Button variant="default" size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white shadow-sm font-semibold cursor-pointer">
                        <AlertTriangle className="h-4 w-4 mr-1.5" />
                        Report Issue
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="font-semibold cursor-pointer">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="default" size="sm" className="bg-brand-blue hover:bg-brand-blue/90 text-white shadow-sm font-semibold cursor-pointer">
                        <AlertTriangle className="h-4 w-4 mr-1.5" />
                        Report Issue
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </PageContainer>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border/40 bg-background"
          >
            <div className="space-y-1 px-4 py-4 pb-6">
              {!loading && navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  {link.name}
                </Link>
              ))}
              
              {!loading && (
                <div className="pt-4 flex flex-col gap-2 border-t border-border/40 mt-4 px-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 rounded-md bg-muted/20 font-medium truncate mb-2">
                        <UserIcon className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <Button variant="outline" onClick={() => { setIsOpen(false); handleSignOut(); }} className="w-full justify-center cursor-pointer">
                        Sign Out
                      </Button>
                      <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full">
                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white justify-center cursor-pointer">
                          <AlertTriangle className="h-4 w-4 mr-1.5" />
                          Report Issue
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                        <Button variant="outline" className="w-full justify-center cursor-pointer">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white justify-center cursor-pointer">
                          <AlertTriangle className="h-4 w-4 mr-1.5" />
                          Report Issue
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
