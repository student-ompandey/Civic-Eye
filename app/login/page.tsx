'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { createClient } from '@/lib/supabase/client';

export default function Login() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Field validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validate = () => {
    let isValid = true;
    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('Invalid email or password. Please try again.');
        } else {
          setErrorMsg(error.message);
        }
      } else {
        setSuccessMsg('Logged in successfully! Redirecting...');
        // Refresh router context and redirect
        router.refresh();
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'An unexpected error occurred. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 relative overflow-hidden bg-radial from-brand-blue/5 via-transparent to-transparent">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.92_0.01_250_/_30%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.01_250_/_30%)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,oklch(0.22_0.03_250_/_30%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0.03_250_/_30%)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <PageContainer className="max-w-md w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>

          <Card className="border-border/60 bg-background/80 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight">Sign In to Civic Eye</CardTitle>
              <CardDescription>Enter your email and password to access your dashboard</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-3.5 rounded-lg bg-red-100/70 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-950/30 flex items-start gap-2 text-xs font-semibold">
                    <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Success Banner */}
                {successMsg && (
                  <div className="p-3.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-950/30 flex items-start gap-2 text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className={`w-full h-10 px-3 rounded-lg border bg-background/50 outline-hidden transition-all text-sm ${
                      emailError ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/80 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30'
                    }`}
                  />
                  {emailError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{emailError}</span>}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs font-semibold text-muted-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className={`w-full h-10 pl-3 pr-10 rounded-lg border bg-background/50 outline-hidden transition-all text-sm ${
                        passwordError ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-border/80 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30'
                      }`}
                    />
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                  {passwordError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{passwordError}</span>}
                </div>

                {/* Sign In Button */}
                <Button type="submit" loading={loading} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold shadow-xs mt-2">
                  Sign In
                </Button>

              </form>
            </CardContent>

            <CardFooter className="justify-center border-t border-border/40 py-4 bg-muted/20 rounded-b-xl">
              <p className="text-xs text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-brand-blue font-semibold hover:underline">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </PageContainer>
    </div>
  );
}
