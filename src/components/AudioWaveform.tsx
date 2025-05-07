
import { AudioLines } from "lucide-react";

interface AudioWaveformProps {
  filename: string;
  isProcessing: boolean;
}

export function AudioWaveform({ filename, isProcessing }: AudioWaveformProps) {
  return (
    <div className="p-6 bg-music-surface rounded-lg flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <AudioLines className="h-5 w-5 text-music-primary" />
          {filename}
        </h3>
        <span className={`text-xs px-3 py-1 rounded-full ${isProcessing ? "bg-amber-500/20 text-amber-400" : "bg-green-500/20 text-green-400"}`}>
          {isProcessing ? "Processing" : "Ready"}
        </span>
      </div>
      <div className="flex items-end justify-center gap-1 h-20 px-2">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 bg-music-primary/80 rounded-full animate-pulse-opacity ${getRandomHeight()}`}
            style={{
              animationDelay: `${i * 0.03}s`,
              opacity: isProcessing ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function getRandomHeight() {
  const heights = [
    'h-1/4',
    'h-1/3',
    'h-1/2',
    'h-2/3',
    'h-3/4',
    'h-full',
  ];
  return heights[Math.floor(Math.random() * heights.length)];
}
