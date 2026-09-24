'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  Trees, 
  ArrowLeft, 
  CheckCircle2, 
  Target, 
  Tag, 
  HeartHandshake, 
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ACTIVITIES_DATA } from '@/lib/data/activities';
import { formatDate } from '@/lib/utils';
import { NGO_INFO } from '@/lib/data/ngo-info';

export default function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const activity = ACTIVITIES_DATA.find((a) => a.id === resolvedParams.id);

  if (!activity) {
    notFound();
  }

  const relatedActivities = ACTIVITIES_DATA.filter((a) => a.id !== activity.id).slice(0, 2);

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            href="/activities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-forest-800 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Activity Directory</span>
          </Link>

          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {activity.status} Field Activity
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-subtle">
          <div className="relative h-64 sm:h-96 w-full bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  {activity.category}
                </span>
                {activity.programAffiliation && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-emerald-200">
                    {activity.programAffiliation}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {activity.title}
              </h1>
            </div>
          </div>

          {/* Quick Details Bar */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-forest-700 shrink-0" />
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">Execution Date</p>
                <p className="font-semibold text-slate-800">{formatDate(activity.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-forest-700 shrink-0" />
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">Location</p>
                <p className="font-semibold text-slate-800">{activity.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-forest-700 shrink-0" />
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">Ward / Area</p>
                <p className="font-semibold text-slate-800">{activity.villageOrArea}</p>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-forest-700" />
                <span>Activity Overview & Background</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Key Objectives */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-forest-700" />
                <span>Core Objectives</span>
              </h2>
              <div className="grid grid-cols-1 gap-2.5">
                {activity.objectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-forest-50/60 border border-forest-100 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documented Outcomes if available */}
            {activity.keyOutcomes && activity.keyOutcomes.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Field Outcomes & Documentation Summary</span>
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {activity.keyOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Highlights */}
            {activity.galleryImages && activity.galleryImages.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-slate-900">
                  Field Photo Documentation
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activity.galleryImages.map((img, idx) => (
                    <div key={idx} className="h-40 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${activity.title} photo ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Report Rationale link */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-forest-700" />
                <span className="text-slate-700">
                  Official records, attendance rosters, and daily reports associated with this activity are indexed in the documentation archive.
                </span>
              </div>
              <Link
                href="/reports"
                className="px-3.5 py-1.5 bg-forest-700 hover:bg-forest-800 text-white font-semibold rounded-lg shrink-0"
              >
                View Report Archives
              </Link>
            </div>
          </div>
        </div>

        {/* Related Activities Section */}
        {relatedActivities.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-slate-900">Other Documented Activities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedActivities.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/activities/${rel.id}`}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-forest-300 hover:shadow-subtle transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500">{formatDate(rel.date)} • {rel.location.split(',')[0]}</p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-forest-700 rotate-180 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
