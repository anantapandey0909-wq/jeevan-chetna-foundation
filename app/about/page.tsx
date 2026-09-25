import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Award, 
  Trees, 
  Laptop, 
  GraduationCap, 
  HeartHandshake, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Target,
  Compass
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

export const metadata = {
  title: 'About Us | Jeevan Chetna Foundation',
  description: 'Learn about Jeevan Chetna Foundation, a Section 8 NGO in Haldwani, Nainital, working in education, environmental protection, computer literacy, and community welfare.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#fdfcfb] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 text-forest-800 border border-forest-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Official Organization Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            About {NGO_INFO.name}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            A dedicated non-governmental organization working continuously for social welfare, grassroots community development, environmental preservation, and digital empowerment in Uttarakhand.
          </p>
        </div>

        {/* Foundation group photograph (owner-supplied) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/foundation/foundation-group-01.jpg"
              alt="Group photograph of participants under a Jeevan Chetna Foundation banner"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="px-4 py-2.5 text-[11px] text-slate-500 border-t border-slate-100">
            Participants photographed at a Jeevan Chetna Foundation gathering.
          </p>
        </div>

        {/* Official Identity & Legal Standing Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-forest-700" />
              <span>Organizational Background & Registration</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
            <div className="space-y-3">
              <p>
                <strong>{NGO_INFO.name}</strong> was founded by <strong>Mr. Parvin Pandey</strong> and <strong>Mr. Deepak Joshi</strong> with a shared vision of creating sustainable, community-driven social transformation.
              </p>
              <p>
                Operating with a deep commitment to grassroots social responsibility, the foundation addresses systemic challenges in rural and semi-urban clusters of Nainital district.
              </p>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span><strong>Legal Classification:</strong> {NGO_INFO.legalStatus}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span><strong>Quality Standard:</strong> {NGO_INFO.certification}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span><strong>Territorial Jurisdiction:</strong> {NGO_INFO.registrationState}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
                <span><strong>Operating Headquarters:</strong> {NGO_INFO.officeAddress.locality}, {NGO_INFO.officeAddress.street}, {NGO_INFO.officeAddress.city}, Dist. {NGO_INFO.officeAddress.district}, {NGO_INFO.officeAddress.state}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-800 text-emerald-300 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed">
                To build resilient, self-sustaining communities by bridging educational and digital inequities, safeguarding the regional environment through mass plantation, and ensuring immediate hunger relief and social dignity for vulnerable populations.
              </p>
            </div>
            <div className="pt-4 border-t border-forest-800 text-xs text-emerald-300">
              Grassroots Action • Continuous Engagement
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4 shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A society where every child has access to foundational learning and computer skills, every village community is ecologically aware and green, and social empowerment fosters equitable community progress.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Sustainable Social Transformation across Uttarakhand
            </div>
          </div>
        </div>

        {/* Strategic Initiatives */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Core Strategic Focus Areas
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active sectors where the foundation implements sustained programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NGO_INFO.coreSectors.map((sec) => (
              <div key={sec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">{sec.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{sec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internship Context & Digital Framework Note (Chapter IV) */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-forest-800">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold text-base">Social Internship Project Rationale (Chapter IV)</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            This digital platform was designed as part of the <strong>Social Internship Report (Chapter IV: Digital Framework Solution)</strong>. During the internship with Jeevan Chetna Foundation, direct involvement in tree plantation drives, environmental awareness sessions, educational support, and daily documentation highlighted the opportunity for an integrated digital system to organize volunteer rosters, capture attendance logs, index activity photos, and streamline report preparation.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs">
            <Link href="/reports" className="text-forest-800 font-bold hover:underline">
              Review Documented Internship Records →
            </Link>
            <a
              href={NGO_INFO.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
