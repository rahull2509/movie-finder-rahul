"use client";

import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full"
      />
    </div>
  );
}

export function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[2/3]">
          <div className="w-full h-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}
