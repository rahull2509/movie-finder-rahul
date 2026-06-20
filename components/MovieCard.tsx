"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import { Movie } from "@/types/tmdb";
import FavoritesButton from "./FavoritesButton";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const year = movie.release_date ? movie.release_date.substring(0, 4) : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-red-500/10"
    >
      <Link href={`/movie/${movie.id}`} className="block flex-1 relative aspect-[2/3]">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 z-10">
          <FavoritesButton movie={movie} />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
