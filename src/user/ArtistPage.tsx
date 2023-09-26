import React, { useState } from 'react';
import ReactPlayer from 'react-player';

interface ArtistPageProps {}

const ArtistPage: React.FC<ArtistPageProps> = () => {
  // Mock artist and music data within the component
  const artists = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://picsum.photos/200/300',
      bio: 'John Doe is a talented musician known for his amazing music. https://www.youtube.com/watch?v=L_LUpnjgPso&pp=ygUQYm9uZmlyZSA0ayB2aWRlbw%3D%3D',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://picsum.photos/200/300',
      bio: 'Jane Smith is a singer-songwriter with a unique voice. https://www.youtube.com/watch?v=anDLBBLyPB8&pp=ygUINGsgdmlkZW8%3D',
    },
    {
      id: 3,
      name: 'Mary Smith',
      image: 'https://picsum.photos/200/300',
      bio: 'Mary Smith is a singer-songwriter with a unique voice. https://www.youtube.com/watch?v=7PIji8OubXU&pp=ygUINGsgdmlkZW8%3D',
    },
    {
      id: 4,
      name: 'Purity Smith',
      image: 'https://picsum.photos/200/300',
      bio: 'Purity Smith is a singer-songwriter with a unique voice. https://www.youtube.com/watch?v=xqo3Vsm3fVQ&pp=ygUINGsgdmlkZW8%3D',
    },
    // Add more artists as needed
  ];

  // State to track the URL of the most recent uploaded content and the artist being hovered over
  const [recentContentUrl, setRecentContentUrl] = useState<string | null>(null);
  const [hoveredArtist, setHoveredArtist] = useState<number | null>(null);

  // Function to handle hover over an artist's card
  const handleArtistHover = (artistIndex: number) => {
    const youtubeUrlRegex = /(https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+)/;
    const videoUrlMatch = artists[artistIndex].bio.match(youtubeUrlRegex);

    if (videoUrlMatch) {
      setRecentContentUrl(videoUrlMatch[0]);
      setHoveredArtist(artistIndex);
    } else {
      setRecentContentUrl(null);
      setHoveredArtist(null);
    }
  };

  // Function to handle hover out from an artist's card
  const handleArtistHoverOut = () => {
    setRecentContentUrl(null);
    setHoveredArtist(null);
  };

  return (
    <div className="container mx-auto mt-8 p-4 ml-4 mr-4 mx-auto mt-4 bg-white gap-4 bg-auto bg-no-repeat bg-center rounded-lg">
      <h2 className="text-2xl font-bold">Artists</h2>
      <div className="grid grid-cols-3 gap-4">
        {artists.map((artist, index) => (
          <div
            key={artist.id}
            className={`bg-white rounded-lg cursor-pointer`}
            onMouseEnter={() => handleArtistHover(index)}
            onMouseLeave={handleArtistHoverOut} // Add the onMouseLeave event handler
          >
            <div className="mb-2">
              <div
                className="w-full h-0 relative rounded-lg pb-56 bg-cover"
                style={{ backgroundImage: `url(${artist.image})` }}
              >
                {hoveredArtist === index && recentContentUrl && (
                  <ReactPlayer
                    url={recentContentUrl}
                    controls
                    playing={true}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold">{artist.name}</h1>
            <p className="text-gray-500">{artist.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
