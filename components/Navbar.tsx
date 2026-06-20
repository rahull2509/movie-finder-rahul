"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Film, Heart } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
          <Film className="w-6 h-6 text-red-500" />
          <span className="font-bold text-xl hidden sm:block">MovieFinder</span>
        </Link>
        
        <div className="flex-1 max-w-xl">
          <Suspense fallback={<div className="h-9 w-full bg-white/5 rounded-full animate-pulse" />}>
            <SearchBar />
          </Suspense>
        </div>

        <Link 
          href="/favorites" 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <Heart className="w-6 h-6" />
          <span className="hidden sm:block font-medium">Favorites</span>
        </Link>
      </div>
    </nav>
  );
}
