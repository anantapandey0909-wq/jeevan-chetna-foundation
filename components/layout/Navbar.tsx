'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  TreePine, 
  Menu, 
  X, 
  Search, 
  LayoutDashboard, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';
import { GlobalSearchModal } from './GlobalSearchModal';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Activities', href: '/activities' },
  { name: 'Events', href: '/events' },
  { name: 'Volunteers', href: '/volunteers' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Reports & Records', href: '/reports' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // If inside /dashboard, render a distinct top bar or let dashboard layout handle it
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-forest-700 to-forest-900 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                <TreePine className="w-6 h-6 text-emerald-200" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight leading-tight group-hover:text-forest-800 transition-colors">
                  {NGO_INFO.name}
                </span>
                <span className="text-[11px] font-medium text-slate-500 tracking-normal flex items-center gap-1.5">
                  <span>Haldwani, Nainital</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-forest-700 font-semibold">{NGO_INFO.legalStatus.split(' ')[0]} {NGO_INFO.legalStatus.split(' ')[1]}</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-forest-900 bg-forest-50/80 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search & Portal Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Trigger Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors"
                title="Search portal"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium">Search...</span>
                <kbd className="hidden sm:inline-block bg-white px-1.5 py-0.5 text-[10px] text-slate-400 font-mono rounded border border-slate-200">
                  Ctrl+K
                </kbd>
              </button>

              {/* Portal / Dashboard CTA */}
              <Link
                href="/dashboard"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  isDashboard
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-forest-700 hover:bg-forest-800 text-white shadow-sm hover:shadow-md active:scale-95'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>

            {/* Mobile / Tablet Menu Trigger */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'text-forest-900 bg-forest-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-forest-700 text-white rounded-lg font-medium text-sm shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Internal Admin Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
