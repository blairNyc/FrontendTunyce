import React, { useState } from 'react';

interface ArtistPageProps {}

const ArtistPage: React.FC<ArtistPageProps> = () => {
  // Mock artist and music data within the component
  const artists = [
    {
      id: 1,
      name: 'John Doe',
      image: 'john-doe.jpg',
      bio: 'John Doe is a talented musician known for his amazing music.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'jane-smith.jpg',
      bio: 'Jane Smith is a singer-songwriter with a unique voice.',
    },
    // Add more artists as needed
  ];

  const music = [
    {
      id: 1,
      title: 'Song 1',
      genre: 'Pop',
      artistId: 1, // Artist ID for John Doe
    },
    {
      id: 2,
      title: 'Song 2',
      genre: 'Rock',
      artistId: 1, // Artist ID for John Doe
    },
    {
      id: 3,
      title: 'Song 3',
      genre: 'Hip Hop',
      artistId: 2, // Artist ID for Jane Smith
    },
    // Add more songs as needed
  ];

  // State to track the selected artist index
  const [selectedArtistIndex, setSelectedArtistIndex] = useState<number | null>(null);

  const handleArtistSelect = (index: number) => {
    setSelectedArtistIndex(index);
  };

  const selectedArtist = selectedArtistIndex !== null ? artists[selectedArtistIndex] : null;

  // Filter music by the selected artist
  const selectedArtistMusic =
    selectedArtist !== null ? music.filter((song) => song.artistId === selectedArtist.id) : [];

  return (
    <div className="container mx-auto mt-8 p-4 flex ml-4 mr-4 mx-auto mt-4 bg-gray bg-auto bg-no-repeat bg-center rounded-lg">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold">Artists</h2>
        <ul className="mt-4">
          {artists.map((artist, index) => (
            <li
              key={artist.id}
              onClick={() => handleArtistSelect(index)}
              className={`cursor-pointer mb-2 ${
                index === selectedArtistIndex ? 'text-blue-500 font-semibold' : ''
              }`}
            >
              {artist.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/2 ml-4">
        {selectedArtist ? (
          <>
            <div className="mb-4">
              <img src={selectedArtist.image} alt={selectedArtist.name} className="w-full" />
            </div>
            <h1 className="text-2xl font-bold">{selectedArtist.name}</h1>
            <p className="text-gray-500">{selectedArtist.bio}</p>
          </>
        ) : (
          <p className="text-gray-500">Select an artist to view their information.</p>
        )}
      </div>
      <div className="mt-4 w-full  ">
        <h2 className="text-2xl font-bold">Music</h2>
        <ul className="mt-4 flex flex-wrap gap-6">
          {selectedArtistMusic.map((song) => (
            <li key={song.id} className="mb-2 bg-gray-300 hover:bg-gray-500 w-32 h-32  rounded-md shadow-md">
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p>{song.genre}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistPage;
