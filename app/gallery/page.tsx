'use client';

import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Filter, 
  MapPin, 
  Calendar, 
  Maximize2,
  Sparkles,
  Tag
} from 'lucide-react';
import { GALLERY_DATA } from '@/lib/data/gallery';
import { GalleryItem } from '@/types/gallery';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';

const GALLERY_CATEGORIES = [
  'All',
  'Plantation Drives',
  'Digital Confidence',
  'Education & Awareness',
  'Community Outreach',
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filteredGallery = GALLERY_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="bg-[#fdfcfb] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Field Photographic Records</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Activity & Drive Gallery
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Visual documentation collected during tree plantation campaigns, computer training workshops, and community welfare drives in Haldwani & Nainital district.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong>{filteredGallery.length}</strong> photo records
            {selectedCategory !== 'All' && ` under ${selectedCategory}`}
          </span>
          <span className="text-[11px] text-slate-400">
            Click any photograph to view high-resolution caption & location data
          </span>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enlarge Photo</span>
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-sm text-forest-900 shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-forest-700" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-forest-700" />
                      {item.location.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-800 font-medium">
                    <Tag className="w-3 h-3" />
                    {item.programTag}
                  </span>
                  <span className="text-slate-400">Geo-verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GalleryLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </div>
  );
}
