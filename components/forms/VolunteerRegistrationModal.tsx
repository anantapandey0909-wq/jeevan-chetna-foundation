'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, CheckCircle2, HeartHandshake, Loader2, Sparkles, MapPin } from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

const volunteerSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  areaOfInterest: z.string().min(1, 'Please select an area of interest'),
  skills: z.string().min(2, 'Please list your skills (e.g. Teaching, Plantation, Documentation)'),
  availability: z.string().min(1, 'Please select your availability'),
  preferredLocation: z.string().min(2, 'Please specify your location or preferred ward'),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

interface VolunteerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRole?: string;
}

export function VolunteerRegistrationModal({
  isOpen,
  onClose,
  preselectedRole,
}: VolunteerRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      areaOfInterest: preselectedRole || 'Plantation Drives (Green Haldwani)',
      availability: 'Weekends',
      preferredLocation: 'Haldwani / Nainital Region',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsSubmitting(true);
    // Simulate prototype network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    reset();
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-base leading-tight">Volunteer Enrollment</h3>
              <p className="text-xs text-emerald-200">Join 200+ active volunteers supporting community development</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-emerald-200 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-800">Enrollment Recorded (Prototype)</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you for your interest in volunteering with <strong>{NGO_INFO.name}</strong>. In the live system, the coordinator will review your application and match you with upcoming drives.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500 max-w-xs mx-auto text-left">
                <p className="font-medium text-slate-700 mb-0.5">Application Summary:</p>
                <p>Status: <span className="text-emerald-700 font-semibold">Pending Coordinator Review</span></p>
                <p>Location: Haldwani, Uttarakhand</p>
              </div>
              <button
                onClick={handleResetAndClose}
                className="px-5 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <span>
                  Volunteers contribute across <strong>Green Haldwani</strong>, <strong>Seeds of Digital Confidence</strong>, <strong>Remedial Education</strong>, and <strong>Community Relief</strong> in Nainital district.
                </span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="e.g. Paritosh Sharma"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Area of Interest <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register('areaOfInterest')}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                >
                  <option value="Plantation & Ecology (Green Haldwani)">Plantation & Ecology (Green Haldwani)</option>
                  <option value="Computer Education (Seeds of Digital Confidence)">Computer Education (Seeds of Digital Confidence)</option>
                  <option value="Remedial Teaching & Primary Education">Remedial Teaching & Primary Education</option>
                  <option value="Field Documentation & Photographic Logging">Field Documentation & Photographic Logging</option>
                  <option value="Hunger Relief & Community Distribution">Hunger Relief & Community Distribution</option>
                </select>
                {errors.areaOfInterest && (
                  <p className="text-xs text-rose-600 mt-1">{errors.areaOfInterest.message}</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Skills & Qualifications <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('skills')}
                  placeholder="e.g. Basic Computer Teaching, Photography, Public Speaking"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                />
                {errors.skills && (
                  <p className="text-xs text-rose-600 mt-1">{errors.skills.message}</p>
                )}
              </div>

              {/* Availability & Preferred Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Availability <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register('availability')}
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                  >
                    <option value="Weekends">Weekends Only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Flexible">Flexible / Event Basis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Area / Ward <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('preferredLocation')}
                    placeholder="e.g. Ramari Choti / Haldwani"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600"
                  />
                  {errors.preferredLocation && (
                    <p className="text-xs text-rose-600 mt-1">{errors.preferredLocation.message}</p>
                  )}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-400 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Recording Enrollment...</span>
                    </>
                  ) : (
                    <span>Submit Volunteer Registration</span>
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
