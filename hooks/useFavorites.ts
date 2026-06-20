import { useState, useEffect } from "react";
import { Movie } from "@/types/tmdb";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    try {
      const stored = localStorage.getItem("movie-finder-favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveFavorites = (newFavorites: Movie[]) => {
    setFavorites(newFavorites);
    try {
      localStorage.setItem("movie-finder-favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites", error);
    }
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.some((f) => f.id === movie.id)) {
      saveFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    saveFavorites(favorites.filter((f) => f.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((f) => f.id === id);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, isLoaded };
}
