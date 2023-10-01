import React, { useEffect} from 'react';
import Loader from '../assets/loader.mp4';
interface VideoScreenProps {
    onVideoEnd: () => void;
  }

const VideoLoader = ({ onVideoEnd }:VideoScreenProps) => {

    const videoRef = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();

      const timeoutId = setTimeout(() => {
        onVideoEnd();
      }, 20000); // 20,000 milliseconds (20 seconds)

      videoRef.current.addEventListener('ended', () => {
        clearTimeout(timeoutId);
        onVideoEnd();
      });
    }
  }, [onVideoEnd]);

  const fullscreenStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    height: '40%',
    transition: 'all 0.3s ease',
    marginTop:'60px'
  }

  return (
    <div style={fullscreenStyle}>
      <video ref={videoRef} width="100%" height="100vh" controls>
        <source src={Loader} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoader;
