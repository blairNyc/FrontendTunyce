import React from 'react';

const videoData = [
  {
    id: 1,
    title: 'Video 1',
    thumbnail: 'thumbnail-1.jpg',
    // Other video properties
  },
  {
    id: 2,
    title: 'Video 2',
    thumbnail: 'thumbnail-2.jpg',
    // Other video properties
  },
  // Add more video data as needed
];

const Videos: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Uploaded Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoData.map((video) => (
          <div key={video.id} className="bg-white p-4 rounded shadow-md">
            <img src={video.thumbnail} alt={video.title} className="w-full" />
            <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
            {/* Add other video information as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
