'use client';

import { useRef, useState } from 'react';
import styles from '@/styles/VideoPlayer.module.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  caption?: string;
}

const VideoPlayer = ({ src, poster, caption }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          className={styles.video}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && poster && (
          <div className={styles.playOverlay} onClick={handlePlayPause}>
            <div className={styles.playButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.playIcon}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
};

export default VideoPlayer;
