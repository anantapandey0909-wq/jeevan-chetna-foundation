'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Trees, 
  Sparkles, 
  Plus, 
  X,
  CheckCircle2
} from 'lucide-react';
import { ACTIVITIES_DATA } from '@/lib/data/activities';
import { ActivityCategory } from '@/types/activity';
import { formatDate } from '@/lib/utils';
import { ActivityCreateModal } from '@/components/forms/ActivityCreateModal';

const CATEGORIES: Array<'All' | ActivityCategory> = [
  'All',
  'Environment',
  'Computer Education',
  'Education',
  'Awareness',
  'Hunger Relief',
  'Community Service',
];

export default function ActivitiesPage() {
  const [activitiesList, setActivitiesList] = useState(ACTIVITIES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<'All' | ActivityCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    return activitiesList.filter((act) => {
      const matchesCategory =
        selectedCategory === 'All' || act.category === selectedCategory;
      const matchesSearch =
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (act.programAffiliation &&
          act.programAffiliation.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activitiesList, selectedCategory, searchQuery]);

  const handleActivityCreated = (newAct: any) => {
    setActivitiesList([newAct, ...activitiesList]);
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
              <Trees className="w-3.5 h-3.5" />
              <span>Activity Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Community Activities & Drives
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Directory of field initiatives, plantation campaigns, computer literacy workshops, and educational distributions in Haldwani & Nainital district.
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Drive</span>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities by title, keyword, program, or village..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest-800 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong>{filteredActivities.length}</strong> activity records
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>
          <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Documented Field Records
          </span>
        </div>

        {/* Activities Grid */}
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No activities found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No activity records match your current search or category filter. Try clearing your search parameters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card hover:border-forest-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={act.imageUrl}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-sm text-forest-900 shadow-xs">
                        {act.category}
                      </span>
                    </div>
                    {act.programAffiliation && (
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-forest-950/85 text-emerald-300 backdrop-blur-sm">
                        {act.programAffiliation}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-forest-700" />
                        {formatDate(act.date)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate max-w-[140px]">
                        <MapPin className="w-3.5 h-3.5 text-forest-700" />
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
        )}
      </div>

      <ActivityCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onActivityCreated={handleActivityCreated}
      />
    </div>
  );
}
