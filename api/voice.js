import { voiceHandler } from './_lib/handlers.js';

export default async function handler(req, res) {
  return voiceHandler(req, res);
}
