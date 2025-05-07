
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChordChart } from "@/components/ChordChart";
import { GuitarTablature } from "@/components/GuitarTablature";

export interface ChordSection {
  id: number;
  startTime: number;
  endTime: number;
  chord: string;
}

interface ChordDisplayProps {
  chordSections: ChordSection[];
}

export function ChordDisplay({ chordSections }: ChordDisplayProps) {
  const [activeTab, setActiveTab] = useState("chords");

  const uniqueChords = Array.from(
    new Set(chordSections.map((section) => section.chord))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Detected Chords & Tabs</span>
          <span className="text-sm text-music-muted font-normal">
            {uniqueChords.length} unique chords
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chords">Chord Charts</TabsTrigger>
            <TabsTrigger value="tablature">Tablature</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chords" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueChords.map((chord) => (
                <div key={chord} className="flex flex-col items-center">
                  <ChordChart chord={chord} />
                  <span className="mt-2 text-lg font-medium">{chord}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tablature">
            <GuitarTablature chordSections={chordSections} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
