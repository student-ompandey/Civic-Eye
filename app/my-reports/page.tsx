'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export default function MyReports() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };
    checkUser();
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

      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Submitted Reports</h1>
        <p className="text-muted-foreground mt-1">
          Review details and track local response status for complaints you have filed.
        </p>
      </div>

      <Card hoverEffect={false} className="border-dashed border-2 py-16 flex flex-col items-center justify-center text-center mt-4">
        <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground mb-4">
          <FileText className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-sm">No Reports Filed</h3>
        <p className="text-xs text-muted-foreground max-w-xs mt-1">
          Once you report civic problems, they will appear here along with status updates and photos.
        </p>
      </Card>
    </PageContainer>
  );
}
