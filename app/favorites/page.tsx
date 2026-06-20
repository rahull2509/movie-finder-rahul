"use client";

import { useFavorites } from "@/hooks/useFavorites";
import MovieCard from "@/components/MovieCard";
import EmptyState from "@/components/EmptyState";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
        <div className="animate-pulse w-full h-64 bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
        <EmptyState 
          title="No favorites yet" 
          description="Movies you mark as favorite will appear here." 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        My Favorites
        <span className="text-sm px-3 py-1 bg-red-500/10 text-red-500 rounded-full font-medium">
          {favorites.length}
        </span>
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {favorites.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}
