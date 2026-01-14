"use client";

import { useEffect, useRef } from "react";

interface WaveVisualizerProps {
  fftData: number[];
  isActive: boolean;
  className?: string;
}

export default function WaveVisualizer({
  fftData,
  isActive,
  className = "",
}: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      if (!isActive || fftData.length === 0) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw vertical bars from bottom (bar chart style like shadcn)
      const barCount = fftData.length;
      const gap = 3;
      const totalGapWidth = (barCount - 1) * gap;
      const barWidth = Math.max(2, (width - totalGapWidth - 8) / barCount);
      const maxBarHeight = height - 8; // Leave padding top and bottom
      const padding = 4;

      ctx.fillStyle = "hsl(var(--foreground) / 0.8)";

      for (let i = 0; i < barCount; i++) {
        const value = Math.min(1, Math.max(0, fftData[i] || 0));
        // Apply some smoothing and ensure minimum height for visibility
        const barHeight = Math.max(2, value * maxBarHeight);
        const x = i * (barWidth + gap) + padding;
        const y = height - barHeight - padding;

        // Draw bars from bottom
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fftData, isActive]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={80}
      className={className}
    />
  );
}
