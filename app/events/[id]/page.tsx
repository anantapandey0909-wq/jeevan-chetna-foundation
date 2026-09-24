'use client';

import React, { use, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Tag, 
  HeartHandshake, 
  Share2, 
  ShieldCheck,
  Sparkles,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { CommunityEvent } from '@/types/event';
import { formatDate } from '@/lib/utils';
import { EventRSVPModal } from '@/components/forms/EventRSVPModal';
import { NGO_INFO } from '@/lib/data/ngo-info';
import { apiGet, ApiError } from '@/lib/api-client';
import { mapEvent, RawEvent } from '@/lib/api-adapters';

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFoundFlag, setNotFoundFlag] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setNotFoundFlag(false);
    try {
      const detail = await apiGet<{ success: true; data: RawEvent }>(
        `/api/events/${resolvedParams.id}`
      );
      setEvent(mapEvent(detail.data));
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setNotFoundFlag(true);
      } else {
        setError(err instanceof ApiError ? err.message : 'Unable to load this event. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (notFoundFlag) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-3">
            <Loader2 className="w-6 h-6 text-forest-700 animate-spin mx-auto" />
            <p className="text-xs text-slate-500">Loading event details…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-red-200 p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Couldn&apos;t load this event</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{error}</p>
            <button
              onClick={load}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events Calendar</span>
          </Link>

          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {event.status}
          </span>
        </div>

        {/* Hero Event Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-subtle">
          <div className="relative h-56 sm:h-80 w-full bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                {event.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Logistics Grid */}
          <div className="bg-slate-50 border-b border-slate-200 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-forest-700 shrink-0" />
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">Event Date</p>
                <p className="font-semibold text-slate-800 text-sm">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-forest-700 shrink-0" />
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">Timing Schedule</p>
                <p className="font-semibold text-slate-800 text-sm">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-forest-700 shrink-0" />
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">Venue & Area</p>
                <p className="font-semibold text-slate-800 text-sm">{event.venue}</p>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">Event Overview & Scope</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
            </div>

            <div className="p-4 bg-forest-50/60 border border-forest-100 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>Field Coordination & Volunteer Instructions</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {event.coordinationNotes}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <p className="font-bold text-slate-800">Program Affiliation</p>
                <p className="text-slate-600">{event.programTag}</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                <p className="font-bold text-slate-800">Capacity & Eligibility</p>
                <p className="text-slate-600">{event.capacity || 'Open for local volunteers and residents'}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Organized by <strong>{NGO_INFO.name}</strong> • Haldwani, Uttarakhand
              </span>

              {event.status === 'Upcoming' && (
                <button
                  onClick={() => setRsvpOpen(true)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  Confirm Participation RSVP
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <EventRSVPModal
        event={event}
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
      />
    </div>
  );
}
