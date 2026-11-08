"use client";

import { useState, type FormEvent } from "react";

type Album = {
  id: string;
  title: string;
  "first-release-date"?: string;
  "artist-credit"?: {
    name: string;
    joinphrase?: string;
  }[];
};

type SearchResponse = {
  error?: string;
  "release-groups"?: Album[];
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchTerm = query.trim();
    if (!searchTerm) return;

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/albums?q=${encodeURIComponent(searchTerm)}`,
      );
      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "The search failed.");
      }

      setAlbums(data["release-groups"] ?? []);
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Could not search the album catalog.",
      );
      setAlbums([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#e9e9e6] text-[#111111]">
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
        <h1 className="max-w-5xl text-7xl font-black uppercase leading-[0.85] tracking-tighter md:text-9xl">
          Keep the
          <br />
          good stuff
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-neutral-600 md:text-xl">
          A place to keep the albums that stay with you
        </p>
      </section>

      <section className="border-t border-black/30 px-6 py-12">
        <form onSubmit={handleSearch} className="grid max-w-2xl gap-3">
          <label
            htmlFor="album-search"
            className="font-mono text-xs tracking-[0.2em]"
          >
            FIND AN ALBUM
          </label>
          <input
            id="album-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by album or artist"
            className="w-full border border-black bg-transparent px-4 py-3"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-fit bg-[#111111] px-5 py-3 font-mono text-sm tracking-[0.2em] text-[#e9e9e6] disabled:opacity-60"
          >
            {isLoading ? "SEARCHING..." : "SEARCH"}
          </button>
        </form>

        {error && <p className="mt-6 text-red-700">{error}</p>}

        {hasSearched && !isLoading && !error && albums.length === 0 && (
          <p className="mt-6">No albums found. Try another search.</p>
        )}

        {albums.length > 0 && (
          <div className="mt-10 grid max-w-4xl gap-3">
            {albums.map((album) => {
              const artist = album["artist-credit"]
                ?.map((credit) => `${credit.name}${credit.joinphrase ?? ""}`)
                .join("");

              return (
                <article
                  key={album.id}
                  className="border border-black p-5"
                >
                  <h2 className="text-2xl font-bold">{album.title}</h2>
                  <p className="mt-2 font-mono text-sm">
                    {artist || "Artist unknown"}
                    {" · "}
                    {album["first-release-date"]?.slice(0, 4) || "Year unknown"}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}