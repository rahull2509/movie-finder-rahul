"use client";

import { Heart } from "lucide-react";
import { Movie } from "@/types/tmdb";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoritesButtonProps {
  movie: Movie;
  className?: string;
}

export default function FavoritesButton({ movie, className }: FavoritesButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) return null;

  const active = isFavorite(movie.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
      }}
      className={cn(
        "p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95",
        active ? "bg-red-500/20 text-red-500" : "bg-black/50 text-white/70 hover:bg-black/70 hover:text-white",
        className
      )}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn("w-5 h-5", active && "fill-current")} />
    </button>
  );
}
