'use client';

import React, { useState } from 'react';
import { Info, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

export function PrototypeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm px-4 py-2.5 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-emerald-800 text-emerald-200 font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shrink-0">
            Internship Framework Solution
          </span>
          <span className="text-emerald-100/90 text-xs sm:text-sm">
            Proposed Digital Community & Activity Portal for <strong className="text-white font-medium">{NGO_INFO.name}</strong> ({NGO_INFO.officeAddress.city}, {NGO_INFO.officeAddress.state})
          </span>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={NGO_INFO.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-300 hover:text-white underline underline-offset-2 transition-colors"
          >
            <span>Official NGO Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss banner"
            className="text-emerald-300 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
