const BRAINROT_MAP = {
  skibidi: 'weird',
  rizz: 'charisma',
  gyatt: 'wow',
  sigma: 'confident',
  ohio: 'chaotic',
  fanum: 'steal',
};

const STYLE_PACKS = {
  'Gen Z': ['no cap', 'fr fr', 'on god', 'lowkey', 'mid'],
  Sigma: ['sigma grindset', 'alpha aura', 'stoic mode', 'W mindset', 'locked in'],
  NPC: ['hello traveler', 'side quest unlocked', 'objective updated', 'dialogue loop', 'walking cycle'],
  'Meme overload': ['ratio', 'doge energy', 'yeet', 'brain.exe stopped', '404 logic'],
};

function pick(arr, index) {
  return arr[index % arr.length];
}

function toBrainrot(text, intensity, style) {
  const words = text.split(/\s+/).filter(Boolean);
  const spice = STYLE_PACKS[style] || STYLE_PACKS['Gen Z'];

  const transformed = words.map((word, i) => {
    const lower = word.toLowerCase();
    const suffix = intensity > 1 && i % 3 === 0 ? ` ${pick(spice, i)}` : '';
    const chaos = intensity > 2 && i % 4 === 0 ? ' 💀' : '';

    if (BRAINROT_MAP[lower]) {
      return `${lower} ${BRAINROT_MAP[lower]}${suffix}${chaos}`;
    }

    if (intensity === 1) {
      return i % 5 === 0 ? `${word} fr` : word;
    }
    if (intensity === 2) {
      return i % 2 === 0 ? `${word}${suffix}` : `${word} bro`;
    }
    return `${word}${suffix}${chaos} skibidi`;
  });

  if (intensity === 1) return `${transformed.join(' ')} no cap.`;
  if (intensity === 2) return `${transformed.join(' ')} on god fr fr.`;
  return `${transformed.join(' ')} ??? aura farming in ohio.`;
}

function toHuman(text) {
  const lowerText = text.toLowerCase();
  let normalized = lowerText;

  Object.entries(BRAINROT_MAP).forEach(([slang, meaning]) => {
    const regex = new RegExp(`\\b${slang}\\b`, 'gi');
    normalized = normalized.replace(regex, meaning);
  });

  normalized = normalized
    .replace(/no cap|fr fr|on god|skibidi|bro|ratio|yeet|sigma grindset|alpha aura/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) {
    return 'This appears to be meme-heavy slang. Intended meaning: a chaotic but confident statement.';
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1) + '.';
}

export function mockTranslate({ text, intensity, style, mode }) {
  if (!text.trim()) return '';
  if (mode === 'toHuman') return toHuman(text);
  return toBrainrot(text, intensity, style);
}
