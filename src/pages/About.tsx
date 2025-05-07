
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Code, Headphones, Github, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              About Chordsify
            </h2>
            <p className="text-lg text-music-muted max-w-2xl mx-auto">
              Transform your audio files into guitar chords and tablature with AI technology.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Music className="h-5 w-5 text-music-primary" />
                    How it Works
                  </h3>
                  <p className="text-music-muted mb-4">
                    Chordsify uses advanced audio processing algorithms to analyze the frequencies in your 
                    music files and identify the chord progressions. Our technology can detect major, minor, 
                    and seventh chords with high accuracy.
                  </p>
                  <p className="text-music-muted">
                    Once we identify the chords, we generate accurate guitar tablature based on standard 
                    fingerings, making it easy for you to play along with your favorite songs.
                  </p>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-music-primary" />
                    Technology
                  </h3>
                  <p className="text-music-muted mb-2">
                    Our platform is built using modern web technologies:
                  </p>
                  <ul className="list-disc pl-5 text-music-muted space-y-1">
                    <li>React for the interactive user interface</li>
                    <li>Tailwind CSS for responsive styling</li>
                    <li>Advanced audio processing algorithms</li>
                    <li>WebAudio API for waveform visualization</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border mt-6 pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-music-primary" />
                  Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-music-surface/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Chord Detection</h4>
                    <p className="text-sm text-music-muted">
                      Upload any song to automatically identify the chord progression.
                    </p>
                  </div>
                  <div className="bg-music-surface/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Guitar Tablature</h4>
                    <p className="text-sm text-music-muted">
                      Get playable tabs that match the detected chords.
                    </p>
                  </div>
                  <div className="bg-music-surface/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Chord Charts</h4>
                    <p className="text-sm text-music-muted">
                      View chord shapes with finger positions for easy learning.
                    </p>
                  </div>
                  <div className="bg-music-surface/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Practice Tools</h4>
                    <p className="text-sm text-music-muted">
                      Use our metronome and chord finder to improve your playing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://github.com/rohan099rx" className="flex items-center gap-2 text-music-muted hover:text-music-primary">
                    <Github className="h-5 w-5" />
                    <span>github.com/rohan099rx</span>
                  </a>
                  <a href="mailto:rohanchaudhary683@gmail.com" className="flex items-center gap-2 text-music-muted hover:text-music-primary">
                    <Mail className="h-5 w-5" />
                    <span>rohanchaudhary683@gmail.com</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 border-t border-music-surface">
        <div className="container text-center text-music-muted text-sm">
          <p>© 2025 Chordsify - Convert Audio to Guitar Chords & Tabs</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
