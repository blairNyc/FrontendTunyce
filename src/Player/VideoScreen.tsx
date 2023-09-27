import React, { useEffect, useRef, useState } from 'react'
import '../../../App.css'
import {
  useGetPlayingLinkMutation,
  useSwitchVideoTimeMutation,
  useVideoEndUpdatesMutation,
  useGetSingleVenueQuery
} from '../app/api/GlobalApiSlice'

import ReactPlayer from 'react-player'
import 'video.js/dist/video-js.css'


const isYouTubeURL = (url: string): boolean => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url)
}
const VideoScreen = (props: any) => {
  const [isYouTubeVideo, setIsYouTubeVideo] = useState<boolean>(false)

  const [prevPlayedSeconds, setPrevPlayedSeconds] = useState<number | null>(
    null,
  )

  const {
    data: matatu,
    isSuccess,
  } = useGetSingleVenueQuery(
    { pollingInterval: 3000 },
  )

  const [playingLink, setPlayingLink] = useState('yes')
  const [videoId, setVideoId] = useState('yes')

  const [playingLinkUpdate] = useGetPlayingLinkMutation()
  const [playing, setPlaying] = useState(true)

  const [switchVideoTime] = useSwitchVideoTimeMutation()
  // const fullScreenHandle = useFullScreenHandle;


  const [videoHasEnded] = useVideoEndUpdatesMutation()


  const updateMatatu = (data: any) => {
    // Send an 'update' action to update the matatu
    // socket.send(JSON.stringify({ action: 'update', ...data }));
  }

  const handleVideoEnded = async () => {
    updateMatatu({
      playlistOn: true,
    })
    await videoHasEnded(matatu.id)
    updatePlayingLink()
  }

  const handleProgress = (state: any) => {
    setPrevPlayedSeconds(Math.round(state.playedSeconds))
  }

  const handlePlayerReady = () => {
    if (prevPlayedSeconds !== null) {
      console.log('This is the very start')

      switchVideoTime(prevPlayedSeconds)
    }
  }

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
    background: `url(${matatu?.playingAddvert.video})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
  const updatePlayingLink = async () => {
    try {
      const link = await playingLinkUpdate(matatu?.id).unwrap()
      setPlayingLink(link?.playingLink)
      setVideoId(link?.videoId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    if (matatu?.needsUpdate == true) {
      updatePlayingLink()
    }
  }, [isSuccess, matatu?.needsUpdate])
  let player: React.ReactInstance | null | undefined = null
  const playerRef = React.useRef<ReactPlayer>(null)
  const ref = (p: any) => {
    player = p
  }
  useEffect(() => {
    setIsYouTubeVideo(isYouTubeURL(playingLink))
  }, [playingLink])

  const fullscreenStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    height: '40%',
    transition: 'all 0.3s ease',
  }

  return (
    <>
      <div>
      
          <React.Fragment>
            {isYouTubeVideo ? (
              <div style={fullscreenStyle}>
                <ReactPlayer
                  width='100%'
                  height={matatu.drawBackIsOn ? '80vh' : '100vh'}
                  ref={playerRef}
                  url={playingLink}
                  playing={true}
                  controls={true}
                />
              </div>):(
                <div style={fullscreenStyle}>
                <ReactPlayer
                  width='100%'
                  height={matatu.drawBackIsOn ? '80vh' : '100vh'}
                  ref={playerRef}
                  url={playingLink}
                  playing={true}
                  controls={true}
                />
              </div>
              )}
          </React.Fragment>      
       
      </div>
    </>
  )
}

VideoScreen.propTypes = {}

export default VideoScreen
