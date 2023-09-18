import React, { useState } from 'react';
import ReactPlayer from 'react-player';

interface Video {
  id: number;
  title: string;
  url: string;
  thumbnail?: string;
}

// Define your list of videos (similar to YouTube homepage)
const videoData: Video[] = [
  {
    id: 1,
    title: 'Sample Video 1',
    thumbnail: 'https://picsum.photos/200/300',
    url: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
  },
  {
    id: 2,
    title: 'Sample Video 2',
    thumbnail: 'https://picsum.photos/200/300',
    url: 'https://www.youtube.com/watch?v=anDLBBLyPB8',
  },
  {
    id: 3,
    title: 'Sample Video 3',
    thumbnail: 'https://picsum.photos/200/300',
    url: 'https://www.youtube.com/watch?v=7PIji8OubXU',
  },
  {
    id: 4,
    title: 'Sample Video 4',
    thumbnail: 'https://picsum.photos/200/300',
    url: 'https://www.youtube.com/watch?v=xqo3Vsm3fVQ',
  },
  // Add more videos as needed
];

const FilmmakerWatch: React.FC = () => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(
    videoData[0].url // Initialize with the URL of the first video
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Function to handle video selection
  const handleVideoSelect = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsPlaying(true);
  };

  return (
    <div className="container mx-auto mt-8 p-4 ml-4 mr-4 mx-auto mt-4 bg-white gap-4 bg-auto bg-no-repeat bg-center rounded-lg">
      <h2 className="text-2xl font-bold">Filmmaker Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {currentVideoUrl && (
            <div className="relative h-0 pb-56">
              <ReactPlayer
                url={currentVideoUrl}
                controls
                playing={isPlaying}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-4">Video List</h3>
          <ul className="space-y-4">
            {videoData.map((video) => (
              <li
                key={video.id}
                onClick={() => handleVideoSelect(video.url)}
                className="cursor-pointer hover:text-blue-500 flex items-center space-x-2"
              >
                <img
                  src={video.thumbnail || 'placeholder.jpg'}
                  alt={`${video.title} Thumbnail`}
                  className="w-16 h-12 rounded"
                />
                <span>{video.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilmmakerWatch;
