
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Mic, Square, Download } from "lucide-react";
import { useLocation } from "wouter";

export default function SpeakingGamePage() {
  const [_, navigate] = useLocation();
  const [speed, setSpeed] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const paragraph = {
    text: "The sun was setting behind the mountains, casting long shadows across the valley. Birds were returning to their nests, filling the air with their evening songs. A gentle breeze rustled through the trees, carrying the sweet scent of wildflowers. It was a perfect moment of peace and tranquility in nature.",
    audio: "/speaking-sample.mp3"
  };

  const handlePlayback = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      audioRef.current.play();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/speaking/courses")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Speaking Practice
        </h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Read and Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg leading-relaxed">{paragraph.text}</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm">Speed: {speed}x</span>
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={0.5}
                max={2}
                step={0.1}
                className="w-[200px]"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handlePlayback}>
                <Play className="h-4 w-4 mr-2" />
                Play Sample
              </Button>
              {!isRecording ? (
                <Button onClick={startRecording} variant="secondary">
                  <Mic className="h-4 w-4 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive">
                  <Square className="h-4 w-4 mr-2" />
                  Stop Recording
                </Button>
              )}
              {audioURL && (
                <Button 
                  variant="outline" 
                  onClick={() => window.open(audioURL)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Recording
                </Button>
              )}
            </div>
          </div>

          <audio ref={audioRef} src={paragraph.audio} />
          {audioURL && (
            <audio controls src={audioURL} className="w-full mt-4" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
