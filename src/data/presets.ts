import { BrandBible } from '../types';

export const SAMPLE_BRAND_BIBLES: BrandBible[] = [
  {
    id: 'brand-file-utility-app',
    brandName: 'DocuSync',
    tagline: 'Precision Paperless Workflow',
    elevatorPitch: 'The all-in-one mobile scanner and document intelligence suite that turns physical paperwork into secure, shareable, cloud-connected digital assets instantly.',
    mission: 'Empower modern professionals, students, and businesses to capture, convert, merge, and share documents seamlessly on any device with zero friction.',
    archetype: 'The Magician & The Ruler',
    values: [
      { title: 'Crystal Clarity', description: 'Every scanned page, auto-crop, and OCR extraction is crisp, readable, and audit-ready.' },
      { title: 'Zero Friction', description: 'Convert between PDF, Word, Excel, and images in one tap without technical hurdles.' },
      { title: 'Uncompromising Privacy', description: 'On-device encryption and secure sharing ensure sensitive documents stay strictly protected.' },
    ],
    voiceAndTone: {
      traits: ['Efficient', 'Authoritative', 'Trustworthy', 'Refined'],
      dos: ['Use crisp active verbs like "Capture", "Unify", and "Accelerate"', 'Keep interfaces minimal and functional', 'Provide clear file status and security assurances'],
      donts: ['Never use frantic or spammy marketing cliches', 'Avoid cluttered visual noise', 'Do not make technical document terms intimidating'],
    },
    palette: [
      {
        name: 'Cobalt Archive',
        hex: '#1E3A8A',
        role: 'primary',
        roleLabel: 'Primary Brand Color (60%)',
        usageNotes: 'Dominant anchor for primary logos, header navigation, hero statements, and core action buttons.',
        textColor: '#F8FAFC',
        wcagWhite: 'AAA',
        wcagBlack: 'Fail',
      },
      {
        name: 'Cyan Vector',
        hex: '#0284C7',
        role: 'secondary',
        roleLabel: 'Secondary Supporting (30%)',
        usageNotes: 'Secondary buttons, interactive hover states, active tab indicators, and progress bars.',
        textColor: '#F8FAFC',
        wcagWhite: 'AA',
        wcagBlack: 'Fail',
      },
      {
        name: 'Electric Amber',
        hex: '#F59E0B',
        role: 'accent',
        roleLabel: 'Accent Highlight (10%)',
        usageNotes: 'High-visibility call-to-action badges, conversion highlights, notifications, and scan reticles.',
        textColor: '#0F172A',
        wcagWhite: 'Fail',
        wcagBlack: 'AAA',
      },
      {
        name: 'Slate Slate',
        hex: '#0F172A',
        role: 'neutral-dark',
        roleLabel: 'Neutral Dark (Text & Depth)',
        usageNotes: 'Primary typographic headlines, dark container surfaces, footers, and maximum contrast backgrounds.',
        textColor: '#F8FAFC',
        wcagWhite: 'AAA',
        wcagBlack: 'Fail',
      },
      {
        name: 'Paper Ice',
        hex: '#F8FAFC',
        role: 'neutral-light',
        roleLabel: 'Neutral Light (Background & Paper)',
        usageNotes: 'Page canvases, document cards, modal bodies, and clean negative space.',
        textColor: '#0F172A',
        wcagWhite: 'Fail',
        wcagBlack: 'AAA',
      },
    ],
    typography: {
      headerFont: {
        name: 'Syne',
        category: 'Display',
        googleFontFamily: 'Syne',
        weights: ['600', '700', '800'],
        usage: 'Hero statements, section titles, and marketing display headers with tight letter-spacing (-0.02em).',
        rationale: 'Syne delivers geometric precision with architectural weight, embodying modern digital transformation and structural integrity.',
      },
      bodyFont: {
        name: 'Plus Jakarta Sans',
        category: 'Sans-serif',
        googleFontFamily: 'Plus Jakarta Sans',
        weights: ['400', '500', '600'],
        usage: 'Paragraphs, document metadata, tooltips, buttons, and mobile UI inputs.',
        rationale: 'Engineered for exceptional micro-legibility on high-DPI smartphone screens and complex tabular file directories.',
      },
      accentFont: {
        name: 'Space Mono',
        category: 'Monospace',
        googleFontFamily: 'Space Mono',
        usage: 'File size metrics, checksum hashes, page count counters, and export specifications.',
      },
      pairingPhilosophy: 'The geometric boldness of Syne creates a tech-forward architectural stature, while Plus Jakarta Sans guarantees effortless ergonomic reading across high-density mobile file menus.',
    },
    primaryLogo: {
      title: 'The Origami Portal Mark',
      concept: 'An interwoven dynamic geometric sheet forming a camera aperture and stacked document layers, symbolizing physical paper transforming into frictionless digital light.',
      svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="22" fill="#0F172A" />
  <path d="M28 26C28 23.7909 29.7909 22 32 22H56L72 38V74C72 76.2091 70.2091 78 68 78H32C29.7909 78 28 76.2091 28 74V26Z" fill="#1E3A8A" />
  <path d="M54 22V36C54 37.1046 54.8954 38 56 38H72L54 22Z" fill="#0284C7" />
  <circle cx="50" cy="56" r="14" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 4" />
  <circle cx="50" cy="56" r="6" fill="#F8FAFC" />
</svg>`,
      promptForAiImage: 'A minimalist modern technology brand mark logo for a document scanner and PDF utility app named DocuSync. A stylized geometric folded page with an integrated luminous cyan and amber camera aperture lens, isolated on a deep slate minimalist background, vector aesthetic, 3D soft studio lighting, ultra-clean commercial brand mark.',
    },
    secondaryMarks: [
      {
        id: 'mark-monogram',
        type: 'monogram',
        title: 'DS Monogram Favicon',
        purpose: 'App Icon, browser favicon, and social media profile avatar.',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#1E3A8A" />
  <path d="M30 28H48C58.4934 28 67 36.5066 67 47C67 57.4934 58.4934 66 48 66H30V28Z" stroke="#F8FAFC" stroke-width="7" stroke-linejoin="round" />
  <path d="M42 48C42 44.6863 44.6863 42 48 42H52C55.3137 42 58 44.6863 58 48C58 51.3137 55.3137 54 52 54H48C44.6863 54 42 51.3137 42 48Z" fill="#F59E0B" />
  <circle cx="70" cy="28" r="5" fill="#0284C7" />
</svg>`,
      },
      {
        id: 'mark-wordmark',
        type: 'wordmark',
        title: 'Horizontal Header Lockup',
        purpose: 'Navigation bars, letterheads, invoice headers, and official documentation.',
        svg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="12" width="36" height="36" rx="8" fill="#1E3A8A" />
  <path d="M22 20H32C36.4183 20 40 23.5817 40 28C40 32.4183 36.4183 36 32 36H22V20Z" stroke="#0284C7" stroke-width="3" />
  <circle cx="28" cy="30" r="3" fill="#F59E0B" />
  <text x="56" y="36" font-family="'Syne', sans-serif" font-weight="800" font-size="22" fill="#0F172A" letter-spacing="-0.5">Docu<tspan fill="#0284C7">Sync</tspan></text>
  <text x="57" y="47" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="8" fill="#64748B" letter-spacing="1.5">FILE UTILITY SUITE</text>
</svg>`,
      },
      {
        id: 'mark-badge',
        type: 'badge',
        title: 'Certified Authenticity Stamp',
        purpose: 'Watermark-free export seal, security certification badges, and packaging tape.',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="44" stroke="#1E3A8A" stroke-width="3" stroke-dasharray="3 2" />
  <circle cx="50" cy="50" r="38" fill="#0F172A" />
  <polygon points="50,22 57,37 73,38 61,49 65,65 50,56 35,65 39,49 27,38 43,37" fill="#F59E0B" />
  <circle cx="50" cy="50" r="10" fill="#0F172A" />
  <path d="M46 50L49 53L55 47" stroke="#F8FAFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
      },
    ],
    mockups: {
      businessCardHeadline: 'Precision Scanning in Your Pocket',
      billboardCopy: 'Turn physical chaos into structured digital gold.',
      appScreenTitle: 'Scan, Convert & Merge in 1 Tap',
      merchTagline: 'Engineered for Flawless Documents',
    },
    clearspaceRule: 'Always maintain a minimum isolation perimeter equal to the height of the primary "D" glyph (1.5x logo element margin) around all logomarks.',
    minimumSize: 'Print: 24mm wide. Digital displays: 32px height minimum to preserve geometric aperture legibility.',
    misuseWarnings: [
      'Do not apply drop shadows or glow filters to vector marks.',
      'Do not compress or alter aspect ratios.',
      'Never place low-contrast logo variants over busy photographic backgrounds.',
      'Do not reorder the aperture focal elements outside specified lockups.',
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'brand-solaria-energy',
    brandName: 'Solaria',
    tagline: 'Infinite Clean Energy Intelligence',
    elevatorPitch: 'Next-generation solar microgrid orchestration software bridging decentralized neighborhood batteries with national renewable utility grids.',
    mission: 'Decarbonize the global electrical grid through intelligent decentralized energy forecasting and autonomous solar storage.',
    archetype: 'The Creator & The Hero',
    values: [
      { title: 'Harmonic Sustainability', description: 'Accelerating carbon drawdown with measurable daily kilowatt efficiency.' },
      { title: 'Radical Transparency', description: 'Empowering homeowners and grid operators with real-time solar yield metrics.' },
      { title: 'Resilient Design', description: 'Fail-safe microgrid infrastructure that thrives through severe climate events.' },
    ],
    voiceAndTone: {
      traits: ['Visionary', 'Optimistic', 'Technical', 'Empowering'],
      dos: ['Highlight tangible environmental impact', 'Use warm luminous imagery', 'Keep energy metrics human and relatable'],
      donts: ['Avoid alarmist apocalyptic phrasing', 'Do not bury users in incomprehensible engineering acronyms', 'Never compromise visual warmth'],
    },
    palette: [
      {
        name: 'Solar Flare Amber',
        hex: '#D97706',
        role: 'primary',
        roleLabel: 'Primary Energy Brand (60%)',
        usageNotes: 'Central brand signifier, energy production highlights, and interactive power-flow states.',
        textColor: '#F8FAFC',
        wcagWhite: 'AA',
        wcagBlack: 'AAA',
      },
      {
        name: 'Verdant Meadow',
        hex: '#059669',
        role: 'secondary',
        roleLabel: 'Ecological Secondary (30%)',
        usageNotes: 'Carbon offset metrics, sustainable certification tags, and active battery storage stats.',
        textColor: '#F8FAFC',
        wcagWhite: 'AA',
        wcagBlack: 'Fail',
      },
      {
        name: 'Sunrise Coral',
        hex: '#EA580C',
        role: 'accent',
        roleLabel: 'Dynamic Accent (10%)',
        usageNotes: 'Grid peak warning indicators, primary conversion CTAs, and instant power alerts.',
        textColor: '#F8FAFC',
        wcagWhite: 'AA',
        wcagBlack: 'Fail',
      },
      {
        name: 'Obsidian Earth',
        hex: '#18181B',
        role: 'neutral-dark',
        roleLabel: 'Deep Neutral Dark',
        usageNotes: 'High-contrast typography, carbon dashboard panels, and mobile dark theme surfaces.',
        textColor: '#F8FAFC',
        wcagWhite: 'AAA',
        wcagBlack: 'Fail',
      },
      {
        name: 'Sunlight Mist',
        hex: '#FAFAF9',
        role: 'neutral-light',
        roleLabel: 'Warm Neutral Canvas',
        usageNotes: 'Clean background surfaces, metric cards, and spacious layout margins.',
        textColor: '#18181B',
        wcagWhite: 'Fail',
        wcagBlack: 'AAA',
      },
    ],
    typography: {
      headerFont: {
        name: 'DM Serif Display',
        category: 'Serif',
        googleFontFamily: 'DM Serif Display',
        weights: ['400'],
        usage: 'Editorial brand statements, annual sustainability reports, and hero banners.',
        rationale: 'DM Serif Display infuses warmth, organic authority, and timeless ecological reverence into the renewable technology sector.',
      },
      bodyFont: {
        name: 'Outfit',
        category: 'Sans-serif',
        googleFontFamily: 'Outfit',
        weights: ['400', '500', '600'],
        usage: 'Grid telemetry numbers, interactive dashboard sliders, and mobile telemetry feeds.',
        rationale: 'Outfit provides circular, friendly geometry that balances scientific accuracy with welcoming approachable clarity.',
      },
      accentFont: {
        name: 'Plus Jakarta Sans',
        category: 'Sans-serif',
        googleFontFamily: 'Plus Jakarta Sans',
        usage: 'Subheadings, pill tags, and secondary action labels.',
      },
      pairingPhilosophy: 'The organic warmth and literary sophistication of DM Serif Display contrasts harmoniously against the clean, aerodynamic curves of Outfit.',
    },
    primaryLogo: {
      title: 'Helios Ray Geometric Mark',
      concept: 'A golden sun intersecting with curved photovoltaic waves, radiating clean energy outward in pure geometric balance.',
      svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="24" fill="#18181B" />
  <circle cx="50" cy="50" r="26" fill="#D97706" />
  <path d="M50 14V26M50 74V86M14 50H26M74 50H86M24 24L33 33M67 67L76 76M24 76L33 67M67 33L76 24" stroke="#EA580C" stroke-width="4" stroke-linecap="round" />
  <circle cx="50" cy="50" r="14" fill="#059669" />
  <circle cx="50" cy="50" r="6" fill="#FAFAF9" />
</svg>`,
      promptForAiImage: 'A high-end luxury minimalist logo mark for a modern solar renewable energy enterprise called Solaria. A radiating geometric golden sun intersecting green leaf contour lines, pure vector silhouette with subtle metallic bronze gradient, isolated on matte deep graphite background, cinematic commercial aesthetic.',
    },
    secondaryMarks: [
      {
        id: 'solaria-monogram',
        type: 'monogram',
        title: 'S-Sun Icon Mark',
        purpose: 'Smart meter hardware badge, mobile app icon, and favicon.',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="44" fill="#D97706" />
  <path d="M58 28C48 28 40 34 40 42C40 50 60 48 60 58C60 66 52 72 42 72" stroke="#FAFAF9" stroke-width="8" stroke-linecap="round" />
  <circle cx="38" cy="28" r="4" fill="#059669" />
</svg>`,
      },
      {
        id: 'solaria-wordmark',
        type: 'wordmark',
        title: 'Solar Horizontal Wordmark',
        purpose: 'Solar inverter chassis, corporate website header, and field vehicles.',
        svg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="16" fill="#D97706" />
  <circle cx="30" cy="30" r="7" fill="#059669" />
  <text x="56" y="38" font-family="'DM Serif Display', serif" font-size="28" fill="#18181B">Solaria</text>
  <text x="58" y="49" font-family="'Outfit', sans-serif" font-weight="600" font-size="8" fill="#D97706" letter-spacing="2">CLEAN ENERGY</text>
</svg>`,
      },
      {
        id: 'solaria-badge',
        type: 'badge',
        title: '100% Renewable Origin Stamp',
        purpose: 'Consumer electricity bills, solar panel warranty seals, and eco certification.',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,6 63,13 77,10 87,20 94,34 94,49 88,62 82,75 70,84 56,92 44,92 30,84 18,75 12,62 6,49 6,34 13,20 23,10 37,13" fill="#059669" />
  <circle cx="50" cy="50" r="32" fill="#18181B" />
  <path d="M50 30L56 42H44L50 30Z" fill="#D97706" />
  <path d="M50 44L56 56H44L50 44Z" fill="#FAFAF9" />
  <circle cx="50" cy="62" r="3" fill="#D97706" />
</svg>`,
      },
    ],
    mockups: {
      businessCardHeadline: 'Orchestrating Decentralized Clean Power',
      billboardCopy: 'Every rooftop, connected. Every watt, accounted for.',
      appScreenTitle: 'Neighborhood Solar Grid at 99.4% Efficiency',
      merchTagline: 'Powered by Autonomous Sunshine',
    },
    clearspaceRule: 'Leave clear padding around the Helios sun icon equal to 2x the ray stroke diameter.',
    minimumSize: 'Print: 20mm width. Digital: 28px height.',
    misuseWarnings: [
      'Do not place the solar mark over unharmonized neon backgrounds.',
      'Do not rotate the radiant axis away from the 45-degree angle.',
      'Ensure the inner green leaf core retains visible contrast in monochrome prints.',
    ],
    createdAt: new Date().toISOString(),
  },
];
