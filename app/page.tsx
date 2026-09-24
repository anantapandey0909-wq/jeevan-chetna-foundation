'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trees, 
  Laptop, 
  GraduationCap, 
  Utensils, 
  HeartHandshake, 
  Users, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';
import { ACTIVITIES_DATA } from '@/lib/data/activities';
import { EVENTS_DATA } from '@/lib/data/events';
import { GALLERY_DATA } from '@/lib/data/gallery';
import { VolunteerRegistrationModal } from '@/components/forms/VolunteerRegistrationModal';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';
import { GalleryItem } from '@/types/gallery';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const featuredActivities = ACTIVITIES_DATA.slice(0, 3);
  const upcomingEvents = EVENTS_DATA.filter((e) => e.status === 'Upcoming').slice(0, 2);
  const galleryTeaser = GALLERY_DATA.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-forest-900 via-forest-800 to-forest-950 text-white overflow-hidden py-16 sm:py-24 lg:py-28">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 text-center sm:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-700/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{NGO_INFO.legalStatus} • {NGO_INFO.certification}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
              Building Stronger Communities Together
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Empowering grassroots communities across Haldwani and Nainital district through quality education, environmental protection, computer literacy, and direct community service.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Activities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setVolunteerModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm rounded-xl backdrop-blur-sm transition-all"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-300" />
                <span>Become a Volunteer</span>
              </button>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-3 bg-forest-950/80 hover:bg-forest-950 border border-emerald-600/40 text-emerald-200 font-medium text-xs rounded-xl transition-all"
              >
                <span>View Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Location context */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                {NGO_INFO.officeAddress.locality}, {NGO_INFO.officeAddress.city}, {NGO_INFO.officeAddress.state}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>8+ Years of Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL PUBLISHED METRICS BAR */}
      <section className="bg-white border-y border-slate-200 shadow-subtle relative z-10 -mt-4 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-4 sm:p-6">
          <div className="p-4 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-800 tracking-tight">
              {NGO_INFO.metrics.livesImpacted}
            </div>
            <div className="text-xs font-semibold text-slate-700 mt-1">Lives Impacted</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Official Published Figure</div>
          </div>

          <div className="p-4 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-800 tracking-tight">
              {NGO_INFO.metrics.villagesServed}
            </div>
            <div className="text-xs font-semibold text-slate-700 mt-1">Villages Served</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Active Community Coverage</div>
          </div>

          <div className="p-4 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-800 tracking-tight">
              {NGO_INFO.metrics.activeVolunteers}
            </div>
            <div className="text-xs font-semibold text-slate-700 mt-1">Active Volunteers</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Youth & Field Network</div>
          </div>

          <div className="p-4 text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-800 tracking-tight">
              {NGO_INFO.metrics.yearsOfService}
            </div>
            <div className="text-xs font-semibold text-slate-700 mt-1">Years of Service</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Grassroots Dedication</div>
          </div>
        </div>
      </section>

      {/* 3. CORE SECTORS / AREAS OF WORK */}
      <section className="py-16 sm:py-20 bg-[#fdfcfb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pillars of Impact</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Areas of Foundation Work
            </h2>
            <p className="text-sm text-slate-600">
              Structured community intervention focusing on education, digital literacy, sustainability, and grassroots welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NGO_INFO.coreSectors.map((sector) => {
              const iconMap: Record<string, any> = {
                GraduationCap,
                Laptop,
                Trees,
                Utensils,
                HeartHandshake,
                Users,
              };
              const Icon = iconMap[sector.icon] || HeartHandshake;

              return (
                <div
                  key={sector.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card hover:border-forest-300 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-forest-100 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                        {sector.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sector.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium truncate max-w-[200px]">
                      {sector.focus}
                    </span>
                    <Link
                      href="/activities"
                      className="text-forest-700 hover:text-forest-900 font-semibold inline-flex items-center gap-1 group/link"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FLAGSHIP INITIATIVES HIGHLIGHT */}
      <section className="py-16 bg-forest-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-forest-800 px-3 py-1 rounded-full border border-forest-700">
              Signature Programs
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Flagship Community Campaigns
            </h2>
            <p className="text-sm text-emerald-100/80">
              Long-term transformational initiatives active across Nainital district.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Green Haldwani */}
            <div className="bg-forest-950/70 border border-forest-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-forest-800 text-emerald-300 flex items-center justify-center">
                    <Trees className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-800 text-emerald-200 border border-forest-700">
                    Environmental Action
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Green Haldwani</h3>
                  <p className="text-xs text-emerald-300 font-medium mt-0.5">
                    Afforestation, Sapling Protection & Cleanliness Drives
                  </p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    A multi-phase environmental drive engaging student volunteers and local residents to plant native tree species, establish urban tree corridors, and conduct door-to-door waste segregation awareness in Haldwani.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-forest-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-200">Covering 42+ Village Belts</span>
                <Link
                  href="/activities"
                  className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300"
                >
                  <span>View Plantation Drives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Seeds of Digital Confidence */}
            <div className="bg-forest-950/70 border border-forest-700/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-forest-800 text-emerald-300 flex items-center justify-center">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-forest-800 text-emerald-200 border border-forest-700">
                    IT Literacy & Skills
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Seeds of Digital Confidence</h3>
                  <p className="text-xs text-emerald-300 font-medium mt-0.5">
                    Grassroots Computer Education & Youth IT Access
                  </p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Providing rural youth and school students with practical hands-on computer training, keyboarding, basic software skills, and cyber-safety orientation to build foundation digital confidence.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-forest-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-200">Active Learning Centers</span>
                <Link
                  href="/activities"
                  className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300"
                >
                  <span>View Computer Workshops</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED ACTIVITIES SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-forest-700">
                Field Activities
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Documented Community Drives
              </h2>
              <p className="text-sm text-slate-600">
                Recent initiatives observed and documented during internship field work.
              </p>
            </div>

            <Link
              href="/activities"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900 px-3.5 py-2 rounded-lg bg-forest-50 hover:bg-forest-100 transition-colors"
            >
              <span>View All Activities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={act.imageUrl}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-sm text-forest-900 shadow-xs">
                      {act.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{formatDate(act.date)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-forest-700" />
                        {act.location.split(',')[0]}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-forest-800 transition-colors">
                      {act.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {act.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/activities/${act.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-50 hover:bg-forest-50 text-slate-700 hover:text-forest-800 text-xs font-semibold rounded-xl border border-slate-200 hover:border-forest-200 transition-colors"
                  >
                    <span>View Activity Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS & CALENDAR */}
      <section className="py-16 bg-[#f8fafc] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-forest-700">
                Participation Calendar
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Scheduled Community Events
              </h2>
              <p className="text-sm text-slate-600">
                Upcoming drives scheduled in Haldwani and surrounding rural clusters.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900 px-3.5 py-2 rounded-lg bg-forest-50 hover:bg-forest-100 transition-colors"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {evt.category}
                    </span>
                    <span className="text-xs font-semibold text-forest-800 bg-forest-50 px-2 py-0.5 rounded">
                      Registration Open
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      <span>{formatDate(evt.date)} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Tag: <strong>{evt.programTag}</strong>
                  </span>
                  <Link
                    href={`/events/${evt.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-lg text-xs font-semibold shadow-xs"
                  >
                    <span>Event Details & RSVP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY PREVIEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-forest-700">
                Visual Documentation
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Activity Photographic Records
              </h2>
              <p className="text-sm text-slate-600">
                Photographs collected during plantation drives, computer workshops, and community meetings.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900 px-3.5 py-2 rounded-lg bg-forest-50 hover:bg-forest-100 transition-colors"
            >
              <span>Explore Full Gallery</span>
              <ImageIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryTeaser.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightboxItem(img)}
                className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-subtle border border-slate-200/80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-300">
                    {img.category}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                    {img.title}
                  </p>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    {img.location.split(',')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VOLUNTEER & INTERNSHIP CALL TO ACTION */}
      <section className="py-16 bg-forest-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-800/80 border border-forest-700 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-emerald-300 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Chapter-IV Digital Framework Solution</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Enhancing Social Impact Through Digital Organization
              </h2>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                This portal demonstrates how structured digital tools streamline volunteer coordination, attendance logging, photographic archiving, and daily report generation for grassroots community work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setVolunteerModalOpen(true)}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Volunteer Registration
              </button>
              <Link
                href="/reports"
                className="px-6 py-3 bg-forest-950 hover:bg-forest-900 border border-forest-700 text-white font-semibold text-sm rounded-xl transition-all text-center"
              >
                View Internship Records
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox & Modals */}
      <VolunteerRegistrationModal
        isOpen={volunteerModalOpen}
        onClose={() => setVolunteerModalOpen(false)}
      />
      <GalleryLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </div>
  );
}
