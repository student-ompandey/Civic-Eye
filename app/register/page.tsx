'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Field validations
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const validate = () => {
    let isValid = true;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!fullName.trim()) {
      setNameError('Full Name is required');
      isValid = false;
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed. Please try again.');
      } else {
        setSuccessMsg('Account created successfully! Logging you in...');
        router.refresh();
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (err: unknown) {
      setErrorMsg('An unexpected error occurred. Please check your network connection.');
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
            className="inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </Link>

          <Card className="border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold tracking-tighter text-white">Create an Account</CardTitle>
              <CardDescription className="text-zinc-400">Join citizens reporting local issues to improve our city</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                
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

                {/* Full Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold tracking-wide text-zinc-400">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    className={`w-full h-10 px-3 rounded-lg border bg-zinc-900/50 text-white outline-hidden transition-all text-sm ${
                      nameError ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30'
                    }`}
                  />
                  {nameError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{nameError}</span>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold tracking-wide text-zinc-400">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className={`w-full h-10 px-3 rounded-lg border bg-zinc-900/50 text-white outline-hidden transition-all text-sm ${
                      emailError ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30'
                    }`}
                  />
                  {emailError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{emailError}</span>}
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs font-semibold tracking-wide text-zinc-400">
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
                      className={`w-full h-10 pl-3 pr-10 rounded-lg border bg-zinc-900/50 text-white outline-hidden transition-all text-sm ${
                        passwordError ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30'
                      }`}
                    />
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 tracking-wide text-zinc-400 hover:text-foreground cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                  {passwordError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{passwordError}</span>}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-xs font-semibold tracking-wide text-zinc-400">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    className={`w-full h-10 px-3 rounded-lg border bg-zinc-900/50 text-white outline-hidden transition-all text-sm ${
                      confirmPasswordError ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-zinc-800 focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30'
                    }`}
                  />
                  {confirmPasswordError && <span className="text-[10px] text-red-500 font-semibold mt-0.5">{confirmPasswordError}</span>}
                </div>

                {/* Register Button */}
                <Button type="submit" loading={loading} className="w-full bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none mt-2">
                  Create Account
                </Button>

              </form>
            </CardContent>

            <CardFooter className="justify-center border-t border-zinc-800 py-4 bg-zinc-900/30 rounded-b-xl">
              <p className="text-xs tracking-wide text-zinc-400">
                Already have an account?{' '}
                <Link href="/login" className="text-[#ff4a1c] font-bold tracking-wide hover:underline">
                  Sign In
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </PageContainer>
    </div>
  );
}
