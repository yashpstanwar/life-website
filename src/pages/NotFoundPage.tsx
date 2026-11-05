import React from 'react';
import { PageId } from '../types';
import { ArrowLeft, Home, Search, Heart } from 'lucide-react';

interface Props {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="w-full bg-stone-50 min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-xl mx-auto text-center space-y-6">
      <span className="font-serif-display text-7xl sm:text-8xl font-black text-amber-500/20 block">
        404
      </span>
      <div className="space-y-2">
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          The page or campaign link you followed may have moved or been updated. Everything LIFE publishes is reachable from the navigation.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          onClick={() => onNavigate('work')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-white font-semibold text-xs transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Explore Our Work</span>
        </button>

        <button
          onClick={() => onNavigate('donate')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-slate-950" />
          <span>Support Our Cause</span>
        </button>
      </div>
    </div>
  </div>
);
