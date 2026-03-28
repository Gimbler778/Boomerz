import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { buildTranslationPrompt } from './lib/prompts.js';
import { mockTranslate } from './lib/mockTranslator.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    ...(process.env.OPENAI_BASE_URL ? { baseURL: process.env.OPENAI_BASE_URL } : {}),
  })
  : null;

const activeModel = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const isGroqMode = (process.env.OPENAI_BASE_URL || '').includes('groq.com');

const ELEVENLABS_VOICES = {
  Crazy: 'OTMqA7lryJHXgAnPIQYt',
  'Sigma voice': 'EiNlNiXeDU1pqqOPrYMO',
  Lulz: '9yzdeviXkFddZ4Oz8Mok',
};

const VALID_STYLES = new Set(['Gen Z', 'Sigma', 'NPC', 'Meme overload']);

function clampIntensity(value) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return 1;
  return Math.max(1, Math.min(3, Math.round(parsed)));
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, provider: isGroqMode ? 'groq' : 'openai' });
});

app.post('/translate', async (req, res) => {
  const { inputText, intensity, style, mode = 'toBrainrot' } = req.body || {};

  if (typeof inputText !== 'string' || !inputText.trim()) {
    return res.status(400).json({ error: 'inputText is required.' });
  }

  const normalizedIntensity = clampIntensity(intensity);
  const normalizedStyle = VALID_STYLES.has(style) ? style : 'Gen Z';
  const normalizedMode = mode === 'toHuman' ? 'toHuman' : 'toBrainrot';

  try {
    if (!openai) {
      const translated = mockTranslate({
        text: inputText,
        intensity: normalizedIntensity,
        style: normalizedStyle,
        mode: normalizedMode,
      });
      return res.json({
        output: translated,
        provider: 'mock',
      });
    }

    const prompt = buildTranslationPrompt({
      text: inputText,
      intensity: normalizedIntensity,
      style: normalizedStyle,
      mode: normalizedMode,
    });

    let output = '';

    if (isGroqMode) {
      const completion = await openai.chat.completions.create({
        model: activeModel,
        messages: [
          { role: 'system', content: 'You are a precise translation assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: normalizedMode === 'toHuman' ? 0.35 : 0.85,
        max_tokens: Number(process.env.OPENAI_MAX_TOKENS || 1024),
      });

      output = completion.choices?.[0]?.message?.content?.trim() || '';
    } else {
      const completion = await openai.responses.create({
        model: activeModel,
        input: prompt,
        temperature: normalizedMode === 'toHuman' ? 0.35 : 0.85,
      });

      output = completion.output_text?.trim() || '';
    }

    if (!output) {
      throw new Error('Empty response from model');
    }

    return res.json({
      output,
      provider: isGroqMode ? 'groq' : 'openai',
    });
  } catch (error) {
    console.error('Translate error:', error);
    const fallback = mockTranslate({
      text: inputText,
      intensity: normalizedIntensity,
      style: normalizedStyle,
      mode: normalizedMode,
    });

    return res.status(200).json({
      output: fallback,
      provider: 'mock-fallback',
      warning: 'AI provider unavailable; returned mock translation.',
    });
  }
});

app.post('/voice', async (req, res) => {
  const { text, voiceMode = 'Crazy' } = req.body || {};

  const inputText = typeof text === 'string' && text.trim()
    ? text.trim()
    : 'Skibidi rizz activated. This is a demo voice line.';

  const voiceId = ELEVENLABS_VOICES[voiceMode] || ELEVENLABS_VOICES.Crazy;

  if (!process.env.ELEVENLABS_API_KEY) {
    return res.status(503).json({ error: 'Missing ELEVENLABS_API_KEY on backend.' });
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: inputText,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.75,
          style: 0.8,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`ElevenLabs error ${response.status}: ${errorBody}`);
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audioBuffer);
  } catch (error) {
    console.error('Voice error:', error);
    res.status(500).json({ error: 'Failed to synthesize voice output.' });
  }
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
