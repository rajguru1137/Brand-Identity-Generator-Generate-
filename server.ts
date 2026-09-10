import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google GenAI Client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Warning: GEMINI_API_KEY is not set in environment.');
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', hasKey: !!process.env.GEMINI_API_KEY });
});

// Helper for contrast calculations
function calculateWCAG(hex: string) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lum = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  const ratioWithWhite = (1 + 0.05) / (lum + 0.05);
  const ratioWithBlack = (lum + 0.05) / (0 + 0.05);
  return {
    textColor: lum > 0.45 ? '#0F172A' : '#F8FAFC',
    wcagWhite: ratioWithWhite >= 7 ? 'AAA' : ratioWithWhite >= 4.5 ? 'AA' : 'Fail',
    wcagBlack: ratioWithBlack >= 7 ? 'AAA' : ratioWithBlack >= 4.5 ? 'AA' : 'Fail',
  };
}

// 1. Generate Full Brand Bible Endpoint
app.post('/api/generate-brand', async (req: Request, res: Response): Promise<void> => {
  try {
    const { mission, industry, stylePreference, companyName } = req.body;

    if (!mission || typeof mission !== 'string' || mission.trim().length === 0) {
      res.status(400).json({ error: 'Company mission or description is required.' });
      return;
    }

    const ai = getGenAI();

    const prompt = `You are a world-class Brand Strategist, Creative Director, and Typography expert.
Generate a complete, cohesive, professional "Brand Bible" for the following company description:

Company Name (optional, if none provided create a distinct, memorable brand name): ${companyName || 'Not specified - invent a fitting name'}
Industry / Domain: ${industry || 'Identify from mission'}
Style / Aesthetic Vibe: ${stylePreference || 'Modern, premium, authentic, distinctive'}
Company Mission & Description:
"${mission}"

CRITICAL REQUIREMENTS:
1. Palette: Exactly 5 complementary colors in Hex format:
   - 1 Primary brand color (defining identity)
   - 1 Secondary brand color (supporting)
   - 1 Accent color (vibrant, call-to-action)
   - 1 Neutral dark (for text/dark mode)
   - 1 Neutral light (for surface/background)
   Include comprehensive professional usage notes for each color.

2. Typography:
   - Select real, popular Google Fonts that pair gorgeously together.
   - For Header: Select a distinctive Serif, Display, or high-personality Sans-serif font (e.g., Syne, DM Serif Display, Plus Jakarta Sans, Outfit, Cinzel, Space Grotesk, Playfair Display, Clash Display, Fraunces, Archivo).
   - For Body: Select a highly readable body font (e.g., Plus Jakarta Sans, Inter, Outfit, DM Sans, Spline Sans, Source Sans 3).
   - Detail the design philosophy of why this pairing balances contrast and unity.

3. Logos & Secondary Marks:
   - Primary Logo: Provide both a descriptive concept, a detailed prompt for generating a photorealistic visual mark with AI image generator, and a crisp, valid, self-contained SVG icon (viewBox="0 0 100 100", stroke/fill using the brand colors, geometric or elegant vector paths).
   - Exactly 3 Secondary Marks:
     a) Monogram / Icon Mark (favicon/app icon lockup, with valid SVG)
     b) Wordmark / Typographic horizontal lockup (with valid SVG)
     c) Badge / Stamp mark (circular or badge emblem, with valid SVG)
   All SVGs must be valid, well-formed XML strings, with viewBox="0 0 100 100" (or 0 0 200 60 for wordmark), clean styling, and no external dependencies.

4. Brand Guidelines:
   - Archetype (e.g., The Creator, The Sage, The Hero, The Ruler, The Outlaw)
   - Voice & Tone (traits, Dos, and Don'ts)
   - Clearspace rules, minimum sizing, and misuse warnings.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an award-winning brand identity agency creative director. Always return strictly valid JSON matching the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brandName: { type: Type.STRING },
            tagline: { type: Type.STRING },
            elevatorPitch: { type: Type.STRING },
            mission: { type: Type.STRING },
            archetype: { type: Type.STRING },
            values: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
            voiceAndTone: {
              type: Type.OBJECT,
              properties: {
                traits: { type: Type.ARRAY, items: { type: Type.STRING } },
                dos: { type: Type.ARRAY, items: { type: Type.STRING } },
                donts: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['traits', 'dos', 'donts'],
            },
            palette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                  role: { type: Type.STRING },
                  roleLabel: { type: Type.STRING },
                  usageNotes: { type: Type.STRING },
                },
                required: ['name', 'hex', 'role', 'roleLabel', 'usageNotes'],
              },
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headerFont: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    googleFontFamily: { type: Type.STRING },
                    weights: { type: Type.ARRAY, items: { type: Type.STRING } },
                    usage: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                  },
                  required: ['name', 'category', 'googleFontFamily', 'weights', 'usage', 'rationale'],
                },
                bodyFont: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    googleFontFamily: { type: Type.STRING },
                    weights: { type: Type.ARRAY, items: { type: Type.STRING } },
                    usage: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                  },
                  required: ['name', 'category', 'googleFontFamily', 'weights', 'usage', 'rationale'],
                },
                accentFont: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    googleFontFamily: { type: Type.STRING },
                    usage: { type: Type.STRING },
                  },
                },
                pairingPhilosophy: { type: Type.STRING },
              },
              required: ['headerFont', 'bodyFont', 'pairingPhilosophy'],
            },
            primaryLogo: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                concept: { type: Type.STRING },
                svg: { type: Type.STRING },
                promptForAiImage: { type: Type.STRING },
              },
              required: ['title', 'concept', 'svg', 'promptForAiImage'],
            },
            secondaryMarks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  title: { type: Type.STRING },
                  purpose: { type: Type.STRING },
                  svg: { type: Type.STRING },
                  promptForAiImage: { type: Type.STRING },
                },
                required: ['id', 'type', 'title', 'purpose', 'svg'],
              },
            },
            mockups: {
              type: Type.OBJECT,
              properties: {
                businessCardHeadline: { type: Type.STRING },
                billboardCopy: { type: Type.STRING },
                appScreenTitle: { type: Type.STRING },
                merchTagline: { type: Type.STRING },
              },
              required: ['businessCardHeadline', 'billboardCopy', 'appScreenTitle', 'merchTagline'],
            },
            clearspaceRule: { type: Type.STRING },
            minimumSize: { type: Type.STRING },
            misuseWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            'brandName',
            'tagline',
            'elevatorPitch',
            'mission',
            'archetype',
            'values',
            'voiceAndTone',
            'palette',
            'typography',
            'primaryLogo',
            'secondaryMarks',
            'mockups',
            'clearspaceRule',
            'minimumSize',
            'misuseWarnings',
          ],
        },
      },
    });

    const rawJson = response.text?.trim() || '{}';
    const parsedData = JSON.parse(rawJson);

    // Compute contrast accessibility for each color swatch
    if (Array.isArray(parsedData.palette)) {
      parsedData.palette = parsedData.palette.map((c: any) => {
        const hex = c.hex?.startsWith('#') ? c.hex : `#${c.hex || '000000'}`;
        const contrast = calculateWCAG(hex);
        return {
          ...c,
          hex,
          textColor: contrast.textColor,
          wcagWhite: contrast.wcagWhite,
          wcagBlack: contrast.wcagBlack,
        };
      });
    }

    parsedData.id = 'brand-' + Date.now();
    parsedData.createdAt = new Date().toISOString();

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/generate-brand:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate brand identity. Please try again.',
    });
  }
});

// 2. High-Quality Image Generation Endpoint (using gemini-3-pro-image-preview with 1K, 2K, 4K resolution)
app.post('/api/generate-image', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, imageSize = '1K', aspectRatio = '1:1' } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required for image generation.' });
      return;
    }

    const ai = getGenAI();
    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(imageSize) ? imageSize : '1K';

    // Model required by user prompt: gemini-3-pro-image-preview
    // With fallback to gemini-3.1-flash-image if quota/tier limitation occurs
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || '1:1',
            imageSize: chosenSize as '1K' | '2K' | '4K',
          },
        },
      });
    } catch (primaryErr: any) {
      console.warn('Primary model gemini-3-pro-image-preview failed, attempting fallback to gemini-3.1-flash-image:', primaryErr?.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio || '1:1',
            imageSize: chosenSize as '1K' | '2K' | '4K',
          },
        },
      });
    }

    let imageUrl: string | null = null;
    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        break;
      }
    }

    if (!imageUrl) {
      res.status(500).json({ error: 'No image data returned from Gemini.' });
      return;
    }

    res.json({ imageUrl, imageSize: chosenSize });
  } catch (error: any) {
    console.error('Error in /api/generate-image:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate high-resolution image.',
    });
  }
});

// 3. Multi-turn Brand Identity Consultant Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, model = 'gemini-3.5-flash', brandContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const ai = getGenAI();

    // Select model based on user selection:
    // 'gemini-3.1-pro-preview' for particularly complex tasks
    // 'gemini-3.5-flash' for general tasks
    // 'gemini-3.1-flash-lite' for tasks that should happen fast
    const allowedModels = ['gemini-3.5-flash', 'gemini-3.1-pro-preview', 'gemini-3.1-flash-lite'];
    const chosenModel = allowedModels.includes(model) ? model : 'gemini-3.5-flash';

    let brandSummary = '';
    if (brandContext) {
      brandSummary = `\nActive Brand Context:\nBrand Name: ${brandContext.brandName || 'N/A'}\nTagline: ${brandContext.tagline || 'N/A'}\nArchetype: ${brandContext.archetype || 'N/A'}\nColors: ${(brandContext.palette || []).map((p: any) => `${p.name} (${p.hex})`).join(', ')}\nTypography: Header (${brandContext.typography?.headerFont?.name}), Body (${brandContext.typography?.bodyFont?.name})\nMission: ${brandContext.mission || 'N/A'}`;
    }

    const systemInstruction = `You are a world-class Senior Brand Strategist and Creative Director specializing in brand identity, visual language, typography pairing, color psychology, and brand guidelines.
You assist the user in perfecting and evolving their "Brand Bible".
Provide articulate, constructive, and actionable design guidance.
When asked for color tweaks, suggest exact HEX codes.
When asked for font suggestions, recommend real Google Fonts with clear rationale.
Keep your answers structured, elegant, and directly useful.
${brandSummary}`;

    // Convert messages to Gemini format
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text || '' }],
    }));

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text || '',
      modelUsed: chosenModel,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'Chat service encountered an issue.',
    });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Brand Identity Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
