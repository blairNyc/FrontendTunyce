// import React, { useState } from 'react';
// import TopContent from './TopContent ';
// import Image from './assests/join.png'
// import UploadContentModal from './UploadContentModal';
// import { useAppSelector } from '../../app/hooks';
// import { RootState } from '../../app/store';

// const ContentCreatorDashboard: React.FC = () => {

//   const userName = useAppSelector((state: RootState) => state.persistAuth.auth.username);
//   console.log(userName)

//   const [isModalOpen, setModalOpen] = useState<boolean>(false);

//   const handleUploadContentClick = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleUpload = (formData: FormData) => {
    
//     console.log('Uploading content...', formData);

//     // Close the modal
//     handleCloseModal();
//   };


//   return (
//     <div className='flex'>
//       <div className="bg-white rounded-lg min-h-screen p-8">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           {/* Card 1: Current Subscribers */}
//           <div className="bg-white p-4 rounded-lg border shadow-md">
//             <h2 className="text-grey font-semibold">Current Subscribers</h2>
//             <p className="text-xl font-bold text-grey-500 mt-2">5,000</p>
//           </div>

//           {/* Card 2: Current Views */}
//           <div className="bg-white p-4 rounded-lg border shadow-md">
//             <h2 className="text-grey font-semibold">Current Views</h2>
//             <p className="text-xl font-bold text-grey-500 mt-2">1,000,000</p>
//           </div>

//           {/* Card 3: Watch Time */}
//           <div className="bg-white p-4 rounded-lg border shadow-md">
//             <h2 className="text-grey font-semibold">Watch Time</h2>
//             <p className="text-xl font-bold text-grey-500 mt-2">100,000 hours</p>
//           </div>
//         </div>

//         {/* Upload Content Card */}
//         <div className="mt-8 bg-white p-8 rounded shadow-md">
//           <div className="flex items-center cursor-pointer" onClick={handleUploadContentClick}>
//             <img
//               src={Image}
//               alt="Upload Content"
//               className="w-full h-full rounded mr-4"
//             />
//             <div>
//               <h2 className="text-2xl font-semibold">Upload Content</h2>
//               <p className="text-gray-600 mt-2">
//                 Showcase your latest content by uploading videos, images, and more.
//               </p>
//               <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
//                 Upload Content
//               </button>
//             </div>
//           </div>
//         </div>
//         <UploadContentModal isOpen={isModalOpen} onClose={handleCloseModal} onUpload={handleUpload} />
//       </div>
//       <div className="ml-4 mt-4 w-1/3">
//         <TopContent />
//       </div>
//     </div>
//   );
// };

// export default ContentCreatorDashboard;
