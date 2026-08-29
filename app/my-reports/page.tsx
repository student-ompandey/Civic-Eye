'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft, Filter, Loader2, MapPin, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { GlowCard } from '@/components/ui/spotlight-card';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Issue } from '@/types';

export default function MyReportsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');

  useEffect(() => {
    fetchIssues();
  }, [filter]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/issues?status=${filter}`);
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load reports');
      
      setIssues(data.issues || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'Open':
        return <AlertCircle className="h-4 w-4 text-[#ff4a1c]" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Resolved':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default:
        return <FileText className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <div className="flex-1 bg-[#0d0d0d] text-white min-h-screen"><PageContainer className="py-10 flex flex-col gap-6">
      {/* Back to dashboard */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push('/dashboard')}
        className="w-fit hover:text-white text-zinc-400 cursor-pointer font-semibold tracking-wide"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">My Submitted Reports</h1>
          <p className="text-zinc-400 mt-1 font-medium tracking-wide">
            Review details and track local response status for complaints you have filed.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 w-fit">
          <Filter className="h-4 w-4 text-zinc-500 ml-2 mr-1" />
          {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-[#121212] shadow-xl text-[#ff4a1c] border border-zinc-800'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="p-4 rounded-xl bg-red-100/60 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-950/30 font-semibold text-sm text-center mt-4">
          {error}
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col gap-3 items-center justify-center min-h-[40vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff4a1c]" />
          <p className="text-sm text-zinc-400 font-semibold">Loading your reports...</p>
        </div>
      ) : issues.length === 0 ? (
        <GlowCard customSize glowColor="orange" className="border-dashed border-zinc-800 border-2 py-16 flex flex-col items-center justify-center text-center mt-4 bg-[#121212] shadow-2xl overflow-hidden relative">
          <DotPattern
            className={cn(
              "fill-[#ff4a1c]/10",
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
            )}
          />
          <div className="h-12 w-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-[#ff4a1c] mb-4 z-10 relative">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-sm z-10 relative">No Reports Found</h3>
          <p className="text-xs text-zinc-400 max-w-xs mt-1">
            {filter === 'All' 
              ? "You haven't filed any civic issues yet. Once you report problems, they will appear here."
              : `You don't have any ${filter.toLowerCase()} reports at the moment.`}
          </p>
          {filter === 'All' && (
            <Button variant="default" onClick={() => router.push('/report')} className="mt-4 bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none rounded-full font-semibold z-10 relative">
              Report an Issue
            </Button>
          )}
        </GlowCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {issues.map(issue => (
            <Link href={`/issues/${issue._id}`} key={issue._id} className="block relative z-10">
              <GlowCard customSize glowColor="orange" className="overflow-hidden p-0 border-zinc-800 transition-colors hover:border-[#ff4a1c]/50 bg-[#121212] shadow-xl">
                <div className="flex h-full relative z-10">
                  <div className="w-1/3 bg-zinc-900 relative border-r border-zinc-800 shrink-0">
                    {issue.imageUrl ? (
                      <Image 
                        src={issue.imageUrl} 
                        alt={issue.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-zinc-950/50">
                        <FileText className="h-8 w-8 text-zinc-400/30" />
                      </div>
                    )}
                    
                    {/* Status Badge Over Image */}
                    <div className="absolute top-2 left-2 bg-zinc-950/90 backdrop-blur-md px-2 py-1 rounded-md shadow-lg border border-zinc-800 flex items-center gap-1.5 z-10">
                      <StatusIcon status={issue.status} />
                      <span className="text-[10px] font-bold tracking-wide uppercase">{issue.status}</span>
                    </div>
                  </div>
                  
                  <div className="w-2/3 p-4 flex flex-col gap-2 justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-base tracking-tight text-white line-clamp-1">{issue.title}</h3>
                        <span className="text-[10px] text-zinc-400 font-medium shrink-0">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 items-center mb-3">
                        <SeverityBadge severity={issue.severity} />
                        <span className="text-[10px] text-zinc-400 font-semibold bg-muted px-1.5 py-0.5 rounded border border-border/60">
                          {issue.category}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-2 pt-3 border-t border-zinc-800">
                      <MapPin className="h-3.5 w-3.5 text-[#ff4a1c] shrink-0" />
                      <span className="text-[10px] font-medium text-zinc-400 line-clamp-1">
                        {issue.address}, {issue.city}
                      </span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </Link>
          ))}
        </div>
      )}
    </PageContainer></div>
  );
}
