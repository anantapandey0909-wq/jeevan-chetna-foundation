'use client';

import React, { useState } from 'react';
import { 
  Users, 
  HeartHandshake, 
  UserCheck, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Inbox, 
  Plus, 
  Briefcase 
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';
import { VOLUNTEER_ROLES } from '@/lib/data/volunteers';
import { VolunteerRegistrationModal } from '@/components/forms/VolunteerRegistrationModal';

export default function AdminVolunteersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-forest-700" />
            <span>Volunteer Network & Intake Console</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official volunteer strength of <strong>{NGO_INFO.metrics.activeVolunteers}</strong> supporting community welfare across 42+ villages.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Volunteer Intake</span>
        </button>
      </div>

      {/* Capacity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-2xl font-extrabold text-slate-900">{NGO_INFO.metrics.activeVolunteers}</p>
          <p className="text-xs font-semibold text-slate-700">Mobilized Volunteers</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Official network figure</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-2xl font-extrabold text-slate-900">{NGO_INFO.metrics.villagesServed}</p>
          <p className="text-xs font-semibold text-slate-700">Deployment Coverage</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Rural & urban wards in Nainital</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
          <p className="text-2xl font-extrabold text-slate-900">5 Domains</p>
          <p className="text-xs font-semibold text-slate-700">Operational Focus Areas</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Plantation, IT, Education & Relief</p>
        </div>
      </div>

      {/* Operational Domain Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-forest-700" />
            <span>Volunteer Functional Roles & Deployment Matrix</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VOLUNTEER_ROLES.map((role) => (
            <div key={role.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {role.domain}
                </span>
                <span className="text-[10px] text-slate-400">{role.locationCoverage}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{role.roleTitle}</h3>
              <p className="text-xs text-slate-600">Focus: {role.focusArea}</p>
              <div className="flex flex-wrap gap-1">
                {role.recommendedSkills.map((sk, idx) => (
                  <span key={idx} className="bg-white px-2 py-0.5 rounded text-[10px] text-slate-600 border border-slate-200">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intake Queue State */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-4 h-4 text-forest-700" />
            <span>Volunteer Intake Applications (Prototype Session)</span>
          </h2>
          <span className="text-[10px] text-slate-400">Live Session Cache</span>
        </div>

        <div className="py-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <p className="text-xs font-semibold text-slate-700">No Pending Applications in Queue</p>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            In accordance with data integrity guidelines, individual identities are not fabricated. You can test form submissions using the &quot;New Volunteer Intake&quot; button.
          </p>
        </div>
      </div>

      <VolunteerRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
