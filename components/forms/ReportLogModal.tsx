'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, CheckCircle2, FileText, Loader2, Sparkles, Upload } from 'lucide-react';
import { ReportType } from '@/types/report';

const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  type: z.string().min(1, 'Please select report type'),
  associatedActivity: z.string().min(3, 'Please specify associated activity'),
  date: z.string().min(1, 'Please select date'),
  location: z.string().min(3, 'Please enter location'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  keyObservation: z.string().min(5, 'Please provide at least one key observation'),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportCreated?: (record: any) => void;
}

export function ReportLogModal({ isOpen, onClose, onReportCreated }: ReportLogModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      type: 'Daily Internship Report',
      date: new Date().toISOString().split('T')[0],
      location: 'Haldwani, Uttarakhand',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: ReportFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newRecord = {
      id: `rep-${Date.now()}`,
      reportCode: `JCF-REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: data.title,
      type: data.type as ReportType,
      associatedActivity: data.associatedActivity,
      date: data.date,
      authorOrIntern: 'Internship Participant',
      location: data.location,
      summary: data.summary,
      status: 'Under Review',
      keyObservations: [data.keyObservation],
      fileFormat: 'PDF Document',
      sizeEstimate: '1.2 MB',
    };

    if (onReportCreated) {
      onReportCreated(newRecord);
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
            <FileText className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-sm leading-tight">Log Internship Documentation</h3>
              <p className="text-[11px] text-emerald-200">Record daily report, event summary, or attendance log</p>
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
              <h4 className="text-base font-bold text-slate-800">Documentation Record Created</h4>
              <p className="text-xs text-slate-600">
                The record has been indexed in the documentation archive for verification and report inclusion.
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
                  Report Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="e.g. Field Report: Sapling Inspection & Watering Schedule"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
                {errors.title && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Documentation Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('type')}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="Daily Internship Report">Daily Internship Report</option>
                    <option value="Event Summary">Event Summary</option>
                    <option value="Attendance Record">Attendance Record</option>
                    <option value="Activity Summary">Activity Summary</option>
                    <option value="Photograph Log">Photograph Log</option>
                    <option value="Field Documentation">Field Documentation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Record <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    {...register('date')}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Associated Activity / Drive <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('associatedActivity')}
                  placeholder="e.g. Green Haldwani: Tree Plantation Drive"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location / Field Area <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('location')}
                  placeholder="e.g. Ramari Choti, Gadhi Aashram Road, Haldwani"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Executive Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  {...register('summary')}
                  rows={2}
                  placeholder="Brief summary of activities observed, tasks accomplished, and participants."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
                {errors.summary && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.summary.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Observation / Action Item <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('keyObservation')}
                  placeholder="e.g. Completed sign-in sheet for 24 volunteers and geo-tagged 15 photos."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
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
                      <span>Saving Log...</span>
                    </>
                  ) : (
                    <span>Archive Documentation Log</span>
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
