"use client";

import { useEffect, useRef } from "react";

interface WaveVisualizerProps {
  fftData: number[];
  isActive: boolean;
  className?: string;
  colorMode?: "user" | "ai" | "default"; // "user" = colored (non-white), "ai" = white, "default" = primary color
}

export default function WaveVisualizer({
  fftData,
  isActive,
  className = "",
  colorMode = "default",
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

      // Cleaner, minimal style - fewer bars with better spacing
      const barCount = 24; // Fixed number of bars for cleaner look
      const gap = 2;
      const padding = 8;
      const availableWidth = width - padding * 2;
      const totalGapWidth = (barCount - 1) * gap;
      const barWidth = Math.max(3, (availableWidth - totalGapWidth) / barCount);
      const maxBarHeight = height - padding * 2;
      
      // Center the bars
      const startX = padding;

      // Get computed CSS color by using a test element
      const getComputedColor = (cssVar: string, fallback: string) => {
        if (typeof window !== 'undefined') {
          try {
            const testEl = document.createElement('div');
            testEl.style.color = `hsl(var(${cssVar}))`;
            testEl.style.position = 'absolute';
            testEl.style.visibility = 'hidden';
            testEl.style.pointerEvents = 'none';
            document.body.appendChild(testEl);
            
            const computedColor = getComputedStyle(testEl).color;
            document.body.removeChild(testEl);
            
            if (computedColor && computedColor !== 'rgba(0, 0, 0, 0)') {
              return computedColor;
            }
          } catch (e) {
            // Fallback if computation fails
          }
        }
        return fallback;
      };

      // Determine colors based on mode
      let primaryColor: string;
      let primaryRgba: string;
      
      if (colorMode === "ai") {
        // White gradient for AI
        primaryColor = 'rgb(255, 255, 255)';
        primaryRgba = 'rgba(255, 255, 255, 0.7)';
      } else if (colorMode === "user") {
        // Colored gradient for user (blue/primary)
        primaryColor = getComputedColor('--primary', 'rgb(59, 130, 246)');
        primaryRgba = primaryColor.replace('rgb', 'rgba').replace(')', ', 0.7)');
      } else {
        // Default primary color
        primaryColor = getComputedColor('--primary', 'rgb(59, 130, 246)');
        primaryRgba = primaryColor.replace('rgb', 'rgba').replace(')', ', 0.7)');
      }

      // Use a gradient for a more polished look
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, primaryRgba);
      ctx.fillStyle = gradient;

      for (let i = 0; i < barCount; i++) {
        // Sample from fftData (map bar index to fft index)
        const fftIndex = Math.floor((i / barCount) * fftData.length);
        const value = Math.min(1, Math.max(0, fftData[fftIndex] || 0));
        
        // Smooth animation with easing
        const barHeight = Math.max(4, value * maxBarHeight * 0.8);
        const x = startX + i * (barWidth + gap);
        const y = height - barHeight - padding;

        // Draw rounded rectangles for smoother look
        const radius = barWidth / 2;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, barWidth, barHeight, radius);
        } else {
          // Fallback for browsers without roundRect support
          const minRadius = Math.min(radius, barWidth / 2, barHeight / 2);
          ctx.moveTo(x + minRadius, y);
          ctx.lineTo(x + barWidth - minRadius, y);
          ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + minRadius);
          ctx.lineTo(x + barWidth, y + barHeight - minRadius);
          ctx.quadraticCurveTo(x + barWidth, y + barHeight, x + barWidth - minRadius, y + barHeight);
          ctx.lineTo(x + minRadius, y + barHeight);
          ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - minRadius);
          ctx.lineTo(x, y + minRadius);
          ctx.quadraticCurveTo(x, y, x + minRadius, y);
        }
        ctx.closePath();
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
  }, [fftData, isActive, colorMode]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        width={400}
        height={60}
        className={`${className} w-full h-full`}
      />
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs text-muted-foreground">Waiting for audio...</div>
        </div>
      )}
    </div>
  );
}
