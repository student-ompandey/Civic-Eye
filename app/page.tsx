'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { IssueSeverity } from '@/types';

// Animated Stats Counter Component
function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000; // ms
    const steps = Math.min(end, 50);
    const stepValue = Math.ceil(end / steps);

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  const [activeProblemTab, setActiveProblemTab] = useState<number>(0);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const scrollReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
  };

  const problemFriction = [
    {
      id: 0,
      title: "People don't know where to report.",
      desc: "Citizens struggle to find appropriate municipal departments or phone lines, leading to unreported safety hazards.",
      solution: "One Central Hub",
      solutionDesc: "Civic Eye routes all issues automatically based on photo analysis—no search required by the user."
    },
    {
      id: 1,
      title: "Complaints take too long.",
      desc: "Manual intake systems, long forms, and bureaucratic handoffs delay repairs by weeks or months.",
      solution: "Instant Dispatch",
      solutionDesc: "Issues are classified by AI and dispatched directly to local field agencies in seconds."
    },
    {
      id: 2,
      title: "Issues are reported multiple times.",
      desc: "Duplicate reports clog administrative channels and waste precious inspection resources.",
      solution: "Smart De-duplication",
      solutionDesc: "Our system detects existing reports nearby and groups them, accumulating 'upvotes' instead of duplicate entries."
    },
    {
      id: 3,
      title: "Citizens cannot track progress.",
      desc: "Once a complaint is submitted, it enters a black box. Users receive no follow-up or verification.",
      solution: "Full Transparency",
      solutionDesc: "A public dashboard lets you watch the ticket move from 'Reported' to 'In Progress' to 'Resolved' with photo proof."
    }
  ];

  const mockFeaturedIssues = [
    {
      id: '1',
      title: 'Large Road Pothole',
      category: 'Road Infrastructure',
      location: 'Bhopal, Madhya Pradesh',
      severity: 'high' as IssueSeverity,
      status: 'reported',
      time: '10 mins ago',
      upvotes: 42,
      imageUrl: 'radial-gradient(circle at 30% 20%, oklch(0.25 0.05 250), oklch(0.12 0.04 250))'
    },
    {
      id: '2',
      title: 'Clogged Storm Drain',
      category: 'Water & Utilities',
      location: 'Mumbai, Maharashtra',
      severity: 'medium' as IssueSeverity,
      status: 'in-progress',
      time: '2 hours ago',
      upvotes: 89,
      imageUrl: 'radial-gradient(circle at 30% 20%, oklch(0.55 0.18 250), oklch(0.18 0.05 250))'
    },
    {
      id: '3',
      title: 'Broken Streetlight Grid',
      category: 'Public Lighting',
      location: 'Bengaluru, Karnataka',
      severity: 'low' as IssueSeverity,
      status: 'resolved',
      time: '1 day ago',
      upvotes: 156,
      imageUrl: 'radial-gradient(circle at 30% 20%, oklch(0.72 0.16 200), oklch(0.18 0.05 250))'
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* 1. HERO SECTION & VISUAL */}
      <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-radial from-brand-blue/8 via-transparent to-transparent">
        {/* Abstract background grid */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.92_0.01_250_/_35%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.01_250_/_35%)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,oklch(0.22_0.03_250_/_40%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0.03_250_/_40%)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)]" />

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
              className="lg:col-span-6 flex flex-col gap-6 text-left max-w-2xl mx-auto lg:mx-0"
            >
              {/* Badge */}
              <motion.div variants={fadeIn} className="w-fit">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/15 text-brand-blue border border-brand-blue/20">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  AI-Powered Civic Intelligence
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeIn}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground"
              >
                See a Problem. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-cyan">
                  Make a Difference.
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeIn}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
              >
                Report real-world civic issues with a photo. Our AI helps identify, classify, and prioritize problems so communities can take action faster.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold shadow-md shadow-brand-blue/25">
                  <Plus className="h-5 w-5 mr-1" />
                  Report an Issue
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold border-border/80 hover:bg-muted/50">
                  Explore Issues
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Interactive Visual Map Grid */}
            <div className="lg:col-span-6 w-full h-[400px] sm:h-[480px] relative rounded-2xl border border-border/50 bg-background/50 backdrop-blur-xs overflow-hidden shadow-2xl">
              {/* City Grid Canvas */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.90_0.02_250_/_40%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.90_0.02_250_/_40%)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,oklch(0.20_0.04_250_/_50%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.20_0.04_250_/_50%)_1px,transparent_1px)] bg-[size:24px_24px] opacity-75" />
              
              {/* Radial glow background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-blue/15 blur-3xl" />

              {/* Interactive map points */}
              <div className="absolute top-[35%] left-[25%]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-severity-critical opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-severity-critical shadow"></span>
                </span>
              </div>
              <div className="absolute top-[65%] left-[75%]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-severity-high opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-severity-high shadow"></span>
                </span>
              </div>
              <div className="absolute top-[20%] left-[65%]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-severity-medium opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-severity-medium shadow"></span>
                </span>
              </div>
              <div className="absolute top-[80%] left-[35%]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-severity-resolved opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-severity-resolved shadow"></span>
                </span>
              </div>

              {/* Floating Issue Cards (3D Hover, Floating animations) */}
              
              {/* Pothole Card */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.2 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="absolute top-[8%] left-[6%] w-[180px] sm:w-[220px]"
              >
                <div className="p-3 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-lg flex items-start gap-2.5">
                  <span className="text-xl shrink-0">🕳️</span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground truncate">Road Pothole</h4>
                    <p className="text-[10px] text-muted-foreground">Reported 2m ago</p>
                    <span className="inline-flex w-fit items-center text-[9px] font-semibold text-severity-critical bg-severity-critical/10 px-1.5 py-0.5 rounded">
                      Critical
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Streetlight Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.4 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute top-[28%] right-[8%] w-[180px] sm:w-[220px]"
              >
                <div className="p-3 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-lg flex items-start gap-2.5">
                  <span className="text-xl shrink-0">💡</span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground truncate">Broken Streetlight</h4>
                    <p className="text-[10px] text-muted-foreground">Reported 12m ago</p>
                    <span className="inline-flex w-fit items-center text-[9px] font-semibold text-severity-low bg-severity-low/10 px-1.5 py-0.5 rounded">
                      Low
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Trash Card */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.6 },
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }
                }}
                className="absolute bottom-[24%] left-[10%] w-[180px] sm:w-[220px]"
              >
                <div className="p-3 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-lg flex items-start gap-2.5">
                  <span className="text-xl shrink-0">🚮</span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground truncate">Garbage Overflow</h4>
                    <p className="text-[10px] text-muted-foreground">Reported 45m ago</p>
                    <span className="inline-flex w-fit items-center text-[9px] font-semibold text-severity-high bg-severity-high/10 px-1.5 py-0.5 rounded">
                      High
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Water Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.8 },
                  y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.5 }
                }}
                className="absolute bottom-[8%] right-[10%] w-[180px] sm:w-[220px]"
              >
                <div className="p-3 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-lg flex items-start gap-2.5">
                  <span className="text-xl shrink-0">💧</span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground truncate">Water Leakage</h4>
                    <p className="text-[10px] text-muted-foreground">Reported 1h ago</p>
                    <span className="inline-flex w-fit items-center text-[9px] font-semibold text-severity-medium bg-severity-medium/10 px-1.5 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Glowing radar sweep */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-brand-blue/3 to-transparent -translate-y-full animate-[radar_8s_linear_infinite]" style={{ transformOrigin: 'top' }} />

            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. TRUST / IMPACT STRIP */}
      <section className="border-y border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20 py-8 sm:py-10">
        <PageContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 justify-items-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center gap-1.5">
              <StatCounter value={1200} suffix="+" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider uppercase">
                Issues Reported
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center gap-1.5">
              <StatCounter value={850} suffix="+" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider uppercase">
                Issues Resolved
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center gap-1.5">
              <StatCounter value={12} />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider uppercase">
                Communities
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center gap-1.5">
              <StatCounter value={92} suffix="%" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider uppercase">
                AI Accuracy
              </span>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Section Header */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={scrollReveal}
              className="text-center max-w-3xl mx-auto flex flex-col gap-3"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Problems Exist Everywhere. <br className="hidden sm:inline" />
                Reporting Them Shouldn&apos;t Be Hard.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
                Existing civic reporting systems are slow, complex, and opaque. We built Civic Eye to remove friction for both citizens and local authorities.
              </p>
            </motion.div>

            {/* Tabbed / Grid comparison of friction vs. solution */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Side: Friction items list */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {problemFriction.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveProblemTab(idx)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 ${
                      activeProblemTab === idx
                        ? 'border-brand-blue bg-brand-blue/5 text-foreground shadow-xs'
                        : 'border-border/60 bg-transparent text-muted-foreground hover:border-border hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        activeProblemTab === idx ? 'bg-brand-blue text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className={`text-sm font-semibold ${activeProblemTab === idx ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Side: Showcase of Solution (Responsive Detail View) */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProblemTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col justify-between border-brand-blue/30 bg-radial from-brand-blue/3 to-transparent">
                      <CardHeader className="gap-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-100/60 dark:bg-red-950/20 px-2.5 py-0.5 rounded-full w-fit">
                          <HelpCircle className="h-3.5 w-3.5" />
                          The Friction
                        </div>
                        <CardTitle className="text-xl font-bold text-foreground">
                          {problemFriction[activeProblemTab].title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground leading-relaxed mt-1">
                          {problemFriction[activeProblemTab].desc}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="py-6 border-t border-border/40 bg-zinc-50/50 dark:bg-zinc-950/10 flex flex-col gap-3 rounded-b-xl">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-full w-fit">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          The Civic Eye Solution: {problemFriction[activeProblemTab].solution}
                        </div>
                        <p className="text-sm text-foreground font-medium leading-relaxed">
                          {problemFriction[activeProblemTab].solutionDesc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </PageContainer>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 bg-zinc-50/30 dark:bg-zinc-950/10 border-y border-border/40">
        <PageContainer>
          <div className="flex flex-col gap-16">
            {/* Header */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={scrollReveal}
              className="text-center max-w-2xl mx-auto flex flex-col gap-3"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground">How Civic Eye Works</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                An intuitive three-step pathway connecting citizens and local administrators on a single transparent dashboard.
              </p>
            </motion.div>

            {/* Timeline Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
              {/* Connector line on large viewports */}
              <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-blue via-brand-cyan to-emerald-500 -z-10" />

              {/* Step 1 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
                className="flex flex-col items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20 text-xl font-extrabold mb-5 relative">
                  <Camera className="h-6 w-6" />
                  <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-brand-blue/30 text-brand-blue text-xs font-bold">
                    01
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Capture</h3>
                <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
                  Take or upload a photo of the civic problem using your phone or web interface. We capture GPS tags.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
                className="flex flex-col items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-cyan text-white shadow-lg shadow-brand-cyan/20 text-xl font-extrabold mb-5 relative">
                  <Brain className="h-6 w-6" />
                  <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-brand-cyan/30 text-brand-cyan text-xs font-bold">
                    02
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">AI Understands</h3>
                <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
                  Gemini AI identifies the issue category, evaluates severity levels, and logs details automatically.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
                className="flex flex-col items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 text-xl font-extrabold mb-5 relative">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-emerald-500/30 text-emerald-600 text-xs font-bold">
                    03
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Track Change</h3>
                <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
                  Follow the progress live, upvote neighboring issues, and see local civic improvement metrics.
                </p>
              </motion.div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 5. AI FEATURES GRID */}
      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Header */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={scrollReveal}
              className="text-center max-w-2xl mx-auto flex flex-col gap-3"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Advanced AI Features</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Civic Eye leverages state-of-the-art vision and text analysis models to eliminate administrative bottlenecking.
              </p>
            </motion.div>

            {/* Features 2x2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
              
              {/* Feature 1 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
              >
                <Card className="h-full border-border/80 hover:border-brand-blue/30">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                      <Camera className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">AI Vision</CardTitle>
                      <CardDescription className="text-xs">Understand civic problems from photos.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Our vision modeling extracts detailed data points from raw images, identifying concrete damage, overflow thresholds, safety hazards, and surrounding context without manual report descriptions.
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
              >
                <Card className="h-full border-border/80 hover:border-brand-blue/30">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">Smart Classification</CardTitle>
                      <CardDescription className="text-xs">Automatically identify issue categories.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Instantly tag reports with standard municipal categories (Sanitation, Roadways, Utilities, Transit). Ensures reports land on the desk of the correct department without human dispatch filters.
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
              >
                <Card className="h-full border-border/80 hover:border-brand-blue/30">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">Severity Intelligence</CardTitle>
                      <CardDescription className="text-xs">Highlight problems that require urgent attention.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Analyzes safety risks and community impact levels to rate issues from Low to Critical. Helps road crews and electricians prioritize repairs based on safety hazards, not first-come-first-serve.
                  </CardContent>
                </Card>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={scrollReveal}
              >
                <Card className="h-full border-border/80 hover:border-brand-blue/30">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">Community Signals</CardTitle>
                      <CardDescription className="text-xs">Combine reports to surface important problems.</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    Correlates metadata such as GPS logs, categories, and times to link related citizen reports. Surfaces localized hotspots and accumulates upvotes, showing administrators where civic action is needed most.
                  </CardContent>
                </Card>
              </motion.div>

            </div>
          </div>
        </PageContainer>
      </section>

      {/* 6. FEATURED ISSUES SECTION */}
      <section id="explore" className="py-16 md:py-24 bg-zinc-50/30 dark:bg-zinc-950/10 border-y border-border/40">
        <PageContainer>
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-3 max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Recent Issues in Your Region</h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Explore local tickets reported by citizens, verified by artificial intelligence, and routed to public works.
                </p>
              </div>
              <Button variant="outline" className="border-border/80 hover:bg-muted/50 w-full sm:w-auto shrink-0 font-semibold">
                Explore All Live Issues
              </Button>
            </div>

            {/* Issues Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockFeaturedIssues.map((issue) => (
                <Card key={issue.id} className="flex flex-col h-full bg-background justify-between border-border/60 hover:border-brand-blue/30 shadow-xs">
                  <div>
                    {/* Visual Card Image Placeholder */}
                    <div
                      className="w-full h-44 rounded-t-xl flex items-center justify-center relative overflow-hidden"
                      style={{ background: issue.imageUrl }}
                    >
                      {/* Abstract grid lines overlaying the placeholder */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0_/_10%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0_/_10%)_1px,transparent_1px)] bg-[size:16px_16px]" />
                      <FileText className="h-10 w-10 text-white/40 z-10" />
                      
                      {/* Floating Category Badge */}
                      <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                        {issue.category}
                      </span>
                    </div>

                    <CardHeader className="pb-3 pt-4">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <SeverityBadge severity={issue.severity} />
                        <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-brand-blue" />
                          {issue.upvotes} upvotes
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {issue.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 text-xs mt-1">
                        <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
                        <span className="line-clamp-1 text-muted-foreground">{issue.location}</span>
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <CardFooter className="pt-3 pb-4 border-t bg-muted/20 flex items-center justify-between text-xs text-muted-foreground mt-4">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {issue.time}
                    </span>
                    <button className="text-brand-blue font-semibold hover:underline flex items-center gap-0.5">
                      Track ticket
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-16 md:py-24">
        <PageContainer>
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={scrollReveal}
            className="w-full max-w-5xl mx-auto rounded-3xl border border-brand-blue/30 bg-radial from-brand-blue/10 via-brand-navy-dark to-brand-navy-dark text-white p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
          >
            {/* Neon accent glowing blobs */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15]">
                Your City Improves When <br />
                Problems Become Visible.
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Join citizens using Civic Eye to report issues, verify repairs, and make communities safer and better.
              </p>
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold shadow-md shadow-brand-blue/30 mt-2 px-8">
                <Plus className="h-5 w-5 mr-1" />
                Report an Issue
              </Button>
            </div>
          </motion.div>
        </PageContainer>
      </section>
      
    </div>
  );
}
