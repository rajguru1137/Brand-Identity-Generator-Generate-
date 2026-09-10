import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  XCircle,
  Award,
  Layers,
  Palette,
  Type,
  Smartphone,
  BookOpen,
  Sparkles,
  Download,
  Printer,
  Plus,
  Loader2,
} from 'lucide-react';
import { BrandBible, ImageResolution } from '../types';
import { ColorPaletteSection } from './ColorPaletteSection';
import { TypographySection } from './TypographySection';
import { LogoMarksSection } from './LogoMarksSection';
import { BrandMockupsSection } from './BrandMockupsSection';

interface BrandBibleDashboardProps {
  brand: BrandBible;
  onGenerateAiImage: (prompt: string, resolution: ImageResolution) => Promise<string | null>;
  isGeneratingImage: boolean;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
  onNewBrandClick?: () => void;
  onNavigateToTool?: (tab: 'image-to-pdf' | 'text-to-pdf') => void;
}

export const BrandBibleDashboard: React.FC<BrandBibleDashboardProps> = ({
  brand,
  onGenerateAiImage,
  isGeneratingImage,
  onExportPdf,
  isExportingPdf = false,
  onNewBrandClick,
  onNavigateToTool,
}) => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'logos' | 'palette' | 'typography' | 'mockups' | 'guidelines'
  >('all');

  const navItems = [
    { id: 'all', label: 'Full Brand Bible', icon: BookOpen },
    { id: 'logos', label: 'Logos & Marks', icon: Layers },
    { id: 'palette', label: 'Color Palette', icon: Palette },
    { id: 'typography', label: 'Google Fonts', icon: Type },
    { id: 'mockups', label: 'Touchpoints', icon: Smartphone },
  ];

  return (
    <div id="brand-bible-dashboard" className="space-y-8 animate-in fade-in duration-300">
      {/* Official PDF / Print Document Cover Banner */}
      <div
        id="pdf-header-cover"
        className="hidden print:flex items-center justify-between pb-4 mb-6 border-b-2 border-slate-900"
      >
        <div>
          <span className="text-[10px] font-bold tracking-widest text-amber-800 uppercase">
            Official Brand Identity Guidelines & System
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            {brand.brandName} Brand Bible
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">{brand.tagline}</p>
        </div>
        <div className="text-right text-[10px] text-slate-500 font-mono space-y-0.5">
          <div className="font-bold text-slate-800">CONFIDENTIAL & PROPRIETARY</div>
          <div>Archetype: {brand.archetype}</div>
          <div>System Version: 1.0</div>
        </div>
      </div>

      {/* Brand Hero Header Card */}
      <section
        id="section-hero-identity"
        data-bible-section="hero"
        className="relative bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-xs overflow-hidden"
      >
        {/* Decorative Top Accent Bar using Primary and Accent Brand Colors */}
        <div
          className="absolute top-0 inset-x-0 h-1.5 flex"
          style={{
            background: `linear-gradient(90deg, ${brand.palette[0]?.hex || '#1E3A8A'}, ${brand.palette[2]?.hex || '#F59E0B'})`,
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 rounded-full border border-amber-200">
                Official Brand Bible
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 rounded-full border border-slate-200 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                Archetype: {brand.archetype}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{
                fontFamily: `'${brand.typography?.headerFont?.googleFontFamily || 'Syne'}', sans-serif`,
              }}
            >
              {brand.brandName}
            </h1>

            <p
              className="text-base sm:text-lg text-amber-800 font-semibold mt-1"
              style={{
                fontFamily: `'${brand.typography?.bodyFont?.googleFontFamily || 'Plus Jakarta Sans'}', sans-serif`,
              }}
            >
              {brand.tagline}
            </p>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed max-w-xl">
              {brand.elevatorPitch}
            </p>

            {/* Quick Actions in Front */}
            <div className="flex flex-wrap items-center gap-2.5 mt-5 print:hidden">
              {onExportPdf && (
                <button
                  id="hero-btn-export-brand-pdf"
                  onClick={onExportPdf}
                  disabled={isExportingPdf}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {isExportingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>PDF तैयार हो रही है...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>📥 ब्रांड PDF डाउनलोड करें (PDF)</span>
                    </>
                  )}
                </button>
              )}

              <button
                id="hero-btn-print-brand"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>प्रिंट (Print)</span>
              </button>

              {onNewBrandClick && (
                <button
                  id="hero-btn-new-brand"
                  onClick={onNewBrandClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl border border-amber-300 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-700" />
                  <span>नया ब्रांड बनाएं</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Identity Stamp Preview */}
          <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2 flex items-center justify-center shadow-xs"
              style={{ backgroundColor: brand.palette[0]?.hex || '#1E3A8A' }}
              dangerouslySetInnerHTML={{ __html: brand.primaryLogo.svg }}
            />
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-900">{brand.brandName} Logomark</div>
              <div className="text-slate-500 text-[11px]">Primary Core Mark</div>
              <div className="flex gap-1 pt-1.5">
                {brand.palette.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} (${c.hex})`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core Values & Tone Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
          {brand.values.map((v, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{v.title}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        {/* Brand Voice & Tone: Dos and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800 uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Voice & Tone Dos</span>
            </div>
            <ul className="space-y-1.5 text-xs text-emerald-950">
              {brand.voiceAndTone.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/60">
            <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800 uppercase tracking-wider mb-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Voice & Tone Don'ts</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-950">
              {brand.voiceAndTone.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-600 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 print:hidden">
        {navItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/70'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sections rendering: Preserved in DOM with print/PDF visibility so all sections export */}
      <div
        id="section-wrapper-logos"
        data-bible-section="logos"
        className={activeTab !== 'all' && activeTab !== 'logos' ? 'hidden print:block' : 'block'}
      >
        <LogoMarksSection
          brand={brand}
          onGenerateAiImage={onGenerateAiImage}
          isGeneratingImage={isGeneratingImage}
        />
      </div>

      <div
        id="section-wrapper-palette"
        data-bible-section="palette"
        className={activeTab !== 'all' && activeTab !== 'palette' ? 'hidden print:block' : 'block'}
      >
        <ColorPaletteSection palette={brand.palette} />
      </div>

      <div
        id="section-wrapper-typography"
        data-bible-section="typography"
        className={activeTab !== 'all' && activeTab !== 'typography' ? 'hidden print:block' : 'block'}
      >
        <TypographySection
          typography={brand.typography}
          brandName={brand.brandName}
          tagline={brand.tagline}
        />
      </div>

      <div
        id="section-wrapper-mockups"
        data-bible-section="mockups"
        className={activeTab !== 'all' && activeTab !== 'mockups' ? 'hidden print:block' : 'block'}
      >
        <BrandMockupsSection brand={brand} />
      </div>

      {/* Official Document Footer (Print & PDF Export) */}
      <div
        id="pdf-footer-stamp"
        className="hidden print:flex items-center justify-between pt-6 mt-10 border-t border-slate-200 text-[11px] text-slate-400 font-mono"
      >
        <span>{brand.brandName} • Brand Bible & Design Tokens System</span>
        <span>Generated with Brand Bible Identity Studio</span>
      </div>
    </div>
  );
};
