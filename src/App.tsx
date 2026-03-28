import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  Copy,
  Share,
  Brain,
  Languages,
  BookOpen,
  Award,
  HelpCircle,
  Skull,
  Palette,
  Volume2,
  LoaderCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from './lib/utils';
import { ApiHttpError, fetchVoiceAudio, translateText, type TranslationStyle } from './services/api';
import { voiceModes, type VoiceMode } from './data/voiceModes';
import { DictionaryPage } from './pages/DictionaryPage';
import { StylesPage } from './pages/StylesPage';
import { AboutPage } from './pages/AboutPage';

type SpeechSource = 'input' | 'output';

export default function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isTranslatePage = currentPath === '/';

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('skibidi rizzler fanum tax in ohio fr fr no cap on god');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [style, setStyle] = useState<TranslationStyle>('Gen Z');
  const [intensity, setIntensity] = useState<1 | 2 | 3>(2);
  const [isReverse, setIsReverse] = useState(false);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>('Crazy');
  const [speechSource, setSpeechSource] = useState<SpeechSource>('output');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const brainrotRainEmojiItems = useMemo(
    () => ['💀', '🤡', '🔥', '🧠', '🗿', '⚡', '😈', '💅', '🫠', '👹'],
    [],
  );

  const brainrotRainWordItems = useMemo(
    () => ['skibidi', 'rizz', 'gyatt', 'ohio', 'fanum tax', 'WTF', 'damn', 'shit', 'bruh', 'mogged', 'delulu', 'ratio'],
    [],
  );

  const textToSpeak = useMemo(() => {
    if (speechSource === 'input') {
      return inputText.trim() || 'This is a demo normal text voice output.';
    }

    return outputText.trim() || 'Skibidi rizz mode enabled. Demo brainrot voice output activated.';
  }, [inputText, outputText, speechSource]);

  const runTranslation = async () => {
    if (!inputText.trim()) {
      setError('Please enter text before translating.');
      return;
    }

    setIsTranslating(true);
    setError('');
    setStatus('');
    try {
      const result = await translateText({
        inputText,
        style,
        intensity,
        mode: isReverse ? 'toHuman' : 'toBrainrot',
      });
      setOutputText(result.output || 'No output generated.');
      setStatus(result.warning ? result.warning : `Provider: ${result.provider}`);
    } catch (translateError) {
      setError((translateError as Error).message || 'Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText || textToSpeak);
      setStatus('Copied to clipboard.');
    } catch {
      setError('Clipboard copy failed.');
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

  const renderPageContent = () => {
    if (currentPath === '/dictionary') return <DictionaryPage />;
    if (currentPath === '/styles') return <StylesPage />;
    if (currentPath === '/about') return <AboutPage />;
    return null;
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-on-surface font-body selection:bg-primary/30 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="brainrot-rain-layer brainrot-rain-emoji-layer">
          {brainrotRainEmojiItems.map((token, index) => {
            const sizeClass = index % 3 === 0 ? 'text-xl' : index % 3 === 1 ? 'text-2xl' : 'text-3xl';

            return (
              <span
                key={`emoji-${token}-${index}`}
                className={cn('brainrot-rain-item brainrot-rain-emoji', sizeClass)}
              >
                {token}
              </span>
            );
          })}
        </div>

        <div className="brainrot-rain-layer brainrot-rain-word-layer">
          {brainrotRainWordItems.map((token, index) => {
            const sizeClass = index % 3 === 0 ? 'text-sm' : index % 3 === 1 ? 'text-base' : 'text-lg';

            return (
              <span
                key={`word-${token}-${index}`}
                className={cn('brainrot-rain-item brainrot-rain-word', sizeClass)}
              >
                {token}
              </span>
            );
          })}
        </div>
      </div>

      <header className="lg:hidden sticky top-0 z-30 border-b border-primary/15 bg-surface-container-low/90 backdrop-blur-xl">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Brain size={16} className="text-primary" />
            </div>
            <p className="font-headline text-lg font-extrabold uppercase tracking-[0.12em] text-primary">Boomerz</p>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <Link
              to="/"
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 border text-[11px] font-label font-semibold uppercase tracking-[0.12em]',
                isTranslatePage
                  ? 'bg-primary/20 border-primary/45 text-primary'
                  : 'bg-surface-container-lowest/50 border-outline-variant/25 text-on-surface-variant',
              )}
            >
              Translate
            </Link>
            <Link
              to="/dictionary"
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 border text-[11px] font-label font-semibold uppercase tracking-[0.12em]',
                currentPath === '/dictionary'
                  ? 'bg-primary/20 border-primary/45 text-primary'
                  : 'bg-surface-container-lowest/50 border-outline-variant/25 text-on-surface-variant',
              )}
            >
              Dictionary
            </Link>
            <Link
              to="/styles"
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 border text-[11px] font-label font-semibold uppercase tracking-[0.12em]',
                currentPath === '/styles'
                  ? 'bg-primary/20 border-primary/45 text-primary'
                  : 'bg-surface-container-lowest/50 border-outline-variant/25 text-on-surface-variant',
              )}
            >
              Styles
            </Link>
            <Link
              to="/about"
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 border text-[11px] font-label font-semibold uppercase tracking-[0.12em]',
                currentPath === '/about'
                  ? 'bg-primary/20 border-primary/45 text-primary'
                  : 'bg-surface-container-lowest/50 border-outline-variant/25 text-on-surface-variant',
              )}
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      <div className="relative z-10 flex flex-1">
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col p-6 bg-surface-container-low/90 border-r border-primary/15 z-40 backdrop-blur-xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center neon-glow-primary">
              <Brain size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-headline text-xl font-extrabold uppercase tracking-[0.12em] text-primary">Boomerz</p>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Vibe Console</p>
            </div>
          </div>
          <nav className="flex flex-col gap-3">
            <Link
              to="/"
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all',
                isTranslatePage
                  ? 'bg-primary/15 border-primary/40 text-primary neon-glow-primary'
                  : 'bg-surface-container-lowest/40 border-outline-variant/20 text-on-surface/65 hover:border-primary/30 hover:text-on-surface',
              )}
              title="Translate"
            >
              <Languages size={20} />
              <span className="font-headline text-sm font-bold uppercase tracking-[0.12em]">Translate</span>
            </Link>
            <Link
              to="/dictionary"
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all',
                currentPath === '/dictionary'
                  ? 'bg-primary/15 border-primary/40 text-primary neon-glow-primary'
                  : 'bg-surface-container-lowest/40 border-outline-variant/20 text-on-surface/65 hover:border-primary/30 hover:text-on-surface',
              )}
              title="Dictionary"
            >
              <BookOpen size={20} />
              <span className="font-headline text-sm font-bold uppercase tracking-[0.12em]">Dictionary</span>
            </Link>
            <Link
              to="/styles"
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all',
                currentPath === '/styles'
                  ? 'bg-primary/15 border-primary/40 text-primary neon-glow-primary'
                  : 'bg-surface-container-lowest/40 border-outline-variant/20 text-on-surface/65 hover:border-primary/30 hover:text-on-surface',
              )}
              title="Styles"
            >
              <Award size={20} />
              <span className="font-headline text-sm font-bold uppercase tracking-[0.12em]">Styles</span>
            </Link>
            <Link
              to="/about"
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all',
                currentPath === '/about'
                  ? 'bg-primary/15 border-primary/40 text-primary neon-glow-primary'
                  : 'bg-surface-container-lowest/40 border-outline-variant/20 text-on-surface/65 hover:border-primary/30 hover:text-on-surface',
              )}
              title="About"
            >
              <HelpCircle size={20} />
              <span className="font-headline text-sm font-bold uppercase tracking-[0.12em]">About</span>
            </Link>
          </nav>
          <div className="mt-auto flex flex-col gap-6 pb-2">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Stay Cursed, Stay Locked In</p>
          </div>
        </aside>

        {isTranslatePage ? (
          <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:ml-72 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full max-w-5xl z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl border border-outline-variant/10 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 md:mb-10">
                <div>
                  <span className="font-label text-secondary text-xs sm:text-sm uppercase tracking-[0.2em] mb-2 block">System Status: Vibe Check Passed</span>
                  <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface leading-tight">
                    The <span className="text-gradient">Skibidi Core</span>
                  </h2>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 bg-surface-container-lowest/65 p-3 rounded-2xl border border-outline-variant/20 shadow-[inset_0_0_0_1px_rgba(72,71,75,0.08)]">
                  <div className="control-pill">
                    <Palette size={18} className="text-secondary" />
                    <select
                      value={style}
                      onChange={(event) => setStyle(event.target.value as TranslationStyle)}
                      aria-label="Translation style"
                      title="Translation style"
                      className="neon-select"
                    >
                      <option value="Gen Z" className="bg-surface-container">Gen Z</option>
                      <option value="Sigma" className="bg-surface-container">Sigma</option>
                      <option value="NPC" className="bg-surface-container">NPC</option>
                      <option value="Meme overload" className="bg-surface-container">Meme overload</option>
                    </select>
                  </div>

                  <div className="control-pill control-pill-intensity md:col-span-2 xl:col-span-1">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter shrink-0">Mild 😐</span>
                      <span className="font-label text-[10px] text-primary uppercase tracking-tighter shrink-0">Cursed 💀</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="1"
                      value={intensity}
                      onChange={(event) => setIntensity(Number(event.target.value) as 1 | 2 | 3)}
                      aria-label="Translation intensity"
                      title="Translation intensity"
                      className="w-full accent-primary bg-surface-container-highest rounded-lg h-1.5 appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="control-pill">
                    <Volume2 size={16} className="text-secondary" />
                    <select
                      value={voiceMode}
                      onChange={(event) => setVoiceMode(event.target.value as VoiceMode)}
                      aria-label="Voice mode"
                      title="Voice mode"
                      className="neon-select"
                    >
                      {voiceModes.map((voice) => (
                        <option key={voice.value} value={voice.value} className="bg-surface-container">
                          {voice.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 px-2 sm:px-4 relative gap-2 sm:gap-0">
                <div className="flex-1 text-center sm:text-left">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    {isReverse ? 'Brainrot Slang' : 'Normal Human Language'}
                  </label>
                </div>
                <button
                  onClick={() => setIsReverse(!isReverse)}
                  aria-label="Swap translation direction"
                  title="Swap translation direction"
                  className="shrink-0 mx-auto sm:mx-4 p-2 bg-surface-container-highest hover:bg-surface-bright rounded-full text-secondary transition-all active:scale-90 border border-secondary/20 shadow-lg"
                >
                  <ArrowLeftRight size={24} />
                </button>
                <div className="flex-1 text-center sm:text-right lg:text-left">
                  <label className="font-label text-[10px] uppercase tracking-widest text-primary flex items-center justify-center sm:justify-end lg:justify-start gap-2">
                    {isReverse ? 'Human Mode Activated' : 'Brainrot Mode Activated'}
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                    className="w-full h-56 sm:h-64 bg-surface-container-highest/40 border border-outline-variant/20 rounded-xl p-4 sm:p-6 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary/40 focus:ring-0 transition-all resize-none font-body text-base sm:text-lg"
                    placeholder={isReverse ? 'skibidi rizzler...' : 'Enter text that actually makes sense...'}
                  />
                  <div className="absolute bottom-4 right-4 text-on-surface-variant/20 font-label text-xs">
                    {inputText.length} / 500
                  </div>
                </div>

                <div className="flex justify-center items-center py-4 lg:py-0">
                  <button
                    onClick={runTranslation}
                    disabled={isTranslating}
                    title="Translate text"
                    className="min-w-45 bg-linear-to-br from-primary to-primary-dim text-on-primary px-6 py-4 rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all border border-primary/40 shadow-[0_0_22px_rgba(204,151,255,0.35)] group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTranslating ? 'Translating...' : 'Translate'}
                    {isTranslating ? <LoaderCircle size={20} className="animate-spin" /> : <Skull size={20} className="group-hover:rotate-12 transition-transform" />}
                  </button>
                </div>

                <div className="relative">
                  <div className={cn(
                    'w-full h-56 sm:h-64 bg-surface-container-low border border-primary/20 rounded-xl p-4 sm:p-6 text-primary neon-glow-primary overflow-y-auto font-headline font-bold text-xl sm:text-2xl leading-relaxed',
                    isTranslating && 'animate-pulse',
                  )}>
                    {outputText || 'Click Translate to generate output.'}
                  </div>
                  <div className="absolute left-3 right-3 sm:left-auto sm:right-4 bottom-3 sm:bottom-4 flex flex-wrap sm:flex-nowrap items-center justify-end gap-2.5">
                    <label className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-highest/90 text-on-surface text-[10px] font-label border border-outline-variant/20 min-h-10">
                      <span className="shrink-0 text-on-surface-variant">Src</span>
                      <select
                        value={speechSource}
                        onChange={(event) => setSpeechSource(event.target.value as SpeechSource)}
                        aria-label="Speech source"
                        title="Speech source"
                        className="neon-select min-w-20 text-[11px] px-1.5 py-0 min-h-0 border-none shadow-none"
                      >
                        <option value="output" className="bg-surface-container">Out</option>
                        <option value="input" className="bg-surface-container">In</option>
                      </select>
                    </label>

                    <button
                      onClick={playVoice}
                      disabled={isSpeaking}
                      aria-label="Play voice"
                      title="Play voice"
                      className="h-10 w-10 bg-surface-container-highest/80 hover:bg-secondary/20 rounded-full text-on-surface transition-all border border-outline-variant/20 hover:border-secondary/50 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSpeaking ? <LoaderCircle size={16} className="animate-spin" /> : <Volume2 size={16} />}
                    </button>

                    <button
                      onClick={handleCopy}
                      aria-label="Copy output"
                      title="Copy output"
                      className="h-10 w-10 bg-surface-container-highest/80 hover:bg-primary/20 rounded-full text-on-surface transition-all border border-outline-variant/20 hover:border-primary/50 flex items-center justify-center"
                    >
                      <Copy size={16} />
                    </button>
                    <button aria-label="Share output" title="Share output" className="h-10 w-10 bg-surface-container-highest/80 hover:bg-primary/20 rounded-full text-on-surface transition-all border border-outline-variant/20 hover:border-primary/50 flex items-center justify-center">
                      <Share size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {error ? (
                <p className="mt-5 px-4 py-2 rounded-lg bg-error/20 border border-error/40 text-error font-label text-xs uppercase tracking-wider">{error}</p>
              ) : null}
              {status ? (
                <p className="mt-3 px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/40 text-secondary font-label text-xs uppercase tracking-wider">{status}</p>
              ) : null}

              <div className="mt-12 flex flex-wrap gap-3">
                {['#gyatt', '#rizz', '#mewing', '#looksmaxxing', '#mogged', '#skibidi', '#fanumtax'].map((tag) => (
                  <span key={tag} className="bg-surface-container-lowest px-4 py-1.5 rounded-full text-primary font-label text-xs border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="hidden xl:block absolute -right-24 top-1/2 -translate-y-1/2 opacity-20 hover:opacity-40 transition-opacity">
              <span className="text-[12rem] select-none">💀</span>
            </div>
            <div className="hidden xl:block absolute -left-20 bottom-0 opacity-10 hover:opacity-30 transition-opacity">
              <span className="text-[10rem] select-none">🤡</span>
            </div>
          </div>
          </main>
        ) : (
          <main className="flex-1 p-4 sm:p-6 lg:ml-72">
            {renderPageContent()}
          </main>
        )}
      </div>

      <footer className="relative z-10 w-full py-10 px-4 bg-transparent max-w-7xl mx-auto flex flex-col items-center gap-2 mt-auto text-center">
        <p className="font-label text-[10px] sm:text-xs uppercase tracking-[0.16em] text-primary">
          Boomerz cooked up by Gimbler fr fr no cap, brainrot certified.
        </p>
      </footer>
    </div>
  );
}
