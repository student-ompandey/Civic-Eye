'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserSession = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };
    getUserSession();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <PageContainer className="py-10 flex flex-col gap-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/40"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Citizen Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, <span className="font-semibold text-foreground">{user.email}</span>. Monitor and report issues in your neighborhood.
          </p>
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold shadow-xs shrink-0 cursor-pointer">
          <Plus className="h-4.5 w-4.5 mr-1" />
          Report New Issue
        </Button>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverEffect={false}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Total Reported
            </CardTitle>
            <FileText className="h-4 w-4 text-brand-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-[10px] text-muted-foreground mt-1">Issues submitted by you</p>
          </CardContent>
        </Card>

        <Card hoverEffect={false}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Under Review
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-[10px] text-muted-foreground mt-1">AI classification pending</p>
          </CardContent>
        </Card>

        <Card hoverEffect={false}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              In Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-brand-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-[10px] text-muted-foreground mt-1">Assigned to field crews</p>
          </CardContent>
        </Card>

        <Card hoverEffect={false}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Resolved
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-[10px] text-muted-foreground mt-1">Verifications completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Workspace Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Active Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-xl font-bold">Your Reports</h2>
          <Card hoverEffect={false} className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground mb-4">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm">No Issues Reported Yet</h3>
            <p className="text-xs text-muted-foreground max-w-xs mt-1">
              You haven&apos;t filed any civic complaints. Click the button above to report potholes, garbage, or outages.
            </p>
          </Card>
        </div>

        {/* Right Side: Quick Guide / Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card hoverEffect={false}>
            <CardHeader>
              <CardTitle className="text-sm font-bold">Reporting Guidelines</CardTitle>
              <CardDescription>Follow these tips for faster AI classification</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground flex flex-col gap-4">
              <div className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue font-bold text-[10px]">
                  ✓
                </span>
                <p>Ensure the photo is clear, taken in daylight, and clearly centers the damage or spill.</p>
              </div>
              <div className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue font-bold text-[10px]">
                  ✓
                </span>
                <p>Enable GPS location tracking on your device so mapping metadata is recorded automatically.</p>
              </div>
              <div className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue font-bold text-[10px]">
                  ✓
                </span>
                <p>Avoid taking multiple pictures of the exact same incident. Add tags instead.</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
}
