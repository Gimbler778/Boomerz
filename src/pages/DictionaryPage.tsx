type DictionaryEntry = {
  slang: string;
  meaning: string;
  context: string;
  example: string;
};

const entries: DictionaryEntry[] = [
  {
    slang: 'rizz',
    meaning: 'charisma or flirting ability',
    context: 'Used when someone has smooth social confidence.',
    example: 'Bro pulled that conversation with elite rizz.',
  },
  {
    slang: 'gyatt',
    meaning: 'an exaggerated reaction of surprise or admiration',
    context: 'Usually an over-the-top response, often playful or meme-ish.',
    example: 'Gyatt, that edit quality jumped out instantly.',
  },
  {
    slang: 'mogged',
    meaning: 'visibly outclassed by someone else',
    context: 'Popular in looksmaxxing and comparison memes.',
    example: 'I thought I cooked, then I got mogged in comments.',
  },
  {
    slang: 'no cap',
    meaning: 'for real; not lying',
    context: 'Used to emphasize honesty or sincerity.',
    example: 'No cap, this launch trailer is clean.',
  },
  {
    slang: 'delulu',
    meaning: 'delusional in a self-aware, humorous way',
    context: 'Often used jokingly about unrealistic optimism.',
    example: 'I am delulu enough to think this build ships tonight.',
  },
  {
    slang: 'locked in',
    meaning: 'fully focused and in execution mode',
    context: 'Common for study, gym, coding, or performance grind.',
    example: 'He is locked in and pushing fixes back to back.',
  },
  {
    slang: 'aura farming',
    meaning: 'trying to look cool for social points',
    context: 'Usually ironic when someone is performing confidence.',
    example: 'Standing silent in shades is pure aura farming.',
  },
  {
    slang: 'NPC',
    meaning: 'acting generic, robotic, or repetitive',
    context: 'Comes from game non-player character behavior.',
    example: 'He posted the same line again, total NPC loop.',
  },
  {
    slang: 'main character energy',
    meaning: 'behaving like the central focus of the story',
    context: 'Can be praise or gentle sarcasm.',
    example: 'She walked in with main character energy.',
  },
  {
    slang: 'brainrot',
    meaning: 'meme-heavy language that rewires normal speech patterns',
    context: 'Describes consuming so much meme culture it leaks into everyday talk.',
    example: 'After two hours of reels, my brainrot is irreversible.',
  },
  {
    slang: 'mid',
    meaning: 'average or underwhelming',
    context: 'Used for fast judgment on content quality.',
    example: 'The first draft was mid, then the second one cooked.',
  },
  {
    slang: 'cooked',
    meaning: 'in trouble, overwhelmed, or finished',
    context: 'Depends on tone: can mean exhausted or doomed.',
    example: 'If the API key expires before demo, we are cooked.',
  },
  {
    slang: 'let him cook',
    meaning: 'let someone continue because the result may be great',
    context: 'Used when someone is building momentum.',
    example: 'Do not interrupt the redesign, let him cook.',
  },
  {
    slang: 'W / L',
    meaning: 'win or loss verdict on a choice',
    context: 'Fast binary evaluation in chats and streams.',
    example: 'Switching to Groq was a W, downtime was an L.',
  },
  {
    slang: 'ratio',
    meaning: 'a reply or opinion getting overshadowed by stronger reaction',
    context: 'Originates from social-post engagement culture.',
    example: 'He posted hot takes and got ratioed instantly.',
  },
];

export function DictionaryPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="glass-card rounded-3xl border border-primary/15 bg-surface-container-low/75 p-6 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] sm:p-8">
        <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-primary">Brainrot Dictionary</h2>
        <p className="mt-2 text-sm text-on-surface-variant">Glossary with meaning, context, and example usage for common brainrot and Gen Z slang.</p>

        <div className="mt-6 grid gap-4">
          {entries.map((entry) => (
            <article key={entry.slang} className="rounded-xl border border-outline-variant/30 bg-surface-container/70 p-4 transition-colors hover:border-primary/35">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">{entry.slang}</p>
              <p className="mt-1 text-sm font-semibold text-on-surface">{entry.meaning}</p>
              <p className="mt-2 text-sm text-on-surface-variant">Context: {entry.context}</p>
              <p className="mt-2 rounded-lg border border-outline-variant/30 bg-surface-container-high/80 px-3 py-2 text-sm italic text-on-surface-variant">
                Example: {entry.example}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
