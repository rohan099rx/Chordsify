
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Music, RefreshCw } from "lucide-react";
import { ChordChart } from "@/components/ChordChart";

// Types for chord data
interface ChordOption {
  name: string;
  quality: string;
  positions: (number | 'x')[];
}

// Chord data by root note
const chordLibrary: Record<string, ChordOption[]> = {
  "A": [
    { name: "A", quality: "Major", positions: ['x', 0, 2, 2, 2, 0] },
    { name: "Am", quality: "Minor", positions: ['x', 0, 2, 2, 1, 0] },
    { name: "A7", quality: "Dominant 7th", positions: ['x', 0, 2, 0, 2, 0] },
    { name: "Amaj7", quality: "Major 7th", positions: ['x', 0, 2, 1, 2, 0] },
    { name: "Asus4", quality: "Suspended 4th", positions: ['x', 0, 2, 2, 3, 0] },
  ],
  "B": [
    { name: "B", quality: "Major", positions: ['x', 2, 4, 4, 4, 2] },
    { name: "Bm", quality: "Minor", positions: ['x', 2, 4, 4, 3, 2] },
    { name: "B7", quality: "Dominant 7th", positions: ['x', 2, 1, 2, 0, 2] },
    { name: "Bmaj7", quality: "Major 7th", positions: ['x', 2, 4, 3, 4, 2] },
    { name: "Bsus4", quality: "Suspended 4th", positions: ['x', 2, 4, 4, 5, 2] },
  ],
  "C": [
    { name: "C", quality: "Major", positions: ['x', 3, 2, 0, 1, 0] },
    { name: "Cm", quality: "Minor", positions: ['x', 3, 5, 5, 4, 3] },
    { name: "C7", quality: "Dominant 7th", positions: ['x', 3, 2, 3, 1, 0] },
    { name: "Cmaj7", quality: "Major 7th", positions: ['x', 3, 2, 0, 0, 0] },
    { name: "Csus4", quality: "Suspended 4th", positions: ['x', 3, 3, 0, 1, 1] },
  ],
  "D": [
    { name: "D", quality: "Major", positions: ['x', 'x', 0, 2, 3, 2] },
    { name: "Dm", quality: "Minor", positions: ['x', 'x', 0, 2, 3, 1] },
    { name: "D7", quality: "Dominant 7th", positions: ['x', 'x', 0, 2, 1, 2] },
    { name: "Dmaj7", quality: "Major 7th", positions: ['x', 'x', 0, 2, 2, 2] },
    { name: "Dsus4", quality: "Suspended 4th", positions: ['x', 'x', 0, 2, 3, 3] },
  ],
  "E": [
    { name: "E", quality: "Major", positions: [0, 2, 2, 1, 0, 0] },
    { name: "Em", quality: "Minor", positions: [0, 2, 2, 0, 0, 0] },
    { name: "E7", quality: "Dominant 7th", positions: [0, 2, 0, 1, 0, 0] },
    { name: "Emaj7", quality: "Major 7th", positions: [0, 2, 1, 1, 0, 0] },
    { name: "Esus4", quality: "Suspended 4th", positions: [0, 2, 2, 2, 0, 0] },
  ],
  "F": [
    { name: "F", quality: "Major", positions: [1, 3, 3, 2, 1, 1] },
    { name: "Fm", quality: "Minor", positions: [1, 3, 3, 1, 1, 1] },
    { name: "F7", quality: "Dominant 7th", positions: [1, 3, 1, 2, 1, 1] },
    { name: "Fmaj7", quality: "Major 7th", positions: [1, 3, 2, 2, 1, 0] },
    { name: "Fsus4", quality: "Suspended 4th", positions: [1, 3, 3, 3, 1, 1] },
  ],
  "G": [
    { name: "G", quality: "Major", positions: [3, 2, 0, 0, 0, 3] },
    { name: "Gm", quality: "Minor", positions: [3, 5, 5, 3, 3, 3] },
    { name: "G7", quality: "Dominant 7th", positions: [3, 2, 0, 0, 0, 1] },
    { name: "Gmaj7", quality: "Major 7th", positions: [3, 2, 0, 0, 0, 2] },
    { name: "Gsus4", quality: "Suspended 4th", positions: [3, 3, 0, 0, 1, 3] },
  ],
};

const ChordFinder = () => {
  const [rootNote, setRootNote] = useState<string>("C");
  const [chordQuality, setChordQuality] = useState<string>("Major");
  const [selectedChord, setSelectedChord] = useState<ChordOption | null>(null);
  const [activeTab, setActiveTab] = useState<string>("finder");
  const [recentChords, setRecentChords] = useState<ChordOption[]>([]);

  // All available chord qualities
  const allChordQualities = Array.from(
    new Set(
      Object.values(chordLibrary)
        .flat()
        .map(chord => chord.quality)
    )
  );

  // Find the chord based on selections
  const findChord = () => {
    const chordsForRoot = chordLibrary[rootNote] || [];
    const foundChord = chordsForRoot.find(c => c.quality === chordQuality) || chordsForRoot[0];
    
    if (foundChord) {
      setSelectedChord(foundChord);
      
      // Add to recent chords if not already there
      if (!recentChords.some(c => c.name === foundChord.name)) {
        setRecentChords(prevChords => 
          [foundChord, ...prevChords].slice(0, 8)
        );
      }
    }
  };

  // Show a random chord
  const showRandomChord = () => {
    const allRoots = Object.keys(chordLibrary);
    const randomRoot = allRoots[Math.floor(Math.random() * allRoots.length)];
    const chordsForRoot = chordLibrary[randomRoot];
    const randomChord = chordsForRoot[Math.floor(Math.random() * chordsForRoot.length)];
    
    setRootNote(randomRoot);
    setChordQuality(randomChord.quality);
    setSelectedChord(randomChord);
    
    // Add to recent chords
    if (!recentChords.some(c => c.name === randomChord.name)) {
      setRecentChords(prevChords => 
        [randomChord, ...prevChords].slice(0, 8)
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Chord Finder
            </h2>
            <p className="text-lg text-music-muted max-w-2xl mx-auto">
              Find guitar chord shapes and fingerings
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="finder">Chord Finder</TabsTrigger>
              <TabsTrigger value="library">Chord Library</TabsTrigger>
            </TabsList>
            
            <TabsContent value="finder" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="text-music-primary h-5 w-5" />
                    Find a Guitar Chord
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Root Note</label>
                        <Select value={rootNote} onValueChange={setRootNote}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a root note" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(chordLibrary).map((note) => (
                              <SelectItem key={note} value={note}>{note}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chord Quality</label>
                        <Select value={chordQuality} onValueChange={setChordQuality}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a chord quality" />
                          </SelectTrigger>
                          <SelectContent>
                            {allChordQualities.map((quality) => (
                              <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button onClick={findChord} className="flex-1">
                          Find Chord
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={showRandomChord}
                          className="flex items-center gap-1"
                        >
                          <RefreshCw size={16} />
                          Random
                        </Button>
                      </div>
                      
                      {recentChords.length > 0 && (
                        <div className="pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">Recent Chords</h4>
                          <div className="flex flex-wrap gap-2">
                            {recentChords.map((chord) => (
                              <Button 
                                key={chord.name}
                                variant="secondary" 
                                size="sm"
                                onClick={() => {
                                  setSelectedChord(chord);
                                  // Extract the root note from chord name
                                  const root = chord.name.replace(/m|7|maj7|sus[24]|dim|aug/g, '');
                                  setRootNote(root);
                                  setChordQuality(chord.quality);
                                }}
                              >
                                {chord.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-4 bg-music-surface/30 rounded-lg">
                      {selectedChord ? (
                        <div className="flex flex-col items-center">
                          <h3 className="text-2xl font-bold mb-2">{selectedChord.name}</h3>
                          <p className="text-music-muted mb-4">{selectedChord.quality}</p>
                          <div className="scale-125 mb-6">
                            <ChordChart chord={selectedChord.name} />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-music-muted">
                          <Music className="h-16 w-16 mx-auto mb-2 text-music-primary/30" />
                          <p>Select a chord to display</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="library">
              <Card>
                <CardHeader>
                  <CardTitle>Chord Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Object.entries(chordLibrary).map(([root, chords]) => (
                      <div key={root} className="space-y-2">
                        <h3 className="text-lg font-semibold border-b pb-1">{root} Chords</h3>
                        <div className="space-y-4">
                          {chords.map((chord) => (
                            <Button
                              key={chord.name}
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                setSelectedChord(chord);
                                setRootNote(root);
                                setChordQuality(chord.quality);
                                setActiveTab("finder");
                              }}
                            >
                              {chord.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

export default ChordFinder;
