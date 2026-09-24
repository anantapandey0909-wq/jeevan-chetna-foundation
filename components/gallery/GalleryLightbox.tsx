'use client';

import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '@/types/gallery';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[60vh]"
          />
        </div>

        <div className="p-6 bg-slate-900 border-t border-slate-800 text-white space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              {item.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {item.date}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {item.location}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{item.caption}</p>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 mt-2">
            <span className="flex items-center gap-1 text-emerald-400">
              <Tag className="w-3.5 h-3.5" />
              Program: {item.programTag}
            </span>
            <span>Recorded during internship field activities</span>
          </div>
        </div>
      </div>
    </div>
  );
}
