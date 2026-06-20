import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  reset?: () => void;
}

export default function ErrorState({ message = "Something went wrong fetching the movies.", reset }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Oops! An Error Occurred</h2>
      <p className="text-white/60 max-w-md mb-6">{message}</p>
      {reset && (
        <button 
          onClick={reset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
