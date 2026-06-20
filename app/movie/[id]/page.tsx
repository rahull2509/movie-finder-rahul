import Image from "next/image";
import { Star, Clock, Calendar, Globe } from "lucide-react";
import { getMovieDetails } from "@/lib/tmdb";
import FavoritesButton from "@/components/FavoritesButton";
import ErrorState from "@/components/ErrorState";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: Props) {
  try {
    const { id } = await params;
    const movie = await getMovieDetails(id);

    const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null;

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster";

    const year = movie.release_date ? movie.release_date.substring(0, 4) : "N/A";
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const runtimeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return (
      <div className="relative min-h-[calc(100vh-4rem)]">
        {/* Backdrop */}
        {backdropUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent md:to-black/20" />
          </div>
        )}

        <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Poster */}
          <div className="w-full max-w-[300px] mx-auto md:mx-0 shrink-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-red-500/10 border border-white/10 group">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {movie.title}
              </h1>
              <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10">
                <FavoritesButton movie={movie} className="w-12 h-12 flex items-center justify-center" />
              </div>
            </div>

            {movie.tagline && (
              <p className="text-xl md:text-2xl text-white/60 italic mb-6">
                &quot;{movie.tagline}&quot;
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/80 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-white/50">/ 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{year}</span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{runtimeStr}</span>
                </div>
              )}
              {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{movie.spoken_languages[0].english_name}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium backdrop-blur-sm hover:bg-white/20 transition-colors cursor-default"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-4xl mb-8">
                {movie.overview || "No overview available."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Status</h3>
                  <p className="font-semibold text-white">{movie.status}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Original Title</h3>
                  <p className="font-semibold text-white">{movie.original_title} ({movie.original_language.toUpperCase()})</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Budget</h3>
                  <p className="font-semibold text-white">
                    {movie.budget ? `$${movie.budget.toLocaleString()}` : "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Revenue</h3>
                  <p className="font-semibold text-white">
                    {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "Not specified"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Popularity</h3>
                  <p className="font-semibold text-white">{movie.popularity.toFixed(1)}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Vote Count</h3>
                  <p className="font-semibold text-white">{movie.vote_count.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Production Countries</h3>
                  <p className="font-semibold text-white">
                    {movie.production_countries?.map(c => c.name).join(", ") || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm font-medium">Links</h3>
                  <div className="flex gap-4 mt-1">
                    {movie.homepage && (
                      <a href={movie.homepage} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
                        Homepage
                      </a>
                    )}
                    {movie.imdb_id && (
                      <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer" className="text-yellow-400 hover:text-yellow-300 hover:underline">
                        IMDb
                      </a>
                    )}
                    {!movie.homepage && !movie.imdb_id && <span className="text-white">N/A</span>}
                  </div>
                </div>
              </div>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Production Companies</h3>
                <div className="flex flex-wrap items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="flex flex-col items-center gap-2">
                      {company.logo_path ? (
                        <div className="h-10 w-24 relative bg-white/80 rounded px-2">
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-10 px-3 flex items-center justify-center bg-white/10 rounded text-sm text-center font-medium">
                          {company.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Movie details error:", error);
    return <ErrorState message="Could not load movie details. Please try again." />;
  }
}
