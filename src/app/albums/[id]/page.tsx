import { notFound } from "next/navigation";

type Album = {
    title: string;
    "first-release-date"?: string;
    "primary-type"?: string;
    genres?: { name: string }[];
    "artist-credit"?: {
        name?: string;
        joinphrase?: string;
        artist?: { name: string };
    }[];
};

type CoverArtResponse = {
    images?: {
        front?: boolean;
        image: string;
        thumbnails?: Record<string, string>;
    }[];
};

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!/^[0-9a-f-]{36}$/i.test(id)) {
        notFound();
    }

    const musicBrainzUrl = new URL(
        `https://musicbrainz.org/ws/2/release-group/${id}`,
    );
    musicBrainzUrl.searchParams.set("fmt", "json");
    musicBrainzUrl.searchParams.set("inc", "artist-credits+genres");

    const albumResponse = await fetch(musicBrainzUrl, {
        headers: {
            Accept: "application/json",
            "User-Agent":
                "Deep Cut Learning/0.1.0 (https://github.com/Sanudharathnayake2004/DEEP-CUT)",
        },
        cache: "no-store",
    });

    if (albumResponse.status === 404) {
        notFound();
    }

    if (!albumResponse.ok) {
        throw new Error("Could not load this album from MusicBrainz.");
    }

    const album: Album = await albumResponse.json();

    let coverUrl: string | null = null;

    try {
        const coverResponse = await fetch(
            `https://coverartarchive.org/release-group/${id}`,
            { headers: { Accept: "application/json" }, cache: "no-store" },
        );

        if (coverResponse.ok) {
            const coverData: CoverArtResponse = await coverResponse.json();
            const frontCover = coverData.images?.find((image) => image.front);
            const imageUrl = frontCover?.thumbnails?.["500"] ?? frontCover?.image;

            coverUrl = imageUrl?.replace(/^http:/, "https:") ?? null;
        }
    } catch {
        // The album can still be shown when cover art is unavailable.
    }

    const artist = album["artist-credit"]
        ?.map(
            (credit) =>
                `${credit.name ?? credit.artist?.name ?? "Unknown artist"}${credit.joinphrase ?? ""}`,
        )
        .join("");

    return (
        <main className="min-h-screen bg-[#e9e9e6] text-[#111111]">
            <header className="bg-[#111111] px-6 py-5 text-xl font-black text-[#e9e9e6]">
                DEEP CUT
            </header>

            <section className="grid gap-8 px-6 py-12 md:grid-cols-[280px_1fr] md:gap-12">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={`Cover art for ${album.title}`}
                        className="aspect-square w-full max-w-[280px] object-cover"
                    />
                ) : (
                    <div className="flex aspect-square w-full max-w-[280px] items-end bg-neutral-300 p-4 font-mono text-xs tracking-widest">
                        NO COVER ART
                    </div>
                )}

                <div>
                    <p className="font-mono text-xs tracking-[0.2em]">ALBUM DETAILS</p>
                    <h1 className="mt-4 text-5xl font-black uppercase tracking-tight">
                        {album.title}
                    </h1>

                    <p className="mt-4 font-mono">
                        {artist || "Artist unknown"}
                        {" · "}
                        {album["first-release-date"]?.slice(0, 4) || "Year unknown"}
                    </p>

                    {album["primary-type"] && (
                        <p className="mt-3 font-mono text-sm">{album["primary-type"]}</p>
                    )}

                    {album.genres && album.genres.length > 0 && (
                        <p className="mt-3 text-neutral-600">
                            {album.genres.map((genre) => genre.name).join(" · ")}
                        </p>
                    )}
                </div>
            </section>

            <section className="border-t border-black/30 px-6 py-10">
                <p className="font-mono text-xs tracking-[0.2em]">COMMUNITY REVIEWS</p>
                <p className="mt-5 text-neutral-600">
                    No reviews yet. Be the first to review this album.
                </p>
            </section>
        </main>
    );
}