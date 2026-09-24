'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  CheckCircle2, 
  Clock, 
  BookOpen,
  Sparkles,
  X,
  FileCheck,
  Info,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { DocumentationRecord, ReportType } from '@/types/report';
import { formatDate } from '@/lib/utils';
import { ReportLogModal } from '@/components/forms/ReportLogModal';
import { apiGet, ApiError } from '@/lib/api-client';
import { mapReport, RawDocumentationRecord } from '@/lib/api-adapters';

const REPORT_TYPES: Array<'All' | ReportType> = [
  'All',
  'Daily Internship Report',
  'Event Summary',
  'Attendance Record',
  'Activity Summary',
  'Photograph Log',
  'Field Documentation',
];

export default function ReportsPage() {
  const [reportsList, setReportsList] = useState<DocumentationRecord[]>([]);
  const [selectedType, setSelectedType] = useState<'All' | ReportType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<DocumentationRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const json = await apiGet<{ success: true; count: number; data: RawDocumentationRecord[] }>('/api/reports');
      setReportsList(json.data.map(mapReport));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to load reports. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const filteredReports = useMemo(() => {
    return reportsList.filter((rep) => {
      const matchesType = selectedType === 'All' || rep.type === selectedType;
      const matchesSearch =
        rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.reportCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.associatedActivity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [reportsList, selectedType, searchQuery]);

  const handleReportCreated = (newReport: DocumentationRecord) => {
    setReportsList([newReport, ...reportsList]);
  };

  const handleSimulateDownload = (rep: DocumentationRecord) => {
    setToastMessage(`Generated export preview: ${rep.reportCode}.pdf (Demonstration UI)`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Social Internship Documentation (Chapter IV)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Reports & Documentation Repository
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Systematic archive of daily field reports, event summaries, attendance logs, and photographic catalogs recorded during the internship at Jeevan Chetna Foundation.
            </p>
          </div>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log New Report</span>
          </button>
        </div>

        {/* Subtle Prototype Demonstration Notice */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl flex items-center gap-2.5 text-xs text-slate-500">
          <Info className="w-4 h-4 text-forest-700 shrink-0" />
          <span>
            <strong className="text-slate-700 font-semibold">Prototype Demonstration:</strong> Operational records shown in this repository are demonstration data used to illustrate the portal&apos;s functionality and are not official NGO records.
          </span>
        </div>

        {/* Search & Type Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, code (e.g. JCF-REP-2025), activity, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {REPORT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-forest-800 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Documentation Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle">
          <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold">
              Archived Documentation Records ({filteredReports.length})
            </span>
            <span className="text-[11px] text-slate-400">
              Format: PDF / Spreadsheet / Photo Catalog
            </span>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-12 text-center space-y-3">
                <Loader2 className="w-6 h-6 text-forest-700 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Loading documentation records…</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Couldn&apos;t load reports</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">{error}</p>
                <button
                  onClick={loadReports}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : reportsList.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No documentation records yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No reports have been logged in the database yet.
                </p>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No reports found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No documentation records match your current search or type filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('All');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Report Code & Title</th>
                  <th className="py-3.5 px-4">Documentation Type</th>
                  <th className="py-3.5 px-4">Associated Initiative</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-forest-700 shrink-0" />
                        <span>{rep.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {rep.reportCode} • {rep.sizeEstimate} • {rep.location}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {rep.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {rep.associatedActivity}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                      {formatDate(rep.date)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        rep.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : rep.status === 'Archived'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {rep.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                        {rep.status === 'Under Review' && <Clock className="w-3 h-3" />}
                        {rep.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedReport(rep)}
                          className="px-2.5 py-1 text-slate-700 hover:text-forest-800 hover:bg-forest-50 rounded-lg transition-colors inline-flex items-center gap-1 text-[11px] font-medium border border-slate-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                        <button
                          onClick={() => handleSimulateDownload(rep)}
                          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200"
                          title="Simulate Export"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>

        {/* Academic Context Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-forest-700" />
            <span>Internship Report Reference:</span>
          </p>
          <p className="leading-relaxed">
            These standardized documentation templates represent the field workflow executed during the social internship—including daily activity summaries, participant attendance logging, photographic archive indexing, and official report preparation for <strong>Jeevan Chetna Foundation</strong>.
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-forest-900 text-white px-6 py-4 flex items-center justify-between">
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

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
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
                  Summary & Executive Notes
                </h4>
                <p className="text-slate-600 leading-relaxed bg-white p-3.5 border border-slate-200 rounded-xl">
                  {selectedReport.summary}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                  Documented Observations & Action Items
                </h4>
                <div className="space-y-1.5">
                  {selectedReport.keyObservations.map((obs, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{obs}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <span className="text-slate-400 text-[11px]">
                  File: {selectedReport.fileFormat} • {selectedReport.sizeEstimate}
                </span>
                <button
                  onClick={() => {
                    handleSimulateDownload(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 text-xs flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-150">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <ReportLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onReportCreated={handleReportCreated}
      />
    </div>
  );
}
