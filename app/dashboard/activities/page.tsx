'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trees, 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { ACTIVITIES_DATA } from '@/lib/data/activities';
import { Activity } from '@/types/activity';
import { formatDate } from '@/lib/utils';
import { ActivityCreateModal } from '@/components/forms/ActivityCreateModal';

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES_DATA);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = activities.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreated = (newAct: Activity) => {
    setActivities([newAct, ...activities]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Trees className="w-5 h-5 text-forest-700" />
            <span>Activity Management Console</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain documented community initiatives, plantation drives, and digital literacy workshops.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Drive</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter activities by keyword, category, or location..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600 shadow-xs"
        />
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Activity Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location / Ward</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{act.title}</p>
                    <p className="text-[10px] text-slate-400 truncate max-w-xs">{act.summary}</p>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-50 text-forest-800 border border-forest-200">
                      {act.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                    {act.location}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500">
                    {formatDate(act.date)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      href={`/activities/${act.id}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-forest-50 text-slate-700 hover:text-forest-800 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ActivityCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onActivityCreated={handleCreated}
      />
    </div>
  );
}
