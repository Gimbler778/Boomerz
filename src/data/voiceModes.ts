export const voiceModes = [
  { label: 'Crazy', value: 'Crazy', voiceId: 'OTMqA7lryJHXgAnPIQYt' },
  { label: 'Sigma voice 🗿', value: 'Sigma voice', voiceId: 'EiNlNiXeDU1pqqOPrYMO' },
  { label: 'Lulz', value: 'Lulz', voiceId: '9yzdeviXkFddZ4Oz8Mok' },
] as const;

export type VoiceMode = (typeof voiceModes)[number]['value'];
