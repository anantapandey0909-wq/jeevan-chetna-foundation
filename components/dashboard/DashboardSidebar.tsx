'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TreePine,
  LayoutDashboard,
  Trees,
  Calendar,
  Users,
  FileText,
  Image as ImageIcon,
  HeartHandshake,
  Settings,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

const SIDEBAR_ITEMS = [
  { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Activities Management', href: '/dashboard/activities', icon: Trees },
  { name: 'Events & Drives', href: '/dashboard/events', icon: Calendar },
  { name: 'Volunteer Registry', href: '/dashboard/volunteers', icon: Users },
  { name: 'Documentation Archive', href: '/dashboard/reports', icon: FileText },
  { name: 'Photo Collection', href: '/dashboard/gallery', icon: ImageIcon },
  { name: 'Community Outreach', href: '/dashboard/community', icon: HeartHandshake },
  { name: 'Portal Settings', href: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 min-h-screen">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-forest-700 text-white flex items-center justify-center shrink-0">
            <TreePine className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white leading-tight">
              {NGO_INFO.shortName} Admin Portal
            </h2>
            <p className="text-[10px] text-emerald-400 font-medium">
              Digital Framework Prototype
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation list */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Internal Management
        </div>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-forest-800 text-white font-semibold border border-forest-700/60 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / Back to Public Site */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px] uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ISO 9001:2015</span>
          </div>
          <p className="text-slate-400 text-[10px]">
            Haldwani, Nainital • Uttarakhand
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Website</span>
        </Link>
      </div>
    </aside>
  );
}
