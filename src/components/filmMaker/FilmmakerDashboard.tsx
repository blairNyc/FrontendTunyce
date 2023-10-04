import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

type VideoData = {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
};

const videoData: VideoData[] = [
  {
    id: 1,
    title: 'Sample Video 1',
    thumbnail: "https://picsum.photos/200/300",
    url: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
  },
  {
    id: 2,
    title: 'Sample Video 2',
    thumbnail: "https://picsum.photos/200/300",
    url: 'https://www.youtube.com/watch?v=anDLBBLyPB8',
  },
  {
    id: 3,
    title: 'Sample Video 3',
    thumbnail: "https://picsum.photos/200/300",
    url: 'https://www.youtube.com/watch?v=7PIji8OubXU',
  },
  {
    id: 4,
    title: 'Sample Video 4',
    thumbnail: "https://picsum.photos/200/300",
    url: 'https://www.youtube.com/watch?v=xqo3Vsm3fVQ',
  },
];

const FilmmakerDashboard: React.FC = () => {

  const { id } = useParams<{ id?: string }>(); 

  const selectedVideoId = id ? parseInt(id, 10) : 0;

  const selectedVideo = videoData.find((video) => video.id === selectedVideoId);

  const navigate = useNavigate();

  const handleVideoClick = (videoUrl: string) => {
    navigate(`/filmmaker-watch/${encodeURIComponent(videoUrl)}`);
  };
  

  return (
    <div className="container mx-auto mt-8 p-4 ml-4 mr-4 bg-white gap-4 bg-auto bg-no-repeat bg-center rounded-lg">
      <h2 className="text-2xl font-bold">Film Home</h2>
      <div className="grid grid-cols-3 gap-4">
        {videoData.map((video) => (
          <div key={video.id} className="bg-white rounded-lg">
            {/* Use handleVideoClick to navigate to the selected video */}
            <Link
              to={`/filmmaker-dashboard/${video.id}`} 
              onClick={(e) => {
                e.preventDefault();
                handleVideoClick(video.url);
              }}
              className="block"
            >
              <img
                src={video.thumbnail}
                alt={`${video.title} Thumbnail`}
                className="w-full h-auto"
              />
              <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <div>
          <h2>Selected Video Details</h2>
          <p>ID: {selectedVideo.id}</p>
          <p>Title: {selectedVideo.title}</p>
          <p>Thumbnail: {selectedVideo.thumbnail}</p>
        </div>
      )}
    </div>
  );
};

export default FilmmakerDashboard;
