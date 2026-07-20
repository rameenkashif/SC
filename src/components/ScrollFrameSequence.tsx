import React, { useEffect, useRef } from "react";

interface ScrollFrameSequenceProps {
  /** 0 to 1 scroll progress driving which frame is shown */
  progress: number;
  frameCount: number;
  /** 0-indexed frame -> image URL */
  framePath: (index: number) => string;
  className?: string;
}

/**
 * Canvas-based scroll-scrubbed image sequence (Apple-style "scroll video").
 * Frames are preloaded once and drawn cover-fit into the canvas as `progress` changes,
 * so scrubbing never depends on real <video> decode/seek performance.
 */
export const ScrollFrameSequence: React.FC<ScrollFrameSequenceProps> = ({
  progress,
  frameCount,
  framePath,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(-1);

  const draw = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let dw: number, dh: number, dx: number, dy: number;
    if (imgRatio > canvasRatio) {
      dh = ch;
      dw = dh * imgRatio;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = dw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Preload the full frame sequence once.
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        if (i === currentIndexRef.current || currentIndexRef.current === -1) {
          draw(i);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  // Keep the canvas' pixel size in sync with its box.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect ? Math.round(rect.width) : window.innerWidth;
      canvas.height = rect ? Math.round(rect.height) : window.innerHeight;
      draw(currentIndexRef.current === -1 ? 0 : currentIndexRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Advance the frame as scroll progress changes.
  useEffect(() => {
    const idx = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * (frameCount - 1))));
    if (idx !== currentIndexRef.current) {
      currentIndexRef.current = idx;
      draw(idx);
    }
  }, [progress, frameCount]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
