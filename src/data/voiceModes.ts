export const voiceModes = [
  { label: 'Crazy 😵‍💫', value: 'Crazy', voiceId: 'SOYHLrjzK2X1ezoPC6cr' },
  { label: 'Sigma voice 🗿', value: 'Sigma voice', voiceId: 'pNInz6obpgDQGcFmaJgB' },
  { label: 'Xomu 😈', value: 'Xomu', voiceId: 'cgSgspJ2msm6clMCkdW9' },
] as const;

export type VoiceMode = (typeof voiceModes)[number]['value'];
