import React, { useEffect, useState } from 'react';
import { Type, ExternalLink, Sliders, Moon, Sun, BookOpen } from 'lucide-react';
import { TypographyPairing } from '../types';
import { loadGoogleFont } from '../utils/fontLoader';

interface TypographySectionProps {
  typography: TypographyPairing;
  brandName: string;
  tagline: string;
}

export const TypographySection: React.FC<TypographySectionProps> = ({
  typography,
  brandName,
  tagline,
}) => {
  const [sampleHeadline, setSampleHeadline] = useState(
    `${brandName}: ${tagline || 'Pioneering the Next Era'}`
  );
  const [sampleParagraph, setSampleParagraph] = useState(
    'Great typography is invisible in its friction, yet profound in its personality. By anchoring architectural headers with humanist, high-legibility body prose, the brand communicates authority and welcoming warmth simultaneously across physical and digital touchpoints.'
  );
  const [fontSize, setFontSize] = useState<number>(36);
  const [isDarkPreview, setIsDarkPreview] = useState<boolean>(false);
  const [activeWeight, setActiveWeight] = useState<string>('700');

  // Load Google Fonts into document head whenever typography props change
  useEffect(() => {
    if (typography.headerFont?.googleFontFamily) {
      loadGoogleFont(typography.headerFont.googleFontFamily);
    }
    if (typography.bodyFont?.googleFontFamily) {
      loadGoogleFont(typography.bodyFont.googleFontFamily);
    }
    if (typography.accentFont?.googleFontFamily) {
      loadGoogleFont(typography.accentFont.googleFontFamily);
    }
  }, [typography]);

  const headerFamily = typography.headerFont?.googleFontFamily || 'Syne';
  const bodyFamily = typography.bodyFont?.googleFontFamily || 'Plus Jakarta Sans';
  const accentFamily = typography.accentFont?.googleFontFamily || 'Space Mono';

  return (
    <section id="section-typography" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
            Google Font Pairings
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Typographic Hierarchy & Font System
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Curated pairings for header display, editorial body, and technical accents with open-source licensing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://fonts.google.com/specimen/${encodeURIComponent(headerFamily)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors border border-amber-200/60"
          >
            <span>{headerFamily} on Google Fonts</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Cards for Header, Body & Accent */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {/* Header Font Card */}
        <div id="card-header-font" className="bg-slate-50/70 rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Display / Header
              </span>
              <span className="text-xs font-semibold text-amber-800">
                {typography.headerFont.category}
              </span>
            </div>

            <div className="mt-4">
              <div
                className="text-2xl font-bold text-slate-900 truncate"
                style={{ fontFamily: `'${headerFamily}', sans-serif` }}
              >
                {typography.headerFont.name}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                font-family: '{headerFamily}'
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-600 space-y-2">
              <p>
                <strong className="text-slate-800">Usage:</strong> {typography.headerFont.usage}
              </p>
              <p>
                <strong className="text-slate-800">Design Rationale:</strong> {typography.headerFont.rationale}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>Weights:</span>
            <div className="flex gap-1">
              {(typography.headerFont.weights || ['600', '700', '800']).map((w) => (
                <span key={w} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm font-mono text-[11px]">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body Font Card */}
        <div id="card-body-font" className="bg-slate-50/70 rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Reading / Body
              </span>
              <span className="text-xs font-semibold text-amber-800">
                {typography.bodyFont.category}
              </span>
            </div>

            <div className="mt-4">
              <div
                className="text-2xl font-medium text-slate-900 truncate"
                style={{ fontFamily: `'${bodyFamily}', sans-serif` }}
              >
                {typography.bodyFont.name}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                font-family: '{bodyFamily}'
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-600 space-y-2">
              <p>
                <strong className="text-slate-800">Usage:</strong> {typography.bodyFont.usage}
              </p>
              <p>
                <strong className="text-slate-800">Design Rationale:</strong> {typography.bodyFont.rationale}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>Weights:</span>
            <div className="flex gap-1">
              {(typography.bodyFont.weights || ['400', '500', '600']).map((w) => (
                <span key={w} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm font-mono text-[11px]">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pairing Philosophy / Accent Font Card */}
        <div id="card-philosophy" className="bg-amber-50/40 rounded-xl border border-amber-200/80 p-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              Pairing Philosophy
            </div>
            <p className="text-xs text-slate-700 mt-3 leading-relaxed">
              {typography.pairingPhilosophy}
            </p>

            {typography.accentFont && (
              <div className="mt-4 pt-3 border-t border-amber-200/60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    Supporting / Accent:
                  </span>
                  <span className="text-xs font-mono text-slate-700">
                    {typography.accentFont.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {typography.accentFont.usage}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-1">
            <Type className="w-3.5 h-3.5" />
            <span>Optimal ratio: 1.333 (Perfect Fourth)</span>
          </div>
        </div>
      </div>

      {/* Live Interactive Type Sandbox */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-600" />
            <h4 className="font-bold text-sm text-slate-900">Live Typography Sandbox</h4>
            <span className="text-xs text-slate-400 font-normal">(Type directly into the text below)</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Font size slider */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="text-slate-400">Header Size:</span>
              <input
                type="range"
                min="20"
                max="60"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-24 accent-amber-600 cursor-pointer"
              />
              <span className="font-mono w-7 text-right">{fontSize}px</span>
            </div>

            {/* Dark / Light preview toggle */}
            <button
              onClick={() => setIsDarkPreview(!isDarkPreview)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
              title="Toggle preview contrast mode"
            >
              {isDarkPreview ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Live Canvas Box */}
        <div
          id="type-tester-canvas"
          className={`p-6 sm:p-8 rounded-xl border transition-colors duration-200 ${
            isDarkPreview
              ? 'bg-slate-950 border-slate-800 text-slate-100'
              : 'bg-slate-50/80 border-slate-200 text-slate-900'
          }`}
        >
          {/* Editable Headline */}
          <input
            type="text"
            value={sampleHeadline}
            onChange={(e) => setSampleHeadline(e.target.value)}
            style={{
              fontFamily: `'${headerFamily}', sans-serif`,
              fontSize: `${fontSize}px`,
              lineHeight: 1.2,
            }}
            className={`w-full bg-transparent font-bold tracking-tight focus:outline-hidden border-b border-transparent focus:border-amber-500/50 pb-1 mb-4 ${
              isDarkPreview ? 'text-white' : 'text-slate-900'
            }`}
          />

          {/* Editable Body Paragraph */}
          <textarea
            rows={3}
            value={sampleParagraph}
            onChange={(e) => setSampleParagraph(e.target.value)}
            style={{
              fontFamily: `'${bodyFamily}', sans-serif`,
              fontSize: '16px',
              lineHeight: 1.7,
            }}
            className={`w-full bg-transparent focus:outline-hidden border-b border-transparent focus:border-amber-500/50 resize-none ${
              isDarkPreview ? 'text-slate-300' : 'text-slate-700'
            }`}
          />

          {/* Metadata Specs Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200/30 flex flex-wrap items-center justify-between gap-3 text-xs opacity-75 font-mono">
            <span>Header: {headerFamily} ({fontSize}px)</span>
            <span>Body: {bodyFamily} (16px / 1.7 line-height)</span>
            <span>Accent: {accentFamily}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
