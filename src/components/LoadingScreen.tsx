"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "@/styles/LoadingScreen.module.css";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [clipPath, setClipPath] = useState(
    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  );
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const generateWavyClipPath = useCallback(
    (fillLevel: number, wavePhase: number) => {
      const waveHeight = 6; // Height of the wave oscillation
      const points: string[] = [];

      // Create wavy top edge with smooth sine wave
      for (let x = 0; x <= 100; x += 5) {
        const wave = Math.sin(x * 0.08 + wavePhase) * waveHeight;
        const y = Math.max(0, Math.min(100, fillLevel + wave));
        points.push(`${x}% ${y}%`);
      }

      // Close the polygon at the bottom
      points.push("100% 100%");
      points.push("0% 100%");

      return `polygon(${points.join(", ")})`;
    },
    [],
  );

  useEffect(() => {
    const fillDuration = 3000; // 3 seconds to fill

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const fillProgress = Math.min(elapsed / fillDuration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - fillProgress, 3);
      const fillLevel = 100 - eased * 100; // 100 = bottom, 0 = top

      // Wave phase for continuous wave movement
      const wavePhase = elapsed * 0.003;

      setClipPath(generateWavyClipPath(fillLevel, wavePhase));

      // Continue animation as long as we're filling or waves should animate
      if (fillProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Keep waves moving even after fill is complete
        const continueWaves = (ts: number) => {
          const phase = ts * 0.003;
          setClipPath(generateWavyClipPath(0, phase));
          animationRef.current = requestAnimationFrame(continueWaves);
        };
        animationRef.current = requestAnimationFrame(continueWaves);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generateWavyClipPath]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.loadingScreen} ${!isLoading ? styles.fadeOut : ""}`}
    >
      <div className={styles.textContainer}>
        <h1 className={styles.title}>David Yu</h1>
        <div className={styles.waterMask} style={{ clipPath }}>
          <h1 className={styles.titleFilled}>David Yu</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
