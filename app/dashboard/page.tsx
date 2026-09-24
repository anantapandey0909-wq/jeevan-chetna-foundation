'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Calendar, 
  FileText, 
  Trees, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';
import { DASHBOARD_METRICS } from '@/lib/data/dashboard-stats';
import { ACTIVITIES_DATA } from '@/lib/data/activities';
import { EVENTS_DATA } from '@/lib/data/events';
import { REPORTS_DATA } from '@/lib/data/reports';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityCategoryChart } from '@/components/dashboard/ActivityCategoryChart';
import { ParticipationTrendChart } from '@/components/dashboard/ParticipationTrendChart';
import { WorkAreaPieChart } from '@/components/dashboard/WorkAreaPieChart';
import { RecentReportsTable } from '@/components/dashboard/RecentReportsTable';
import { ActivityCreateModal } from '@/components/forms/ActivityCreateModal';
import { ReportLogModal } from '@/components/forms/ReportLogModal';
import { formatDate } from '@/lib/utils';

export default function DashboardOverviewPage() {
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const recentActivities = ACTIVITIES_DATA.slice(0, 4);
  const upcomingEvents = EVENTS_DATA.filter((e) => e.status === 'Upcoming').slice(0, 2);

  return (
    <div className="space-y-8">
      {/* 1. Welcome & Status Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Framework Solution • Chapter IV</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to the Community Activity Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Centralized monitoring prototype for {NGO_INFO.name} ({NGO_INFO.officeAddress.city}, {NGO_INFO.officeAddress.state}). Real-time visibility into field plantation drives, digital literacy workshops, attendance records, and documentation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActivityModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Activity</span>
          </button>

          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Log Report</span>
          </button>
        </div>
      </div>

      {/* Subtle Prototype Demonstration Notice */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center gap-2.5 text-xs text-slate-500">
        <Info className="w-4 h-4 text-forest-700 shrink-0" />
        <span>
          <strong className="text-slate-700 font-semibold">Prototype Demonstration:</strong> Operational records shown in this prototype are demonstration data used to illustrate the portal&apos;s functionality and are not official NGO records.
        </span>
      </div>

      {/* 2. Official KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {DASHBOARD_METRICS.map((metric, idx) => (
          <StatCard
            key={idx}
            label={metric.label}
            value={metric.value}
            caption={metric.caption}
            change={metric.change}
            badge={metric.badge}
            iconName={metric.icon}
            isOfficial={true}
          />
        ))}
      </div>

      {/* 3. Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* A. Activities by Category Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-forest-700" />
                <span>Activities by Category</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Distribution of field drives across environmental, IT, and welfare categories
              </p>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Prototype Visualization
            </span>
          </div>

          <ActivityCategoryChart />
        </div>

        {/* C. Sector Allocation Donut Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-forest-700" />
              <span>Programmatic Distribution</span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Sector share under flagship campaigns
            </p>
          </div>

          <WorkAreaPieChart />
        </div>
      </div>

      {/* 4. Monthly Participation Trends Line Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <LineChartIcon className="w-4 h-4 text-forest-700" />
              <span>Monthly Activity Participation & Volunteer Mobilization</span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Community volunteer participation trend across Haldwani & Nainital regional drives
            </p>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Trend Model (Demo)
          </span>
        </div>

        <ParticipationTrendChart />
      </div>

      {/* 5. Split Section: Recent Activities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities Timeline */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Trees className="w-4 h-4 text-forest-700" />
              <span>Recently Documented Activities</span>
            </h2>
            <Link
              href="/dashboard/activities"
              className="text-xs font-semibold text-forest-700 hover:text-forest-900 inline-flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 transition-colors flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full font-bold bg-white text-forest-800 border border-slate-200">
                      {act.category}
                    </span>
                    <span className="text-slate-400">{formatDate(act.date)}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{act.title}</h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {act.location}
                  </p>
                </div>

                <Link
                  href={`/activities/${act.id}`}
                  className="px-3 py-1.5 bg-white hover:bg-forest-50 text-forest-800 border border-slate-200 rounded-lg text-xs font-semibold transition-colors shrink-0"
                >
                  Inspect
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-forest-700" />
                <span>Scheduled Events</span>
              </h2>
              <Link
                href="/dashboard/events"
                className="text-xs font-semibold text-forest-700 hover:text-forest-900"
              >
                Calendar
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 text-[10px] uppercase">
                      {evt.category}
                    </span>
                    <span className="text-[10px] bg-white text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                      {evt.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs">{evt.title}</h3>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{evt.venue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Coordinates volunteer rosters & attendance intake for upcoming drives.
          </div>
        </div>
      </div>

      {/* 6. Recent Documentation & Report Logs Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-forest-700" />
              <span>Recent Documentation & Field Logs (Internship Chapter IV)</span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Verified daily logs, event summaries, and attendance spreadsheets
            </p>
          </div>
          <Link
            href="/dashboard/reports"
            className="text-xs font-semibold text-forest-700 hover:text-forest-900 inline-flex items-center gap-1"
          >
            <span>All Records</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <RecentReportsTable reports={REPORTS_DATA.slice(0, 4)} />
      </div>

      {/* Modals */}
      <ActivityCreateModal
        isOpen={activityModalOpen}
        onClose={() => setActivityModalOpen(false)}
      />
      <ReportLogModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
}
