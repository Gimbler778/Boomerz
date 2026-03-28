import { useEffect, useMemo, useRef, useState } from 'react';
import { Copy, LoaderCircle, Volume2, WandSparkles } from 'lucide-react';
import { ApiHttpError, fetchVoiceAudio, translateText, type TranslationStyle } from '../services/api';
import { voiceModes, type VoiceMode } from '../data/voiceModes';

type SpeechSource = 'input' | 'output';

const styles: TranslationStyle[] = ['Gen Z', 'Sigma', 'NPC', 'Meme overload'];

export function HomePage() {
  const [inputText, setInputText] = useState('This launch trailer is impressive and the editing is clean.');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'toBrainrot' | 'toHuman'>('toBrainrot');
  const [style, setStyle] = useState<TranslationStyle>('Gen Z');
  const [intensity, setIntensity] = useState<1 | 2 | 3>(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>('Crazy');
  const [speechSource, setSpeechSource] = useState<SpeechSource>('output');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const textToSpeak = useMemo(() => {
    if (speechSource === 'input') {
      return inputText.trim() || 'This is a demo normal text voice output.';
    }
    return outputText.trim() || 'Skibidi rizz mode enabled. Demo brainrot voice output activated.';
  }, [inputText, outputText, speechSource]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(outputText || textToSpeak);
      setStatus('Copied to clipboard.');
    } catch {
      setError('Clipboard copy failed.');
    }
  };

  const runTranslation = async () => {
    if (!inputText.trim()) {
      setError('Please enter text before translating.');
      return;
    }

    setIsLoading(true);
    setError('');
    setStatus('');

    try {
      const data = await translateText({
        inputText,
        intensity,
        style,
        mode,
      });
      setOutputText(data.output || 'No output generated.');
      setStatus(data.warning ? `${data.warning}` : `Provider: ${data.provider}`);
    } catch (translateError) {
      setError((translateError as Error).message || 'Translation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const speakWithBrowserTTS = (text: string) => {
    if (!('speechSynthesis' in window)) {
      throw new Error('Browser text-to-speech is not supported on this device.');
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceMode === 'Crazy') {
      utterance.rate = 1.18;
      utterance.pitch = 0.78;
    } else if (voiceMode === 'Xomu') {
      utterance.rate = 1.24;
      utterance.pitch = 1.45;
    } else {
      utterance.rate = 1;
      utterance.pitch = 1;
    }
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const playVoice = async () => {
    setIsSpeaking(true);
    setError('');
    try {
      const audioBlob = await fetchVoiceAudio(textToSpeak, voiceMode);
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current.src);
      }

      const src = URL.createObjectURL(audioBlob);
      const audio = new Audio(src);
      audioRef.current = audio;
      await audio.play();
      setStatus(`Speaking in ${voiceMode} mode.`);
    } catch (voiceError) {
      const typedError = voiceError as ApiHttpError;

      if (typedError.status === 402 || typedError.code === 'paid_plan_required') {
        try {
          speakWithBrowserTTS(textToSpeak);
          setStatus('ElevenLabs paid voice blocked on free plan. Using browser voice fallback.');
        } catch (fallbackError) {
          setError((fallbackError as Error).message || 'Voice playback failed.');
        }
      } else {
        setError(typedError.message || 'Voice playback failed.');
      }
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-10">
      <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[linear-gradient(145deg,#fff9e8_0%,#ffe7c2_43%,#ffd1a6_100%)] p-6 shadow-[0_28px_70px_-24px_rgba(87,43,0,0.45)] sm:p-10">
        <div className="pointer-events-none absolute -top-20 right-10 h-48 w-48 rounded-full bg-orange-300/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-amber-200/70 blur-2xl" />

        <div className="relative z-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Live Translator</p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-[0.12em] text-zinc-900 sm:text-4xl">
              Normal <span className="text-zinc-500">⇄</span> Brainrot
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setMode((prev) => (prev === 'toBrainrot' ? 'toHuman' : 'toBrainrot'))}
            className="rounded-full border border-zinc-900 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-900 transition hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-amber-100"
          >
            {mode === 'toBrainrot' ? 'To Brainrot' : 'To Human'}
          </button>
        </div>

        <div className="relative z-10 mt-7 grid gap-4 rounded-2xl border border-black/10 bg-white/75 p-4 sm:grid-cols-3 sm:gap-6 sm:p-6">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-600">Style</span>
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value as TranslationStyle)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-medium outline-none ring-orange-500/40 transition focus:ring"
            >
              {styles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-600">Intensity</span>
            <select
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value) as 1 | 2 | 3)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-medium outline-none ring-orange-500/40 transition focus:ring"
            >
              <option value={1}>1 - Mild slang</option>
              <option value={2}>2 - Medium brainrot</option>
              <option value={3}>3 - Cursed chaotic</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-600">Voice Mode</span>
            <select
              value={voiceMode}
              onChange={(event) => setVoiceMode(event.target.value as VoiceMode)}
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-medium outline-none ring-orange-500/40 transition focus:ring"
            >
              {voiceModes.map((voice) => (
                <option key={voice.value} value={voice.value}>
                  {voice.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="relative z-10 mt-6 grid gap-4 lg:grid-cols-2">
          <label className="block rounded-2xl border border-black/10 bg-zinc-900/95 p-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">Input Text</span>
            <textarea
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Write normal text or brainrot here..."
              className="mt-3 h-56 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-sm text-zinc-100 outline-none ring-orange-500/50 transition placeholder:text-zinc-500 focus:ring"
            />
          </label>

          <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">Translated Output</span>
              {isLoading ? <LoaderCircle className="animate-spin text-zinc-500" size={18} /> : null}
            </div>
            <div className="mt-3 h-56 overflow-auto rounded-xl border border-zinc-200 bg-white p-4 text-base leading-relaxed text-zinc-800">
              {outputText || 'Click Translate to generate output.'}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={runTranslation}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-600 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-white shadow-[0_10px_20px_-12px_rgba(5,120,96,0.8)] transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? <LoaderCircle size={14} className="animate-spin" /> : <WandSparkles size={14} />}
                Translate
              </button>

              <button
                type="button"
                onClick={copyOutput}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-amber-100 transition hover:-translate-y-0.5"
              >
                <Copy size={14} /> Copy
              </button>

              <label className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-700">
                Voice Source
                <select
                  value={speechSource}
                  onChange={(event) => setSpeechSource(event.target.value as SpeechSource)}
                  className="bg-transparent text-xs outline-none"
                >
                  <option value="output">Translated output</option>
                  <option value="input">Normal input</option>
                </select>
              </label>

              <button
                type="button"
                onClick={playVoice}
                disabled={isSpeaking}
                className="inline-flex items-center gap-2 rounded-full border border-orange-700 bg-orange-600 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-zinc-950 shadow-[0_10px_20px_-12px_rgba(145,70,0,0.8)] transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSpeaking ? <LoaderCircle size={14} className="animate-spin" /> : <Volume2 size={14} />}
                Voice
              </button>

            </div>
          </div>
        </div>

        {error ? (
          <p className="relative z-10 mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {status ? (
          <p className="relative z-10 mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</p>
        ) : null}
      </div>
    </section>
  );
}
