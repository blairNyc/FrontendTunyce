function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getContrastTextColor(bgColor: any) {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "text-black" : "text-white";
}

function Homepage() {
  const topArtists = ["Harry", "Taylor", "Steve", "Mark", "Purity", "Ruth"];

  const genreItems = [
    "Hiphop",
    "Electric Pop",
    "Jazz",
    "Dance Beat",
    "Classic",
    "Metal",
    "Rock",
    "Country",
  ];

  return (
    <div className="container">
      <div className="m-20">
        <div className="mb-2">
          <p className="text-universal-primary text-3xl">OUR FEATURES</p>
        </div>
        <div className="mb-10">
          <h1 className="text-5xl font-semibold capitalize">
            Get Premium Access &
          </h1>
          <h1 className="text-5xl font-semibold capitalize">
            Unlock All Popular Songs
          </h1>
        </div>
        <div className="flex flex-row items-center ">
          <button className="bg-universal-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full">
            Get Now
          </button>
          <div className="mx-1.5" />
          <p className="text-universal-primary underline underline-offset-1 opacity-100 hover:opacity-80 cursor-pointer">
            1 Month Free Trial
          </p>
        </div>
      </div>

      <div className="mx-20 bg-white rounded-lg px-5 py-5">
        <div className="flex flex-row items-center mx-4">
          <p className="mr-auto text-xl mb-2 font-semibold">TOP ARTISTS</p>
          <p className="text-md opacity-60 hover:opacity-100 cursor-pointer">
            More List
          </p>
        </div>

        <div className="flex flex-wrap justify-center">
          {topArtists.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center p-1 cursor-pointer"
              >
                <div className="bg-grey shadow-md rounded-lg w-28 h-28"></div>
                <p className="uppercase">{item}</p>
                <p>30M PLAYS</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-10" />
      <div className="mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg">
          <div className="flex flex-row items-center mx-4 my-6">
            <p className="mr-auto text-xl mb-2 font-semibold">TOP ARTISTS</p>
            <p className="text-md opacity-60 hover:opacity-100 cursor-pointer">
              More List
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            {topArtists.map((index) => {
              return (
                <div key={index} className="flex flex-col items-center p-1">
                  <div className="bg-grey shadow-md rounded-lg w-28 h-28"></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg">
          <div className="flex flex-row items-center mx-4 my-6">
            <p className="mr-auto text-xl mb-2 font-semibold">TOP GENRE</p>
            <p className="text-md opacity-60 hover:opacity-100 cursor-pointer">
              More List
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center">
            {genreItems.map((item, index) => {
              const bgColor = getRandomColor();
              const textColorClass = getContrastTextColor(bgColor);
              return (
                <button
                  key={index}
                  className={`px-5 py-4 m-2 rounded-full font-bold ${textColorClass}`}
                  style={{ backgroundColor: bgColor }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
