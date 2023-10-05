import { useEffect, useRef, useState } from 'react'
import '../App.css'
// import {
//   useGetPlayingLinkMutation,
// } from '../app/api/GlobalApiSlice'
// import ReactHls from 'react-hls'
import Hls from 'hls.js';
import 'video.js/dist/video-js.css'
import ReactPlayer from 'react-player';
import { useGetPlayingLinkMutation } from '../app/api/GlobalApiSlice';
import React from 'react';

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
 
  const fullscreenStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.3s ease',
    marginTop:'60px'
  }

  

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

  // const videoRef = useRef<HTMLVideoElement>(null);
  
  const [getPlayingLink, { data }] = useGetPlayingLinkMutation();
  const [mediaUrl, setMediaUrl] = useState("https://www.youtube.com/watch?v=KhEAe2_T-4c")
  const updateMediaUrl = async () => {
    try {
      const data = await getPlayingLink(1).unwrap()
      console.log(data)
      setMediaUrl(data?.url?.media_url)

    } catch (error) {
      console.log(error)
    }
  }
 
  // const videoSrc = 'https://www.youtube.com/watch?v=KhEAe2_T-4c';
  // const [getPlayingLink, { data, isLoading, error }] = useGetPlayingLinkMutation();

  useEffect(() => {
    // const video = videoRef.current;
    updateMediaUrl()
    // setMediaUrl(data?.url?.media_url)


    // if (video) {
    //   if (Hls.isSupported()) {
    //     const hls = new Hls();
    //     hls.loadSource(videoSrc);
    //     hls.attachMedia(video);
    //   } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //     video.src = videoSrc;
    //   } else {
    //     console.error('HLS not supported');
    //   }

    //   return () => {
    //     // Cleanup Hls.js
    //     if (video) {
    //       video.src = '';
    //     }
    //   };
    // }
  }, [ ]);

  return (
    <>
      <div>
          <React.Fragment>
          <div style={fullscreenStyle}>
            <ReactPlayer
                width='100%'
                height='100%'
                url= {mediaUrl}
                playing={true}
                controls={true}
            />
            </div>
          </React.Fragment>
        {/* <video ref={videoRef} controls width={640} height={360}>
          <source src={videoSrc} type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </>
  )
}

VideoScreen.propTypes = {}

export default VideoScreen