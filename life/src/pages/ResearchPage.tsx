import React, { useState } from 'react';
import { PageId } from '../types';
import { RESEARCH_PAPERS } from '../data';
import { Search, Download, ArrowRight } from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredPapers = RESEARCH_PAPERS.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          paper.commissionedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || paper.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full bg-[#EFEDE6] text-[#14160F]">
      
      {/* Header Band */}
      <section className="bg-[#101C3A] text-[#EFEDE6] py-16 px-4 sm:px-8 hairline-b">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="font-mono text-xs text-[#8E9BB5] uppercase tracking-widest">
            INDEPENDENT FIELD STUDIES & REPORTS
          </span>
          <h1 className="font-fraunces text-4xl sm:text-5xl font-bold text-[#EFEDE6]">
            Research & Publications
          </h1>
          
          {/* Short intro with "Commission a study" link */}
          <p className="font-sans-devanagari text-base text-[#8E9BB5] max-w-3xl leading-relaxed">
            LIFE conducts social and economic surveys and evaluates programmes for government departments, autonomous bodies and private institutions.{' '}
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#E39B2C] hover:underline font-bold inline-flex items-center space-x-1"
            >
              <span>Commission a study</span>
              <ArrowRight size={14} />
            </button>
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        
        {/* Search Field + Type Filter Chips */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#8E9BB5]/20 pb-6">
          
          {/* Search field */}
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-3 text-[#8E9BB5]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or institution..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#8E9BB5]/40 rounded-[4px] font-sans-devanagari text-sm focus-marigold"
            />
          </div>

          {/* Type filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#8E9BB5] mr-1">TYPE:</span>
            {['All', 'Survey', 'Evaluation', 'Impact study'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-[4px] font-mono text-xs transition-colors ${
                  selectedType === t
                    ? 'bg-[#E39B2C] text-[#101C3A] font-bold'
                    : 'bg-white text-[#14160F] border border-[#8E9BB5]/40 hover:border-[#E39B2C]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* Dense Table with hairline rows & mono column headers */}
        <div className="bg-white rounded-[4px] hairline-all overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#101C3A] text-[#8E9BB5] font-mono text-xs uppercase tracking-wider border-b border-[#8E9BB5]/30">
                <th className="py-3.5 px-4 font-normal">TITLE</th>
                <th className="py-3.5 px-4 font-normal">TYPE</th>
                <th className="py-3.5 px-4 font-normal">COMMISSIONED BY</th>
                <th className="py-3.5 px-4 font-normal text-center">YEAR</th>
                <th className="py-3.5 px-4 font-normal text-right">DOWNLOAD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8E9BB5]/20 font-sans-devanagari text-sm">
              {filteredPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-[#EFEDE6]/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#101C3A] max-w-md">
                    {paper.title}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-[#2C6E8F]">
                    {paper.type}
                  </td>
                  <td className="py-4 px-4 text-xs text-[#8E9BB5]">
                    {paper.commissionedBy}
                  </td>
                  <td className="py-4 px-4 font-mono text-xs text-center text-[#101C3A]">
                    {paper.year}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading ${paper.title} (${paper.fileSize})`)}
                      className="inline-flex items-center space-x-1 font-mono text-xs text-[#E39B2C] hover:underline bg-[#101C3A] px-2.5 py-1 rounded-[2px] cursor-pointer"
                    >
                      <Download size={13} />
                      <span>{paper.fileSize}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
};
