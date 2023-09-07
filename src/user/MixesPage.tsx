const MixesPage = () => {
  return (
    <>
      <div className="container">
        <div className="flex justify-between">
          <h3 className="">Mixes</h3>
          <div className="flex">
            <p>Play</p>
            <p>Shuffle</p>
          </div>
        </div>
        {/*Main Card*/}
        <div className="bg-white shadow-md rounded-md w-75 mt-2 h-auto">
          <h4>11 Mixes</h4>
          <div className="max-w-md mx-auto mt-2 flex flex-row  ">
            {/*Mix*/}
            <div className="container">
              <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
              <p>Partyglow</p>
              <p>Dj Shady</p>
            </div>
            {/*Mix*/}
            <div className="container">
              <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
              <p>Anyone</p>
              <p>Dj Dree</p>
            </div>
            {/*Mix*/}
            <div className="container">
              <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
              <p>Cry for Me</p>
              <p>Dj Tryce</p>
            </div>
          </div>

          <div className="max-w-md mx-auto mt-2 flex flex-row  ">
            {/*Mix*/}
            <div className="container">
              <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
              <p>Partyglow</p>
              <p>Dj Shady</p>
            </div>
            {/*Mix*/}
            <div className="container">
              <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
              <p>Anyone</p>
              <p>Dj Dree</p>
            </div>
            {/*Mix*/}
            <div className="container">
              <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
              <p>Cry for Me</p>
              <p>Dj Tryce</p>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto mt-2 flex flex-row  ">
          {/*Mix*/}
          <div className="container">
            <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
            <p>Partyglow</p>
            <p>Dj Shady</p>
          </div>
          {/*Mix*/}
          <div className="container">
            <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
            <p>Anyone</p>
            <p>Dj Dree</p>
          </div>
          {/*Mix*/}
          <div className="container">
            <div className="bg-gray-300 w-32 h-32 rounded-md shadow-md"></div>
            <p>Cry for Me</p>
            <p>Dj Tryce</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default MixesPage;
