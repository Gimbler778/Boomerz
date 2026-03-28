export function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] sm:p-8">
        <h2 className="text-2xl font-black uppercase tracking-[0.12em] text-zinc-900">About This Project</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700">
          Bommerz is a full-stack translator app that converts text between standard English and internet brainrot slang.
          It uses a React frontend with Tailwind CSS, a Node.js + Express backend, optional OpenAI translation, and
          ElevenLabs text-to-speech for voice playback.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-zinc-700">Backend Endpoints</h3>
            <p className="mt-2 text-sm text-zinc-700">POST /translate, POST /voice, GET /health</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-zinc-700">Highlights</h3>
            <p className="mt-2 text-sm text-zinc-700">Live typing interaction, style controls, intensity modes, and copy-to-clipboard.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
