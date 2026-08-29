'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/shared/PageContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Brain, MapPin, CheckCircle2, ShieldAlert, Clock, AlertCircle, Share2, ThumbsUp, Activity } from 'lucide-react';
import Image from 'next/image';

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [issue, setIssue] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supporting, setSupporting] = useState(false);
  const [supportCount, setSupportCount] = useState(0);
  const [hasSupported, setHasSupported] = useState(false); // we'll try to determine this if possible
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchSessionAndIssue();
  }, [params.id]);

  const fetchSessionAndIssue = async () => {
    try {
      setLoading(true);
      // Fetch user session for checking if they can support
      const sessRes = await fetch('/api/auth/session');
      const sessData = await sessRes.json();
      const user = sessData.user;
      setCurrentUser(user);

      // Fetch Issue
      const res = await fetch(`/api/issues/${params.id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load issue');
      }

      setIssue(data.issue);
      const supporters = data.issue.supporters || [];
      setSupportCount(supporters.length);
      if (user && supporters.includes(user.id)) {
        setHasSupported(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred loading the issue.');
    } finally {
      setLoading(false);
    }
  };

  const handleSupport = async () => {
    if (!currentUser) {
      router.push('/login?callbackUrl=/issues/' + params.id);
      return;
    }
    if (hasSupported) return;

    setSupporting(true);
    try {
      const res = await fetch(`/api/issues/${params.id}/support`, {
        method: 'POST'
      });
      if (!res.ok) {
        throw new Error('Failed to support issue');
      }
      setSupportCount(prev => prev + 1);
      setHasSupported(true);
    } catch (err) {
      console.error(err);
      alert('Could not confirm issue. Please try again.');
    } finally {
      setSupporting(false);
    }
  };

  if (loading) {
    return (
      <PageContainer className="py-10 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue mb-4" />
        <p className="font-semibold text-muted-foreground">Loading report details...</p>
      </PageContainer>
    );
  }

  if (error || !issue) {
    return (
      <PageContainer className="py-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShieldAlert className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold">Issue Not Found</h2>
        <p className="text-muted-foreground mt-2">{error || 'This report may have been deleted or does not exist.'}</p>
        <Button variant="outline" className="mt-6" onClick={() => router.push('/map')}>
          Return to Map
        </Button>
      </PageContainer>
    );
  }

  // Determine timeline steps based on reality
  const timeline = [
    { label: 'Reported', date: new Date(issue.createdAt).toLocaleDateString(), active: true, icon: AlertCircle },
    { label: 'AI Analyzed', date: new Date(issue.createdAt).toLocaleDateString(), active: true, icon: Brain },
    { label: 'Community Confirmed', date: 'Multiple confirmations', active: supportCount > 0, icon: ThumbsUp },
    { label: 'In Progress', date: 'Work started', active: issue.status === 'In Progress' || issue.status === 'Resolved', icon: Clock },
    { label: 'Resolved', date: 'Completed', active: issue.status === 'Resolved', icon: CheckCircle2 },
  ];

  // Mock status updates based on status
  let updates = [
    { message: 'Issue received and registered in the system.', date: new Date(issue.createdAt).toLocaleDateString() }
  ];
  if (issue.status === 'In Progress' || issue.status === 'Resolved') {
    updates.unshift({ message: 'Inspection scheduled and repair team assigned.', date: 'Recently' });
  }
  if (issue.status === 'Resolved') {
    updates.unshift({ message: 'Repair work completed successfully.', date: 'Recently' });
  }

  return (
    <div className="flex-1 bg-zinc-50 min-h-screen pb-12 pt-28">
      <div className="bg-background/80 backdrop-blur-md border-b border-border/40 py-4 shadow-xs relative z-10">
        <PageContainer className="flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground hidden sm:block">Report ID:</span>
            <span className="text-xs font-mono font-black bg-muted/60 px-2 py-1 rounded-md border border-border/40">
              {issue.id.substring(0, 8).toUpperCase()}
            </span>
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-md">
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Header */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 items-center">
              <SeverityBadge severity={issue.severity} />
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                {issue.category}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                issue.status === 'Open' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400' :
                issue.status === 'In Progress' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
              }`}>
                {issue.status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-foreground leading-tight mt-1">
              {issue.title}
            </h1>
          </div>

          {/* Image */}
          {issue.imageUrl && (
            <div className="w-full relative aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border-4 border-background shadow-lg group">
              <Image 
                src={issue.imageUrl} 
                alt={issue.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}

          {/* Description */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-base text-muted-foreground leading-relaxed">
              {issue.description}
            </p>
          </div>


          {/* Civic Priority Card */}
          {issue.priority && (
            <Card hoverEffect={false} className="border-border/60 overflow-hidden relative shadow-lg bg-zinc-50/50 bg-background">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Activity className="h-32 w-32" />
              </div>
              <CardHeader className="pb-4 border-b border-border/40 bg-muted/20">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Civic Priority Score
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-5 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Score Display */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div className="relative h-28 w-28 flex items-center justify-center">
                      <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                        <circle cx="56" cy="56" r="50" fill="none" className="stroke-muted" strokeWidth="8" />
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="50" 
                          fill="none" 
                          strokeDasharray="314.159"
                          strokeDashoffset={314.159 - (314.159 * issue.priority.score) / 100}
                          className={`${
                            issue.priority.level === 'urgent' ? 'stroke-red-500' : 
                            issue.priority.level === 'high' ? 'stroke-orange-500' :
                            issue.priority.level === 'moderate' ? 'stroke-amber-500' :
                            'stroke-emerald-500'
                          } transition-all duration-1000 ease-out`} 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                        />
                      </svg>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl font-black tabular-nums">{issue.priority.score}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <span className={`mt-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      issue.priority.level === 'urgent' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      issue.priority.level === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      issue.priority.level === 'moderate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-500 border-[#ff4a1c]/50 bg-emerald-100/20'
                    }`}>
                      {issue.priority.level}
                    </span>
                  </div>

                  {/* Factors */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold mb-3">Priority increased because:</h4>
                    <ul className="space-y-2">
                      {issue.priority.factors.map((factor: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue/50 shrink-0" />
                          <span className="font-medium">{factor.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-medium">
                    The priority score is an AI-assisted decision-support indicator based on reported data and is not an official government priority ranking.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}


          {/* AI Analysis Card */}
          <Card hoverEffect={false} className="border-brand-blue/20 bg-brand-blue/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
              <Brain className="h-24 w-24" />
            </div>
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-sm flex items-center gap-2 text-brand-blue">
                <Brain className="h-4 w-4" />
                AI-Generated Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Category</span>
                <span className="text-sm font-semibold">{issue.category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Confidence</span>
                <span className="text-sm font-semibold">{issue.aiConfidence}%</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Safety Risk</span>
                <span className="text-sm font-semibold">{issue.aiRisk || 'Moderate'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Department</span>
                <span className="text-sm font-semibold line-clamp-1">{issue.department}</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar (Right) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Community Confirmation */}
          <Card hoverEffect={false} className="border-border/60 shadow-md">
            <CardHeader className="pb-4 border-b border-border/40">
              <CardTitle className="text-lg">Community Confirmations</CardTitle>
              <CardDescription>
                Confirm this issue to prioritize it for repair.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ThumbsUp className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-black leading-none">{supportCount}</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">People Confirmed</span>
                </div>
              </div>

              <Button 
                variant={hasSupported ? "outline" : "default"}
                className={`w-full font-bold ${!hasSupported ? 'bg-gradient-to-r from-[#ff4a1c] to-[#ff2a00] hover:scale-[1.02] transition-transform text-foreground shadow-lg shadow-[#ff4a1c]/20 border-none' : 'border-[#ff4a1c]/50 bg-emerald-100 text-brand-blue pointer-events-none'}`}
                onClick={handleSupport}
                disabled={supporting || hasSupported}
              >
                {supporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {hasSupported ? '✓ You Confirmed This' : 'Yes, this issue still exists'}
              </Button>
            </CardContent>
          </Card>

          {/* Location */}
          <Card hoverEffect={false} className="border-border/60 overflow-hidden shadow-md">
            <div className="h-32 bg-muted relative border-b border-border/40">
              {/* Static Map Preview simulation */}
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/77.209,28.6139,13/400x200?access_token=none')] bg-cover bg-center opacity-30 blur-[2px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-brand-blue drop-shadow-lg" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">{issue.address}</p>
                  {issue.landmark && <p className="text-xs text-muted-foreground mt-0.5">{issue.landmark}</p>}
                  <p className="text-xs text-muted-foreground mt-0.5">{issue.city}, {issue.state}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Updates */}
          <Card hoverEffect={false} className="border-border/60 shadow-md">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-base flex items-center justify-between">
                Issue Timeline
                <span className="text-[10px] font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  Live
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 pb-2">
              <div className="relative pl-5 border-l-2 border-muted ml-2 flex flex-col gap-6">
                {timeline.map((step, idx) => (
                  <div key={idx} className={`relative ${!step.active ? 'opacity-40 grayscale' : ''}`}>
                    <div className={`absolute -left-[27px] top-0 h-5 w-5 rounded-full flex items-center justify-center border-2 ${
                      step.active ? 'bg-muted border-[#ff4a1c] text-brand-blue' : 'bg-muted border-muted-foreground text-muted-foreground'
                    }`}>
                      <step.icon className="h-2.5 w-2.5" />
                    </div>
                    <h4 className={`text-xs font-bold leading-none ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </h4>
                    {step.active && (
                      <span className="text-[10px] font-medium text-muted-foreground mt-1 block">
                        {step.date}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card hoverEffect={false} className="border-border/60 shadow-md">
             <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
              <CardTitle className="text-sm">Status Updates</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-4">
              {updates.map((up, i) => (
                <div key={i} className="flex flex-col gap-1 text-sm border-b border-border/40 last:border-0 pb-3 last:pb-0">
                  <span className="text-[10px] font-semibold text-brand-blue uppercase tracking-wider">{up.date}</span>
                  <p className="text-muted-foreground text-xs leading-relaxed">{up.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </PageContainer>
    </div>
  );
}
