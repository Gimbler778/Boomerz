export type TranslationStyle = 'Gen Z' | 'Sigma' | 'NPC' | 'Meme overload';
export type TranslationMode = 'toBrainrot' | 'toHuman';

export type TranslatePayload = {
  inputText: string;
  intensity: 1 | 2 | 3;
  style: TranslationStyle;
  mode: TranslationMode;
};

export class ApiHttpError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiHttpError';
    this.status = status;
    this.code = code;
  }
}

export async function translateText(payload: TranslatePayload) {
  const response = await fetch('/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Translation failed.');
  }

  return response.json() as Promise<{ output: string; provider: string; warning?: string }>;
}

export async function fetchVoiceAudio(text: string, voiceMode: string) {
  const response = await fetch('/voice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voiceMode }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiHttpError(
      error.error || 'Voice generation failed.',
      response.status,
      error.code,
    );
  }

  return response.blob();
}
