const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../components/layout/Navbar.tsx');

const content = `'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Menu, X, Target, LayoutGrid, FileText, 
  User as UserIcon, ChevronDown, Bell, Plus, Eye 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  name: string;
}

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Error fetching session:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const navLinks = user
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
        { name: 'My Reports', href: '/my-reports', icon: FileText },
      ]
    : [
        { name: 'Home', href: '/', icon: LayoutGrid },
        { name: 'Explore', href: '/#explore', icon: Target },
        { name: 'How It Works', href: '/#how-it-works', icon: FileText },
      ];

  return (
    <header className="sticky top-6 z-50 w-full px-4 md:px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-4 md:px-6 shadow-2xl">
          
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter text-white">
              <Target className="h-6 w-6 text-[#ff4a1c]" />
              <span>civic<span className="text-zinc-500 font-medium">eye</span></span>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-white/10 mx-6" />

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              {!loading && navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={\`flex items-center gap-2 text-sm transition-colors \${
                      isActive ? 'text-white font-bold' : 'text-zinc-400 font-medium hover:text-white'
                    }\`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <>
                    {/* User Pill */}
                    <div className="flex items-center gap-2 text-xs text-zinc-300 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full font-medium tracking-wide">
                      <UserIcon className="h-3.5 w-3.5" />
                      <span className="max-w-[100px] truncate">{user.email.split('@')[0]}</span>
                      <ChevronDown className="h-3 w-3 text-zinc-500" />
                    </div>

                    {/* Notification Bell */}
                    <button className="relative p-2 text-zinc-400 hover:text-white transition-colors mx-1 cursor-pointer">
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-[#ff4a1c] border-2 border-black rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                        2
                      </span>
                    </button>

                    {/* Sign Out */}
                    <button onClick={handleSignOut} className="text-sm font-medium text-zinc-400 hover:text-white mx-3 cursor-pointer">
                      Sign Out
                    </button>
                    
                    {/* Report Issue CTA */}
                    <Link href="/report">
                      <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#ff4a1c] to-[#ff2a00] hover:opacity-90 text-white shadow-lg shadow-[#ff4a1c]/20 font-bold px-5 py-2 rounded-full transition-opacity cursor-pointer text-sm">
                        <Plus className="h-4 w-4" />
                        Report Issue
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <button className="text-sm font-medium text-zinc-400 hover:text-white mx-3 cursor-pointer">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#ff4a1c] to-[#ff2a00] hover:opacity-90 text-white shadow-lg shadow-[#ff4a1c]/20 font-bold px-6 py-2 rounded-full transition-opacity cursor-pointer text-sm">
                        Get Started
                      </button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="cursor-pointer text-zinc-400 hover:text-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="space-y-1 px-4 py-4 pb-6">
              {!loading && navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={\`flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-all \${
                      isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }\`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
              
              {!loading && (
                <div className="pt-4 flex flex-col gap-3 border-t border-white/10 mt-4 px-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-zinc-300 px-3 py-2 rounded-md bg-white/5 font-medium truncate mb-2">
                        <UserIcon className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <Button variant="outline" onClick={() => { setIsOpen(false); handleSignOut(); }} className="w-full justify-center cursor-pointer border-white/10 text-zinc-300 hover:text-white hover:bg-white/5">
                        Sign Out
                      </Button>
                      <Link href="/report" onClick={() => setIsOpen(false)} className="w-full">
                        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff4a1c] to-[#ff2a00] hover:opacity-90 text-white shadow-lg shadow-[#ff4a1c]/20 font-bold py-2.5 rounded-full transition-opacity cursor-pointer">
                          <Plus className="h-4 w-4" />
                          Report Issue
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                        <Button variant="outline" className="w-full justify-center cursor-pointer border-white/10 text-zinc-300 hover:text-white hover:bg-white/5">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff4a1c] to-[#ff2a00] hover:opacity-90 text-white shadow-lg shadow-[#ff4a1c]/20 font-bold py-2.5 rounded-full transition-opacity cursor-pointer">
                          Get Started
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
`;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Navbar successfully updated to match the image exact style.');
