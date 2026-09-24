import React from 'react';
import { 
  HeartHandshake, 
  MapPin, 
  Users, 
  CalendarCheck, 
  Trees, 
  Laptop, 
  FileText, 
  CheckCircle2,
  LucideIcon 
} from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  caption: string;
  change: string;
  badge?: string;
  iconName: string;
  isOfficial?: boolean;
}

const ICON_MAP: Record<string, LucideIcon> = {
  HeartHandshake,
  MapPin,
  Users,
  CalendarCheck,
  Trees,
  Laptop,
  FileText,
  CheckCircle2,
};

export function StatCard({
  label,
  value,
  caption,
  change,
  badge = 'Official Metric',
  iconName,
  isOfficial = true,
}: StatCardProps) {
  const Icon = ICON_MAP[iconName] || CheckCircle2;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isOfficial 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {badge}
          </span>
          <h4 className="text-xs font-medium text-slate-500 mt-2">{label}</h4>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {value}
          </div>
        </div>

        <div className="w-11 h-11 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center border border-forest-100/60 group-hover:scale-105 transition-transform shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-0.5">
        <p className="text-[11px] font-semibold text-slate-700">{caption}</p>
        <p className="text-[11px] text-slate-500 leading-tight">{change}</p>
      </div>
    </div>
  );
}
