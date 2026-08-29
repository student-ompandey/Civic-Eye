'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  Brain,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldAlert,
  Plus,
  HelpCircle,
  Users,
  Shield,
  Zap,
  TrendingUp,
  FileText,
  Activity,
  ArrowUpRight,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { GlowCard } from '@/components/ui/spotlight-card';
import { cn } from '@/lib/utils';
import { IssueSeverity } from '@/types';
import Image from 'next/image';

const mockFeaturedIssues = [
  {
    _id: '1',
    title: 'Large Road Pothole',
    category: 'Road Infrastructure',
    address: 'Bhopal, Madhya Pradesh',
    severity: 'high' as IssueSeverity,
    status: 'Open',
    createdAt: new Date().toISOString(),
    supporters: Array(42).fill(''),
    imageUrl: ''
  },
  {
    _id: '2',
    title: 'Clogged Storm Drain',
    category: 'Water & Utilities',
    address: 'Mumbai, Maharashtra',
    severity: 'medium' as IssueSeverity,
    status: 'In Progress',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    supporters: Array(89).fill(''),
    imageUrl: ''
  },
  {
    _id: '3',
    title: 'Broken Streetlight Grid',
    category: 'Public Lighting',
    address: 'Bengaluru, Karnataka',
    severity: 'low' as IssueSeverity,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    supporters: Array(156).fill(''),
    imageUrl: ''
  }
];

export default function Home() {
  const [recentIssues, setRecentIssues] = useState<any[]>(mockFeaturedIssues);
  const [emailForm, setEmailForm] = useState({ name: '', city: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch('/api/issues/public');
        if (res.ok) {
          const data = await res.json();
          if (data.issues && data.issues.length > 0) {
            setRecentIssues(data.issues.slice(0, 3));
          }
        }
      } catch (e) {
        console.error('Error fetching recent issues:', e);
      }
    };
    fetchRecent();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setEmailForm({ name: '', city: '', email: '' });
      setFormSubmitted(false);
    }, 3000);
  };

  const scrollReveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0d0d0d] text-[#f5f5f5] overflow-x-hidden font-sans antialiased">
      
      {/* 1. HERO SECTION (DARK MODE) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#0d0d0d] pt-24 pb-16 overflow-hidden">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#ff4a1c]/10 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0f62fe]/10 blur-[150px] mix-blend-screen" />
        </div>

        <PageContainer className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ff4a1c] text-xs font-semibold uppercase tracking-widest mb-4"
            >
              Our Mission
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.05] text-white"
            >
              More than<br />
              digital reporting.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#999999] text-base sm:text-lg md:text-xl mt-6 max-w-lg leading-relaxed font-normal"
            >
              Civic Eye bridges the gap between active citizens and municipal agencies. We power smart civic reporting, instant dispatch, and transparent infrastructure tracking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <Link href="/report">
                <Button size="lg" className="rounded-full bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-[#ff4a1c]/20 border-none transition-all duration-300">
                  Report an Issue
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="rounded-full bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white px-8 py-6 text-base transition-all duration-300">
                  Explore Live Map
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Stylized Inward Arrow Starburst (Based on Image 4) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="w-full max-w-[380px] aspect-square relative"
            >
              {/* Geometric Starburst SVG */}
              <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_35px_rgba(255,74,28,0.15)]">
                <defs>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff7b00" />
                    <stop offset="100%" stopColor="#ff3c00" />
                  </linearGradient>
                </defs>
                
                {/* 8 Arrows pointing inward, forming a gap in the center */}
                {/* Arrow 1 (Top, rotated 0) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(0)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>
                
                {/* Arrow 2 (Top-Right, rotated 45) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(45)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>

                {/* Arrow 3 (Right, rotated 90) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(90)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>

                {/* Arrow 4 (Bottom-Right, rotated 135) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(135)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>

                {/* Arrow 5 (Bottom, rotated 180) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(180)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>

                {/* Arrow 6 (Bottom-Left, rotated 225) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(225)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>

                {/* Arrow 7 (Left, rotated 270) - Styled Dark Grey */}
                <g transform="translate(150, 150) rotate(270)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="#2a2a2a" />
                </g>

                {/* Arrow 8 (Top-Left, rotated 315) - Glowing Orange (Special Feature Element) */}
                <g transform="translate(150, 150) rotate(315)">
                  <path d="M -12,-120 L 12,-120 L 12,-70 L 25,-70 L 0,-40 L -25,-70 L -12,-70 Z" fill="url(#orangeGradient)" />
                </g>
              </svg>
            </motion.div>
          </div>
          
        </PageContainer>
      </section>

      {/* Pill Badges Grid Row (Dark Mode - Image 4) */}
      <section className="bg-[#0d0d0d] pb-20 border-b border-zinc-900">
        <PageContainer>
          <div className="text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-6">
            Supported Report Categories
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "Potholes & Road Repair", "Broken Streetlights", "Garbage & Sanitation", 
              "Water Leakages", "Vandalism & Graffiti", "Public Park Hazards", 
              "Traffic Signal Outages", "Abandoned Vehicles"
            ].map((badge, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-800 bg-[#121212] text-zinc-300 text-sm font-medium hover:border-[#ff4a1c]/40 hover:text-white transition-all duration-300 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a1c]" />
                {badge}
              </span>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 2. WHY COMMUNITIES RELY ON CIVIC EYE (LIGHT MODE - Based on Image 2) */}
      <section className="bg-[#f5f5f5] text-[#1a1a1a] py-24">
        <PageContainer>
          <motion.div 
            {...scrollReveal}
            className="flex flex-col text-left max-w-4xl"
          >
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4">
              Why Communities Rely on Civic Eye
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-zinc-900">
              Seamless reporting,<br />
              <span className="bg-gradient-to-r from-[#ff4a1c] to-[#ff7b00] bg-clip-text text-transparent">outstanding results.</span>
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
              Civic Eye is a modern issue-tracking platform designed for local municipalities, community organizations, and active residents. We eliminate manual reporting hurdles to keep neighborhoods clean, safe, and functional.
            </p>
          </motion.div>

          {/* Clean Minimalist Cards Grid (Image 2 style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-16 border border-zinc-200 divide-y md:divide-y-0 md:divide-x divide-zinc-200 bg-white rounded-xl overflow-hidden shadow-sm">
            {[
              {
                title: "Empower resident synergy",
                desc: "We establish a direct line of communication between local residents and field crews, making issue submission effortless and feedback loops instant."
              },
              {
                title: "Accelerate repairs, clear backlog",
                desc: "Our automated dispatch pipelines route issues directly to the appropriate city department, cutting out administrative layers and delays."
              },
              {
                title: "Build community trust with transparency",
                desc: "Every submitted report is tracked publicly. Citizens receive real-time updates and photo proof upon resolution, restoring trust in public services."
              }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-10 flex flex-col justify-start text-left bg-white hover:bg-zinc-50/50 transition-colors duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-4">{card.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-normal">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* 3. CIVIC ISSUE RESOLUTION FLOW (LIGHT MODE) */}
      <section className="bg-zinc-50 text-[#1a1a1a] py-24 sm:py-32 border-t border-zinc-200 overflow-hidden relative">
        <PageContainer>
          
          <motion.div {...scrollReveal} className="text-left mb-20 max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 mb-6">
              Civic Issue Resolution
            </h2>
            <p className="text-zinc-500 text-lg sm:text-xl font-medium leading-relaxed">
              We've re-engineered the municipal feedback loop.
            </p>
          </motion.div>

          {/* 3-Column Header Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left mb-24">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ff4a1c]/10 transition-all duration-300">
                <Zap className="w-6 h-6 text-zinc-700 group-hover:text-[#ff4a1c] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Optimize</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                <strong className="text-zinc-900 font-bold">Reduce reporting overhead</strong> by letting citizens submit geotagged photo reports in under 10 seconds without tedious forms.
              </p>
            </div>
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0f62fe]/10 transition-all duration-300">
                <Brain className="w-6 h-6 text-zinc-700 group-hover:text-[#0f62fe] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Engage</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                <strong className="text-zinc-900 font-bold">Leverage AI automation</strong> to filter duplicate complaints, consolidate neighborhood requests, and direct field teams efficiently.
              </p>
            </div>
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00f2fe]/10 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-zinc-700 group-hover:text-[#00f2fe] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Resolve</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                <strong className="text-zinc-900 font-bold">Ensure a seamless UX</strong> by removing operational roadblocks and keeping residents updated dynamically at every single resolution state.
              </p>
            </div>
          </div>

          {/* Workflow Diagram Section */}
          <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl shadow-zinc-200/50 p-8 sm:p-16 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <div className="text-left mb-16 relative z-10 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4a1c] mb-4 block">Pipeline Architecture</span>
              <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">Smart Dispatch Process</h3>
              <p className="text-zinc-500 text-base mt-4 font-medium">How we make every civic report count from submission to resolution.</p>
            </div>

            {/* Workflow Diagram SVG Container */}
            <div className="w-full overflow-x-auto pb-10 relative z-10 custom-scrollbar">
              <div className="min-w-[900px] w-full h-[440px] relative flex items-center justify-center">
                <svg viewBox="0 0 1000 440" className="w-full h-full text-zinc-900 font-sans drop-shadow-sm">
                  
                  {/* Concentric Radar/Target Marker (Start Point) */}
                  <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.15 }} viewport={{ once: true }} transition={{ duration: 0.5 }} cx="60" cy="80" r="24" fill="#ff4a1c" />
                  <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} cx="60" cy="80" r="14" fill="#ff4a1c" />
                  <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} cx="60" cy="80" r="6" fill="#ff4a1c" />
                  
                  {/* Base Track Lines (Faint Background) */}
                  <path d="M 60,80 L 60,140 L 160,140" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 340,140 L 440,140" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 660,140 L 720,140 A 50,50 0 0 1 770,190 L 770,220 A 50,50 0 0 1 720,270 L 660,270" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 440,270 L 160,270 A 50,50 0 0 0 110,320 L 110,350" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Animated Active Lines */}
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                    d="M 60,80 L 60,140 L 160,140" fill="none" stroke="#ff4a1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeInOut", delay: 1.5 }}
                    d="M 340,140 L 440,140" fill="none" stroke="#0f62fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut", delay: 2.3 }}
                    d="M 660,140 L 720,140 A 50,50 0 0 1 770,190 L 770,220 A 50,50 0 0 1 720,270 L 660,270" fill="none" stroke="#00f2fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut", delay: 3.5 }}
                    d="M 440,270 L 160,270 A 50,50 0 0 0 110,320 L 110,350" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />

                  {/* Node 1: Citizen Upload */}
                  <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.0 }}>
                    <rect x="160" y="110" width="180" height="60" rx="30" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <text x="250" y="145" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.05em" fill="#18181b">CITIZEN UPLOAD</text>
                  </motion.g>

                  {/* Node 2: Gemini AI Analysis */}
                  <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.9 }}>
                    <rect x="440" y="110" width="220" height="60" rx="30" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <text x="550" y="145" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.05em" fill="#0f62fe">GEMINI AI ANALYSIS</text>
                  </motion.g>

                  {/* Node 3: Duplicate Merge & Severity Scoring */}
                  <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 3.1 }}>
                    <rect x="440" y="240" width="220" height="60" rx="30" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <text x="550" y="275" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.05em" fill="#00f2fe">SEVERITY & MERGING</text>
                  </motion.g>

                  {/* Node 4: Field Dispatch (End Point) */}
                  <motion.g initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 4.5 }}>
                    <rect x="30" y="350" width="160" height="60" rx="30" fill="#10b981" />
                    <text x="110" y="385" textAnchor="middle" fontSize="14" fontWeight="900" letterSpacing="0.05em" fill="#ffffff">FIELD DISPATCH</text>
                  </motion.g>
                  
                  {/* Connection Dots */}
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} cx="160" cy="140" r="5" fill="#ff4a1c" />
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 }} cx="440" cy="140" r="5" fill="#0f62fe" />
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 3.3 }} cx="660" cy="270" r="5" fill="#00f2fe" />

                </svg>
              </div>
            </div>
            
            {/* 3-Column Footer Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left mt-16 pt-12 border-t border-zinc-100 relative z-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <span className="text-zinc-600 font-bold">1</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  <strong className="text-zinc-900 font-bold block mb-1">Immediate public logging.</strong> Once uploaded, a ticket is mapped and made visible to prevent repeated reports.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <span className="text-zinc-600 font-bold">2</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  <strong className="text-zinc-900 font-bold block mb-1">Automated AI dispatch.</strong> Automatic parsing skips manual support triage, sending issues straight to field technicians.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <span className="text-zinc-600 font-bold">3</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  <strong className="text-zinc-900 font-bold block mb-1">Optimal budget routing.</strong> Deduplicating nearby tickets allows local city councils to group work orders effectively.
                </p>
              </div>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* 4. COMMUNITY HEALTH DASHBOARD (DARK MODE) */}
      <section className="bg-[#0a0a0a] text-[#f5f5f5] py-24 sm:py-32 border-t border-zinc-900 relative overflow-hidden">
        {/* Subtle background noise/grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <PageContainer>
          <motion.div {...scrollReveal} className="text-left mb-20 max-w-3xl relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-6">
              Community Health <br className="hidden sm:block"/>& Maintenance
            </h2>
            <p className="text-[#ff4a1c] text-lg font-semibold tracking-wide">
              Build flawless communities that thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">
            
            {/* Left Column: Health Score */}
            <div className="bg-[#121212]/80 backdrop-blur-md p-10 rounded-3xl border border-zinc-800/50 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-zinc-700 transition-colors duration-500 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f62fe]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">Health Score</span>
              <span className="text-zinc-500 text-sm mb-12 max-w-xs">The proportion of resolved to reported issues in real-time.</span>
              
              {/* Semi Circle Progress Arc */}
              <div className="relative w-full max-w-[280px] aspect-[2/1] overflow-hidden flex items-end justify-center mb-4">
                <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]" viewBox="0 0 200 100">
                  <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0f62fe" />
                      <stop offset="50%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#4facfe" />
                    </linearGradient>
                  </defs>
                  {/* Background Track Arc */}
                  <path d="M 20,100 A 80,80 0 0,1 180,100" fill="none" stroke="#222" strokeWidth="12" strokeLinecap="round" />
                  {/* Foreground Filled Arc (~96%) */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.96 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    d="M 20,100 A 80,80 0 0,1 180,100" 
                    fill="none" 
                    stroke="url(#arcGradient)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                </svg>
                
                {/* Text Center Overlay */}
                <div className="absolute bottom-0 flex flex-col items-center translate-y-2">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">96%</span>
                  <span className="text-xs font-bold text-[#00f2fe] uppercase tracking-widest mt-2 bg-[#00f2fe]/10 px-3 py-1 rounded-full">Excellent</span>
                </div>
              </div>
              <span className="text-zinc-600 text-xs mt-8">Updated live from monitored divisions.</span>
            </div>

            {/* Right Column: Analytics Bar Chart */}
            <div className="bg-[#121212]/80 backdrop-blur-md p-10 rounded-3xl border border-zinc-800/50 flex flex-col justify-between h-full relative overflow-hidden group hover:border-zinc-700 transition-colors duration-500 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#ff4a1c]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Infrastructure Analytics</span>
                <p className="text-zinc-500 text-sm mt-3 mb-10">Live ticket distribution recorded over the past 30 days.</p>
              </div>

              {/* Vertical Bars representation */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 items-end justify-items-center h-[240px] mb-2 relative z-10">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                </div>

                {/* Bar 1: Total Reports */}
                <div className="flex flex-col items-center w-full group/bar z-10">
                  <span className="text-sm font-bold text-white mb-3 opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">1,240</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "180px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-[#0f62fe]/50 to-[#4facfe] rounded-t-xl border-t border-l border-r border-[#4facfe]/50 shadow-[0_0_20px_rgba(79,172,254,0.3)]" 
                  />
                  <span className="text-[11px] text-zinc-500 font-bold tracking-widest mt-4 uppercase text-center">Reports</span>
                </div>

                {/* Bar 2: In Progress */}
                <div className="flex flex-col items-center w-full group/bar z-10">
                  <span className="text-sm font-bold text-white mb-3 opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">15%</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "80px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-[#ff7b00]/50 to-[#ff7b00] rounded-t-xl border-t border-l border-r border-[#ff7b00]/50 shadow-[0_0_20px_rgba(255,123,0,0.3)]" 
                  />
                  <span className="text-[11px] text-zinc-500 font-bold tracking-widest mt-4 uppercase text-center">In Progress</span>
                </div>

                {/* Bar 3: Critical */}
                <div className="flex flex-col items-center w-full group/bar z-10">
                  <span className="text-sm font-bold text-white mb-3 opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">4%</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "40px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-[#ef4444]/50 to-[#ef4444] rounded-t-xl border-t border-l border-r border-[#ef4444]/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                  />
                  <span className="text-[11px] text-zinc-500 font-bold tracking-widest mt-4 uppercase text-center">Critical</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of details below */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative z-10">
            {[
              { title: "Boost response speeds", desc: "Instantly map coordinates to corresponding maintenance sectors.", icon: "⚡" },
              { title: "Deduplicate tickets", desc: "Group similar issue reports together to save inspection hours.", icon: "🧠" },
              { title: "Engaging experience", desc: "Provide clean, friction-free forms for residents.", icon: "✨" },
              { title: "Build civic trust", desc: "Transparency and photo-validated completion notifications.", icon: "🛡️" }
            ].map((item, i) => (
              <div key={i} className="bg-[#121212]/50 p-8 rounded-2xl border border-zinc-800/50 hover:bg-[#1a1a1a] hover:border-zinc-700 transition-all duration-300">
                <div className="text-2xl mb-4 grayscale opacity-80">{item.icon}</div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Orange Call To Action section */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#ff4a1c] to-[#ff7b00] p-10 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 z-10 shadow-[0_0_40px_rgba(255,74,28,0.3)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/15 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="text-left z-10">
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">
                Gain more with less
              </h3>
              <p className="text-white/90 text-lg max-w-xl font-medium">
                Save time on administrative dispatch routines, optimize civic assets, and keep neighbors informed.
              </p>
            </div>
            <div className="z-10 shrink-0">
              <Link href="/report">
                <Button className="rounded-xl bg-white text-[#ff4a1c] hover:bg-zinc-100 font-bold px-10 py-7 text-lg shadow-xl transition-transform hover:scale-105 active:scale-95">
                  Report an Issue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Testimonial Cards Slider / "Our work in action" */}
          <div className="mt-32 text-center relative z-10">
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tighter">Our work in action</h3>
            <p className="text-zinc-400 text-lg mb-16 font-medium">Real feedback from community administrators and civic champions.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              
              <div className="bg-[#121212]/80 backdrop-blur-sm p-10 sm:p-12 rounded-3xl border border-zinc-800 relative group hover:border-zinc-600 transition-colors duration-300 overflow-hidden">
                <div className="absolute -top-10 -left-6 text-[140px] text-zinc-800/20 font-serif leading-none group-hover:text-[#0f62fe]/10 transition-colors duration-500 pointer-events-none select-none">"</div>
                <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-10 relative z-10">
                  Integrating Civic Eye has reduced our municipal complaint response times from two weeks to under 36 hours. The duplicate filtering alone saved us hours of redundant inspection work.
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0f62fe] to-[#4facfe] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(79,172,254,0.3)]">RS</div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">Rohit Sharma</h4>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Urban Development | MP</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#121212]/80 backdrop-blur-sm p-10 sm:p-12 rounded-3xl border border-zinc-800 relative group hover:border-zinc-600 transition-colors duration-300 overflow-hidden">
                <div className="absolute -top-10 -left-6 text-[140px] text-zinc-800/20 font-serif leading-none group-hover:text-[#ff4a1c]/10 transition-colors duration-500 pointer-events-none select-none">"</div>
                <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-10 relative z-10">
                  Citizens love the transparency. They can submit a photo of a broken streetlamp on their commute and check the dashboard to see when field technicians have scheduled the repair.
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff4a1c] to-[#ff7b00] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(255,74,28,0.3)]">AN</div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">Aditi Nair</h4>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Community Organizer | BNG</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </PageContainer>
      </section>

      {/* 5. RESOLUTION ANALYTICS (DARK MODE - Based on Image 4) */}
      <section className="bg-[#0d0d0d] text-white py-24 border-t border-zinc-900">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4">
                Resolution Performance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                Resolve issues beyond municipal algorithms.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Before Civic Eye, infrastructure repairs took weeks due to manual triage, missing coordinates, and duplicative entries. AI-driven routing automates classification, leading to a massive drop in average resolution times.
              </p>
            </div>

            {/* Right Graph (Stylized line chart - Image 4 style) */}
            <div className="lg:col-span-7 bg-[#121212] p-6 rounded-2xl border border-zinc-850">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                  <span className="text-xs text-zinc-400">Legacy Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff4a1c]" />
                  <span className="text-xs text-[#ff4a1c]">Civic Eye AI Dispatch</span>
                </div>
              </div>

              {/* SVG Line Graph */}
              <div className="w-full h-[220px]">
                <svg className="w-full h-full text-zinc-600" viewBox="0 0 500 200">
                  <defs>
                    <linearGradient id="lineOrangeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff4a1c" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ff4a1c" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="40" y1="30" x2="480" y2="30" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="80" x2="480" y2="80" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="130" x2="480" y2="130" stroke="#222" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="40" y1="180" x2="480" y2="180" stroke="#222" strokeWidth="1" />

                  {/* Curve 1: Legacy (Flat High Line) */}
                  <path 
                    d="M 40,60 C 150,55 300,65 480,50" 
                    fill="none" 
                    stroke="#555" 
                    strokeWidth="2" 
                    strokeDasharray="4,4"
                  />

                  {/* Curve 2: Civic Eye (Falling Line) */}
                  <path 
                    d="M 40,60 C 120,70 180,165 480,175" 
                    fill="none" 
                    stroke="#ff4a1c" 
                    strokeWidth="3.5" 
                  />
                  {/* Under-line gradient area */}
                  <path 
                    d="M 40,60 C 120,70 180,165 480,175 L 480,180 L 40,180 Z" 
                    fill="url(#lineOrangeGrad)"
                  />

                  {/* Data Points */}
                  <circle cx="40" cy="60" r="4.5" fill="#555" />
                  <circle cx="480" cy="50" r="4.5" fill="#555" />

                  <circle cx="40" cy="60" r="5" fill="#ff4a1c" />
                  <circle cx="180" cy="165" r="5" fill="#ff4a1c" />
                  <circle cx="480" cy="175" r="5" fill="#ff4a1c" />

                  {/* Labels */}
                  <text x="45" y="52" fill="#888" fontSize="10" fontWeight="bold">Start</text>
                  <text x="450" y="165" fill="#ff4a1c" fontSize="10" fontWeight="bold">4 Hours</text>
                  <text x="445" y="40" fill="#888" fontSize="10" fontWeight="bold">72 Hours</text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase font-bold tracking-wider px-2 mt-2">
                <span>Intake Submission</span>
                <span>Investigation Phase</span>
                <span>Crew Dispatch & Repair</span>
              </div>
            </div>

          </div>
        </PageContainer>
      </section>

      {/* 6. RECENT LIVE ISSUES IN REGION (DARK MODE) */}
      <section className="bg-[#121212] py-24 border-t border-zinc-900">
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3 text-left">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Recent Issues in Your Region</h2>
              <p className="text-zinc-400 text-sm max-w-xl">
                Explore local tickets reported by citizens, verified by Gemini AI, and routed directly to public works.
              </p>
            </div>
            <Link href="/map" className="shrink-0">
              <Button variant="outline" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white font-semibold px-6 py-5 rounded-md transition-all duration-300">
                Explore All Live Issues
              </Button>
            </Link>
          </div>

          {/* Recent issues grid (Styled as clean cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentIssues.map((issue) => (
              <div key={issue._id} className="bg-[#0b0b0b] border border-zinc-850 rounded-2xl flex flex-col justify-between h-full overflow-hidden hover:border-[#ff4a1c]/30 transition-all duration-300">
                <div>
                  {/* Category Image representation */}
                  <div
                    className="w-full h-40 flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: 'radial-gradient(circle at 30% 20%, #1c1c1f, #0d0d0f)' 
                    }}
                  >
                    {issue.imageUrl ? (
                      <Image src={issue.imageUrl} alt={issue.title} fill className="object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                        <FileText className="h-10 w-10 text-zinc-700" />
                      </>
                    )}
                    
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full z-10 uppercase tracking-wider">
                      {issue.category}
                    </span>
                  </div>

                  <div className="p-6 text-left">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <SeverityBadge severity={issue.severity} />
                      <span className="text-[10px] font-semibold text-zinc-500 flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3 text-[#ff4a1c]" />
                        {issue.supporters?.length || 0} upvotes
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {issue.title}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-zinc-500 mt-2">
                      <MapPin className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                      <span className="line-clamp-1">{issue.address || issue.location}</span>
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-zinc-900 bg-zinc-950/40 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="h-3.5 w-3.5 text-zinc-600" />
                    {new Date(issue.createdAt || issue.time).toLocaleDateString()}
                  </span>
                  <Link href={`/issues/${issue._id}`} className="text-[#ff4a1c] font-semibold hover:underline flex items-center gap-0.5">
                    Track status
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </PageContainer>
      </section>

      {/* 7. LET'S GET STARTED CTA (LIGHT MODE - Based on Image 3) */}
      <section className="bg-[#f5f5f5] text-[#1a1a1a] py-24">
        <PageContainer>
          <div className="bg-[#eaeaea] p-8 md:p-16 rounded-3xl border border-zinc-300 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Col */}
            <div className="text-left">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
                Let's get started
              </h2>
              <a href="mailto:hello@civiceye.org" className="text-lg sm:text-xl font-medium text-[#ff4a1c] hover:underline">
                hello@civiceye.org
              </a>
            </div>

            {/* Right Col Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-sm text-left">
              <h3 className="text-base font-bold text-zinc-900 mb-6">Learn how Civic Eye can help your community</h3>
              
              {formSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900">Request Sent Successfully!</h4>
                  <p className="text-zinc-500 text-xs">Our integration team will reach out to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      required
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                      className="px-4 py-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:border-[#ff4a1c] bg-zinc-50/50" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input 
                      type="text" 
                      placeholder="City / Community" 
                      required
                      value={emailForm.city}
                      onChange={(e) => setEmailForm({...emailForm, city: e.target.value})}
                      className="px-4 py-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:border-[#ff4a1c] bg-zinc-50/50" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input 
                      type="email" 
                      placeholder="Work email" 
                      required
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                      className="px-4 py-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:border-[#ff4a1c] bg-zinc-50/50" 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#111] hover:bg-black text-white font-semibold py-6 rounded-lg text-sm mt-2 transition-all">
                    Request Community Access
                  </Button>

                  <div className="flex items-start gap-2 mt-2">
                    <input type="checkbox" required id="privacy" className="mt-1 accent-[#ff4a1c]" />
                    <label htmlFor="privacy" className="text-[10px] text-zinc-500 leading-tight">
                      By clicking the button, I agree to the privacy policy and consent to receive emails about civic integration.
                    </label>
                  </div>
                </form>
              )}
            </div>

          </div>
        </PageContainer>
      </section>

    </div>
  );
}
