export interface ColorSwatch {
  name: string;
  hex: string;
  role: 'primary' | 'secondary' | 'accent' | 'neutral-dark' | 'neutral-light';
  roleLabel: string;
  usageNotes: string;
  textColor: string;
  wcagWhite: string;
  wcagBlack: string;
}

export interface FontSpec {
  name: string;
  category: 'Serif' | 'Sans-serif' | 'Display' | 'Monospace';
  googleFontFamily: string;
  weights: string[];
  usage: string;
  rationale: string;
}

export interface TypographyPairing {
  headerFont: FontSpec;
  bodyFont: FontSpec;
  accentFont?: {
    name: string;
    category: string;
    googleFontFamily: string;
    usage: string;
  };
  pairingPhilosophy: string;
}

export interface SecondaryMark {
  id: string;
  type: 'monogram' | 'wordmark' | 'badge';
  title: string;
  purpose: string;
  svg: string;
  promptForAiImage?: string;
  aiImageUrl?: string;
}

export interface BrandBible {
  id: string;
  brandName: string;
  tagline: string;
  elevatorPitch: string;
  mission: string;
  values: Array<{ title: string; description: string }>;
  archetype: string;
  voiceAndTone: {
    traits: string[];
    dos: string[];
    donts: string[];
  };
  palette: ColorSwatch[];
  typography: TypographyPairing;
  primaryLogo: {
    title: string;
    concept: string;
    svg: string;
    promptForAiImage: string;
    aiImageUrl?: string;
    aiImageResolution?: string;
  };
  secondaryMarks: SecondaryMark[];
  mockups: {
    businessCardHeadline: string;
    billboardCopy: string;
    appScreenTitle: string;
    merchTagline: string;
  };
  clearspaceRule: string;
  minimumSize: string;
  misuseWarnings: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

export type ChatModel = 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';

export type ImageResolution = '1K' | '2K' | '4K';
