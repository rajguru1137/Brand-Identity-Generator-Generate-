/**
 * Utility to dynamically load Google Fonts into document head
 */
const loadedFonts = new Set<string>();

export function loadGoogleFont(fontFamily: string): void {
  if (!fontFamily || typeof document === 'undefined') return;

  // Normalize family name, e.g. "Plus Jakarta Sans" -> "Plus+Jakarta+Sans"
  const cleanName = fontFamily.trim().replace(/['"]/g, '');
  if (loadedFonts.has(cleanName)) return;

  try {
    const formattedName = cleanName.split(' ').join('+');
    const linkId = `gfont-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:ital,wght@0,300..800;1,300..800&display=swap`;
      document.head.appendChild(link);
      loadedFonts.add(cleanName);
    }
  } catch (err) {
    console.warn(`Could not load Google Font ${fontFamily}:`, err);
  }
}
