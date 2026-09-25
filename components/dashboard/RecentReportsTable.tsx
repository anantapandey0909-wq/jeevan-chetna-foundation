'use client';

import React, { useState } from 'react';
import { FileText, Eye, Download, CheckCircle2, Clock, X, Sparkles } from 'lucide-react';
import { DocumentationRecord } from '@/types/report';
import { formatDate } from '@/lib/utils';
import { DemoBadge } from '@/components/ui/DemoBadge';

interface RecentReportsTableProps {
  reports: DocumentationRecord[];
}

export function RecentReportsTable({ reports }: RecentReportsTableProps) {
  const [selectedReport, setSelectedReport] = useState<DocumentationRecord | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleSimulatedDownload = (report: DocumentationRecord) => {
    setDownloadToast(`Prototype record generated: ${report.reportCode}.pdf (Demonstration UI)`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Code / Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Activity Association</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 flex-wrap">
                    <FileText className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span>{report.title}</span>
                    {report.isDemo && <DemoBadge />}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {report.reportCode} • {report.sizeEstimate}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {report.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                  {report.associatedActivity}
                </td>
                <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                  {formatDate(report.date)}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    report.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : report.status === 'Archived'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {report.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                    {report.status === 'Under Review' && <Clock className="w-3 h-3" />}
                    {report.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="p-1 text-slate-600 hover:text-forest-700 hover:bg-forest-50 rounded transition-colors"
                      title="Inspect Report Record"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSimulatedDownload(report)}
                      className="p-1 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      title="Simulate Document Export"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download Notification Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 text-xs flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-150">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadToast}</span>
          <button onClick={() => setDownloadToast(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Report Preview Drawer / Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-forest-900 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-300" />
                <div>
                  <h3 className="font-semibold text-sm leading-tight">{selectedReport.title}</h3>
                  <p className="text-[11px] text-emerald-200">{selectedReport.reportCode} • {selectedReport.type}</p>
                </div>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                <span><strong>Prototype Demo Record:</strong> Operational log shown for interface and reporting demonstration.</span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Date of Record</span>
                  <span className="font-semibold text-slate-800">{formatDate(selectedReport.date)}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Field Location</span>
                  <span className="font-semibold text-slate-800">{selectedReport.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Activity Linkage</span>
                  <span className="font-semibold text-slate-800">{selectedReport.associatedActivity}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Author / Logger</span>
                  <span className="font-semibold text-slate-800">{selectedReport.authorOrIntern}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  Executive Summary
                </h4>
                <p className="text-slate-600 leading-relaxed bg-white p-3 border border-slate-100 rounded-lg">
                  {selectedReport.summary}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                  Key Field Observations
                </h4>
                <ul className="space-y-1.5">
                  {selectedReport.keyObservations.map((obs, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 bg-emerald-50/50 p-2 rounded border border-emerald-100/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-1.5 shrink-0" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-slate-400 text-[11px]">
                  File Size: {selectedReport.sizeEstimate} • {selectedReport.fileFormat}
                </span>
                <button
                  onClick={() => {
                    handleSimulatedDownload(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest-700 hover:bg-forest-800 text-white rounded-lg text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Demo PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
