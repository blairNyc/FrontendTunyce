import React, { FC } from "react";
import { MdCloudUpload } from "react-icons/md";

interface AddMatatuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMatatuModal: FC<AddMatatuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container bg-white rounded-md mx-auto">
        {/* Add your modal content here */}
        <div className="modal-content">
          {/* Add form or content for adding a matatu */}
          <form className="flex flex-col mr-5 ml-5" action="">
            <h2>New Matatu</h2>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="mb-6">
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="plate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Number of Plate"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="route"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Route"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="seats"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Number of Seats"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className=" text-sm">
                <p>Please set your preffered Controller and Player Passwords</p>
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <div className="mb-6">
                  <input
                    type="text"
                    id="seats"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Driver Password"
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    id="seats"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Player Password"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h4>Photo Interior</h4>
                <div className=" flex flex-col items-center justify-items-center w-60 h-32 rounded-md shadow-md border border-dashed border-black mr-3">
                  <div className="">
                    <button>
                      <MdCloudUpload />
                    </button>
                  </div>
                  <div className="">
                    <p>Drag & Drop files or Browser</p>
                  </div>
                  <div className="">
                    <p className="text-xs">Supported formats JPENG,PNG</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h4>Photo Exterior</h4>
                <div className=" flex flex-col  items-center justify-items-center w-60 h-32 rounded-md shadow-md border border-dashed border-black  ">
                  <div className="">
                    <button>
                      <MdCloudUpload />
                    </button>
                  </div>
                  <div className="">
                    <p>Drag & Drop files or Browser</p>
                  </div>
                  <div className="">
                    <p className="text-xs">Supported formats JPENG,PNG</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-600 text-white rounded-lg w-60 mt-6"
                onClick={onClose}
              >
                Submit
              </button>
            </div>
          </form>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddMatatuModal;
