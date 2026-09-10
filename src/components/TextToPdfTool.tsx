import React, { useState } from 'react';
import {
  FileText,
  ClipboardPaste,
  Download,
  Loader2,
  Sparkles,
  Trash2,
  AlignLeft,
  Type,
  BookOpen,
  Calendar,
  CheckCircle2,
  Info
} from 'lucide-react';
import { convertTextToPdf } from '../utils/documentPdfExport';

interface TextToPdfToolProps {
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

const SAMPLE_DOCUMENT_TEXT = `Executive Summary & Strategic Overview

The rapid transition to decentralized, remote-first operations has accelerated demand for frictionless document capture, secure multi-format conversion, and automated cloud synchronization. Organizations lose an estimated 21.3% of team productivity to document mismanagement, fragmented scanner apps, and insecure conversion tools.

Key Strategic Objectives:
- Eliminate manual document filing bottlenecks across distributed teams.
- Ensure strict compliance with global document archiving standards (PDF/A).
- Provide unified image-to-PDF and copied-text-to-PDF conversion pipelines.
- Maintain military-grade client-side encryption and privacy by design.

Methodology & Architecture
Modern document intelligence relies on optical fidelity, precise typography rendering, and vector preservation. Rather than routing sensitive paperwork through external third-party servers, client-side rendering engines format and compile high-resolution PDF assets directly on the user's device.

Implementation Deliverables:
1. High-DPI rasterization with automated page breaking.
2. Standardized typography pairing with custom line height and margin controls.
3. Universal compatibility across all modern web browsers and mobile tablets.

Conclusion
By unifying image scanning and copied text conversion under a single cohesive brand architecture, DocuSync provides end-to-end reliability for enterprise professionals, students, and institutions alike.`;

export const TextToPdfTool: React.FC<TextToPdfToolProps> = ({ onShowToast }) => {
  const [title, setTitle] = useState('Executive Summary & Strategic Overview');
  const [content, setContent] = useState(SAMPLE_DOCUMENT_TEXT);
  const [isGenerating, setIsGenerating] = useState(false);

  // Formatting options
  const [fileName, setFileName] = useState('docusync-document.pdf');
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [lineSpacing, setLineSpacing] = useState<'compact' | 'normal' | 'relaxed'>('normal');
  const [margin, setMargin] = useState<number>(15);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeFooter, setIncludeFooter] = useState(true);
  const [includeDate, setIncludeDate] = useState(true);

  // Text metrics
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const paragraphCount = content.trim() ? content.trim().split(/\n\s*\n/).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setContent(text);
        // Try extracting first line as title if short
        const firstLine = text.trim().split('\n')[0];
        if (firstLine && firstLine.length < 60) {
          setTitle(firstLine.replace(/^[#*\-_\s]+/, ''));
        }
        onShowToast('Successfully pasted text from clipboard!');
      } else {
        onShowToast('Clipboard is empty or does not contain plain text.', 'error');
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
      onShowToast('Please press Ctrl+V or Cmd+V to paste your text into the editor.', 'error');
    }
  };

  const handleLoadSample = () => {
    setTitle('Executive Summary & Strategic Overview');
    setContent(SAMPLE_DOCUMENT_TEXT);
    onShowToast('Loaded sample formatted document text!');
  };

  const handleGeneratePdf = async () => {
    if (!content.trim()) {
      onShowToast('Please enter or paste text content to generate a PDF.', 'error');
      return;
    }

    try {
      setIsGenerating(true);
      const generatedName = await convertTextToPdf(title, content, {
        fileName,
        pageSize,
        fontFamily,
        fontSize,
        lineSpacing,
        margin,
        includeHeader,
        includeFooter,
        includeDate,
      });
      onShowToast(`Successfully generated and downloaded "${generatedName}"!`);
    } catch (err: any) {
      console.error('Text to PDF generation error:', err);
      onShowToast(err?.message || 'Failed to generate PDF document.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="text-to-pdf-workspace" className="space-y-6 animate-in fade-in duration-300">
      {/* 3-Step Friendly Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-xs">
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-emerald-100/80 shadow-2xs">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
          <div>
            <p className="font-bold text-slate-900">टेक्स्ट पेस्ट करें</p>
            <p className="text-[11px] text-slate-500">क्लिपबोर्ड या टाइप करके</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-emerald-100/80 shadow-2xs">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
          <div>
            <p className="font-bold text-slate-900">शीर्षक व फॉन्ट चुनें</p>
            <p className="text-[11px] text-slate-500">A4/Letter व स्टाइल</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-emerald-100/80 shadow-2xs">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
          <div>
            <p className="font-bold text-blue-950">PDF डाउनलोड करें</p>
            <p className="text-[11px] text-blue-700">1-क्लिक में साफ सुथरा PDF</p>
          </div>
        </div>
      </div>

      {/* Tool Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>DocuSync Text to PDF</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              टेक्स्ट से पीडीएफ बनाएं (Text to PDF Generator)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              कॉपी किया हुआ टेक्स्ट, नोट्स, कहानी या लेख पेस्ट करें और 1-क्लिक में प्रिंट-रेडी पीडीएफ डाउनलोड करें।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              id="btn-paste-clipboard"
              onClick={handlePasteFromClipboard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-xs cursor-pointer"
              title="Paste text from clipboard"
            >
              <ClipboardPaste className="w-4 h-4 text-emerald-200" />
              <span>📋 क्लिपबोर्ड से पेस्ट करें (Paste)</span>
            </button>
            <button
              id="btn-load-sample-text"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>⭐ सैंपल टेक्स्ट लोड करें (Sample)</span>
            </button>
            {content && (
              <button
                id="btn-clear-text"
                onClick={() => {
                  setContent('');
                  setTitle('');
                }}
                className="p-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                title="Clear Text"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Text Input & Live Editor */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                दस्तावेज़ का शीर्षक (Document Title)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="शीर्षक लिखें (उदा. ज़रूरी नोट्स, मीटिंग विवरण, सारांश)"
                className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Content Textarea with Quick Paste Helper */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  कॉपी किया टेक्स्ट यहाँ पेस्ट करें (Paste or Type Content)
                </label>
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>क्लिक करके पेस्ट करें</span>
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                placeholder="यहाँ अपना कॉपी किया हुआ टेक्स्ट पेस्ट करें या टाइप करें... बुलेट पॉइंट्स के लिए - या * का उपयोग कर सकते हैं।"
                className="w-full p-4 text-xs sm:text-sm font-sans text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed resize-y"
              />
            </div>

            {/* Metrics Bar & Quick Download Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono">
                <span>{charCount} अक्षर (Characters)</span>
                <span>•</span>
                <span>{wordCount} शब्द (Words)</span>
                <span>•</span>
                <span>अनुमानित ~{Math.max(1, Math.ceil(wordCount / 400))} पेज</span>
              </div>

              {content.trim() && (
                <button
                  type="button"
                  id="btn-quick-generate-text-left"
                  onClick={handleGeneratePdf}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>तुरंत PDF डाउनलोड करें</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: PDF Layout Settings & Download */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-500" />
              <span>Typography &amp; Layout Options</span>
            </h3>

            {/* Output File Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Output File Name
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="notes.pdf"
              />
            </div>

            {/* Font Family & Size */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value as 'sans' | 'serif' | 'mono')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sans">Modern Sans-Serif</option>
                  <option value="serif">Classic Editorial Serif</option>
                  <option value="mono">Technical Monospace</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Font Size
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value as 'sm' | 'base' | 'lg')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sm">Small (12px)</option>
                  <option value="base">Standard (14px)</option>
                  <option value="lg">Large (16px)</option>
                </select>
              </div>
            </div>

            {/* Line Spacing & Margins */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Line Spacing
                </label>
                <select
                  value={lineSpacing}
                  onChange={(e) => setLineSpacing(e.target.value as 'compact' | 'normal' | 'relaxed')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="compact">Compact (1.35)</option>
                  <option value="normal">Standard (1.6)</option>
                  <option value="relaxed">Spacious (1.85)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Margins
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={10}>Narrow (10 mm)</option>
                  <option value={15}>Standard (15 mm)</option>
                  <option value={20}>Wide (20 mm)</option>
                </select>
              </div>
            </div>

            {/* Header & Footer Toggles */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHeader}
                  onChange={(e) => setIncludeHeader(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Include Top Header with Document Title
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDate}
                  onChange={(e) => setIncludeDate(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Include Date Timestamp in Header
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFooter}
                  onChange={(e) => setIncludeFooter(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Include Footer with Document Reference
                </span>
              </label>
            </div>

            {/* Generate & Download Button */}
            <div className="pt-2">
              <button
                id="btn-generate-text-to-pdf"
                onClick={handleGeneratePdf}
                disabled={isGenerating || !content.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>PDF तैयार हो रही है... (Compiling PDF)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>📥 पीडीएफ डाउनलोड करें (Download PDF)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>सुरक्षित • प्रिंट रेडी लेआउट • तुरंत आपके डिवाइस में डाउनलोड</span>
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 text-xs text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>Formatting Tips</span>
            </div>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed">
              Lines beginning with <code className="bg-emerald-100/80 px-1 rounded">-</code> or <code className="bg-emerald-100/80 px-1 rounded">*</code> are rendered as bulleted lists. Double line breaks create standard paragraph separations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
