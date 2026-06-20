"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const currentQ = searchParams.get("q") || "";
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery && trimmedQuery !== currentQ) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else if (!trimmedQuery && searchParams.has("q")) {
      router.push("/");
    }
  }, [debouncedQuery, router, searchParams, isMounted]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:border-white/20 sm:text-sm transition-colors"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
