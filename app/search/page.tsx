import { Suspense } from "react";
import { getMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: Props) {
  try {
    const params = await searchParams;
    const query = typeof params.q === "string" ? params.q : "";
    const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;

    if (!query) {
      return (
        <div className="container mx-auto px-4 py-8">
          <EmptyState title="Search Movies" description="Type in the search bar to find movies." />
        </div>
      );
    }

    const { results, totalPages } = await getMovies(page, query);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Search Results for <span className="text-red-500">&quot;{query}&quot;</span>
        </h1>
        
        {results && results.length > 0 ? (
          <>
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
          </>
        ) : (
          <EmptyState title="No Results" description={`We couldn't find any movies matching "${query}".`} />
        )}
      </div>
    );
  } catch (error) {
    console.error("Search page error:", error);
    return <ErrorState />;
  }
}
