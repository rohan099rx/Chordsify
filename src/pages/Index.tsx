
import { useState } from "react";
import { Header } from "@/components/Header";
import { AudioUploader } from "@/components/AudioUploader";
import { AudioWaveform } from "@/components/AudioWaveform";
import { ChordDisplay, ChordSection } from "@/components/ChordDisplay";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock chord data for demo purposes
const MOCK_CHORD_DATA: ChordSection[] = [
  { id: 1, startTime: 0, endTime: 15.5, chord: "G" },
  { id: 2, startTime: 15.5, endTime: 30.2, chord: "Em" },
  { id: 3, startTime: 30.2, endTime: 45.8, chord: "C" },
  { id: 4, startTime: 45.8, endTime: 61.1, chord: "D" },
  { id: 5, startTime: 61.1, endTime: 76.7, chord: "G" },
  { id: 6, startTime: 76.7, endTime: 92.3, chord: "Em" },
  { id: 7, startTime: 92.3, endTime: 108, chord: "Am" },
  { id: 8, startTime: 108, endTime: 123.5, chord: "D7" },
];

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [chordData, setChordData] = useState<ChordSection[] | null>(null);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setChordData(null);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setChordData(MOCK_CHORD_DATA);
    }, 3000);
  };
  
  const handleProcessAudio = () => {
    if (!selectedFile) {
      toast.error("Please upload an audio file first");
      return;
    }
    
    setIsProcessing(true);
    toast.info("Processing audio...");
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setChordData(MOCK_CHORD_DATA);
      toast.success("Audio processed successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Transform Audio into Guitar Chords & Tabs
            </h2>
            <p className="text-lg text-music-muted max-w-2xl mx-auto">
              Upload your audio file and let our AI detect chords and generate tablature automatically.
            </p>
          </div>

          {!selectedFile ? (
            <AudioUploader onFileSelected={handleFileSelected} />
          ) : (
            <div className="space-y-8">
              <AudioWaveform 
                filename={selectedFile.name} 
                isProcessing={isProcessing} 
              />
              
              {!chordData && !isProcessing && (
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleProcessAudio}
                    className="gap-2"
                  >
                    Process Audio
                  </Button>
                </div>
              )}
              
              {chordData && (
                <ChordDisplay chordSections={chordData} />
              )}
              
              {selectedFile && (
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedFile(null);
                      setChordData(null);
                    }}
                  >
                    Upload Different File
                  </Button>
                </div>
              )}
            </div>
          )}
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

export default Index;
