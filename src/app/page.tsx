"use client";

export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between bg-[#111111] px-6 py-5 text-[#e9e9e6]">
        <p className="m-0 text-xl font-black tracking-tight">DEEP CUT</p>

        <nav className="flex gap-6 font-mono text-xs tracking-widest">
          <a href="/">Home</a>
          <a href="/discover">Discover</a>
        </nav>
      </header>

      <section className="px-6 py-20 md:py-28">
        <p className="mb-6 font-mono text-xs tracking-[0.2em]"> 
          YOUR PERSONAL LISTENING LOG
          </p>
        <h1 className="max-w-5xl text-7xl font-black uppercase  leading-[0.85] tracking-tighter md:text-9xl">
          Keep the 
          <br />
           good stuff
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-neutral-600 md:text-xl">
          A place to keep the albums that stay with you
        </p>
      </section>
      <section className="border-t border-black/30 px-6 py-16">
  <p className="font-mono text-xs tracking-[0.2em]">LATEST LISTEN</p>

  <article className="mt-6 grid gap-6 border border-black p-4 md:grid-cols-[220px_1fr]">
    <div className="flex aspect-square items-end bg-neutral-300 p-4 font-mono text-xs tracking-widest">
      COVER / PLACEHOLDER
    </div>

    <div>
      <p className="font-mono text-xs tracking-widest">David Bowie · 1977</p>
      <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter">
        Low
      </h2>
      <p className="mt-3 font-mono text-xs tracking-widest">ART POP</p>
      <p className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-600">
        Your thoughts on this album go here. 
      </p>
    </div>
  </article>
</section>
    </main>
  );
}