'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, MapPin, Clock, CheckCircle2, Eye, Tag } from 'lucide-react';
import { EVENTS_DATA } from '@/lib/data/events';
import { formatDate } from '@/lib/utils';
import { EventRSVPModal } from '@/components/forms/EventRSVPModal';
import { CommunityEvent } from '@/types/event';

export default function AdminEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-forest-700" />
            <span>Community Events & Calendar Administration</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track schedules, volunteer briefings, and participation rosters for drives in Haldwani.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENTS_DATA.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {evt.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  evt.status === 'Upcoming' ? 'bg-forest-100 text-forest-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {evt.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600 border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-forest-700" />
                  <span>{formatDate(evt.date)} • {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-forest-700" />
                  <span className="truncate">{evt.venue}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Affiliation: <strong>{evt.programTag}</strong>
              </span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/events/${evt.id}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  View Details
                </Link>
                {evt.status === 'Upcoming' && (
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="px-3 py-1.5 bg-forest-700 hover:bg-forest-800 text-white rounded-lg text-xs font-semibold"
                  >
                    Test RSVP
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <EventRSVPModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
