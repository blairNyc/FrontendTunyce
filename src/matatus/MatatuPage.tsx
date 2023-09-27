import React, { useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import AddMatatuModal from "./AddMatatuPage";
const MatatuPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="container">
        {/*Title */}

        <div className="flex justify-between  text-red-500">
          <div className="">
            <h3 className="font-bold">My Matatus</h3>
          </div>
          <div className=" flex">
            <button onClick={openModal}>
              <VscDiffAdded />
            </button>

            <h4 className="ml-2 mr-3">New Matatu</h4>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="https://www.w3schools.com/images/w3schools_green.jpg" alt="image" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">KAA 123A</div>
            </div>
        </div>

        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
          <h5 className="ml-3">KAA 123A</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end ">
          <h5 className="ml-3">KCB 1234</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
          <h5 className="ml-3">KCK 1212B</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
          <h5 className="ml-3">KAA 123A</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end ">
          <h5 className="ml-3">KCB 1234</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
          <h5 className="ml-3">KCK 1212B</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
          <h5 className="ml-3">KAA 123A</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end ">
          <h5 className="ml-3">KCB 1234</h5>
        </div>
        <div className="bg-slate-300 rounded-lg h-32 flex flex-col justify-end">
          <h5 className="ml-3">KCK 1212B</h5>
        </div>
      </div>
      {/* Render the modal */}
      <AddMatatuModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
export default MatatuPage;
