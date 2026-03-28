export function buildTranslationPrompt({ text, intensity, style, mode }) {
  const intensityGuide = {
    1: 'Mild slang. Keep it readable and mostly clear.',
    2: 'Medium brainrot. Noticeably slang-heavy and meme-flavored.',
    3: 'Cursed chaotic output. Maximal meme language while preserving intent.',
  };

  const direction =
    mode === 'toHuman'
      ? 'Convert brainrot/Gen Z slang into clean, clear standard English.'
      : 'Convert normal English into internet brainrot slang.';

  return [
    'You are a bidirectional slang translator.',
    direction,
    `Style: ${style}.`,
    `Intensity: ${intensity} (${intensityGuide[intensity]}).`,
    'Avoid hateful, sexual, or violent content. Keep output concise and natural.',
    mode === 'toHuman'
      ? 'Return plain English only, no explanation.'
      : 'Use style-specific tone and modern meme cadence. Return only the translated text.',
    '',
    `Input: """${text}"""`,
  ].join('\n');
}
