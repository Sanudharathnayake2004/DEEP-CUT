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


    </main>
  );
}