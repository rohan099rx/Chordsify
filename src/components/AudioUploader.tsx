
import { useState, useRef } from "react";
import { Music, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioUploaderProps {
  onFileSelected: (file: File) => void;
}

export function AudioUploader({ onFileSelected }: AudioUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file is an audio file
    if (!file.type.startsWith("audio/")) {
      toast.error("Please upload an audio file (.mp3, .wav, etc.)");
      return;
    }

    onFileSelected(file);
    toast.success(`File "${file.name}" uploaded successfully!`);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed transition-all ${
        isDragging 
          ? "border-primary bg-primary/10" 
          : "border-music-muted/40 hover:border-music-primary/40"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 rounded-full bg-music-surface">
          <Music className="h-10 w-10 text-music-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Upload Audio File</h3>
          <p className="text-music-muted text-sm mb-4">
            Drop your audio file here, or click to browse
          </p>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Select File
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="audio/mp3,audio/wav,audio/flac"
            className="hidden"
          />
          <p className="text-xs text-music-muted mt-3">
            Supports .mp3, .wav, and .flac files
          </p>
        </div>
      </div>
    </div>
  );
}
