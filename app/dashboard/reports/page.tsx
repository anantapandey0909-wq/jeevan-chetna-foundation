'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, BookOpen, Info } from 'lucide-react';
import { REPORTS_DATA } from '@/lib/data/reports';
import { RecentReportsTable } from '@/components/dashboard/RecentReportsTable';
import { ReportLogModal } from '@/components/forms/ReportLogModal';
import { DocumentationRecord } from '@/types/report';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<DocumentationRecord[]>(REPORTS_DATA);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const handleCreated = (newRep: DocumentationRecord) => {
    setReports([newRep, ...reports]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
            <BookOpen className="w-3 h-3" />
            <span>Chapter IV Documentation Records</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-forest-700" />
            <span>Field Documentation & Report Archive</span>
          </h1>
          <p className="text-xs text-slate-500">
            Index of daily reports, event summaries, attendance logs, and photo catalogs.
          </p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Log Daily Report</span>
        </button>
      </div>

      {/* Subtle Prototype Demonstration Notice */}
      <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center gap-2.5 text-xs text-slate-500">
        <Info className="w-4 h-4 text-forest-700 shrink-0" />
        <span>
          <strong className="text-slate-700 font-semibold">Prototype Demonstration:</strong> Operational records shown in this archive are demonstration data used to illustrate the portal&apos;s functionality and are not official NGO records.
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <RecentReportsTable reports={reports} />
      </div>

      <ReportLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onReportCreated={handleCreated}
      />
    </div>
  );
}
