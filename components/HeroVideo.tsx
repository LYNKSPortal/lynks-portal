'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HeroVideoProps {
  playbackId: string;
}

export default function HeroVideo({ playbackId }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

    const attemptPlay = async () => {
      try {
        await video.play();
        setIsLoaded(true);
      } catch (err) {
        console.log('Autoplay prevented, will try on user interaction:', err);
        // Try to play on any user interaction
        const playOnInteraction = () => {
          video.play().then(() => {
            setIsLoaded(true);
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          });
        };
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
      }
    };

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', attemptPlay);
    } else if (Hls.isSupported()) {
      // HLS.js for other browsers
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        autoStartLoad: true,
      });
      
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        attemptPlay();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });

      return () => {
        hls.destroy();
      };
    }
  }, [playbackId]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
      style={{ objectFit: 'cover' }}
    />
  );
}
