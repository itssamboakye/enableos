"use client";

import { useEffect, useRef } from "react";

interface CenterWaveformProps {
  userFftData: number[];
  aiFftData: number[];
  isUserSpeaking: boolean;
  isAiSpeaking: boolean;
  className?: string;
  barCount?: number;
}

export default function CenterWaveform({
  userFftData,
  aiFftData,
  isUserSpeaking,
  isAiSpeaking,
  className = "",
  barCount = 40,
}: CenterWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

      const getBars = (count: number, data: number[]) => {
      if (data.length === 0) return Array(count).fill(0);
      const result: number[] = [];
      for (let i = 0; i < count; i++) {
        const index = Math.min(Math.floor((i / count) * data.length), data.length - 1);
        result.push(data[index] || 0);
      }
      return result;
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Get full bar data for both user and AI
      const fullBars = barCount;
      const userBars = getBars(fullBars, userFftData);
      const aiBars = getBars(fullBars, aiFftData);
      
      const gap = 1.5; // Minimal bars style - tighter gap
      const padding = 8;
      const availableWidth = width - padding * 2;
      const totalGapWidth = (barCount - 1) * gap;
      const barWidth = Math.max(3, (availableWidth - totalGapWidth) / barCount); // Wider bars for minimal style
      const maxBarHeight = height - padding * 2;
      const startX = padding;
      const centerY = height / 2;

      // Determine which side is more dominant
      const userVolume = userBars.reduce((a, b) => a + b, 0) / userBars.length;
      const aiVolume = aiBars.reduce((a, b) => a + b, 0) / aiBars.length;
      const userDominant = userVolume > 0.05 && isUserSpeaking;
      const aiDominant = aiVolume > 0.05 && isAiSpeaking;

      // Draw full waveform - bars centered vertically, but shift dominance based on speaker
      for (let i = 0; i < barCount; i++) {
        const userValue = userBars[i] || 0;
        const aiValue = aiBars[i] || 0;
        const x = startX + i * (barWidth + gap);
        
        // Calculate position in waveform (0 = left, 1 = right)
        const position = i / (barCount - 1);
        
        // When user speaks: left side more prominent, when AI speaks: right side more prominent
        let barHeight = 0;
        let color = '';
        let opacity = 0.3; // Base opacity for inactive
        
        // Use the maximum of user or AI value to drive the bar height
        const maxValue = Math.max(userValue, aiValue);
        
        if (userDominant) {
          // User speaking: bars are taller on the left, fade to right
          const leftWeight = 1 - position; // 1.0 at left, 0.0 at right
          const userWeight = leftWeight * 0.9 + 0.1; // Keep some visibility across
          // Use user value but ensure it scales properly
          const normalizedUserValue = userValue || 0;
          barHeight = Math.max(4, normalizedUserValue * maxBarHeight * userWeight);
          color = 'rgb(59, 130, 246)'; // Blue
          opacity = 0.6 + (leftWeight * 0.3); // More opaque on left, but still visible across
        } else if (aiDominant) {
          // AI speaking: bars are taller on the right, fade to left
          const rightWeight = position; // 0.0 at left, 1.0 at right
          const aiWeight = rightWeight * 0.9 + 0.1; // Keep some visibility across
          // Use AI value but ensure it scales properly
          const normalizedAiValue = aiValue || 0;
          barHeight = Math.max(4, normalizedAiValue * maxBarHeight * aiWeight);
          color = 'rgb(255, 255, 255)'; // White
          opacity = 0.6 + (rightWeight * 0.3); // More opaque on right, but still visible across
        } else {
          // Neither speaking: show both at low opacity, balanced
          const combinedValue = Math.max(userValue, aiValue);
          barHeight = Math.max(2, combinedValue * maxBarHeight * 0.3);
          color = 'rgb(255, 255, 255)';
          opacity = 0.2;
        }
        
        // Draw bar from bottom (minimal bars style - extends upward)
        const y = height - padding - barHeight;
        ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        ctx.beginPath();
        // Minimal bars style: rounded full (pill shape)
        const radius = barWidth / 2;
        ctx.roundRect(x, y, barWidth, barHeight, radius);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [userFftData, aiFftData, isUserSpeaking, isAiSpeaking, barCount]);

  return (
    <div className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        width={400}
        height={60}
        className="w-full h-full"
      />
      {!isUserSpeaking && !isAiSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-xs text-muted-foreground">Waiting for audio...</div>
        </div>
      )}
    </div>
  );
}
