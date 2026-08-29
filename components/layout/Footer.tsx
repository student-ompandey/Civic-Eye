import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';

export function Footer() {
  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Explore Issues', href: '#explore' },
        { name: 'Report Issue', href: '#report' },
        { name: 'How It Works', href: '#how-it-works' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { name: 'Community', href: '#community' },
        { name: 'Impact', href: '#impact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20 py-12 md:py-16">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-brand-navy dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-md">
                <Eye className="h-4.5 w-4.5" />
              </div>
              <span>
                Civic<span className="text-brand-blue">Eye</span>
              </span>
            </Link>
            <p className="text-sm font-medium text-muted-foreground max-w-xs">
              See a Problem. Report It. Track the Change.
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1">
              Empowering citizens to report, track, and collaborate on local public issues to build cleaner, safer, and better neighborhoods together.
            </p>
          </div>

          {/* Links Columns */}
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Civic Eye. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
