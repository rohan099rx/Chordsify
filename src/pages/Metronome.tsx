
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Play, Square, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

const Metronome = () => {
  const [tempo, setTempo] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState<number>(4);
  const [count, setCount] = useState<number>(0);
  
  const audioContext = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const schedulerTimerRef = useRef<number | null>(null);
  const notesInQueueRef = useRef<{note: number, time: number}[]>([]);
  
  // Initialize AudioContext
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (schedulerTimerRef.current) clearTimeout(schedulerTimerRef.current);
    };
  }, []);
  
  // Schedule notes to play
  const scheduleNote = (beatNumber: number, time: number) => {
    notesInQueueRef.current.push({ note: beatNumber, time: time });
    
    const osc = audioContext.current!.createOscillator();
    const envelope = audioContext.current!.createGain();
    
    osc.frequency.value = beatNumber === 0 ? 1000 : 800; // Accent the first beat
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    
    osc.connect(envelope);
    envelope.connect(audioContext.current!.destination);
    
    osc.start(time);
    osc.stop(time + 0.1);
  };
  
  const scheduler = () => {
    while (nextNoteTimeRef.current < audioContext.current!.currentTime + 0.1) {
      scheduleNote(count, nextNoteTimeRef.current);
      
      // Advance current note and time
      const secondsPerBeat = 60.0 / tempo;
      nextNoteTimeRef.current += secondsPerBeat;
      
      // Update beat counter
      setCount((prevCount) => (prevCount + 1) % beatsPerMeasure);
    }
    schedulerTimerRef.current = window.setTimeout(scheduler, 25);
  };
  
  const startMetronome = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      toast.success("Metronome activated");
    }
    
    if (isPlaying) return;
    
    setIsPlaying(true);
    setCount(0);
    nextNoteTimeRef.current = audioContext.current.currentTime;
    scheduler();
  };
  
  const stopMetronome = () => {
    setIsPlaying(false);
    if (schedulerTimerRef.current) {
      clearTimeout(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
  };
  
  const handleTempoChange = (value: number[]) => {
    setTempo(value[0]);
  };
  
  const adjustBeatsPerMeasure = (amount: number) => {
    const newValue = beatsPerMeasure + amount;
    if (newValue >= 2 && newValue <= 12) {
      setBeatsPerMeasure(newValue);
      setCount(0);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Metronome
            </h2>
            <p className="text-lg text-music-muted max-w-2xl mx-auto">
              Practice with precision timing to improve your playing
            </p>
          </div>
          
          <Card className="border-music-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="text-music-primary h-5 w-5" />
                Interactive Metronome
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bold mb-8 text-music-primary">
                  {tempo} <span className="text-lg text-music-muted">BPM</span>
                </div>
                
                <div className="w-full max-w-lg mb-8">
                  <Slider 
                    defaultValue={[tempo]} 
                    min={40} 
                    max={220}
                    step={1}
                    onValueChange={handleTempoChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-music-muted">
                    <span>Slow (40)</span>
                    <span>Moderate (100)</span>
                    <span>Fast (220)</span>
                  </div>
                </div>
                
                <div className="mb-8 flex flex-col items-center">
                  <div className="text-xl mb-2">Beats Per Measure</div>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustBeatsPerMeasure(-1)}
                      disabled={beatsPerMeasure <= 2}
                    >
                      <Minus size={18} />
                    </Button>
                    <span className="text-2xl font-medium w-8 text-center">{beatsPerMeasure}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => adjustBeatsPerMeasure(1)}
                      disabled={beatsPerMeasure >= 12}
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {isPlaying ? (
                    <Button 
                      variant="default" 
                      size="lg" 
                      onClick={stopMetronome}
                      className="bg-red-500 hover:bg-red-600 text-white px-8"
                    >
                      <Square size={18} className="mr-2" />
                      Stop
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      size="lg" 
                      onClick={startMetronome}
                      className="bg-music-primary hover:bg-music-primary/90 text-white px-8"
                    >
                      <Play size={18} className="mr-2" />
                      Start
                    </Button>
                  )}
                </div>
                
                <div className="mt-8 flex gap-2">
                  {Array.from({ length: beatsPerMeasure }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-6 h-6 rounded-full transition-colors ${
                        isPlaying && count === idx 
                          ? 'bg-music-primary scale-110' 
                          : 'bg-music-muted/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="py-6 border-t border-music-surface">
        <div className="container text-center text-music-muted text-sm">
          <p>Chordsify - Convert Audio to Guitar Chords & Tabs</p>
        </div>
      </footer>
    </div>
  );
};

export default Metronome;
