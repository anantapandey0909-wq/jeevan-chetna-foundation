'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Globe, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  Info 
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

export default function AdminSettingsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportSummary = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-forest-700" />
          <span>Portal Configurations & Prototype Metadata</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          System operational metadata, academic internship disclosures, and demo export utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NGO Verification Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Organization Profile Verification</span>
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong>Name:</strong> {NGO_INFO.name}</p>
            <p><strong>Legal Status:</strong> {NGO_INFO.legalStatus}</p>
            <p><strong>Certification:</strong> {NGO_INFO.certification}</p>
            <p><strong>Location:</strong> {NGO_INFO.officeAddress.locality}, {NGO_INFO.officeAddress.city}, {NGO_INFO.officeAddress.state}</p>
            <p><strong>Official Portal:</strong> <a href={NGO_INFO.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-forest-700 underline">{NGO_INFO.officialWebsite}</a></p>
          </div>
        </div>

        {/* Academic Internship Context */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-forest-700" />
            <span>Social Internship Project Specifications</span>
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong>Framework Section:</strong> Chapter IV – Digital Framework Solution</p>
            <p><strong>Focus:</strong> Streamlining NGO activity management, volunteer coordination, and photographic records</p>
            <p><strong>System Classification:</strong> High-Fidelity Interactive Prototype</p>
          </div>
        </div>
      </div>

      {/* Export Utility Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Export Chapter IV Prototype Summary Package
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Generates a structured export summary for inclusion in the academic internship presentation.
            </p>
          </div>

          <button
            onClick={handleExportSummary}
            className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Prototype Digest</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Prototype summary generated successfully for presentation!</span>
          </div>
        )}
      </div>
    </div>
  );
}
