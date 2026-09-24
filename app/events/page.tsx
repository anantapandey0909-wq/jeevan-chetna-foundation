'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Users,
  Tag,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { CommunityEvent } from '@/types/event';
import { formatDate } from '@/lib/utils';
import { EventRSVPModal } from '@/components/forms/EventRSVPModal';
import { apiGet, ApiError } from '@/lib/api-client';
import { mapEvent, RawEvent } from '@/lib/api-adapters';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');
  const [selectedEventForRSVP, setSelectedEventForRSVP] = useState<CommunityEvent | null>(null);
  const [eventsList, setEventsList] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const json = await apiGet<{ success: true; count: number; data: RawEvent[] }>('/api/events');
      setEventsList(json.data.map(mapEvent));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to load events. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const filteredEvents = eventsList.filter((e) => {
    if (activeTab === 'Upcoming') return e.status === 'Upcoming' || e.status === 'Registration Open';
    return e.status === 'Completed';
  });

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>Events & Drives</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Community Events & Drive Calendar
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Scheduled sapling plantation drives, digital literacy sessions, and health awareness camps organized in Haldwani and Nainital district.
            </p>
          </div>

          {/* Upcoming / Past Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveTab('Upcoming')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'Upcoming'
                  ? 'bg-white text-forest-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('Completed')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'Completed'
                  ? 'bg-white text-forest-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed Drives
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <Loader2 className="w-6 h-6 text-forest-700 animate-spin mx-auto" />
            <p className="text-xs text-slate-500">Loading events…</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl border border-red-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Couldn&apos;t load events</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{error}</p>
            <button
              onClick={loadEvents}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {activeTab === 'Upcoming' ? 'No upcoming events scheduled' : 'No completed drives yet'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {activeTab === 'Upcoming'
                ? 'Check back soon, or view completed drives instead.'
                : 'Events will appear here once they are marked completed.'}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => {
            const eventDate = new Date(evt.date);
            const monthStr = isNaN(eventDate.getTime()) ? 'OCT' : eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const dayStr = isNaN(eventDate.getTime()) ? '12' : eventDate.getDate();

            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top bar with calendar date box and category badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 text-forest-800 flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600">
                          {monthStr}
                        </span>
                        <span className="text-xl font-extrabold leading-none">
                          {dayStr}
                        </span>
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {evt.category}
                        </span>
                        <span className="text-xs text-slate-400 block mt-1">
                          Tag: <strong className="text-slate-600">{evt.programTag}</strong>
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      evt.status === 'Upcoming'
                        ? 'bg-forest-100 text-forest-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      <span className="truncate">{evt.venue}, {evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/events/${evt.id}`}
                    className="text-xs font-semibold text-forest-700 hover:text-forest-900 inline-flex items-center gap-1"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {evt.status === 'Upcoming' ? (
                    <button
                      onClick={() => setSelectedEventForRSVP(evt)}
                      className="px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
                    >
                      Participation RSVP
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">
                      Concluded Event
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      <EventRSVPModal
        event={selectedEventForRSVP}
        isOpen={!!selectedEventForRSVP}
        onClose={() => setSelectedEventForRSVP(null)}
      />
    </div>
  );
}
