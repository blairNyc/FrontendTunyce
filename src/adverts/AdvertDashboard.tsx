import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import Image from '../components/creator/assests/join.png'
import { RootState } from '../app/store';
import UploadAdvertModal from './components/UploadAdvertModal';
import { useNavigate } from 'react-router-dom';
import Adverts from './components/Adverts';
import Schedules from './components/Schedules';

const AdvertDashboard: React.FC = () => {

  const userName = useAppSelector((state: RootState) => state.persistAuth.auth.username);
  console.log(userName)

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleUploadContentClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const navigate = useNavigate()

  const handleUpload = (formData: FormData) => {
    
    console.log('Uploading content...', formData);

    // Close the modal
    handleCloseModal();
  };


  return (
    <div className='flex'>
      <div>
        <iframe
          src="https://customer-dlfgw97wf2jxho9p.cloudflarestream.com/ea9e056c360c2e8faf11eff9a0815f0b/iframe"
          // style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowfullscreen="true"
        ></iframe>
      </div>

      <div className="bg-white rounded-lg min-h-screen p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Card 1: Current Subscribers */}
          <div className="bg-white p-4 rounded-lg border shadow-md">
            <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600" onClick={()=>{navigate("/advertorders")}}>
                Schedule Adverts
            </button>
          </div>

          {/* Card 2: Current Views */}
          <div className="bg-white p-4 rounded-lg border shadow-md">
            <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600" onClick={()=>{
                window.open('https://bit.ly/Tunadpro', '_blank', 'noopener')
            }}>
                Create Ad Content
            </button>
          </div>

          {/* Card 3: Watch Time */}
          <div className="bg-white p-4 rounded-lg border shadow-md">
             <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"  onClick={()=>{
                navigate("/advertreports")
            }}>
                View Advert Reports
            </button>
          </div>
        </div>

        {/* Upload Content Card */}
        <div className="mt-8 bg-white p-8 rounded shadow-md">
          <div className="flex items-center cursor-pointer" onClick={handleUploadContentClick}>
            <img
              src={Image}
              alt="Upload Adverts"
              className="w-full h-full rounded mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">Upload Adverts</h2>
              <p className="text-gray-600 mt-2">
                Upload your adverts and proceed to schedule them.
              </p>
              <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                Upload Adverts
              </button>
            </div>
          </div>
        </div>
        <UploadAdvertModal isOpen={isModalOpen} onClose={handleCloseModal} onUpload={handleUpload} />
      </div>
      <div className="ml-4 mt-4 w-1/3">
        <Adverts />
        <Schedules />
      </div>
      
    </div>
  );
};

export default AdvertDashboard;
