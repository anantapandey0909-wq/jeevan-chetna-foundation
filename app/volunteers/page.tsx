'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Trees, 
  Laptop, 
  FileText, 
  GraduationCap, 
  MapPin, 
  Briefcase,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';
import { VOLUNTEER_ROLES } from '@/lib/data/volunteers';
import { VolunteerRole } from '@/types/volunteer';
import { VolunteerRegistrationModal } from '@/components/forms/VolunteerRegistrationModal';

export default function VolunteersPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDomainFilter, setActiveDomainFilter] = useState<string>('All');

  const domains = ['All', 'Plantation & Ecology', 'Digital & Computer Training', 'Field Documentation & Reporting', 'Teaching & Remedial Support', 'Community Survey & Mobilization'];

  const filteredRoles = VOLUNTEER_ROLES.filter((role) => {
    if (activeDomainFilter === 'All') return true;
    return role.domain === activeDomainFilter;
  });

  const handleApplyRole = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
              <Users className="w-3.5 h-3.5" />
              <span>Volunteer Coordination Framework</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Volunteer Network & Deployment Roles
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              {NGO_INFO.name} mobilizes a dedicated network of <strong>{NGO_INFO.metrics.activeVolunteers}</strong> across Haldwani and Nainital district to execute community welfare and environmental drives.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedRole(undefined as any);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all shrink-0 self-start md:self-auto"
          >
            <HeartHandshake className="w-4 h-4 text-emerald-300" />
            <span>Join as a Volunteer</span>
          </button>
        </div>

        {/* Official Volunteer Capacity Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{NGO_INFO.metrics.activeVolunteers}</p>
              <p className="text-xs font-semibold text-slate-700">Official Volunteer Base</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Youth and local community leaders actively mobilized across 42+ villages.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{NGO_INFO.metrics.villagesServed}</p>
              <p className="text-xs font-semibold text-slate-700">Field Deployment Villages</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Grassroots presence throughout Haldwani, Ramari Choti, and Nainital rural sectors.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-subtle flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">ISO 9001:2015</p>
              <p className="text-xs font-semibold text-slate-700">Structured Coordination</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Standard operating procedures for attendance logging, safety, and event documentation.</p>
            </div>
          </div>
        </div>

        {/* Domain Filter Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Volunteer Functional Domains
            </h2>
            <span className="text-xs text-slate-500">
              Showing {filteredRoles.length} Operational Domains
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setActiveDomainFilter(dom)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeDomainFilter === dom
                    ? 'bg-forest-800 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Volunteer Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {role.domain}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-forest-800 transition-colors">
                      {role.roleTitle}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Typical Responsibilities:
                  </p>
                  <ul className="space-y-1.5">
                    {role.typicalResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Skills */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Recommended Skill Set:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.recommendedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                  <span>Deployment: <strong>{role.locationCoverage}</strong></span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Open for new volunteer enrollment
                </span>
                <button
                  onClick={() => handleApplyRole(role.roleTitle)}
                  className="px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Data Policy Note on Volunteer Personas */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 space-y-1">
          <p className="font-bold text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Data Integrity Policy:</span>
          </p>
          <p className="leading-relaxed">
            In compliance with our internship framework standards and data confidentiality guidelines, individual personal profiles are not published online without explicit authorization. The platform presents verified operational roles, skill matrices, and the official volunteer capacity ({NGO_INFO.metrics.activeVolunteers}).
          </p>
        </div>
      </div>

      <VolunteerRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedRole={selectedRole || undefined}
      />
    </div>
  );
}
