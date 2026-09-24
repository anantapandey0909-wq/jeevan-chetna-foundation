import React from 'react';
import Link from 'next/link';
import { 
  TreePine, 
  MapPin, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  HeartHandshake 
} from 'lucide-react';
import { NGO_INFO } from '@/lib/data/ngo-info';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Official Credentials Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Legal Status</p>
                <p className="text-sm font-semibold text-white">{NGO_INFO.legalStatus}</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <Award className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Quality Certification</p>
                <p className="text-sm font-semibold text-white">{NGO_INFO.certification}</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <MapPin className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Registered Office</p>
                <p className="text-sm font-semibold text-white">{NGO_INFO.officeAddress.city}, {NGO_INFO.officeAddress.state}</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Community Track Record</p>
                <p className="text-sm font-semibold text-white">{NGO_INFO.metrics.yearsOfService} Dedicated Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: NGO Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-white">
                <TreePine className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="font-bold text-lg text-white">
                {NGO_INFO.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              A registered non-profit organization actively empowering grassroots communities across Uttarakhand through quality education, environmental stewardship, computer literacy, and direct community welfare.
            </p>
            <div className="pt-2">
              <a
                href={NGO_INFO.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold transition-colors border border-slate-700"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Col 3: Key Initiatives */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Flagship Programs
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Green Haldwani
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Seeds of Digital Confidence
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Hunger Relief Outreach
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Primary Literacy Support
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Community Dialogue (Samvad)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Portal Navigation
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About the Foundation
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-emerald-400 transition-colors">
                  Activities & Drives
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/volunteers" className="hover:text-emerald-400 transition-colors">
                  Volunteer Coordination
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Activity Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-emerald-400 transition-colors">
                  Internship Documentation
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Internal Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Academic Rationale */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Registered Office
            </h3>
            <div className="text-sm text-slate-400 space-y-1.5">
              <p className="font-medium text-slate-200">{NGO_INFO.officeAddress.locality}</p>
              <p>{NGO_INFO.officeAddress.street}</p>
              <p>{NGO_INFO.officeAddress.city}, Dist. {NGO_INFO.officeAddress.district}</p>
              <p>{NGO_INFO.officeAddress.state}, {NGO_INFO.officeAddress.country}</p>
            </div>
            <div className="pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-emerald-400 block mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Social Internship Project
                </span>
                Chapter-IV Digital Framework Solution Prototype. Built for academic evaluation & process enhancement.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Jeevan Chetna Foundation. Digital Community Portal Prototype.</p>
          <p className="text-slate-400">
            Designed for Social Internship Report • Haldwani, Nainital, Uttarakhand
          </p>
        </div>
      </div>
    </footer>
  );
}
