import React, { useEffect, useRef } from 'react'
import '../App.css'
import {
  useGetPlayingLinkMutation,
} from '../app/api/GlobalApiSlice'
import ReactHls from 'react-hls'
import 'video.js/dist/video-js.css'

const VideoScreen = (props: any) => {
 
  const fullscreenRef = useRef<HTMLDivElement>(null)

  const element = fullscreenRef.current

  const activateFullscreen = () => {
    if (element && element.requestFullscreen) {
      element.requestFullscreen().catch(() => {
        console.error('Could not activate full-screen mode :(')
      })
    }
  }

  const divStyle = {
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
 
  const fullscreenStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    height: '40%',
    transition: 'all 0.3s ease',
    marginTop:'60px'
  }

  const [getPlayingLink, { data, isLoading, error }] = useGetPlayingLinkMutation();


  useEffect(() => {

    getPlayingLink(1);

  }, [getPlayingLink]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  console.log(data);

  const mediaUrl = data?.message?.url?.media_url;
  console.log(mediaUrl)

  if (!mediaUrl) return <div>No media URL available.</div>;

  return (
    <>
      <div>
          <React.Fragment>
            <div style={fullscreenStyle}>
              <ReactHls
                url={`${mediaUrl}`}
                width='100%'
                height='100vh'
                playing={true}
                controls
              />
            </div>
          </React.Fragment>
      </div>
    </>
  )
}

VideoScreen.propTypes = {}

export default VideoScreen