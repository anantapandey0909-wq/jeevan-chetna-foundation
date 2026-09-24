'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, CheckCircle2, Trees, Loader2, Sparkles } from 'lucide-react';
import { ActivityCategory } from '@/types/activity';

const activitySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  date: z.string().min(1, 'Please select date'),
  location: z.string().min(3, 'Please enter location in Haldwani/Nainital'),
  villageOrArea: z.string().min(2, 'Please enter village or ward area'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  programAffiliation: z.string().optional(),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

interface ActivityCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivityCreated?: (activity: any) => void;
}

export function ActivityCreateModal({ isOpen, onClose, onActivityCreated }: ActivityCreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      category: 'Environment',
      date: new Date().toISOString().split('T')[0],
      location: 'Haldwani, Nainital',
      villageOrArea: 'Ramari Choti Cluster',
      programAffiliation: 'Green Haldwani',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ActivityFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newAct = {
      id: `act-${Date.now()}`,
      title: data.title,
      category: data.category as ActivityCategory,
      date: data.date,
      location: data.location,
      villageOrArea: data.villageOrArea,
      summary: data.summary,
      description: data.summary,
      objectives: ['Mobilize local volunteer support', 'Execute planned drive parameters', 'Log attendance and photo evidence'],
      scope: 'Field community initiative',
      programAffiliation: data.programAffiliation,
      status: 'Scheduled',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    };

    if (onActivityCreated) {
      onActivityCreated(newAct);
    }
    
    setIsSubmitting(false);
    setIsDone(true);
  };

  const handleClose = () => {
    reset();
    setIsDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-forest-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trees className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-sm leading-tight">Register Community Activity / Drive</h3>
              <p className="text-[11px] text-emerald-200">Document a new field initiative in the portal</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-emerald-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {isDone ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Activity Registered (Prototype)</h4>
              <p className="text-xs text-slate-600">
                The new activity has been indexed in the directory and is ready for volunteer mobilization and report linkage.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 px-5 py-2 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Activity Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="e.g. Green Haldwani: Tree Guard Installation & Sapling Care"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
                {errors.title && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sector / Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="Environment">Environment / Plantation</option>
                    <option value="Computer Education">Computer Education</option>
                    <option value="Education">Education & Literacy</option>
                    <option value="Hunger Relief">Hunger Relief</option>
                    <option value="Awareness">Awareness Drive</option>
                    <option value="Community Service">Community Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Execution <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / District <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    placeholder="Haldwani, Nainital"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ward / Village Hamlet <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('villageOrArea')}
                    placeholder="e.g. Ramari Choti"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Program Affiliation
                </label>
                <select
                  {...register('programAffiliation')}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                >
                  <option value="Green Haldwani">Green Haldwani (Environmental Initiative)</option>
                  <option value="Seeds of Digital Confidence">Seeds of Digital Confidence (IT Education)</option>
                  <option value="Community Nutrition">Community Nutrition / Hunger Relief</option>
                  <option value="General Outreach">General Outreach & Awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Activity Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  {...register('summary')}
                  rows={2}
                  placeholder="Key drive objectives, target area, and planned volunteer involvement."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
                {errors.summary && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.summary.message}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-400 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <span>Add Activity Record</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
