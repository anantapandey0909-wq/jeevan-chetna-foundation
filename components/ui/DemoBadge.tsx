import React from 'react';

/**
 * Subtle label for records tagged isDemo / PROTOTYPE_DEMO.
 * Matches existing small badge styles used across the portal.
 */
export function DemoBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 ${className}`}
      title="Demonstration / prototype record — not an official NGO operational record"
    >
      Demo / Prototype
    </span>
  );
}
