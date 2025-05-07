
import { ChordSection } from "@/components/ChordDisplay";
import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";

interface GuitarTablatureProps {
  chordSections: ChordSection[];
}

export function GuitarTablature({ chordSections }: GuitarTablatureProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChordId, setActiveChordId] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  
  // Simplified mapping of chords to tab patterns
  const chordTabPatterns: Record<string, string[]> = {
    'C': ['x', '3', '2', '0', '1', '0'],
    'G': ['3', '2', '0', '0', '3', 'x'],
    'D': ['x', 'x', '0', '2', '3', '2'],
    'A': ['x', '0', '2', '2', '2', '0'],
    'E': ['0', '2', '2', '1', '0', '0'],
    'Am': ['x', '0', '2', '2', '1', '0'],
    'Em': ['0', '2', '2', '0', '0', '0'],
    'F': ['1', '3', '3', '2', '1', '1'],
    'Dm': ['x', 'x', '0', '2', '3', '1'],
    'G7': ['3', '2', '0', '0', '0', '1'],
  };

  // Find the active chord based on the current time
  useEffect(() => {
    const activeChord = chordSections.find(
      (section) => currentTime >= section.startTime && currentTime < section.endTime
    );
    
    setActiveChordId(activeChord?.id || null);
  }, [currentTime, chordSections]);

  // Timer to update the current time when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 0.1;
          // Reset to beginning if we reach the end of the last chord
          const lastEndTime = Math.max(...chordSections.map(section => section.endTime));
          return newTime > lastEndTime ? 0 : newTime;
        });
      }, 100); // Update every 100ms for smoother animation
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, chordSections]);

  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Jump to specific chord section
  const jumpToChord = (startTime: number) => {
    setCurrentTime(startTime);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };
  
  // Format time to MM:SS display
  const formatTimeDisplay = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tab-container bg-music-surface p-4 rounded-lg font-mono text-sm whitespace-pre overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-music-muted">Guitar tablature for detected chord progression</p>
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlayback} 
            className="flex items-center gap-1 px-3 py-1.5 bg-music-primary/10 hover:bg-music-primary/20 rounded-md text-music-primary"
          >
            {isPlaying ? (
              <>
                <span className="i-lucide-pause h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <span className="i-lucide-play h-4 w-4" /> Play
              </>
            )}
          </button>
          <span className="text-music-muted text-xs">
            {formatTimeDisplay(currentTime)}
          </span>
        </div>
      </div>
      
      {/* Progression timeline */}
      <div className="mb-6 bg-music-surface/50 h-8 rounded-md relative flex">
        {chordSections.map((section) => {
          const startPercent = (section.startTime / chordSections[chordSections.length - 1].endTime) * 100;
          const widthPercent = ((section.endTime - section.startTime) / chordSections[chordSections.length - 1].endTime) * 100;
          
          return (
            <div 
              key={section.id}
              onClick={() => jumpToChord(section.startTime)}
              style={{ 
                left: `${startPercent}%`, 
                width: `${widthPercent}%` 
              }}
              className={`absolute top-0 bottom-0 flex items-center justify-center text-xs cursor-pointer transition-colors ${
                activeChordId === section.id 
                  ? 'bg-music-primary/40 text-white font-medium' 
                  : 'bg-music-primary/20 hover:bg-music-primary/30 text-music-muted'
              }`}
            >
              {section.chord}
            </div>
          );
        })}
        
        {/* Current time indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
          style={{ 
            left: `${(currentTime / chordSections[chordSections.length - 1].endTime) * 100}%`,
            transition: 'left 0.1s linear'
          }}
        />
      </div>
      
      {/* String labels */}
      <div className="grid grid-cols-1 gap-0">
        <div className="text-music-muted">
          e|--------------------------------------------------------------------
        </div>
        <div className="text-music-muted">
          B|--------------------------------------------------------------------
        </div>
        <div className="text-music-muted">
          G|--------------------------------------------------------------------
        </div>
        <div className="text-music-muted">
          D|--------------------------------------------------------------------
        </div>
        <div className="text-music-muted">
          A|--------------------------------------------------------------------
        </div>
        <div className="text-music-muted">
          E|--------------------------------------------------------------------
        </div>
      </div>
      
      {/* Tab notations with chord names */}
      <div className="mt-8">
        {chordSections.map((section) => {
          const pattern = chordTabPatterns[section.chord] || ['x', 'x', 'x', 'x', 'x', 'x'];
          const isActive = activeChordId === section.id;
          
          return (
            <div 
              key={section.id} 
              className={`mt-4 p-2 rounded-md transition-colors ${
                isActive ? 'bg-music-primary/20 border-l-4 border-music-primary' : ''
              }`}
            >
              <div className="text-music-primary font-semibold flex items-center justify-between">
                <span>
                  {section.chord}
                  {isActive && <span className="ml-2 text-xs bg-music-primary text-white px-1.5 py-0.5 rounded-full">Current</span>}
                </span> 
                <span className="text-music-muted text-xs">
                  ({formatTime(section.startTime)} - {formatTime(section.endTime)})
                </span>
              </div>
              <div className="grid grid-cols-1 gap-0 mt-2">
                <div className={isActive ? "text-music-primary" : ""}>e|--{pattern[0]}--</div>
                <div className={isActive ? "text-music-primary" : ""}>B|--{pattern[1]}--</div>
                <div className={isActive ? "text-music-primary" : ""}>G|--{pattern[2]}--</div>
                <div className={isActive ? "text-music-primary" : ""}>D|--{pattern[3]}--</div>
                <div className={isActive ? "text-music-primary" : ""}>A|--{pattern[4]}--</div>
                <div className={isActive ? "text-music-primary" : ""}>E|--{pattern[5]}--</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
