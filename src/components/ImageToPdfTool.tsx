import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileImage,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Loader2,
  FileCheck,
  Maximize2,
  Layers,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { convertImagesToPdf } from '../utils/documentPdfExport';

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
  width?: number;
  height?: number;
}

// Built-in sample images in vector SVG format (100% reliable, zero network dependency)
const SAMPLE_SCAN_1 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="#ffffff">
  <rect width="800" height="1100" fill="#f8fafc" rx="8"/>
  <rect x="40" y="40" width="720" height="1020" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" rx="4"/>
  <circle cx="90" cy="90" r="28" fill="#1e3a8a"/>
  <text x="90" y="96" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">DS</text>
  <text x="135" y="86" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#0f172a">DocuSync Enterprise Scan</text>
  <text x="135" y="104" font-family="system-ui, sans-serif" font-size="12" fill="#64748b">Verified Document Audit &amp; Optical Archive</text>
  
  <line x1="40" y1="140" x2="760" y2="140" stroke="#0f172a" stroke-width="2"/>
  
  <rect x="80" y="180" width="200" height="16" fill="#e2e8f0" rx="4"/>
  <rect x="80" y="210" width="640" height="8" fill="#cbd5e1" rx="4"/>
  <rect x="80" y="230" width="600" height="8" fill="#e2e8f0" rx="4"/>
  <rect x="80" y="250" width="560" height="8" fill="#e2e8f0" rx="4"/>

  <!-- Scanned Chart Graphic -->
  <rect x="80" y="300" width="640" height="240" fill="#f1f5f9" stroke="#cbd5e1" rx="6"/>
  <text x="105" y="335" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#1e293b">Quarterly Document Conversion Volume</text>
  <rect x="130" y="440" width="70" height="70" fill="#0284c7" rx="4"/>
  <rect x="230" y="390" width="70" height="120" fill="#1e3a8a" rx="4"/>
  <rect x="330" y="370" width="70" height="140" fill="#0284c7" rx="4"/>
  <rect x="430" y="340" width="70" height="170" fill="#f59e0b" rx="4"/>
  <rect x="530" y="320" width="70" height="190" fill="#1e3a8a" rx="4"/>

  <!-- Table simulation -->
  <rect x="80" y="580" width="640" height="34" fill="#1e293b" rx="4"/>
  <text x="100" y="602" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Document Index</text>
  <text x="360" y="602" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Classification</text>
  <text x="620" y="602" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#ffffff">Status</text>
  
  <rect x="80" y="625" width="640" height="30" fill="#f8fafc"/>
  <text x="100" y="645" font-family="system-ui, sans-serif" font-size="11" fill="#334155">DOC-2026-0988</text>
  <text x="360" y="645" font-family="system-ui, sans-serif" font-size="11" fill="#334155">Financial Statement</text>
  <text x="620" y="645" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#059669">Verified OK</text>

  <rect x="80" y="665" width="640" height="30" fill="#ffffff"/>
  <text x="100" y="685" font-family="system-ui, sans-serif" font-size="11" fill="#334155">DOC-2026-0989</text>
  <text x="360" y="685" font-family="system-ui, sans-serif" font-size="11" fill="#334155">Identity Affidavit</text>
  <text x="620" y="685" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#059669">Verified OK</text>

  <!-- Stamp -->
  <rect x="520" y="800" width="180" height="70" fill="none" stroke="#dc2626" stroke-width="3" rx="8" transform="rotate(-6 610 835)"/>
  <text x="610" y="835" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#dc2626" text-anchor="middle" transform="rotate(-6 610 835)">CONFIDENTIAL</text>
  <text x="610" y="855" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle" transform="rotate(-6 610 835)">OFFICIALLY ARCHIVED</text>
  
  <text x="400" y="1030" font-family="monospace" font-size="11" fill="#94a3b8" text-anchor="middle">DocuSync Secure Scan • Page 1 of 1 • System Generated</text>
</svg>
`)}`;

const SAMPLE_SCAN_2 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="#ffffff">
  <rect width="800" height="1100" fill="#f8fafc" rx="8"/>
  <rect x="40" y="40" width="720" height="1020" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" rx="4"/>
  <text x="80" y="90" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#0f172a">CERTIFICATE OF COMPLETION</text>
  <text x="80" y="112" font-family="system-ui, sans-serif" font-size="12" fill="#64748b">Issued by DocuSync Digital Workflow Academy</text>
  <line x1="40" y1="130" x2="760" y2="130" stroke="#f59e0b" stroke-width="3"/>

  <circle cx="400" cy="300" r="80" fill="#eff6ff" stroke="#1e3a8a" stroke-width="4"/>
  <polygon points="400,240 418,280 460,285 430,315 438,360 400,335 362,360 370,315 340,285 382,280" fill="#f59e0b"/>

  <text x="400" y="430" font-family="system-ui, sans-serif" font-size="18" fill="#334155" text-anchor="middle">This document certifies that the scanned image was</text>
  <text x="400" y="465" font-family="system-ui, sans-serif" font-size="26" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Converted to High-Definition PDF</text>
  <text x="400" y="500" font-family="system-ui, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">With 100% Vector Preservation &amp; Color Precision</text>

  <rect x="140" y="560" width="520" height="140" fill="#f8fafc" stroke="#cbd5e1" rx="8"/>
  <text x="170" y="600" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Conversion Verification Checksum:</text>
  <text x="170" y="630" font-family="monospace" font-size="12" fill="#0284c7">SHA-256: 8f491c1b359f48529e74d82f7166bc620b784</text>
  <text x="170" y="660" font-family="monospace" font-size="12" fill="#059669">Format: ISO 32000-1 (PDF/A-1b Standard)</text>

  <line x1="160" y1="840" x2="360" y2="840" stroke="#334155" stroke-width="1.5"/>
  <text x="260" y="860" font-family="system-ui, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Digital Officer Signature</text>

  <line x1="440" y1="840" x2="640" y2="840" stroke="#334155" stroke-width="1.5"/>
  <text x="540" y="860" font-family="system-ui, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Date of Verification</text>

  <text x="400" y="1030" font-family="monospace" font-size="11" fill="#94a3b8" text-anchor="middle">DocuSync Paperless Workflow • Certified Page 2 of 2</text>
</svg>
`)}`;

interface ImageToPdfToolProps {
  onShowToast: (message: string, type?: 'success' | 'error') => void;
}

export const ImageToPdfTool: React.FC<ImageToPdfToolProps> = ({ onShowToast }) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Conversion Options
  const [fileName, setFileName] = useState('docusync-converted-images.pdf');
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [margin, setMargin] = useState<number>(8);
  const [imageFit, setImageFit] = useState<'contain' | 'cover' | 'fill'>('contain');
  const [includeHeader, setIncludeHeader] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('DocuSync Digital Document');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newImages: UploadedImage[] = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'];

    Array.from(fileList).forEach((file) => {
      if (!validTypes.includes(file.type) && !file.type.startsWith('image/')) {
        onShowToast(`File "${file.name}" is not a recognized image.`, 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
              url,
              name: file.name,
              size: file.size,
              width: img.width,
              height: img.height,
            },
          ]);
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    });

    onShowToast(`Added ${fileList.length} image(s) to queue!`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const loadSampleImages = () => {
    setImages([
      {
        id: 'sample-scan-1',
        url: SAMPLE_SCAN_1,
        name: 'docusync-audit-scan.svg',
        size: 34500,
        width: 800,
        height: 1100,
      },
      {
        id: 'sample-scan-2',
        url: SAMPLE_SCAN_2,
        name: 'completion-certificate.svg',
        size: 28400,
        width: 800,
        height: 1100,
      },
    ]);
    onShowToast('Loaded 2 high-definition sample scan pages for quick testing!');
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setImages(updated);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      onShowToast('Please upload or load at least one image to convert.', 'error');
      return;
    }

    try {
      setIsConverting(true);
      const generatedName = await convertImagesToPdf(images, {
        fileName,
        pageSize,
        orientation,
        margin,
        imageFit,
        includeHeader,
        headerTitle,
      });
      onShowToast(`Successfully generated and downloaded "${generatedName}"!`);
    } catch (err: any) {
      console.error('Image to PDF error:', err);
      onShowToast(err?.message || 'Failed to convert images to PDF.', 'error');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div id="image-to-pdf-workspace" className="space-y-6 animate-in fade-in duration-300">
      {/* 3-Step Friendly Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-xs">
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
          <div>
            <p className="font-bold text-slate-900">फोटो जोड़ें</p>
            <p className="text-[11px] text-slate-500">गैलरी से चुनें या ड्रैग करें</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
          <div>
            <p className="font-bold text-slate-900">क्रम व साइज सेट करें</p>
            <p className="text-[11px] text-slate-500">A4/Letter व ओरिएंटेशन</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-blue-100/80 shadow-2xs">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
          <div>
            <p className="font-bold text-emerald-950">PDF डाउनलोड करें</p>
            <p className="text-[11px] text-emerald-700">1-क्लिक में तुरंत तैयार</p>
          </div>
        </div>
      </div>

      {/* Tool Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
              <FileImage className="w-3.5 h-3.5 text-blue-700" />
              <span>DocuSync Image to PDF</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              इमेज से पीडीएफ बनाएं (Image to PDF Converter)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              फोटो, स्कैन किए गए बिल, रसीदें या डॉक्युमेंट्स जोड़ें और एक संपूर्ण मल्टी-पेज पीडीएफ फाइल में बदलें।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              id="btn-load-sample-images"
              onClick={loadSampleImages}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>⭐ सैंपल इमेज टेस्ट करें (Instant Test)</span>
            </button>
            {images.length > 0 && (
              <button
                id="btn-clear-images"
                onClick={() => setImages([])}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>सब हटाएं (Clear All)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Upload & Queue */}
        <div className="lg:col-span-7 space-y-5">
          {/* Drag & Drop Upload Zone */}
          <div
            id="dropzone-image-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragOver
                ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
                : 'border-slate-300 hover:border-blue-400 bg-white hover:bg-slate-50/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-700 mb-3 shadow-2xs">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              फोटो यहाँ छोड़ें या <span className="text-blue-700 underline underline-offset-2">गैलरी / कंप्यूटर से फ़ाइल चुनें</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              PNG, JPG, JPEG, WEBP, SVG सपोर्टेड • एक साथ कई फोटो चुनकर 1 ही पीडीएफ में जोड़ सकते हैं
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs">
                📁 फोटो चुनें (Browse Files)
              </span>
            </div>
          </div>

          {/* Uploaded Images List */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                <h4 className="text-sm font-bold text-slate-900">
                  पेज लिस्ट (PDF Page Queue): {images.length} {images.length === 1 ? 'Page' : 'Pages'}
                </h4>
              </div>
              {images.length > 0 && (
                <button
                  id="btn-quick-convert-left"
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {isConverting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>तुरंत PDF डाउनलोड करें</span>
                </button>
              )}
            </div>

            {images.length === 0 ? (
              <div className="text-center py-10 px-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <FileImage className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">अभी तक कोई फोटो नहीं जोड़ी गई</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  ऊपर क्लिक करके फोटो जोड़ें या ऊपर दिया गया <strong>"⭐ सैंपल इमेज टेस्ट करें"</strong> बटन दबाएं
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{img.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {(img.size / 1024).toFixed(1)} KB {img.width ? `• ${img.width}×${img.height}px` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveImage(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveImage(idx, 'down')}
                        disabled={idx === images.length - 1}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeImage(img.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: PDF Settings & Conversion Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-slate-500" />
              <span>Page Layout &amp; PDF Settings</span>
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
                className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="document.pdf"
              />
            </div>

            {/* Page Size & Orientation */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Format
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as 'a4' | 'letter')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="a4">A4 (210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            {/* Image Fit & Margins */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image Fit
                </label>
                <select
                  value={imageFit}
                  onChange={(e) => setImageFit(e.target.value as 'contain' | 'cover' | 'fill')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="contain">Fit Page (Contain)</option>
                  <option value="cover">Fill Page (Cover)</option>
                  <option value="fill">Stretch to Frame</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Margins
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>Zero Margin (Full Bleed)</option>
                  <option value={5}>Compact (5 mm)</option>
                  <option value={8}>Standard (8 mm)</option>
                  <option value={15}>Wide (15 mm)</option>
                </select>
              </div>
            </div>

            {/* Header / Stamp Settings */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHeader}
                  onChange={(e) => setIncludeHeader(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Include Document Header &amp; Page Number
                </span>
              </label>

              {includeHeader && (
                <input
                  type="text"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Header Title"
                />
              )}
            </div>

            {/* Convert Button */}
            <div className="pt-2">
              <button
                id="btn-convert-images-to-pdf"
                onClick={handleConvert}
                disabled={isConverting || images.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>PDF तैयार हो रही है... (Compiling PDF)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>📥 पीडीएफ डाउनलोड करें ({images.length} Pages)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>सुरक्षित • कोई डेटा सर्वर पर नहीं जाता • सीधे आपके डिवाइस में तैयार</span>
              </div>
            </div>
          </div>

          {/* Quick Info / Tips Card */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4 text-xs text-blue-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-blue-700" />
              <span>Conversion Tips</span>
            </div>
            <p className="text-[11px] text-blue-800/80 leading-relaxed">
              Use "Fit Page" to preserve the full document aspect ratio without clipping. You can drag and rearrange the sequence before hitting download.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
