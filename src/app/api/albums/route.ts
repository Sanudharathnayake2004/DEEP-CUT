export async function GET(request: Request) {
    const query = new URL(request.url).searchParams.get("q")?.trim();

    if (!query) {
        return Response.json(
            { error: "Enter an album or artist to search." },
            { status: 400 },
        );
    }

    const musicBrainzUrl = new URL(
        "https://musicbrainz.org/ws/2/release-group",
    );
    musicBrainzUrl.searchParams.set(
        "query",
        `(releasegroup:"${query}" OR artistname:"${query}") AND primarytype:album`,
    );
    musicBrainzUrl.searchParams.set("fmt", "json");
    musicBrainzUrl.searchParams.set("limit", "10");

    try {
        const response = await fetch(musicBrainzUrl, {
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "Deep Cut Learning/0.1.0 (https://github.com/Sanudharathnayake2004/DEEP-CUT)",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return Response.json(
                { error: "The album catalog could not complete the search." },
                { status: 502 },
            );
        }

        const results = await response.json();
        return Response.json(results);
    } catch {
        return Response.json(
            { error: "Could not connect to the album catalog." },
            { status: 502 },
        );
    }
}