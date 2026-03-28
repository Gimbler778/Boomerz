# Bommerz - Brainrot Translator (React + Node.js)

Full-stack app that translates between standard text and Gen Z/brainrot slang, with style and intensity controls, plus ElevenLabs text-to-speech playback.

## Tech Stack

- Frontend: React (functional components), React Router, Tailwind CSS, hooks state management
- Backend: Node.js + Express
- AI: OpenAI Responses API (with automatic mock fallback when unavailable)
- Voice: ElevenLabs text-to-speech via backend endpoint

## Features

- Live Input -> Output translation interaction
- Translation directions:
  - Normal text -> Brainrot slang
  - Brainrot slang -> Human-readable text
- Intensity levels:
  - 1 = mild slang
  - 2 = medium brainrot
  - 3 = cursed chaotic output
- Styles:
  - Gen Z
  - Sigma
  - NPC
  - Meme overload
- Voice modes:
  - Crazy (`OTMqA7lryJHXgAnPIQYt`)
  - Sigma voice (`EiNlNiXeDU1pqqOPrYMO`)
  - Lulz (`9yzdeviXkFddZ4Oz8Mok`)
- Copy to clipboard
- Error handling and fallback behavior

## Project Structure

```txt
.
|- backend/
|  |- lib/
|  |  |- mockTranslator.js
|  |  \- prompts.js
|  \- server.js
|- src/
|  |- components/
|  |  |- Footer.tsx
|  |  \- NavBar.tsx
|  |- data/
|  |  \- voiceModes.ts
|  |- pages/
|  |  |- AboutPage.tsx
|  |  |- DictionaryPage.tsx
|  |  |- HomePage.tsx
|  |  \- StylesPage.tsx
|  |- services/
|  |  \- api.ts
|  |- App.tsx
|  |- index.css
|  \- main.tsx
|- .env.example
|- package.json
\- vite.config.ts
```

## Environment Variables

Create or update `.env` in the root (this project does not use `/factory/config`):

```env
OPENAI_API_KEY=your_openai_or_groq_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_TOKENS=1024
ELEVENLABS_API_KEY=your_elevenlabs_key_here
PORT=8787
```

Notes:
- If `OPENAI_API_KEY` is missing, the backend uses mock translation logic automatically.
- `ELEVENLABS_API_KEY` is required for `/voice`.
- For Groq, set:
  - `OPENAI_BASE_URL=https://api.groq.com/openai/v1`
  - `OPENAI_MODEL=openai/gpt-oss-120b`

## Run Locally

1. Install dependencies

```bash
npm install
```

2. Configure environment variables in `.env`

```env
OPENAI_API_KEY=your_openai_or_groq_key_here
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4.1-mini
OPENAI_MAX_TOKENS=1024
ELEVENLABS_API_KEY=your_elevenlabs_key_here
PORT=8787
```

3. Start frontend and backend together

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8787

4. Build frontend (optional production check)

```bash
npm run build
```

5. Run backend only (production-style API run)

```bash
npm run start
```

## Deployment

- Short answer: this full app should be split for deployment.
- Netlify alone is ideal for frontend hosting, but your Express API (`/translate`, `/voice`) and secret API keys should run on a backend host.
- Recommended setup:
  - Frontend: Netlify or Vercel
  - Backend: Render (or Railway/Fly.io)
- If you want one provider, Vercel can host both frontend and serverless API routes, but your current Express server would need adaptation to Vercel serverless functions.

### Recommended production flow

1. Deploy backend first (Render) and set `OPENAI_API_KEY` + `ELEVENLABS_API_KEY` there.
2. Point frontend API calls to the backend URL (for example via `VITE_API_BASE_URL`).
3. Deploy frontend on Netlify or Vercel.

## API Endpoints

- `POST /translate`
  - Body:
    ```json
    {
      "inputText": "your text",
      "intensity": 2,
      "style": "Gen Z",
      "mode": "toBrainrot"
    }
    ```
- `POST /voice`
  - Body:
    ```json
    {
      "text": "text to speak",
      "voiceMode": "Crazy"
    }
    ```
- `GET /health`

## Notes

- Voice playback button is on Home and can read either normal input text or translated output.
- If translated output is empty, voice uses a demo line automatically.
