import React, { useState } from 'react';
import { Copy, Check, Info, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ColorSwatch } from '../types';

interface ColorPaletteSectionProps {
  palette: ColorSwatch[];
  onColorChange?: (index: number, newHex: string) => void;
}

export const ColorPaletteSection: React.FC<ColorPaletteSectionProps> = ({
  palette,
  onColorChange,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <section id="section-palette" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
            5-Color Chromatic System
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Brand Color Palette & Usage Notes
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Balanced 60-30-10 distribution engineered for WCAG accessibility and emotional resonance.
          </p>
        </div>

        {/* Proportional Preview Bar */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Harmony Distribution
          </div>
          <div className="w-48 sm:w-60 h-4 rounded-full overflow-hidden flex shadow-inner border border-slate-200">
            {palette.map((swatch, idx) => {
              // Approximate width distribution: 38%, 24%, 14%, 12%, 12%
              const widths = ['38%', '26%', '14%', '11%', '11%'];
              return (
                <div
                  key={idx}
                  style={{ backgroundColor: swatch.hex, width: widths[idx] || '20%' }}
                  title={`${swatch.name} (${swatch.hex})`}
                  className="h-full transition-transform hover:scale-y-110"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 5 Color Swatch Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {palette.map((swatch, index) => {
          const isCopied = copiedIndex === index;
          return (
            <div
              key={index}
              id={`color-swatch-${index}`}
              className="group flex flex-col bg-slate-50/50 rounded-xl border border-slate-200/80 overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Color Block */}
              <div
                style={{ backgroundColor: swatch.hex }}
                className="relative h-32 w-full p-3 flex flex-col justify-between transition-transform duration-200 group-hover:brightness-[1.02]"
              >
                {/* Role Pill */}
                <span
                  className="self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs backdrop-blur-md"
                  style={{
                    backgroundColor: swatch.textColor === '#F8FAFC' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)',
                    color: swatch.textColor,
                  }}
                >
                  {swatch.role}
                </span>

                {/* Copy Button on Hover/Mobile */}
                <button
                  onClick={() => handleCopy(swatch.hex, index)}
                  className="self-end px-2 py-1 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs transition-all backdrop-blur-md"
                  style={{
                    backgroundColor: swatch.textColor === '#F8FAFC' ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.85)',
                    color: swatch.textColor,
                  }}
                  title="Click to copy HEX code"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 opacity-80" />
                      <span>{swatch.hex}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Swatch Details */}
              <div className="p-3.5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {swatch.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {swatch.hex}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-800 mt-0.5">
                    {swatch.roleLabel}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {swatch.usageNotes}
                  </p>
                </div>

                {/* WCAG Accessibility Ratings */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-medium">WCAG Contrast:</span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span
                      className={`px-1.5 py-0.5 rounded-sm font-bold ${
                        swatch.wcagWhite !== 'Fail'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                      title={`Contrast against White: ${swatch.wcagWhite}`}
                    >
                      W: {swatch.wcagWhite}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded-sm font-bold ${
                        swatch.wcagBlack !== 'Fail'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                      title={`Contrast against Black: ${swatch.wcagBlack}`}
                    >
                      B: {swatch.wcagBlack}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
