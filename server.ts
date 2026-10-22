import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

  // API endpoint for AI Photo Studio modifier & custom styling director
  app.post('/api/ai-photo-modifier', async (req, res) => {
    try {
      const { style, shape, prompt, userNote, imageBase64 } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          success: true,
          badge: style === 'luxury-gold' ? '🌟 গোল্ডেন এক্সিকিউটিভ' : '💼 ব্যাংকিং প্রফেশনাল',
          bengaliTitle: 'মোঃ তারেক — ডিজিটাল ব্যাংকিং ও সৃজনশীল ওয়েব ক্রিয়েটর',
          englishTitle: 'MD Tareq — Digital Banking Officer & Web Innovator',
          caption: 'আর্থিক অন্তর্ভুক্তি ও আধুনিক প্রযুক্তির মেলবন্ধনে এক নতুন দিগন্ত। নিষ্ঠা, সৃজনশীলতা ও নিরন্তর অগ্রযাত্রা।',
          tags: ['#PalliSanchayBank', '#AccountingMBA', '#WebCreator', '#DigitalBangladesh', '#GoldExecutive'],
          quote: '“পরিশ্রম ও প্রযুক্তির সঠিক সমন্বয়ই এনে দিতে পারে জীবনের শ্রেষ্ঠ সাফল্য।”',
          filterRecommendation: {
            brightness: 104,
            contrast: 108,
            warmth: 14,
            goldGlowIntensity: 85,
            vignette: 15,
            borderHue: '#f59e0b',
          },
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const contents: any[] = [];

      if (imageBase64 && typeof imageBase64 === 'string' && imageBase64.startsWith('data:image')) {
        const matches = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches) {
          contents.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      }

      contents.push({
        text: `You are an elite creative design director and personal branding expert specializing in luxury portfolio aesthetics and professional career showcases for Md Tareq (মোঃ তারেক).
Tareq is an MBA in Accounting (National University, Bangladesh), a dedicated Field Assistant Officer at Palli Sanchay Bank (পল্লী সঞ্চয় ব্যাংক), and an enthusiastic web designer and digital creator.

The user wants to analyze and stylize their uploaded portrait in a "${style || 'luxury-gold'}" style with "${shape || 'golden-arch'}" cutout frame.
User's note/custom prompt: "${userNote || prompt || 'Make it look prestigious, subtle light gold elegance, and high-impact'}".

Respond strictly with a single valid JSON object without markdown code fences:
{
  "badge": "A short 2-3 word Bengali badge with emoji (e.g. 🌟 গোল্ডেন এক্সিকিউটিভ / 💼 ব্যাংকিং লিডার / 💻 ওয়েব কারিগর)",
  "bengaliTitle": "A concise prestigious title in Bengali describing Md Tareq in this style",
  "englishTitle": "A matching prestigious English title",
  "caption": "An inspiring 2-sentence caption in Bengali highlighting his work at Palli Sanchay Bank, accounting precision, and passion for web development",
  "tags": ["Array of 4-5 relevant hashtags in Bengali or English"],
  "quote": "A prestigious Bengali inspirational quote suitable for this photo",
  "filterRecommendation": {
    "brightness": 105,
    "contrast": 110,
    "warmth": 15,
    "goldGlowIntensity": 85,
    "vignette": 12,
    "borderHue": "#f59e0b"
  }
}`,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch {
        parsed = {
          badge: '🌟 গোল্ডেন এক্সিকিউটিভ',
          bengaliTitle: 'মোঃ তারেক — ডিজিটাল ব্যাংকিং ও সৃজনশীল ওয়েব ক্রিয়েটর',
          englishTitle: 'MD Tareq — Digital Banking Officer & Web Innovator',
          caption: 'আর্থিক অন্তর্ভুক্তি ও আধুনিক প্রযুক্তির মেলবন্ধনে এক নতুন দিগন্ত। নিষ্ঠা, সৃজনশীলতা ও নিরন্তর অগ্রযাত্রা।',
          tags: ['#PalliSanchayBank', '#AccountingMBA', '#WebCreator', '#GoldExecutive'],
          quote: '“পরিশ্রম ও প্রযুক্তির সঠিক সমন্বয়ই এনে দিতে পারে জীবনের শ্রেষ্ঠ সাফল্য।”',
          filterRecommendation: {
            brightness: 104,
            contrast: 108,
            warmth: 14,
            goldGlowIntensity: 85,
            vignette: 15,
            borderHue: '#f59e0b',
          },
        };
      }

      return res.json({ success: true, ...parsed });
    } catch (error: any) {
      console.error('Gemini Photo Modifier API Error:', error);
      return res.json({
        success: true,
        badge: '✨ প্রফেশনাল পোর্ট্রেট',
        bengaliTitle: 'মোঃ তারেক — পল্লী সঞ্চয় ব্যাংক কর্মকর্তা ও ওয়েব নির্মাতা',
        englishTitle: 'MD Tareq — Field Officer & Web Developer',
        caption: 'পেশাদারিত্ব ও নতুন প্রযুক্তি ব্যবহারের মাধ্যমে ব্যাংকিং ও ডিজিটাল সেবায় কার্যকর অবদান।',
        tags: ['#PalliSanchayBank', '#AccountingMBA', '#WebDeveloper'],
        quote: '“দক্ষতা ও নিষ্ঠাই প্রতিটি কাজের মূল শক্তি।”',
        filterRecommendation: {
          brightness: 102,
          contrast: 106,
          warmth: 12,
          goldGlowIntensity: 80,
          vignette: 10,
          borderHue: '#f59e0b',
        },
      });
    }
  });

  // Contact form submission endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;
    console.log('Received contact message from:', name, email, phone, message);
    return res.json({
      success: true,
      message: 'আপনার বার্তাটি সফলভাবে পৌঁছানো হয়েছে। তারেক ভাই শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tareq Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
