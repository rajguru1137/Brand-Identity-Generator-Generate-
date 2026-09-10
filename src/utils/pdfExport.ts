// @ts-ignore
import html2pdf from 'html2pdf.js';
import { BrandBible } from '../types';

export interface ExportPdfOptions {
  fileName?: string;
  onStart?: () => void;
  onSuccess?: (fileName: string) => void;
  onError?: (error: any) => void;
}

/**
 * Exports the currently viewed Brand Bible as a formatted, high-DPI PDF file.
 * Strictly respects and activates existing print CSS styles: white background,
 * high-contrast typography, section-level page break prevention,
 * full color preservation, and removal of interactive buttons/tabs.
 */
export async function exportBrandBibleToPdf(
  brand: BrandBible,
  options?: ExportPdfOptions
): Promise<void> {
  const targetElement = document.getElementById('brand-bible-dashboard');
  if (!targetElement) {
    throw new Error('Brand Bible content could not be located in document.');
  }

  options?.onStart?.();

  const formattedBrandSlug = brand.brandName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const fileName = options?.fileName || `${formattedBrandSlug}-brand-bible.pdf`;

  // Ensure all web fonts are decoded and ready
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // non-blocking
    }
  }

  // Activate print styling on live DOM
  document.body.classList.add('exporting-pdf');

  // Let browser reflow print styles
  await new Promise((resolve) => setTimeout(resolve, 200));

  const opt = {
    margin: [10, 8, 10, 8] as [number, number, number, number], // mm (A4 margins)
    filename: fileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2, // High resolution
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4' as const,
      orientation: 'portrait' as const,
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['section', '[data-bible-section]'],
    },
  };

  try {
    await html2pdf().set(opt).from(targetElement).save();
    options?.onSuccess?.(fileName);
  } catch (err) {
    console.error('PDF export failure:', err);
    options?.onError?.(err);
    throw err;
  } finally {
    document.body.classList.remove('exporting-pdf');
  }
}

/**
 * Triggers the browser's native Print dialog formatted for Save as PDF,
 * ensuring all sections are revealed, interactive chrome is hidden,
 * and background graphics are forcefully included.
 */
export function printBrandBible(brandName: string): void {
  const originalTitle = document.title;
  document.title = `${brandName} - Brand Bible`;

  try {
    window.print();
  } finally {
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }
}
