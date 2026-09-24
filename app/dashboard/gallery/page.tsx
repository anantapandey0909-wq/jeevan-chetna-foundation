'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, Calendar, Tag } from 'lucide-react';
import { GALLERY_DATA } from '@/lib/data/gallery';
import { GalleryItem } from '@/types/gallery';
import { GalleryLightbox } from '@/components/gallery/GalleryLightbox';

export default function AdminGalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-subtle">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-forest-700" />
          <span>Field Photographic Catalog Management</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review geo-tagged photographs linked to Green Haldwani, Seeds of Digital Confidence, and community drives.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-subtle hover:shadow-card transition-all cursor-pointer group"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-forest-900 shadow-xs">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-2">{item.caption}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>{item.date}</span>
                <span>{item.location.split(',')[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GalleryLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
