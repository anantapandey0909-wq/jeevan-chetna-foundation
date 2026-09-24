import React from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Users, 
  Trees, 
  Laptop, 
  GraduationCap, 
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

export default function AdminCommunityPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-forest-700" />
          <span>Community Engagement & Grassroots Outreach</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitoring participatory village interactions, Gram Samvad sessions, and community awareness across 42+ villages in Nainital district.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NGO_INFO.flagshipPrograms.map((prog, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full border border-forest-200">
                {prog.tag}
              </span>
              <span className="text-xs font-semibold text-emerald-800">Active Outreach</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{prog.title}</h3>
              <p className="text-xs text-forest-700 font-medium">{prog.focus}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{prog.description}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-200/80 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
              <span>Coverage: <strong>{prog.outreach}</strong></span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-forest-700" />
          <span>Participatory Governance & Community Feedback Mechanisms</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Through organized village town-halls (Gram Samvad), volunteer teams engage directly with ward representatives and families to assess educational needs, schedule tree watering rotations, and plan seasonal computer education workshops.
        </p>
      </div>
    </div>
  );
}
