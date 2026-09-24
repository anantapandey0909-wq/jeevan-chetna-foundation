'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  Loader2 
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSent(true);
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            <MapPin className="w-3.5 h-3.5" />
            <span>Community Helpdesk & Office</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect with {NGO_INFO.name}
          </h1>
          <p className="text-sm text-slate-600">
            For volunteer inquiries, community collaboration, educational initiatives, or plantation drive partnerships in Haldwani and Nainital district.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Office Address & Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Registered Headquarters
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official operating premises in Uttarakhand
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Registered Office Address:</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {NGO_INFO.officeAddress.locality}, {NGO_INFO.officeAddress.street}
                    </p>
                    <p className="text-xs text-slate-600">
                      {NGO_INFO.officeAddress.city}, Dist. {NGO_INFO.officeAddress.district}, {NGO_INFO.officeAddress.state} – {NGO_INFO.officeAddress.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Official Web Presence:</p>
                    <a
                      href={NGO_INFO.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-forest-700 hover:text-forest-900 underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <span>{NGO_INFO.officialWebsite}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Accreditations & Compliance:</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {NGO_INFO.legalStatus} • {NGO_INFO.certification}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Office Working Hours</p>
              <p>Monday – Saturday: 09:30 AM – 05:30 PM (IST)</p>
              <p>Sunday: Community Field Drives & Volunteer Sessions</p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">
                  Send a Community Message
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submit an inquiry to the foundation coordinators
                </p>
              </div>

              {isSent ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Inquiry Recorded (Prototype)</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out to <strong>{NGO_INFO.name}</strong>. Your message has been received in the demo intake queue.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paritosh Sharma"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Subject / Topic
                    </label>
                    <select className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-forest-600">
                      <option>Volunteering in Plantation Drives (Green Haldwani)</option>
                      <option>Computer Literacy Program Enrollment</option>
                      <option>Educational Book / Stationery Support</option>
                      <option>Community Nutrition & Hunger Relief</option>
                      <option>Academic / Internship Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message Content
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe your inquiry, suggestion, or request for the NGO coordinators..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-forest-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-forest-700 hover:bg-forest-800 disabled:bg-forest-400 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
