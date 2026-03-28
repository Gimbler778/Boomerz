const entries = [
  { slang: 'rizz', meaning: 'charisma / flirting skill' },
  { slang: 'gyatt', meaning: 'expression of amazement' },
  { slang: 'mogged', meaning: 'outclassed badly' },
  { slang: 'no cap', meaning: 'for real / honest statement' },
  { slang: 'delulu', meaning: 'being delusional in a playful way' },
  { slang: 'locked in', meaning: 'fully focused and committed' },
];

export function DictionaryPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] sm:p-8">
        <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-zinc-900">Brainrot Dictionary</h2>
        <p className="mt-2 text-sm text-zinc-600">Quick lookup for terms used by the translator styles.</p>

        <div className="mt-6 grid gap-3">
          {entries.map((entry) => (
            <article key={entry.slang} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">{entry.slang}</p>
              <p className="mt-1 text-sm text-zinc-800">{entry.meaning}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
