import { Film } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({ 
  title = "No Movies Found", 
  description = "We couldn't find any movies matching your search." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <Film className="w-10 h-10 text-white/30" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-white/60 max-w-md">{description}</p>
    </div>
  );
}
