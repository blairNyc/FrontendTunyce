import React from 'react';

const TopContent: React.FC = () => {
  const topContentData = {
    title: 'Top Contents',
    songs: [
      {
        id: 1,
        title: 'Song 1',
        thumbnail: 'https://picsum.photos/200/300',
      },
      {
        id: 2,
        title: 'Song 2',
        thumbnail: 'https://picsum.photos/200/300',
      },
      {
        id: 3,
        title: 'Song 3',
        thumbnail: 'https://picsum.photos/200/300',
      },
      {
        id: 4,
        title: 'Song 4',
        thumbnail: 'https://picsum.photos/200/300',
      },
      {
        id: 5,
        title: 'Song 5',
        thumbnail: 'https://picsum.photos/200/300',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="font-semibold">{topContentData.title}</h2>
      <div className="mt-4 w-full flex flex-col gap-2">
        {topContentData.songs.map((song) => (
          <div key={song.id} className='w-full flex flex-row space-x-10 p-1 gap-2 border-b justfy-center align-center'>
            <img
              src={song.thumbnail}
              alt={song.title}
              className="rounded-lg h-10 w-10"
            />
            <h3 className="font-semibold mt-2">{song.title}</h3>
            <p className='mt-2'>03:40</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContent;
