import React from 'react';
import { PageId } from '../types';
import { SignalBars } from '../components/SignalBars';

interface Props {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<Props> = ({ onNavigate }) => (
  <div className="bg-[#101C3A] text-[#EFEDE6] min-h-[70vh] flex items-center px-4 sm:px-8">
    <div className="max-w-2xl mx-auto space-y-6">
      <SignalBars count={9} heightLevel={2} className="h-10" />
      <div className="font-mono text-xs uppercase tracking-widest text-[#8E9BB5]">Error 404</div>
      <h1 className="font-fraunces text-4xl sm:text-5xl font-bold">This page isn't here.</h1>
      <p className="text-[#8E9BB5] max-w-md">
        The link may be out of date. Everything LIFE publishes is reachable from the main navigation.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="bg-[#E39B2C] text-[#101C3A] px-6 py-3 rounded-[4px] font-bold cursor-pointer hover:bg-[#e09117]"
        >
          Back to home
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="border border-[#8E9BB5]/40 px-6 py-3 rounded-[4px] cursor-pointer hover:border-[#E39B2C]"
        >
          Report a broken link
        </button>
      </div>
    </div>
  </div>
);
