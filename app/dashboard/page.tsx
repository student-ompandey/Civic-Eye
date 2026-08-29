'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
  Users,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { GlowCard } from '@/components/ui/spotlight-card';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Issue } from '@/types';

interface User {
  id: string;
  email: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessRes = await fetch('/api/auth/session');
        const sessData = await sessRes.json();
        if (!sessData.user) {
          router.push('/login');
          return;
        }
        setUser(sessData.user);

        const issuesRes = await fetch('/api/issues?status=All');
        if (issuesRes.ok) {
          const issuesData = await issuesRes.json();
          setIssues(issuesData.issues || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  // Derived Metrics
  const stats = useMemo(() => {
    let resolved = 0;
    let active = 0;
    let confirmations = 0;

    issues.forEach(issue => {
      if (issue.status === 'Resolved') resolved++;
      if (issue.status === 'Open' || issue.status === 'In Progress') active++;
      // @ts-ignore - Assuming supporters array is returned for the user's issues as well
      confirmations += (issue.supporters?.length || 0);
    });

    return {
      total: issues.length,
      resolved,
      active,
      confirmations
    };
  }, [issues]);

  // Chart Data Generation (Last 6 Months)
  const chartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const data: { label: string, count: number }[] = [];
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      data.push({ label: months[d.getMonth()], count: 0 });
    }

    // Populate data
    issues.forEach(issue => {
      const issueDate = new Date(issue.createdAt);
      const monthDiff = (now.getFullYear() - issueDate.getFullYear()) * 12 + now.getMonth() - issueDate.getMonth();
      if (monthDiff >= 0 && monthDiff < 6) {
        data[5 - monthDiff].count++;
      }
    });

    const maxCount = Math.max(...data.map(d => d.count), 1); // Avoid div by 0

    return { data, maxCount };
  }, [issues]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex-1 bg-[#0d0d0d] text-white min-h-screen"><PageContainer className="py-10 flex flex-col gap-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Citizen Dashboard</h1>
          <p className="text-zinc-400 mt-1 font-medium tracking-wide">
            Welcome back, <span className="font-bold text-white">{user.name || user.email}</span>.
          </p>
        </div>
        <Link href="/report">
          <Button className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 shrink-0 cursor-pointer border-none">
            <Plus className="h-4.5 w-4.5 mr-1" />
            Report an Issue
          </Button>
        </Link>
      </motion.div>

      {issues.length === 0 ? (
        <GlowCard customSize glowColor="blue" className="border-dashed border-zinc-800 py-20 flex flex-col items-center justify-center text-center bg-[#121212] overflow-hidden relative shadow-2xl">
          <DotPattern
            className={cn(
              "fill-[#ff4a1c]/10",
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
            )}
          />
          <div className="h-16 w-16 rounded-full bg-[#ff4a1c]/10 flex items-center justify-center text-[#ff4a1c] mb-4 z-10 relative">
            <TrendingUp className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tighter z-10 relative">Your community impact starts with one report.</h2>
          <p className="text-sm text-zinc-400 tracking-wide font-medium max-w-md mt-2">
            Help improve your neighborhood by reporting potholes, broken streetlights, or sanitation issues.
          </p>
          <Link href="/report" className="mt-6 z-10">
            <Button size="lg" className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 shrink-0 cursor-pointer border-none">
              Report an Issue
            </Button>
          </Link>
        </GlowCard>
      ) : (
        <>
          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card hoverEffect={false} className="bg-[#121212] border-zinc-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  Issues Reported
                </CardTitle>
                <FileText className="h-4 w-4 text-[#ff4a1c]" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-white tracking-tighter">{stats.total}</div>
              </CardContent>
            </Card>

            <Card hoverEffect={false} className="bg-[#121212] border-zinc-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  Issues Resolved
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-white tracking-tighter">{stats.resolved}</div>
              </CardContent>
            </Card>

            <Card hoverEffect={false} className="bg-[#121212] border-zinc-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  Community Confirmations
                </CardTitle>
                <Users className="h-4 w-4 text-brand-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-white tracking-tighter">{stats.confirmations}</div>
              </CardContent>
            </Card>

            <Card hoverEffect={false} className="bg-[#121212] border-zinc-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  Active Reports
                </CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-black text-white tracking-tighter">{stats.active}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Recent Activity & Visualization */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Impact Visualization */}
              <GlowCard customSize glowColor="orange" className="bg-[#121212] border-zinc-800 shadow-2xl">
                <CardHeader className="border-none shadow-none">
                  <CardTitle className="text-xl font-bold tracking-tighter text-white tracking-tight text-white flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#ff4a1c]" />
                    Reporting Activity
                  </CardTitle>
                  <CardDescription><span className="text-zinc-400 tracking-wide">Your reported issues over the last 6 months</span></CardDescription>
                </CardHeader>
                <CardContent className="border-none shadow-none">
                  <div className="h-48 w-full flex items-end gap-2 pt-4">
                    {chartData.data.map((item, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                        {/* Tooltip */}
                        <div className="absolute -top-8 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.count} issues
                        </div>
                        {/* Bar */}
                        <div 
                          className="w-full bg-[#ff4a1c]/80 hover:bg-[#ff4a1c] rounded-t-md transition-all duration-300"
                          style={{ 
                            height: `${Math.max((item.count / chartData.maxCount) * 100, 4)}%`,
                            minHeight: '4px'
                          }}
                        />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </GlowCard>

              {/* Recent Reports List */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tighter text-white">Recent Reports</h2>
                  <Link href="/my-reports" className="text-xs tracking-wide font-bold text-[#ff4a1c] hover:underline flex items-center">
                    View All <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Link>
                </div>
                
                <div className="flex flex-col gap-3">
                  {issues.slice(0, 3).map(issue => (
                    <Link key={issue._id} href={`/issues/${issue._id}`} className="block h-full">
                      <GlowCard customSize glowColor="orange" className="p-0 border-zinc-800 transition-colors hover:border-[#ff4a1c]/50 bg-[#121212] h-full shadow-xl">
                        <div className="flex h-24 sm:h-28 relative z-10">
                          <div className="w-24 sm:w-32 bg-zinc-900 relative border-r border-zinc-800 shrink-0 rounded-l-2xl overflow-hidden">
                            {issue.imageUrl ? (
                              <Image 
                                src={issue.imageUrl} 
                                alt={issue.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                                <FileText className="h-6 w-6 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          
                          <div className="p-3 sm:p-4 flex flex-col justify-between w-full overflow-hidden">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-bold text-base tracking-tight text-white line-clamp-1">{issue.title}</h3>
                              <span className="text-[10px] text-muted-foreground font-medium shrink-0 hidden sm:block">
                                {new Date(issue.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
                              <SeverityBadge severity={issue.severity} />
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-zinc-700 bg-zinc-800 text-zinc-300">
                                {issue.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 mt-auto pt-2">
                              <MapPin className="h-3 w-3 text-[#ff4a1c] shrink-0" />
                              <span className="text-[10px] font-medium text-muted-foreground line-clamp-1">
                                {issue.address}
                              </span>
                            </div>
                          </div>
                        </div>
                      </GlowCard>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Quick Guide / Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <Card hoverEffect={false} className="bg-[#ff4a1c]/5 border-[#ff4a1c]/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-[#ff4a1c]">Reporting Guidelines</CardTitle>
                  <CardDescription className="text-xs tracking-wide">Follow these tips for faster AI classification</CardDescription>
                </CardHeader>
                <CardContent className="text-xs tracking-wide text-muted-foreground flex flex-col gap-4">
                  <div className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-[#ff4a1c] font-bold text-[10px]">
                      ✓
                    </span>
                    <p>Ensure the photo is clear, taken in daylight, and clearly centers the damage or spill.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-[#ff4a1c] font-bold text-[10px]">
                      ✓
                    </span>
                    <p>Enable GPS location tracking on your device so mapping metadata is recorded automatically.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 text-[#ff4a1c] font-bold text-[10px]">
                      ✓
                    </span>
                    <p>Before submitting, check the map to avoid creating duplicates of existing issues.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </>
      )}
    </PageContainer></div>
  );
}
