export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  backdrop_path: string | null;
  spoken_languages: { english_name: string }[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  popularity: number;
  vote_count: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
