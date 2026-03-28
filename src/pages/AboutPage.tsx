export function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="glass-card rounded-3xl border border-primary/15 bg-surface-container-low/75 p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] sm:p-8">
        <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-primary">About The Brainrot Project</h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Bommerz is a full-stack brainrot translator that converts normal text into meme-chaotic slang and back to
          readable human language. The goal is simple: give users a fast "vibe switch" between clean communication
          and maximum internet energy.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container/70 p-4">
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-secondary">Core Vibe Engine</h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              Brainrot style filters (Gen Z, Sigma, NPC, Meme overload), intensity levels from mild to cursed, and
              one-click translation to keep output aligned with your selected aura.
            </p>
          </div>

          <div className="rounded-xl border border-outline-variant/30 bg-surface-container/70 p-4">
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-secondary">Speech + Stack</h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              Voice modes for Crazy, Sigma, and Xomu delivery using ElevenLabs with browser fallback, backed by a
              React + Tailwind frontend and Express API endpoints: POST /translate, POST /voice, GET /health.
            </p>
          </div>
        </div>

        <p className="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          Project Motto: Stay locked in, keep the translation bussin, and never lose the plot to raw brainrot.
        </p>
      </div>
    </section>
  );
}
