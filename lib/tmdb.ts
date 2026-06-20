import { Movie, MovieDetails, PaginatedResponse } from "@/types/tmdb";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_API_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    ...params,
  });

  const headers: HeadersInit = {
    accept: 'application/json',
    'Connection': 'close',
  };

  if (TMDB_API_READ_ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`;
  } else if (TMDB_API_KEY) {
    queryParams.append('api_key', TMDB_API_KEY);
  } else {
    throw new Error('No TMDB API key or access token provided');
  }

  const url = `${TMDB_API_URL}${endpoint}?${queryParams.toString()}`;

  let lastError = null;
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch from TMDB: ${res.statusText}`);
      }

      return await res.json();
    } catch (error: any) {
      console.warn(`Fetch attempt ${attempt + 1} failed:`, error.message);
      lastError = error;
      // Wait for a short time before retrying (e.g. 500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  throw lastError || new Error('Failed to fetch from TMDB after multiple attempts');
}

/**
 * Custom function to fetch exactly 12 movies per page, because TMDB returns 20 per page.
 */
export async function getMovies(page: number, query?: string): Promise<{ results: Movie[]; totalPages: number }> {
  const ITEMS_PER_CUSTOM_PAGE = 12;
  const ITEMS_PER_TMDB_PAGE = 20;

  // Calculate which TMDB items we need
  const startIdx = (page - 1) * ITEMS_PER_CUSTOM_PAGE;
  const endIdx = startIdx + ITEMS_PER_CUSTOM_PAGE;

  // Calculate which TMDB pages contain these items
  const startTMDBPage = Math.floor(startIdx / ITEMS_PER_TMDB_PAGE) + 1;
  const endTMDBPage = Math.floor((endIdx - 1) / ITEMS_PER_TMDB_PAGE) + 1;

  const endpoint = query ? "/search/movie" : "/movie/popular";
  const params: Record<string, string> = query ? { query, include_adult: "false" } : {};

  try {
    const promises = [];
    for (let p = startTMDBPage; p <= endTMDBPage; p++) {
      promises.push(fetchFromTMDB<PaginatedResponse<Movie>>(endpoint, { ...params, page: p.toString() }));
    }

    const responses = await Promise.all(promises);

    // Combine results from all fetched TMDB pages
    const allResults = responses.flatMap(res => res.results);

    // Total pages calculation based on total results and our 12 items/page limit
    const totalResults = responses[0]?.total_results || 0;
    const totalPages = Math.ceil(totalResults / ITEMS_PER_CUSTOM_PAGE);

    // Calculate the offset within the combined array
    const offsetInFirstPage = startIdx % ITEMS_PER_TMDB_PAGE;

    // Slice exactly the 12 items we need
    const slicedResults = allResults.slice(offsetInFirstPage, offsetInFirstPage + ITEMS_PER_CUSTOM_PAGE);

    // Filter out movies without posters for better UI
    return {
      results: slicedResults,
      totalPages: totalPages > 500 ? 500 : totalPages, // TMDB limits page to 500
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], totalPages: 0 };
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchFromTMDB<MovieDetails>(`/movie/${id}`);
}
