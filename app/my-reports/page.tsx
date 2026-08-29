'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft, Filter, Loader2, MapPin, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { SeverityBadge } from '@/components/ui/severity-badge';
import Image from 'next/image';
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
        return <AlertCircle className="h-4 w-4 text-brand-blue" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Resolved':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <PageContainer className="py-10 flex flex-col gap-6">
      {/* Back to dashboard */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push('/dashboard')}
        className="w-fit hover:text-foreground text-muted-foreground cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Submitted Reports</h1>
          <p className="text-muted-foreground mt-1">
            Review details and track local response status for complaints you have filed.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 bg-muted/40 p-1.5 rounded-xl border border-border/40 w-fit">
          <Filter className="h-4 w-4 text-muted-foreground ml-2 mr-1" />
          {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-background shadow-xs text-brand-blue border border-border/80'
                  : 'text-muted-foreground hover:text-foreground'
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
          <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          <p className="text-sm text-muted-foreground font-semibold">Loading your reports...</p>
        </div>
      ) : issues.length === 0 ? (
        <Card hoverEffect={false} className="border-dashed border-2 py-16 flex flex-col items-center justify-center text-center mt-4 bg-muted/10">
          <div className="h-12 w-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-sm">No Reports Found</h3>
          <p className="text-xs text-muted-foreground max-w-xs mt-1">
            {filter === 'All' 
              ? "You haven't filed any civic issues yet. Once you report problems, they will appear here."
              : `You don't have any ${filter.toLowerCase()} reports at the moment.`}
          </p>
          {filter === 'All' && (
            <Button variant="default" onClick={() => router.push('/report')} className="mt-4 bg-brand-blue hover:bg-brand-blue/90 font-semibold">
              Report an Issue
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {issues.map(issue => (
            <Card key={issue._id} hoverEffect={true} className="overflow-hidden border-border/60">
              <div className="flex h-full">
                <div className="w-1/3 bg-muted relative border-r border-border/40">
                  {issue.imageUrl ? (
                    <Image 
                      src={issue.imageUrl} 
                      alt={issue.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                      <FileText className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                  
                  {/* Status Badge Over Image */}
                  <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs border border-border/50 flex items-center gap-1.5 z-10">
                    <StatusIcon status={issue.status} />
                    <span className="text-[10px] font-bold tracking-wide uppercase">{issue.status}</span>
                  </div>
                </div>
                
                <CardContent className="w-2/3 p-4 flex flex-col gap-2 justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm line-clamp-1">{issue.title}</h3>
                      <span className="text-[10px] text-muted-foreground font-medium shrink-0">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center mb-3">
                      <SeverityBadge severity={issue.severity} />
                      <span className="text-[10px] text-muted-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border/60">
                        {issue.category}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-2 pt-3 border-t border-border/40">
                    <MapPin className="h-3.5 w-3.5 text-brand-blue shrink-0" />
                    <span className="text-[10px] font-medium text-muted-foreground line-clamp-1">
                      {issue.address}, {issue.city}
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
