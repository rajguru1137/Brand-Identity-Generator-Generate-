import React, { useState, useEffect } from 'react';
import { Header, AppWorkspaceTab } from './components/Header';
import { MissionInputForm } from './components/MissionInputForm';
import { BrandBibleDashboard } from './components/BrandBibleDashboard';
import { CreativeDirectorChat } from './components/CreativeDirectorChat';
import { ImageToPdfTool } from './components/ImageToPdfTool';
import { TextToPdfTool } from './components/TextToPdfTool';
import { MainFeatureHub } from './components/MainFeatureHub';
import { PlayStoreAutomationModal } from './components/PlayStoreAutomationModal';
import { SAMPLE_BRAND_BIBLES } from './data/presets';
import { BrandBible, ImageResolution } from './types';
import { Sparkles, AlertCircle, ArrowUp, CheckCircle2, Loader2 } from 'lucide-react';
import { exportBrandBibleToPdf, printBrandBible } from './utils/pdfExport';

export default function App() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<AppWorkspaceTab>('brand');
  const [savedBrands, setSavedBrands] = useState<BrandBible[]>(() => {
    try {
      const stored = localStorage.getItem('brand_bibles_vault');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read saved brands:', e);
    }
    return SAMPLE_BRAND_BIBLES;
  });

  const [currentBrand, setCurrentBrand] = useState<BrandBible>(() => {
    return savedBrands[0] || SAMPLE_BRAND_BIBLES[0];
  });

  const [showGeneratorForm, setShowGeneratorForm] = useState(false);
  const [isGeneratingBrand, setIsGeneratingBrand] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPlayStoreModalOpen, setIsPlayStoreModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brand_bibles_vault', JSON.stringify(savedBrands));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [savedBrands]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const handleGenerateBrand = async (data: {
    mission: string;
    companyName?: string;
    industry?: string;
    stylePreference?: string;
    imageResolution?: ImageResolution;
  }) => {
    setIsGeneratingBrand(true);
    try {
      const response = await fetch('/api/generate-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const newBrand: BrandBible = await response.json();

      // If user selected an image resolution, optionally kick off image generation
      if (data.imageResolution && newBrand.primaryLogo?.promptForAiImage) {
        // We'll let the user render it or do it on demand
      }

      setSavedBrands((prev) => [newBrand, ...prev]);
      setCurrentBrand(newBrand);
      setShowGeneratorForm(false);
      showToast(`Brand Bible for "${newBrand.brandName}" created successfully!`);
    } catch (error: any) {
      console.error('Generation failed:', error);
      showToast(error?.message || 'Failed to generate Brand Bible. Please try again.', 'error');
    } finally {
      setIsGeneratingBrand(false);
    }
  };

  const handleGenerateAiImage = async (
    prompt: string,
    resolution: ImageResolution = '2K'
  ): Promise<string | null> => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize: resolution,
          aspectRatio: '1:1',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to generate image (${response.status})`);
      }

      const result = await response.json();
      if (result.imageUrl) {
        // Update current brand with generated image
        const updated = {
          ...currentBrand,
          primaryLogo: {
            ...currentBrand.primaryLogo,
            aiImageUrl: result.imageUrl,
            aiImageResolution: result.imageSize,
          },
        };
        setCurrentBrand(updated);
        setSavedBrands((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
        showToast(`Rendered ${result.imageSize || resolution} high-res brand artwork!`);
        return result.imageUrl;
      }
      return null;
    } catch (error: any) {
      console.error('Image generation failed:', error);
      showToast(error?.message || 'Could not render high-res image.', 'error');
      return null;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleExportPdf = async () => {
    if (!currentBrand) return;
    try {
      await exportBrandBibleToPdf(currentBrand, {
        onStart: () => setIsExportingPdf(true),
        onSuccess: (fileName) => {
          setIsExportingPdf(false);
          showToast(`Exported "${fileName}" successfully!`);
        },
        onError: (err) => {
          setIsExportingPdf(false);
          showToast(`PDF export encountered an issue. Triggering print dialog...`, 'error');
          printBrandBible(currentBrand.brandName);
        },
      });
    } catch (error: any) {
      setIsExportingPdf(false);
      showToast(error?.message || 'Could not complete PDF export.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Toast Notification Banner */}
      {notification && (
        <div
          id="toast-notification"
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom duration-200 ${
            notification.type === 'success'
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-rose-900 text-white border-rose-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* PDF Exporting Progress Modal Overlay */}
      {isExportingPdf && (
        <div
          id="pdf-export-loading-overlay"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Formatting Brand Bible PDF</h3>
              <p className="text-xs text-slate-500 mt-1">
                Applying publication print styles, high-DPI vector rendering, and page-break layout...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentBrand={currentBrand}
        savedBrands={savedBrands}
        onSelectBrand={(brand) => {
          setCurrentBrand(brand);
          setShowGeneratorForm(false);
          setActiveWorkspaceTab('brand');
        }}
        onNewBrandClick={() => {
          setShowGeneratorForm(true);
          setActiveWorkspaceTab('brand');
        }}
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onExportPdf={handleExportPdf}
        isExportingPdf={isExportingPdf}
        activeAppTab={activeWorkspaceTab}
        onTabChange={(tab) => {
          setActiveWorkspaceTab(tab);
          if (tab === 'brand') {
            setShowGeneratorForm(false);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Prominent Front & Center Feature Launcher */}
        <MainFeatureHub
          activeTab={activeWorkspaceTab}
          onTabChange={(tab) => {
            setActiveWorkspaceTab(tab);
            if (tab === 'brand') {
              setShowGeneratorForm(false);
            }
          }}
          brandName={currentBrand?.brandName}
          onOpenPlayStoreModal={() => setIsPlayStoreModalOpen(true)}
        />

        {activeWorkspaceTab === 'image-to-pdf' && (
          <ImageToPdfTool onShowToast={showToast} />
        )}

        {activeWorkspaceTab === 'text-to-pdf' && (
          <TextToPdfTool onShowToast={showToast} />
        )}

        {activeWorkspaceTab === 'brand' && (
          <>
            {/* Creator Form (Visible when toggled or if no brand yet) */}
            {showGeneratorForm && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <MissionInputForm
                  onGenerate={handleGenerateBrand}
                  isLoading={isGeneratingBrand}
                  onSelectSample={(idx) => {
                    const sample = SAMPLE_BRAND_BIBLES[idx];
                    if (sample) {
                      setCurrentBrand(sample);
                      setShowGeneratorForm(false);
                    }
                  }}
                />
              </div>
            )}

            {/* Brand Bible Dashboard View */}
            {currentBrand && !showGeneratorForm && (
              <BrandBibleDashboard
                brand={currentBrand}
                onGenerateAiImage={handleGenerateAiImage}
                isGeneratingImage={isGeneratingImage}
                onExportPdf={handleExportPdf}
                isExportingPdf={isExportingPdf}
                onNewBrandClick={() => setShowGeneratorForm(true)}
                onNavigateToTool={setActiveWorkspaceTab}
              />
            )}
          </>
        )}
      </main>

      {/* Gemini Multi-Turn Brand Identity Consultant Chat Drawer */}
      <CreativeDirectorChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        brandContext={currentBrand}
      />

      {/* Play Store Automated Publishing Modal */}
      <PlayStoreAutomationModal
        isOpen={isPlayStoreModalOpen}
        onClose={() => setIsPlayStoreModalOpen(false)}
      />

      {/* Print-only and PDF-export CSS style rules */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 10mm 12mm 10mm;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, aside, button, input[type="range"], #toast-notification, #pdf-export-loading-overlay, .no-print, .print\\:hidden {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          main {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #brand-bible-dashboard {
            box-shadow: none !important;
            padding: 0 !important;
            display: block !important;
          }
          #pdf-header-cover, #pdf-footer-stamp {
            display: flex !important;
          }
          [data-bible-section] {
            display: block !important;
          }
          section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            border: 1px solid #cbd5e1 !important;
            margin-bottom: 24px !important;
            box-shadow: none !important;
            border-radius: 12px !important;
            background-color: #ffffff !important;
          }
        }

        /* Active PDF Export formatting (mimics print rules during html2pdf rasterization) */
        body.exporting-pdf {
          background-color: #ffffff !important;
          color: #0f172a !important;
        }
        body.exporting-pdf * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body.exporting-pdf header,
        body.exporting-pdf aside,
        body.exporting-pdf button,
        body.exporting-pdf input[type="range"],
        body.exporting-pdf #toast-notification,
        body.exporting-pdf #pdf-export-loading-overlay,
        body.exporting-pdf .no-print,
        body.exporting-pdf .print\\:hidden {
          display: none !important;
        }
        body.exporting-pdf #brand-bible-dashboard {
          box-shadow: none !important;
          padding: 0 !important;
          max-width: 960px !important;
          margin: 0 auto !important;
          display: block !important;
        }
        body.exporting-pdf #pdf-header-cover,
        body.exporting-pdf #pdf-footer-stamp {
          display: flex !important;
        }
        body.exporting-pdf [data-bible-section] {
          display: block !important;
        }
        body.exporting-pdf section {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          border: 1px solid #cbd5e1 !important;
          margin-bottom: 24px !important;
          box-shadow: none !important;
          border-radius: 12px !important;
          background-color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
