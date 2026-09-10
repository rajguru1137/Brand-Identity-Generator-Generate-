// @ts-ignore
import html2pdf from 'html2pdf.js';

export interface ImageToPdfOptions {
  fileName?: string;
  pageSize?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  margin?: number; // in mm
  imageFit?: 'contain' | 'cover' | 'fill';
  includeHeader?: boolean;
  headerTitle?: string;
}

export interface TextToPdfOptions {
  fileName?: string;
  pageSize?: 'a4' | 'letter';
  fontSize?: 'sm' | 'base' | 'lg';
  fontFamily?: 'sans' | 'serif' | 'mono';
  lineSpacing?: 'compact' | 'normal' | 'relaxed';
  margin?: number; // in mm
  includeHeader?: boolean;
  includeFooter?: boolean;
  includeDate?: boolean;
}

/**
 * Converts an array of image data URLs into a single multi-page PDF
 */
export async function convertImagesToPdf(
  images: { id: string; url: string; name: string }[],
  options: ImageToPdfOptions = {}
): Promise<string> {
  if (!images.length) {
    throw new Error('No images provided for PDF conversion.');
  }

  const {
    fileName = 'converted-images.pdf',
    pageSize = 'a4',
    orientation = 'portrait',
    margin = 8,
    imageFit = 'contain',
    includeHeader = true,
    headerTitle = 'DocuSync Converted Document',
  } = options;

  // Create temporary offscreen rendering container
  const container = document.createElement('div');
  container.id = 'img2pdf-render-sandbox';
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.width = orientation === 'portrait' ? '794px' : '1123px'; // A4 standard 96dpi pixel width
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // Render each image on its own page
  images.forEach((img, index) => {
    const page = document.createElement('div');
    page.className = 'img-pdf-page';
    page.style.width = '100%';
    page.style.minHeight = orientation === 'portrait' ? '1120px' : '790px';
    page.style.boxSizing = 'border-box';
    page.style.padding = `${margin * 3.78}px`; // convert mm to px roughly (96/25.4)
    page.style.display = 'flex';
    page.style.flexDirection = 'column';
    page.style.justifyContent = 'center';
    page.style.alignItems = 'center';
    page.style.backgroundColor = '#ffffff';
    if (index > 0) {
      page.style.pageBreakBefore = 'always';
      page.style.breakBefore = 'page';
    }

    if (includeHeader) {
      const header = document.createElement('div');
      header.style.width = '100%';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.paddingBottom = '10px';
      header.style.marginBottom = '14px';
      header.style.borderBottom = '1px solid #e2e8f0';
      header.style.fontSize = '11px';
      header.style.color = '#64748b';
      header.style.fontFamily = 'monospace';
      header.innerHTML = `
        <span style="font-weight: 600; color: #1e293b;">${headerTitle || img.name}</span>
        <span>Page ${index + 1} of ${images.length}</span>
      `;
      page.appendChild(header);
    }

    const imgWrapper = document.createElement('div');
    imgWrapper.style.flex = '1';
    imgWrapper.style.width = '100%';
    imgWrapper.style.display = 'flex';
    imgWrapper.style.justifyContent = 'center';
    imgWrapper.style.alignItems = 'center';
    imgWrapper.style.overflow = 'hidden';

    const imageElement = document.createElement('img');
    imageElement.src = img.url;
    imageElement.alt = img.name;
    imageElement.style.maxWidth = '100%';
    imageElement.style.maxHeight = orientation === 'portrait' ? '980px' : '650px';
    imageElement.style.objectFit = imageFit;
    imageElement.style.borderRadius = '4px';

    imgWrapper.appendChild(imageElement);
    page.appendChild(imgWrapper);
    container.appendChild(page);
  });

  document.body.appendChild(container);

  // Wait for images to load
  await Promise.all(
    Array.from(container.querySelectorAll('img')).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  const opt = {
    margin: [0, 0, 0, 0] as [number, number, number, number],
    filename: cleanFileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm' as const,
      format: pageSize,
      orientation: orientation,
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.img-pdf-page:not(:first-child)',
    },
  };

  try {
    await html2pdf().set(opt).from(container).save();
    return cleanFileName;
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

/**
 * Converts raw copied or written text into a structured, printable PDF document
 */
export async function convertTextToPdf(
  title: string,
  content: string,
  options: TextToPdfOptions = {}
): Promise<string> {
  const {
    fileName = 'docasync-notes.pdf',
    pageSize = 'a4',
    fontSize = 'base',
    fontFamily = 'sans',
    lineSpacing = 'normal',
    margin = 15,
    includeHeader = true,
    includeFooter = true,
    includeDate = true,
  } = options;

  const fontFamilies = {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const fontSizes = {
    sm: { body: '12px', h1: '20px', line: '1.4' },
    base: { body: '14px', h1: '24px', line: '1.6' },
    lg: { body: '16px', h1: '28px', line: '1.75' },
  };

  const lineSpacings = {
    compact: '1.35',
    normal: fontSizes[fontSize].line,
    relaxed: '1.85',
  };

  const container = document.createElement('div');
  container.id = 'text2pdf-render-sandbox';
  container.style.position = 'fixed';
  container.style.top = '-99999px';
  container.style.left = '-99999px';
  container.style.width = '794px'; // standard A4 @ 96dpi
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = `${margin * 3.78}px`;
  container.style.fontFamily = fontFamilies[fontFamily];
  container.style.boxSizing = 'border-box';

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Document Header
  let headerHtml = '';
  if (includeHeader) {
    headerHtml = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 24px;">
        <div>
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #b45309;">DocuSync Document Intelligence</div>
          <h1 style="font-size: ${fontSizes[fontSize].h1}; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; line-height: 1.2;">${title || 'Untitled Document'}</h1>
        </div>
        ${includeDate ? `<div style="font-size: 11px; color: #64748b; font-family: monospace;">${dateStr}</div>` : ''}
      </div>
    `;
  }

  // Format content paragraphs
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      // check if bullet list
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const items = trimmed
          .split('\n')
          .map((line) => line.replace(/^[-*•]\s*/, '').trim())
          .filter(Boolean);
        return `
          <ul style="margin: 12px 0 16px 20px; padding: 0; list-style-type: disc; line-height: ${lineSpacings[lineSpacing]}; font-size: ${fontSizes[fontSize].body};">
            ${items.map((it) => `<li style="margin-bottom: 6px;">${it}</li>`).join('')}
          </ul>
        `;
      }
      return `<p style="margin: 0 0 14px 0; line-height: ${lineSpacings[lineSpacing]}; font-size: ${fontSizes[fontSize].body}; text-align: justify; white-space: pre-wrap;">${trimmed}</p>`;
    })
    .join('');

  // Document Footer
  let footerHtml = '';
  if (includeFooter) {
    footerHtml = `
      <div style="margin-top: 36px; padding-top: 14px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #94a3b8; font-family: monospace;">
        <span>Generated via DocuSync Text-to-PDF</span>
        <span>${title || 'Document'}</span>
      </div>
    `;
  }

  container.innerHTML = `
    ${headerHtml}
    <div style="color: #1e293b;">
      ${paragraphs || '<p style="color: #94a3b8; font-style: italic;">(No text content provided)</p>'}
    </div>
    ${footerHtml}
  `;

  document.body.appendChild(container);

  const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  const opt = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: cleanFileName,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      backgroundColor: '#ffffff',
    },
    jsPDF: {
      unit: 'mm' as const,
      format: pageSize,
      orientation: 'portrait' as const,
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['p', 'ul', 'li', 'h1', 'h2', 'h3'],
    },
  };

  try {
    await html2pdf().set(opt).from(container).save();
    return cleanFileName;
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
