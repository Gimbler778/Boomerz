const styleCards = [
  {
    title: 'Gen Z',
    vibe: 'Casual internet-native tone with playful confidence.',
    bestFor: 'Captions, chat messages, social replies, quick hype posts.',
    intensity: 'Low to medium works best for readable slang.',
    sample: 'That drop was actually clean, no cap, visuals went hard fr.',
  },
  {
    title: 'Sigma',
    vibe: 'Cold, direct, focused delivery with dominant phrasing.',
    bestFor: 'Motivation lines, short commands, aura-heavy statements.',
    intensity: 'Medium to high for dramatic "locked in" energy.',
    sample: 'Remain composed. Secure the objective. Aura stays undefeated.',
  },
  {
    title: 'NPC',
    vibe: 'Game-dialog rhythm with scripted and repetitive flavor.',
    bestFor: 'Meme narration, roleplay text, ironic quest-like posts.',
    intensity: 'Medium keeps it funny without becoming unreadable spam.',
    sample: 'Hello traveler. New mission unlocked: survive the comment section.',
  },
  {
    title: 'Meme overload',
    vibe: 'Chaotic stack of references, speed, and absurdity.',
    bestFor: 'Shitpost mode, parody text, cursed meme threads.',
    intensity: 'High for maximum brainrot and surreal punchlines.',
    sample: 'brain.exe crashed, ratio incoming, keyboard now in ohio mode.',
  },
];

export function StylesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="glass-card rounded-3xl border border-primary/15 bg-surface-container-low/75 p-6 text-on-surface sm:p-8">
        <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-primary">Translation Styles</h2>
        <p className="mt-2 text-sm text-on-surface-variant">Pick a voice profile before running live translation.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {styleCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-outline-variant/30 bg-surface-container/70 p-5 transition-colors hover:border-secondary/35">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-secondary">{card.title}</h3>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-label uppercase tracking-widest text-primary">
                  {card.intensity}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-on-surface">{card.vibe}</p>
              <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                <span className="text-primary">Best for:</span> {card.bestFor}
              </p>
              <p className="mt-3 rounded-lg border border-outline-variant/30 bg-surface-container-high/60 px-3 py-2 text-sm italic leading-relaxed text-on-surface-variant">
                Sample: {card.sample}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
