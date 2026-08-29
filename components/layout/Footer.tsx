'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';

export function Footer() {
  const [time, setTime] = useState('12:00 PM');

  useEffect(() => {
    // Dynamic client-side clock
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#f5f5f5] text-[#1a1a1a] border-t border-zinc-250 pt-20 pb-8 overflow-hidden">
      <PageContainer className="relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16">
          
          {/* Tagline Column */}
          <div className="md:col-span-4 text-left flex flex-col justify-start">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight leading-snug mb-3">
              Civic Eye is a community-driven public issue reporting and resolution platform.
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-normal">
              Empowering citizens to report hazards, track repairs, and build better neighborhoods together.
            </p>
          </div>

          {/* Explore Links Column */}
          <div className="md:col-span-2 text-left flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Explore</span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/map" className="text-sm text-zinc-500 hover:text-black transition-colors font-medium">
                  Live Map
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-sm text-zinc-500 hover:text-black transition-colors font-medium">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-black transition-colors font-medium">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Badges Column */}
          <div className="md:col-span-3 text-left flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Follow us</span>
            <div className="flex flex-wrap gap-2">
              
              {/* X Badge */}
              <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:text-black hover:border-zinc-400 shadow-xs transition-all">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X @civiceye</span>
              </a>

              {/* GitHub Badge */}
              <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:text-black hover:border-zinc-400 shadow-xs transition-all">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>@civiceye</span>
              </a>

              {/* Contact Badge */}
              <a href="mailto:hello@civiceye.org" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:text-black hover:border-zinc-400 shadow-xs transition-all">
                <svg className="w-3 h-3 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>hello@civiceye</span>
              </a>

            </div>
          </div>

          {/* Call to Actions Column */}
          <div className="md:col-span-3 text-left flex flex-col gap-6">
            
            {/* Red action link */}
            <div>
              <Link href="/report" className="inline-flex items-center gap-1 text-lg font-bold text-[#ff4a1c] hover:underline">
                <span>Report an Issue</span>
                <div className="w-5 h-5 rounded-full bg-[#ff4a1c] text-white flex items-center justify-center scale-90">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>
              <p className="text-zinc-500 text-xs mt-1">Let's work together</p>
            </div>

            {/* Black action link */}
            <div>
              <a href="mailto:hello@civiceye.org" className="inline-flex items-center gap-1 text-lg font-bold text-[#1a1a1a] hover:underline">
                <span>Join as Partner</span>
                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center scale-90">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>
              <p className="text-zinc-500 text-xs mt-1">For local governments</p>
            </div>

          </div>

        </div>

        {/* Massive Lowercase Brand Text Cropped at bottom */}
        <div className="w-full text-center overflow-hidden h-[12vw] sm:h-[13vw] md:h-[14vw] relative my-6">
          <h2 className="text-[20vw] font-black leading-[0.6] tracking-tighter text-zinc-900 absolute left-1/2 -translate-x-1/2 bottom-0 select-none pointer-events-none translate-y-[28%] lowercase">
            civiceye
          </h2>
        </div>

        {/* Footer Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 pt-6 border-t border-zinc-200/60 text-left w-full">
          <div>
            Civic Eye © 2026 <span className="mx-2 text-zinc-300">•</span> <Link href="#privacy" className="hover:text-black">Privacy Policy</Link>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 font-medium">
            <span>India</span>
            <span className="text-zinc-300">•</span>
            <span>{time}</span>
            <span className="text-zinc-300">•</span>
            <span>28°C ☀️</span>
          </div>
        </div>

      </PageContainer>
    </footer>
  );
}
