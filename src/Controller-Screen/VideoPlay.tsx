import { useEffect, useRef } from 'react'
import '../App.css'
// import {
//   useGetPlayingLinkMutation,
// } from '../app/api/GlobalApiSlice'
// import ReactHls from 'react-hls'
import Hls from 'hls.js';
import 'video.js/dist/video-js.css'

const VideoScreen = () => {
 
  // const fullscreenRef = useRef<HTMLDivElement>(null)

  // const element = fullscreenRef.current

  // const activateFullscreen = () => {
  //   if (element && element.requestFullscreen) {
  //     element.requestFullscreen().catch(() => {
  //       console.error('Could not activate full-screen mode :(')
  //     })
  //   }
  // }

  // const divStyle = {
  //   height: '100vh',
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  // }
 
  // const fullscreenStyle: React.CSSProperties = {
  //   position: 'fixed',
  //   top: 0,
  //   right: 0,
  //   width: '100%',
  //   height: '40%',
  //   transition: 'all 0.3s ease',
  //   marginTop:'60px'
  // }

  // const [getPlayingLink, { data, isLoading, error }] = useGetPlayingLinkMutation();


  // useEffect(() => {

  //   getPlayingLink(1);

  // }, [getPlayingLink]);

  // if (isLoading) return <div>Loading...</div>;

  // if (error) return <div>Error</div>;

  // console.log(data);

  // const mediaUrl = data?.message?.url?.media_url;
  // console.log(mediaUrl)

  // if (!mediaUrl) return <div>No media URL available.</div>;

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = 'https://example.com/your-hls-video-url.m3u8';
  // const [getPlayingLink, { data, isLoading, error }] = useGetPlayingLinkMutation();

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      } else {
        console.error('HLS not supported');
      }

      return () => {
        // Cleanup Hls.js
        if (video) {
          video.src = '';
        }
      };
    }
  }, [videoSrc]);

  return (
    <>
      <div>
          {/* <React.Fragment>
            <div style={fullscreenStyle}>
              <ReactHls
                url={`${mediaUrl}`}
                width='100%'
                height='100vh'
                playing={true}
                controls
              />
            </div>
          </React.Fragment> */}
        <video ref={videoRef} controls width={640} height={360}>
          <source src={videoSrc} type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}

VideoScreen.propTypes = {}

export default VideoScreen