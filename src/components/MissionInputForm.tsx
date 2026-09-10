import React, { useState } from 'react';
import { Sparkles, Wand2, Lightbulb, Image as ImageIcon, ChevronRight, FileText } from 'lucide-react';
import { ImageResolution } from '../types';

interface MissionInputFormProps {
  onGenerate: (data: {
    mission: string;
    companyName?: string;
    industry?: string;
    stylePreference?: string;
    imageResolution?: ImageResolution;
  }) => Promise<void>;
  isLoading: boolean;
  onSelectSample: (index: number) => void;
}

export const MissionInputForm: React.FC<MissionInputFormProps> = ({
  onGenerate,
  isLoading,
  onSelectSample,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [mission, setMission] = useState('');
  const [industry, setIndustry] = useState('Technology & Productivity');
  const [stylePreference, setStylePreference] = useState('Modern, Precision & Architectural');
  const [imageResolution, setImageResolution] = useState<ImageResolution>('2K');

  const industries = [
    'Technology & Productivity',
    'Mobile Apps & File Tools',
    'Eco & Clean Energy',
    'Artisan Food & Craft',
    'Health & Neuroscience',
    'Luxury & Editorial',
    'Fintech & Security',
  ];

  const styleOptions = [
    'Modern, Precision & Architectural',
    'Timeless Editorial & High Luxury',
    'Warm, Organic & Humanist',
    'Bold, Punchy & Tech-Forward',
    'Clean Swiss Minimalist',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) return;
    await onGenerate({
      mission: mission.trim(),
      companyName: companyName.trim() || undefined,
      industry,
      stylePreference,
      imageResolution,
    });
  };

  const handleQuickPreset = (presetType: 'docu' | 'solar' | 'coffee') => {
    if (presetType === 'docu') {
      setCompanyName('DocuSync');
      setIndustry('Mobile Apps & File Tools');
      setStylePreference('Modern, Precision & Architectural');
      setMission(
        'An all-in-one mobile scanner and document intelligence suite. Users capture live document photos, perform auto edge-detection and perspective crop, apply clarity filters (B&W, enhance, grayscale), and export to PDF. Includes fast conversions between PDF, Word, Excel, plus merge, split, compress, and direct WhatsApp/social media sharing.'
      );
    } else if (presetType === 'solar') {
      setCompanyName('Solaria');
      setIndustry('Eco & Clean Energy');
      setStylePreference('Warm, Organic & Humanist');
      setMission(
        'A next-generation clean energy intelligence platform interconnecting residential rooftop solar batteries with regional electrical grids to accelerate zero-carbon power distribution.'
      );
    } else {
      setCompanyName('Velox Logistics');
      setIndustry('Technology & Productivity');
      setStylePreference('Bold, Punchy & Tech-Forward');
      setMission(
        'Autonomous warehouse orchestration and drone delivery network that delivers medical supplies and critical items in under 15 minutes.'
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            AI Brand Intelligence Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Describe Your Company Mission
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Input your core vision and brand goals. We will synthesize an exhaustive Brand Bible complete with logos, marks, 5-color palette, and Google Fonts.
          </p>
        </div>

        {/* Quick sample buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>
          <button
            type="button"
            id="preset-docu-btn"
            onClick={() => handleQuickPreset('docu')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <FileText className="w-3 h-3 text-sky-600" />
            File Utility App
          </button>
          <button
            type="button"
            id="preset-solar-btn"
            onClick={() => handleQuickPreset('solar')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors"
          >
            Solar Energy
          </button>
          <button
            type="button"
            id="preset-drone-btn"
            onClick={() => handleQuickPreset('coffee')}
            className="px-2.5 py-1 text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors"
          >
            Autonomous Drone
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Row 1: Company Name & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="input-company-name"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Company / Product Name <span className="font-normal text-slate-400">(Optional)</span>
            </label>
            <input
              id="input-company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. DocuSync (or leave blank to auto-generate)"
              className="w-full px-3.5 py-2.5 bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="select-industry"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Industry Sector
            </label>
            <select
              id="select-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Aesthetic Vibe & Image Resolution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label
              htmlFor="select-style-vibe"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              Aesthetic Direction & Brand Personality
            </label>
            <select
              id="select-style-vibe"
              value={stylePreference}
              onChange={(e) => setStylePreference(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
            >
              {styleOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                Image AI Resolution
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Gemini 3 Pro</span>
            </label>
            <div id="image-size-affordance" className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
                <button
                  key={res}
                  type="button"
                  id={`btn-resolution-${res}`}
                  onClick={() => setImageResolution(res)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                    imageResolution === res
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Mission Statement */}
        <div>
          <label
            htmlFor="input-mission-text"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between"
          >
            <span>Company Mission, Purpose & Vision</span>
            <span className="text-[11px] text-slate-400 font-normal">
              {mission.length} characters
            </span>
          </label>
          <textarea
            id="input-mission-text"
            rows={4}
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            placeholder="Describe what your company does, who it serves, what problems it solves, and the feelings you want to evoke. (e.g. 'We build an intuitive mobile scanner app that converts paper documents into encrypted PDFs and exports them directly to WhatsApp...')"
            className="w-full px-3.5 py-3 bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all leading-relaxed"
          />
        </div>

        {/* Submit & Generate Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Outputs: Logo SVG + Secondary Marks + 5-Color Hex Palette + Google Fonts + Mockups
          </div>

          <button
            type="submit"
            id="btn-submit-brand-generator"
            disabled={isLoading || !mission.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-slate-900/10 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Brand Bible...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-amber-400" />
                <span>Generate Brand Identity</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
