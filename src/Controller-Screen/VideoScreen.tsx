import React, { useEffect } from 'react';
import { useGetPlayingLinkMutation } from '../app/api/GlobalApiSlice';
import ReactPlayer from 'react-player';

const VideoScreen = () => {
    const [getPlayingLink, { data, isLoading,isError, error }] = useGetPlayingLinkMutation();

    const fullscreenStyle:React.CSSProperties = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100vh', 
        transition: 'all 0.3s ease',
    };

    useEffect(() => {

        getPlayingLink(1);

    }, [getPlayingLink]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;
  console.log(error)
  const mediaUrl = data?.url?.media_url;

  if (!mediaUrl) return <div>No media URL available.</div>;

  return (
    <div>
        <React.Fragment>
            <div style={fullscreenStyle}>
            <ReactPlayer
                width='100%'
                height='100%'
                url={mediaUrl}
                playing={true}
                controls={true}
            />
            </div>
        </React.Fragment>
    </div>
  );
};

export default VideoScreen;
