const MusicPage = () => {
  return (
    <>
      <div className="container">
        <div className="flex justify-between">
          <h5>My Music</h5>
          <div className="flex ml-4">
            <p>Play</p>
            <p>Shuffle</p>
          </div>
        </div>

        <div className="max-w-md mx-auto mt-2 flex flex-col  ">
          {/*Card*/}
          <div className="bg-white shadow-md rounded-lg p-2 mt-2 flex  items-center">
            <div className="w-20 bg-gray-400 h-10 rounded-sm overflow-hidden"></div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Anyone</h2>
              <p className="text-md text-gray-600">Justin Bieber</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">3.12</p>
              <button className="text-sm">likes</button>
              <button className="text-sm">:</button>
            </div>
          </div>
          {/*Card*/}
          <div className="bg-white shadow-md rounded-lg p-2 mt-2 flex  items-center">
            <div className="w-20 bg-gray-400 h-10 rounded-sm overflow-hidden"></div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Leave the door open</h2>
              <p className="text-md text-gray-600">Bruno Mars, Silk Sonic</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">3.12</p>
              <button className="text-sm">likes</button>
              <button className="text-sm">:</button>
            </div>
          </div>
          {/*Card*/}
          <div className="bg-white shadow-md rounded-lg p-2 mt-2 flex  items-center">
            <div className="w-20 bg-gray-400 h-10 rounded-sm overflow-hidden"></div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Anyone</h2>
              <p className="text-md text-gray-600">Justin Bieber</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">3.12</p>
              <button className="text-sm">likes</button>
              <button className="text-sm">:</button>
            </div>
          </div>
          {/*Card*/}
          <div className="bg-white shadow-md rounded-lg p-2 mt-2 flex  items-center">
            <div className="w-20 bg-gray-400 h-10 rounded-sm overflow-hidden"></div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Anyone</h2>
              <p className="text-md text-gray-600">Justin Bieber</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">3.12</p>
              <button className="text-sm">likes</button>
              <button className="text-sm">:</button>
            </div>
          </div>
          {/*Card*/}
          <div className="bg-white shadow-md rounded-lg p-2 mt-2 flex  items-center">
            <div className="w-20 bg-gray-400 h-10 rounded-sm overflow-hidden"></div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Gone</h2>
              <p className="text-md text-gray-600">Rose</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">3.12</p>
              <button className="text-sm">likes</button>
              <button className="text-sm">:</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MusicPage;
