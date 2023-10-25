import { useState } from "react";
import { BiMoneyWithdraw, BiMoney } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import DepositModal from "./DepositModal";

const UserWalletPage = () => {

  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);

  const openDepositModal = () => {
    setIsDepositModalOpen(true);
    console.log("Clickkkkk")
  };

  const closeModal = () => {
    setIsDepositModalOpen(false);
  };

  const [displaySuccessNotification, setDisplaySuccessNotification] = useState<boolean>(false);

  const successRegistration = () => {
    setIsDepositModalOpen(false);
  
    setDisplaySuccessNotification(true)
    const timer = setTimeout(() => {
      setDisplaySuccessNotification(false)
    }, 3000);

    return () => clearTimeout(timer);
  }


  return (
    <>
      <div className="container">
        {/*Header*/}
        <div className="flex justify-between text-red-500">
          <div>
            <h3 className="font-bold">Wallet</h3>
          </div>
          <div className="flex">
            <div className="flex mr-5" >
              <button className="text-md">
                <BiMoney />
              </button>
              <button className="text-sm" onClick={openDepositModal}>Deposit</button>
            </div>
            <div className="flex mr-3">
              <button className="text-md">
                <BiMoneyWithdraw />
              </button>
              <button className="text-sm">Withdraw</button>
            </div>
          </div>
        </div>
        {/*End Header*/}
        {/*Main Card*/}
        <div className="ml-3 mr-3 mx-auto mt-4 rounded-md bg-white flex flex-col">
          {/*Financial Record*/}
          <div className=" mt-4 mr-10 ml-10">
            <div className="flex justify-between mt-3">
              <div className="">
                <p className="font-bold">Financial Record</p>
              </div>
              <div className="">
                <p className="text-xs">Last 30 days</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 ">
              <div className="flex flex-col border-solid border-2 rounded-lg items-center ">
                <p className="text-md">Total Balance</p>
                <p className="font-bold">KES 25000.00</p>
                <p className="text-xs ">
                  <button className="text-emerald-500">
                    <FaArrowTrendUp />
                  </button>
                  31% from last month
                </p>
              </div>
              <div className="flex flex-col border-solid border-2 rounded-lg items-center">
                <p className="text-md">Total Deposited</p>
                <p className="font-bold">KES 19000.00</p>
                <p className="text-xs">
                  <button className="text-red-500">
                    <FaArrowTrendDown />
                  </button>
                  2% from last month
                </p>
              </div>
              <div className="flex flex-col border-solid border-2 rounded-lg items-center">
                <p className="text-md">Total Paid</p>
                <p className="font-bold">KES 16000.00</p>
                <p className="text-xs">
                  <button className="text-emerald-500">
                    <FaArrowTrendUp />
                  </button>
                  15% from last month
                </p>
              </div>wallet
            </div>
          </div>
          {/*End Financial Record*/}
          {/*Statics*/}
          <div className=" rounded-lg  mt-4 mr-10 ml-10">
            <p className="font-bold">Statistics</p>
          </div>
          {/*End Statics*/}
          {/*transaction History*/}
          <div className="bg-gray-300  rounded-lg flex flex-col mt-4 mr-10 ml-10 ">
            <div className="flex justify-between">
              <div className="">
                <p className="font-bold">Transaction History</p>
                <p className="text-xs">History of the last 3 months</p>
              </div>
              <div className="">
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>

            <div className="">
              <div className="relative overflow-x-auto">
                <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Transaction
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">Dj Kalonje</td>
                      <td className="px-6 py-4">10/09/2023</td>
                      <td className="px-6 py-4">ASD12344</td>
                      <td className="px-6 py-4">KES 100</td>
                      <td className="px-6 py-4">Sending</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">Dj Kalonje</td>
                      <td className="px-6 py-4">10/09/2023</td>
                      <td className="px-6 py-4">ASD12344</td>
                      <td className="px-6 py-4">KES 100</td>
                      <td className="px-6 py-4">Sending</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">Dj Kalonje</td>
                      <td className="px-6 py-4">10/09/2023</td>
                      <td className="px-6 py-4">ASD12344</td>
                      <td className="px-6 py-4">KES 100</td>
                      <td className="px-6 py-4">Sending</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">Dj Kalonje</td>
                      <td className="px-6 py-4">10/09/2023</td>
                      <td className="px-6 py-4">ASD12344</td>
                      <td className="px-6 py-4">KES 100</td>
                      <td className="px-6 py-4">Sending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/*end of Transaction History*/}
        </div>
        {/*Main Card*/}
      </div>

      <DepositModal isOpen={isDepositModalOpen} onClose={closeModal} isRegistrationSuccessFull={successRegistration} />

      {
        displaySuccessNotification &&
        <div className="absolute right-10 top-10 z-50">
          <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">Matatu Created Successfully</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        </div>

      }
    </>
  );
};

export default UserWalletPage;
