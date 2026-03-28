const styleCards = [
  {
    title: 'Gen Z',
    sample: 'That drop was actually clean, no cap, visuals went hard fr.',
  },
  {
    title: 'Sigma',
    sample: 'Remain composed. Secure the objective. Aura stays undefeated.',
  },
  {
    title: 'NPC',
    sample: 'Hello traveler. New mission unlocked: survive the comment section.',
  },
  {
    title: 'Meme overload',
    sample: 'brain.exe crashed, ratio incoming, keyboard now in ohio mode.',
  },
];

export function StylesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="rounded-3xl border border-black/10 bg-zinc-900 p-6 text-zinc-100 sm:p-8">
        <h2 className="text-2xl font-black uppercase tracking-[0.12em]">Translation Styles</h2>
        <p className="mt-2 text-sm text-zinc-300">Pick a voice profile before running live translation.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {styleCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-zinc-700 bg-zinc-800/60 p-5">
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-amber-300">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">{card.sample}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
