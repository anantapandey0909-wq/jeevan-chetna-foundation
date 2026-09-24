'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  Calendar, 
  FileText, 
  Trees, 
  UserCheck, 
  Check, 
  X,
  ExternalLink 
} from 'lucide-react';
import { ActivityCreateModal } from '@/components/forms/ActivityCreateModal';
import { ReportLogModal } from '@/components/forms/ReportLogModal';
import { GlobalSearchModal } from '@/components/layout/GlobalSearchModal';

export function DashboardTopbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const currentDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
        {/* Left Search Bar & Date */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-lg transition-colors w-48 sm:w-64"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search system records...</span>
            <kbd className="hidden sm:inline-block ml-auto bg-white px-1.5 py-0.5 text-[10px] text-slate-400 font-mono rounded border border-slate-200">
              Ctrl+K
            </kbd>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium border-l border-slate-200 pl-4">
            <Calendar className="w-3.5 h-3.5 text-forest-700" />
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setActivityModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest-50 hover:bg-forest-100 text-forest-800 border border-forest-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <Trees className="w-3.5 h-3.5" />
              <span>+ Activity</span>
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>+ Log Report</span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative"
              title="System Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-forest-600 absolute top-1.5 right-1.5 ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-xs">System Activity Feed</span>
                  <button onClick={() => setNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-2 space-y-2">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900">
                    <p className="font-semibold text-[11px]">Green Haldwani Drive</p>
                    <p className="text-[10px] text-emerald-700">Attendance and photo records verified for Ramari Choti drive.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                    <p className="font-semibold text-[11px]">Seeds of Digital Confidence</p>
                    <p className="text-[10px] text-slate-500">Student evaluation logs uploaded for Chapter IV report.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center font-bold text-xs">
              IC
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">Intern Coordinator</p>
              <p className="text-[10px] text-slate-400">Social Internship Portal</p>
            </div>
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ActivityCreateModal isOpen={activityModalOpen} onClose={() => setActivityModalOpen(false)} />
      <ReportLogModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} />
    </>
  );
}
