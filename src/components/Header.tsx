import React, { useState } from 'react';
import {
  Sparkles,
  Printer,
  Download,
  FileDown,
  Loader2,
  Copy,
  Check,
  MessageSquare,
  History,
  Palette,
  FolderOpen,
  FileImage,
  FileText
} from 'lucide-react';
import { BrandBible } from '../types';
import { printBrandBible } from '../utils/pdfExport';

export type AppWorkspaceTab = 'brand' | 'image-to-pdf' | 'text-to-pdf';

interface HeaderProps {
  currentBrand: BrandBible | null;
  savedBrands: BrandBible[];
  onSelectBrand: (brand: BrandBible) => void;
  onNewBrandClick: () => void;
  isChatOpen: boolean;
  onToggleChat: () => void;
  unreadChatCount?: number;
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
  activeAppTab: AppWorkspaceTab;
  onTabChange: (tab: AppWorkspaceTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBrand,
  savedBrands,
  onSelectBrand,
  onNewBrandClick,
  isChatOpen,
  onToggleChat,
  unreadChatCount = 0,
  onExportPdf,
  isExportingPdf = false,
  activeAppTab,
  onTabChange,
}) => {
  const [copiedTokens, setCopiedTokens] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handlePrint = () => {
    if (currentBrand) {
      printBrandBible(currentBrand.brandName);
    } else {
      window.print();
    }
  };

  const handleCopyTokens = () => {
    if (!currentBrand) return;
    const tokens = {
      name: currentBrand.brandName,
      tagline: currentBrand.tagline,
      colors: currentBrand.palette.map((c) => ({ name: c.name, hex: c.hex, role: c.role })),
      typography: {
        header: currentBrand.typography.headerFont.googleFontFamily,
        body: currentBrand.typography.bodyFont.googleFontFamily,
      },
      archetype: currentBrand.archetype,
    };
    navigator.clipboard.writeText(JSON.stringify(tokens, null, 2));
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  const handleCopyMarkdown = () => {
    if (!currentBrand) return;
    const md = `# Brand Bible: ${currentBrand.brandName}
**Tagline**: ${currentBrand.tagline}
**Archetype**: ${currentBrand.archetype}

## Mission & Elevator Pitch
${currentBrand.mission}

*Pitch*: ${currentBrand.elevatorPitch}

## Color Palette
${currentBrand.palette.map((c) => `- **${c.name}** (\`${c.hex}\`): ${c.roleLabel} — ${c.usageNotes}`).join('\n')}

## Typography
- **Header Font**: ${currentBrand.typography.headerFont.name} (${currentBrand.typography.headerFont.category})
- **Body Font**: ${currentBrand.typography.bodyFont.name} (${currentBrand.typography.bodyFont.category})
- **Philosophy**: ${currentBrand.typography.pairingPhilosophy}

## Brand Voice & Tone
**Traits**: ${currentBrand.voiceAndTone.traits.join(', ')}
**Dos**: ${currentBrand.voiceAndTone.dos.join('; ')}
**Don'ts**: ${currentBrand.voiceAndTone.donts.join('; ')}
`;
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            id="brand-logo-badge"
            className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
            onClick={() => onTabChange('brand')}
          >
            <Palette className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight cursor-pointer" onClick={() => onTabChange('brand')}>
                DocuSync
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 rounded-full border border-amber-200">
                Studio Suite
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate hidden xl:block">
              Brand identity, Image-to-PDF scanner, &amp; Text-to-PDF publishing
            </p>
          </div>
        </div>

        {/* Workspace Mode Switcher Tabs */}
        <nav id="nav-workspace-tabs" className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
          <button
            id="tab-btn-image-to-pdf"
            onClick={() => onTabChange('image-to-pdf')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeAppTab === 'image-to-pdf'
                ? 'bg-white text-blue-900 shadow-xs border border-blue-200/80 ring-1 ring-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileImage className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">इमेज से PDF</span>
            <span className="sm:hidden">इमेज</span>
          </button>

          <button
            id="tab-btn-text-to-pdf"
            onClick={() => onTabChange('text-to-pdf')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeAppTab === 'text-to-pdf'
                ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200/80 ring-1 ring-emerald-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">टेक्स्ट से PDF</span>
            <span className="sm:hidden">टेक्स्ट</span>
          </button>

          <button
            id="tab-btn-brand-bible"
            onClick={() => onTabChange('brand')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeAppTab === 'brand'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60 ring-1 ring-amber-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">ब्रांड गाइड</span>
            <span className="sm:hidden">ब्रांड</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {activeAppTab === 'brand' && (
            <>
              {/* History / Switcher Dropdown */}
              <div className="relative">
                <button
                  id="btn-saved-brands"
                  onClick={() => setHistoryOpen(!historyOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80"
                  title="View brand history & presets"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Brands</span>
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold inline-flex items-center justify-center">
                    {savedBrands.length}
                  </span>
                </button>

                {historyOpen && (
                  <div
                    id="saved-brands-menu"
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2.5 py-1">
                      Active & Saved Brands
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {savedBrands.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            onSelectBrand(b);
                            setHistoryOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            currentBrand?.id === b.id
                              ? 'bg-amber-50 text-amber-950 font-semibold border border-amber-200'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="truncate pr-2">
                            <div className="truncate">{b.brandName}</div>
                            <div className="text-[10px] text-slate-500 truncate">{b.tagline}</div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            {b.palette.slice(0, 3).map((col, idx) => (
                              <span
                                key={idx}
                                className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs"
                                style={{ backgroundColor: col.hex }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* New Generation Button */}
              <button
                id="btn-new-brand"
                onClick={onNewBrandClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 shadow-2xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Generate New</span>
              </button>

              {/* Export PDF & Print Actions */}
              {currentBrand && (
                <>
                  <button
                    id="btn-export-pdf"
                    onClick={onExportPdf}
                    disabled={isExportingPdf}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 disabled:opacity-60 rounded-lg border border-amber-300 shadow-2xs transition-colors cursor-pointer"
                    title="Export currently viewed Brand Bible as a formatted PDF file"
                  >
                    {isExportingPdf ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                        <span>Exporting...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline">Export PDF</span>
                        <span className="sm:hidden">PDF</span>
                      </>
                    )}
                  </button>

                  <button
                    id="btn-print-bible"
                    onClick={handlePrint}
                    className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    title="Print Brand Bible using browser print dialog (Save as PDF)"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print</span>
                  </button>

                  <button
                    id="btn-copy-tokens"
                    onClick={handleCopyTokens}
                    className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    title="Copy Design Tokens JSON"
                  >
                    {copiedTokens ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Download className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>{copiedTokens ? 'Copied Tokens' : 'Tokens'}</span>
                  </button>

                  <button
                    id="btn-copy-markdown"
                    onClick={handleCopyMarkdown}
                    className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    title="Copy Brand Guide as Markdown"
                  >
                    {copiedMd ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>{copiedMd ? 'Copied Guide' : 'Guide'}</span>
                  </button>
                </>
              )}

              {/* Creative Director Gemini Chat Drawer Button */}
              <button
                id="btn-toggle-chat"
                onClick={onToggleChat}
                className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-all ${
                  isChatOpen
                    ? 'bg-slate-900 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                }`}
                title="Chat with Senior Brand Strategist & Creative Director"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Brand Consultant</span>
                <span className="sm:hidden">Chat</span>
                {unreadChatCount > 0 && !isChatOpen && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadChatCount}
                  </span>
                )}
              </button>
            </>
          )}

          {activeAppTab !== 'brand' && (
            <button
              onClick={() => onTabChange('brand')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-amber-600" />
              <span>Back to Brand Studio</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
