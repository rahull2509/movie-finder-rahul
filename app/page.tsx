import { Suspense } from "react";
import { getMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  try {
    const params = await searchParams;
    const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
    const { results, totalPages } = await getMovies(page);

    if (!results || results.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
          <EmptyState />
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Popular Movies
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>

        {totalPages > 1 && (
          <Suspense fallback={<div className="mt-12 h-10 w-full animate-pulse bg-white/5 rounded-lg max-w-sm mx-auto" />}>
            <Pagination currentPage={page} totalPages={totalPages} />
          </Suspense>
        )}
      </div>
    );
  } catch (error) {
    console.error("Home page error:", error);
    return <ErrorState />;
  }
}
