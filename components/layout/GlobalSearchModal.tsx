'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Calendar, FileText, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { ACTIVITIES_DATA } from '@/lib/data/activities';
import { EVENTS_DATA } from '@/lib/data/events';
import { REPORTS_DATA } from '@/lib/data/reports';
import { NGO_INFO } from '@/lib/data/ngo-info';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd/Ctrl + K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // handled in parent or toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const matchedActivities = ACTIVITIES_DATA.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
    );

    const matchedEvents = EVENTS_DATA.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );

    const matchedReports = REPORTS_DATA.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.reportCode.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q)
    );

    const matchedSectors = NGO_INFO.coreSectors.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );

    return {
      activities: matchedActivities,
      events: matchedEvents,
      reports: matchedReports,
      sectors: matchedSectors,
      total: matchedActivities.length + matchedEvents.length + matchedReports.length + matchedSectors.length,
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-forest-700 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activities, events, sectors, reports, or programs..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium px-2 py-1 rounded border border-slate-200"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestion Body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="py-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest-50 text-forest-700 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-700">Quick Portal Search</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Type keywords like &ldquo;Green Haldwani&rdquo;, &ldquo;Digital Confidence&rdquo;, &ldquo;Plantation&rdquo;, &ldquo;Daily Report&rdquo;, or &ldquo;Education&rdquo;
              </p>
            </div>
          )}

          {query && filteredResults && filteredResults.total === 0 && (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-600 font-medium">No records matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for other initiatives or categories.</p>
            </div>
          )}

          {query && filteredResults && filteredResults.total > 0 && (
            <div className="space-y-4">
              {/* Activities */}
              {filteredResults.activities.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                    Activities ({filteredResults.activities.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.activities.map((item) => (
                      <Link
                        key={item.id}
                        href={`/activities/${item.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-forest-50/80 group transition-colors border border-transparent hover:border-forest-200"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-forest-600 mt-2 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-slate-800 group-hover:text-forest-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">{item.category}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-forest-600 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {filteredResults.events.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                    Events & Calendar ({filteredResults.events.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.events.map((evt) => (
                      <Link
                        key={evt.id}
                        href={`/events/${evt.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-emerald-50/80 group transition-colors border border-transparent hover:border-emerald-200"
                      >
                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-900">
                              {evt.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">{evt.date} • {evt.venue}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports */}
              {filteredResults.reports.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                    Documentation & Reports ({filteredResults.reports.length})
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.reports.map((rep) => (
                      <Link
                        key={rep.id}
                        href={`/reports?highlight=${rep.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 group transition-colors border border-slate-100"
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                              {rep.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">{rep.reportCode} • {rep.type}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-700" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Search prototype records & official NGO initiatives</span>
          <span>Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
