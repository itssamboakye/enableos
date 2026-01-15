import { useState, useEffect, useRef, useCallback } from "react";

interface UseLiveAudioOptions {
  fftSize?: number;
  smoothingTimeConstant?: number;
}

interface UseLiveAudioResult {
  fftData: number[];
  isActive: boolean;
  isListening: boolean;
  error: string | null;
  startListening: () => Promise<void>;
  stopListening: () => void;
  volume: number;
}

export function useLiveAudio(
  options: UseLiveAudioOptions = {}
): UseLiveAudioResult {
  const { fftSize = 2048, smoothingTimeConstant = 0.8 } = options;
  
  const [fftData, setFftData] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const processAudio = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    // Calculate volume (RMS)
    const bufferLength = dataArrayRef.current.length;
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      const normalized = dataArrayRef.current[i] / 255;
      sum += normalized * normalized;
    }
    const rms = Math.sqrt(sum / bufferLength);
    setVolume(rms);

    // Convert to normalized array (0-1)
    const normalized = Array.from(dataArrayRef.current).map((value) => value / 255);
    setFftData(normalized);
    setIsActive(rms > 0.01); // Consider active if volume is above threshold

    animationFrameRef.current = requestAnimationFrame(processAudio);
  }, []);

  const startListening = useCallback(async () => {
    try {
      setError(null);

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext({ sampleRate: 48000 });
      audioContextRef.current = audioContext;

      // Create analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothingTimeConstant;
      analyserRef.current = analyser;

      // Create data array for frequency data
      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      processAudio(); // Start processing
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to access microphone";
      setError(errorMessage);
      console.error("Error accessing microphone:", err);
    }
  }, [fftSize, smoothingTimeConstant, processAudio]);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    dataArrayRef.current = null;
    
    setIsListening(false);
    setIsActive(false);
    setFftData([]);
    setVolume(0);
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    fftData,
    isActive,
    isListening,
    error,
    startListening,
    stopListening,
    volume,
  };
}
