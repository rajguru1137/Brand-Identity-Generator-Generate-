import React from 'react';
import { Smartphone, CreditCard, Monitor, Package, Sparkles } from 'lucide-react';
import { BrandBible } from '../types';

interface BrandMockupsSectionProps {
  brand: BrandBible;
}

export const BrandMockupsSection: React.FC<BrandMockupsSectionProps> = ({ brand }) => {
  const primaryColor = brand.palette[0]?.hex || '#1E3A8A';
  const secondaryColor = brand.palette[1]?.hex || '#0284C7';
  const accentColor = brand.palette[2]?.hex || '#F59E0B';
  const neutralDark = brand.palette[3]?.hex || '#0F172A';
  const neutralLight = brand.palette[4]?.hex || '#F8FAFC';

  const headerFont = brand.typography?.headerFont?.googleFontFamily || 'Syne';
  const bodyFont = brand.typography?.bodyFont?.googleFontFamily || 'Plus Jakarta Sans';

  return (
    <section id="section-mockups" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
            Real-World Touchpoints
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Brand In Situ: Interactive Mockups
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Preview how your palette, typography, and logo lockups harmonize across physical and digital media.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Mockup 1: Mobile App Screen */}
        <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-amber-600" />
              Mobile App Experience
            </span>
            <span className="text-[10px] text-slate-400 font-mono">iOS / Android</span>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[280px] mx-auto bg-slate-950 rounded-[36px] p-3 shadow-xl border-4 border-slate-800">
            {/* Screen Canvas */}
            <div
              className="rounded-[26px] p-4 text-white min-h-[380px] flex flex-col justify-between overflow-hidden relative"
              style={{ backgroundColor: neutralDark }}
            >
              {/* Top Notch & Status */}
              <div>
                <div className="w-20 h-3.5 bg-black/50 rounded-full mx-auto mb-3" />
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-4 font-mono">
                  <span>09:41</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/60"></span>
                    <span className="w-2 h-2 rounded-full bg-white/60"></span>
                  </div>
                </div>

                {/* In-app Header with Logo */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center p-1"
                      style={{ backgroundColor: primaryColor }}
                      dangerouslySetInnerHTML={{ __html: brand.primaryLogo.svg }}
                    />
                    <span
                      className="font-bold text-sm tracking-tight text-white"
                      style={{ fontFamily: `'${headerFont}', sans-serif` }}
                    >
                      {brand.brandName}
                    </span>
                  </div>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                </div>

                {/* Hero Feature Card inside App */}
                <div
                  className="mt-4 p-3.5 rounded-xl border border-white/15 backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                    style={{ backgroundColor: accentColor, color: neutralDark }}
                  >
                    Active Suite
                  </span>
                  <div
                    className="text-sm font-bold mt-2 text-white"
                    style={{ fontFamily: `'${headerFont}', sans-serif` }}
                  >
                    {brand.mockups.appScreenTitle}
                  </div>
                  <p
                    className="text-[11px] text-slate-300 mt-1 line-clamp-2"
                    style={{ fontFamily: `'${bodyFont}', sans-serif` }}
                  >
                    {brand.elevatorPitch}
                  </p>
                </div>
              </div>

              {/* Bottom Nav Action */}
              <div className="pt-3">
                <button
                  className="w-full py-2.5 rounded-xl font-bold text-xs shadow-md text-center transition-transform hover:scale-[1.02]"
                  style={{
                    backgroundColor: primaryColor,
                    color: '#ffffff',
                    fontFamily: `'${bodyFont}', sans-serif`,
                  }}
                >
                  Launch Workspace
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup 2: Executive Business Card (Front & Back) */}
        <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-600" />
              Heavyweight Stationery & Card
            </span>
            <span className="text-[10px] text-slate-400 font-mono">400gsm Cotton</span>
          </div>

          <div className="space-y-4 my-auto">
            {/* Front of Card */}
            <div
              className="w-full aspect-16/9 rounded-xl p-5 shadow-lg border flex flex-col justify-between relative overflow-hidden transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: neutralLight,
                borderColor: 'rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center p-1.5 shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                  dangerouslySetInnerHTML={{ __html: brand.primaryLogo.svg }}
                />
                <div>
                  <div
                    className="text-base font-bold text-slate-900 leading-tight"
                    style={{ fontFamily: `'${headerFont}', sans-serif` }}
                  >
                    {brand.brandName}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    {brand.tagline}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between text-slate-800 text-[11px]">
                <div style={{ fontFamily: `'${bodyFont}', sans-serif` }}>
                  <div className="font-bold text-slate-900">Alex Vance</div>
                  <div className="text-[10px] text-slate-500">Chief Executive Officer</div>
                </div>
                <div className="text-right text-[10px] text-slate-500 font-mono">
                  <div>contact@{brand.brandName.toLowerCase().replace(/\s+/g, '')}.com</div>
                  <div>+1 (555) 019-2831</div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div
              className="w-full aspect-16/9 rounded-xl p-5 shadow-lg flex items-center justify-center relative overflow-hidden transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              <div
                className="w-20 h-20 opacity-90 p-2"
                dangerouslySetInnerHTML={{ __html: brand.primaryLogo.svg }}
              />
              <div
                className="absolute bottom-3 text-center text-[10px] font-bold tracking-widest uppercase opacity-75 text-white"
                style={{ fontFamily: `'${headerFont}', sans-serif` }}
              >
                {brand.tagline}
              </div>
            </div>
          </div>
        </div>

        {/* Mockup 3: Billboard / Web Hero Banner */}
        <div className="bg-slate-50/70 rounded-xl border border-slate-200 p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-amber-600" />
              Digital Billboard & Keynote Hero
            </span>
            <span className="text-[10px] text-slate-400 font-mono">16:9 Display</span>
          </div>

          <div
            className="w-full rounded-xl p-6 sm:p-10 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
            style={{
              backgroundColor: neutralDark,
            }}
          >
            {/* Background Glow */}
            <div
              className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: secondaryColor }}
            />
            <div
              className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  className="text-xs font-bold tracking-widest uppercase text-slate-300"
                  style={{ fontFamily: `'${headerFont}', sans-serif` }}
                >
                  {brand.archetype}
                </span>
              </div>

              <h4
                className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
                style={{ fontFamily: `'${headerFont}', sans-serif` }}
              >
                {brand.mockups.billboardCopy}
              </h4>

              <p
                className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed"
                style={{ fontFamily: `'${bodyFont}', sans-serif` }}
              >
                {brand.mission}
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shrink-0">
              <div
                className="w-24 h-24 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: brand.primaryLogo.svg }}
              />
              <div
                className="text-sm font-bold text-white mt-2"
                style={{ fontFamily: `'${headerFont}', sans-serif` }}
              >
                {brand.brandName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
