import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Maximize2,
  ShieldAlert,
  HelpCircle,
  Eye,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { BrandBible, ImageResolution, SecondaryMark } from '../types';

interface LogoMarksSectionProps {
  brand: BrandBible;
  onGenerateAiImage: (prompt: string, resolution: ImageResolution) => Promise<string | null>;
  isGeneratingImage: boolean;
}

export const LogoMarksSection: React.FC<LogoMarksSectionProps> = ({
  brand,
  onGenerateAiImage,
  isGeneratingImage,
}) => {
  const [copiedSvgId, setCopiedSvgId] = useState<string | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<ImageResolution>('2K');
  const [aiImageUrl, setAiImageUrl] = useState<string | null>(
    brand.primaryLogo.aiImageUrl || null
  );
  const [activeTab, setActiveTab] = useState<'svg' | 'ai'>(aiImageUrl ? 'ai' : 'svg');
  const [selectedPreviewMark, setSelectedPreviewMark] = useState<SecondaryMark | null>(null);

  const handleCopySvg = (svgContent: string, id: string) => {
    navigator.clipboard.writeText(svgContent);
    setCopiedSvgId(id);
    setTimeout(() => setCopiedSvgId(null), 1800);
  };

  const handleDownloadSvg = (svgContent: string, fileName: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName.toLowerCase().replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGenerateArtwork = async () => {
    const resultUrl = await onGenerateAiImage(
      brand.primaryLogo.promptForAiImage,
      selectedResolution
    );
    if (resultUrl) {
      setAiImageUrl(resultUrl);
      setActiveTab('ai');
    }
  };

  return (
    <section id="section-logos" className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
            Visual Brand Mark System
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1.5 tracking-tight">
            Primary Logo & Secondary Marks
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Vector SVG marks, adaptive responsive variations, and AI-rendered high-resolution collateral.
          </p>
        </div>

        {/* Gemini 3 Pro AI Image Resolution Selector Affordance */}
        <div className="flex flex-col sm:items-end gap-1.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>AI Image Size Affordance:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
              <button
                key={res}
                id={`mark-res-btn-${res}`}
                onClick={() => setSelectedResolution(res)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  selectedResolution === res
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title={`Select ${res} resolution for Gemini 3 Pro generation`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout: Primary Logo Hero + Secondary Marks Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Col (7 cols): Primary Logo Showcase */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <h4 className="font-bold text-slate-900 text-sm">Primary Core Brandmark</h4>
              </div>

              {/* Toggle between Vector SVG and Gemini 3 Pro AI Image Render */}
              <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveTab('svg')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'svg' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vector SVG
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    activeTab === 'ai' ? 'bg-white text-slate-900 shadow-2xs font-bold text-amber-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>AI Art {aiImageUrl ? `(${selectedResolution})` : ''}</span>
                </button>
              </div>
            </div>

            {/* Display Stage Container */}
            <div
              id="primary-logo-canvas"
              className="relative w-full aspect-16/10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-8 overflow-hidden shadow-inner group"
            >
              {activeTab === 'svg' ? (
                <div
                  className="w-48 h-48 max-w-full max-h-full flex items-center justify-center drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  dangerouslySetInnerHTML={{ __html: brand.primaryLogo.svg }}
                />
              ) : aiImageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={aiImageUrl}
                    alt={`${brand.brandName} AI Rendered Mark`}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-mono rounded-md backdrop-blur-xs">
                    {selectedResolution} High-Res
                  </span>
                </div>
              ) : (
                <div className="text-center p-6 max-w-sm">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">
                    Render high-resolution 3D/studio artwork using Gemini 3 Pro ({selectedResolution}).
                  </p>
                  <button
                    onClick={handleGenerateArtwork}
                    disabled={isGeneratingImage}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingImage ? 'Generating Artwork...' : `Render ${selectedResolution} Artwork`}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Concept Description & Buttons */}
            <div className="mt-4">
              <h5 className="text-base font-bold text-slate-900">{brand.primaryLogo.title}</h5>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {brand.primaryLogo.concept}
              </p>

              {/* Action Toolbar */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    id="btn-copy-primary-svg"
                    onClick={() => handleCopySvg(brand.primaryLogo.svg, 'primary-logo')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg transition-colors"
                  >
                    {copiedSvgId === 'primary-logo' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied SVG</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy SVG</span>
                      </>
                    )}
                  </button>

                  <button
                    id="btn-download-primary-svg"
                    onClick={() => handleDownloadSvg(brand.primaryLogo.svg, `${brand.brandName}-primary-logo`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download SVG</span>
                  </button>
                </div>

                <button
                  id="btn-render-ai-mark"
                  onClick={handleGenerateArtwork}
                  disabled={isGeneratingImage}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all shadow-xs disabled:opacity-50"
                  title="Generate realistic 3D brand collateral artwork with Gemini 3 Pro"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {isGeneratingImage ? 'Rendering...' : `Render ${selectedResolution} Artwork`}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Logo Rules & Misuse Protection Card */}
          <div className="bg-slate-50/50 rounded-xl border border-slate-200/80 p-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Clearspace & Misuse Constraints</span>
            </div>
            <p className="mb-2">
              <strong className="text-slate-800">Clearspace Perimeter:</strong> {brand.clearspaceRule}
            </p>
            <p className="mb-2">
              <strong className="text-slate-800">Minimum Size:</strong> {brand.minimumSize}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60">
              {brand.misuseWarnings.slice(0, 4).map((warning, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): 3 Secondary Marks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Secondary Marks Suite</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium">3 Sub-marks</span>
          </div>

          {brand.secondaryMarks.map((mark) => (
            <div
              key={mark.id}
              id={`card-${mark.id}`}
              className="bg-slate-50/70 rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* SVG Visual Box */}
                <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-2xs">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: mark.svg }}
                  />
                </div>

                {/* Mark Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200/50">
                      {mark.type}
                    </span>
                  </div>

                  <h5 className="font-bold text-slate-900 text-sm mt-1 truncate">
                    {mark.title}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {mark.purpose}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => handleCopySvg(mark.svg, mark.id)}
                      className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
                    >
                      {copiedSvgId === mark.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy SVG</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownloadSvg(mark.svg, `${brand.brandName}-${mark.type}`)}
                      className="px-2 py-1 text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 text-slate-400" />
                      <span>SVG</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
