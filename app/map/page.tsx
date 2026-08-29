'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/shared/PageContainer';
import { Filter, Search, Loader2, Map as MapIcon, Grid, AlertCircle, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Issue } from '@/types';
import MapContainer from '@/components/map/MapContainer';
import { Card, CardContent } from '@/components/ui/card';
import { SeverityBadge } from '@/components/ui/severity-badge';
import Image from 'next/image';

export default function ExploreMapPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [category, setCategory] = useState('All');
  const [severity, setSeverity] = useState('All');
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');

  // Fallback Logic
  const hasMapboxToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [showGrid, setShowGrid] = useState(!hasMapboxToken);

  useEffect(() => {
    fetchIssues();
  }, [category, severity, status]);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (category !== 'All') params.append('category', category);
      if (severity !== 'All') params.append('severity', severity);
      if (status !== 'All') params.append('status', status);

      const res = await fetch(`/api/issues/public?${params.toString()}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to fetch issues');
      
      setIssues(data.issues || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while fetching map data.');
    } finally {
      setLoading(false);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (!search) return true;
    const s = search.toLowerCase();
    return issue.title.toLowerCase().includes(s) || 
           issue.description.toLowerCase().includes(s) ||
           issue.address.toLowerCase().includes(s);
  });

  return (
    <PageContainer className="py-6 flex flex-col h-[calc(100vh-4rem)]">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explore Civic Issues</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View and track infrastructure problems reported by citizens across the city.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {hasMapboxToken && (
            <div className="flex bg-muted/40 p-1 rounded-lg border border-border/50">
              <button 
                onClick={() => setShowGrid(false)}
                className={`p-1.5 rounded-md transition-colors ${!showGrid ? 'bg-background shadow-xs text-brand-blue' : 'text-muted-foreground'}`}
              >
                <MapIcon className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setShowGrid(true)}
                className={`p-1.5 rounded-md transition-colors ${showGrid ? 'bg-background shadow-xs text-brand-blue' : 'text-muted-foreground'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="relative flex-1 md:w-64 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search issues or locations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-border/80 bg-background/50 text-sm focus:border-brand-blue/50 outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Filters Sidebar / Bottom Sheet on Mobile */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6 overflow-y-auto pr-2 pb-4">
          <div className="flex items-center gap-2 font-semibold">
            <Filter className="h-4.5 w-4.5 text-brand-blue" />
            Filters
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-border/80 bg-background/50 text-sm outline-hidden focus:border-brand-blue/50 font-medium cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Road Pothole">Road Pothole</option>
              <option value="Broken Streetlight">Broken Streetlight</option>
              <option value="Garbage Overflow">Garbage Overflow</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Open Drain">Open Drain</option>
              <option value="Damaged Public Property">Damaged Public Property</option>
              <option value="Other Civic Issue">Other Civic Issue</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity</label>
            <select 
              value={severity}
              onChange={e => setSeverity(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-border/80 bg-background/50 text-sm outline-hidden focus:border-brand-blue/50 font-medium cursor-pointer"
            >
              <option value="All">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
            <select 
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-border/80 bg-background/50 text-sm outline-hidden focus:border-brand-blue/50 font-medium cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {!hasMapboxToken && !showGrid && (
            <div className="mt-auto p-3.5 bg-amber-100/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-400 text-xs font-medium flex flex-col gap-2">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="h-4 w-4" />
                Map Offline
              </div>
              <p>The interactive map is currently in Demo Mode. Displaying issues as a grid.</p>
            </div>
          )}
        </div>

        {/* Map / Grid View */}
        <div className="flex-1 min-h-[400px] h-full relative">
          {error ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-red-200 dark:border-red-900/50 rounded-xl text-center">
              <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
              <h3 className="font-bold text-red-600 dark:text-red-400">Failed to Load Issues</h3>
              <p className="text-sm text-red-500/80 mt-1 max-w-sm">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchIssues} className="mt-4">Try Again</Button>
            </div>
          ) : loading ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 border border-border/60 rounded-xl bg-muted/10">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue mb-3" />
              <p className="text-sm font-semibold text-muted-foreground">Fetching public issues...</p>
            </div>
          ) : showGrid ? (
            <div className="w-full h-full overflow-y-auto pr-2 pb-4">
              {filteredIssues.length === 0 ? (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/60 rounded-xl text-center bg-muted/10">
                  <FileText className="h-10 w-10 text-muted-foreground/50 mb-3" />
                  <h3 className="font-bold text-muted-foreground">No Issues Found</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters or search query.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredIssues.map(issue => (
                    <Card key={issue._id} hoverEffect={true} className="overflow-hidden border-border/60 flex flex-col h-full">
                      {issue.imageUrl && (
                        <div className="w-full h-40 relative bg-muted border-b border-border/40 shrink-0">
                          <Image src={issue.imageUrl} alt={issue.title} fill className="object-cover" />
                          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs border border-border/50 flex items-center gap-1.5 z-10">
                            <span className="text-[10px] font-bold tracking-wide uppercase">{issue.status}</span>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-bold text-sm line-clamp-2 leading-tight">{issue.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5 items-center mb-3">
                          <SeverityBadge severity={issue.severity} />
                          <span className="text-[10px] text-muted-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border/60">
                            {issue.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                          {issue.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/40 shrink-0">
                          <MapPin className="h-3.5 w-3.5 text-brand-blue shrink-0" />
                          <span className="text-[10px] font-medium text-muted-foreground line-clamp-1">
                            {issue.address}, {issue.city}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <MapContainer issues={filteredIssues} />
          )}
        </div>
      </div>

    </PageContainer>
  );
}
