'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, CheckCircle2, Calendar, MapPin, Loader2, Sparkles } from 'lucide-react';
import { CommunityEvent } from '@/types/event';

const rsvpSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a 10-digit phone number'),
  role: z.string().min(1, 'Please select your participation role'),
  notes: z.string().optional(),
});

type RSVPFormValues = z.infer<typeof rsvpSchema>;

interface EventRSVPModalProps {
  event: CommunityEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventRSVPModal({ event, isOpen, onClose }: EventRSVPModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      role: 'Volunteer Participant',
      notes: '',
    },
  });

  if (!isOpen || !event) return null;

  const onSubmit = async (data: RSVPFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const handleClose = () => {
    reset();
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-forest-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="font-semibold text-sm leading-tight">Event Participation RSVP</h3>
              <p className="text-[11px] text-emerald-200">Join this scheduled community drive</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-emerald-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {/* Event Context card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl mb-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
              {event.category}
            </span>
            <h4 className="text-sm font-bold text-slate-800 mt-1">{event.title}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {event.date} • {event.time}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {event.venue}
            </p>
          </div>

          {isConfirmed ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Participation RSVP Recorded</h4>
              <p className="text-xs text-slate-600">
                Your spot has been registered in the event attendance queue. Please arrive at the venue 15 minutes before scheduled start time.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 px-5 py-2 bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
                {errors.name && (
                  <p className="text-[11px] text-rose-600 mt-0.5">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-0.5">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Phone number"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-0.5">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role in Event <span className="text-rose-500">*</span>
                </label>
                <select
                  {...register('role')}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600"
                >
                  <option value="Volunteer Participant">Volunteer Participant</option>
                  <option value="Community Member / Resident">Community Member / Resident</option>
                  <option value="Student Attendee">Student Attendee</option>
                  <option value="Field Support">Field Logistics & Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes / Special Requirements (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  placeholder="Any prior experience or notes for the coordinator"
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
                      <span>Confirming RSVP...</span>
                    </>
                  ) : (
                    <span>Confirm Event RSVP</span>
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
