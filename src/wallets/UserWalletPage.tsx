import { BiMoneyWithdraw, BiMoney } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
const UserWalletPage = () => {
  return (
    <>
      <div className="container">
        {/*Header*/}
        <div className="flex justify-between ">
          <div className="">
            <h3>Wallet</h3>
          </div>
          <div className="flex">
            <div className="">
              <button>
                <BiMoney />
              </button>
              <button>Deposit</button>
            </div>
            <div className="">
              <button>
                <BiMoneyWithdraw />
              </button>
              <button>Withdraw</button>
            </div>
          </div>
        </div>
        {/*End Header*/}
        {/*Main Card*/}
        <div className="ml-4 mr-4 mx-auto mt-4 rounded-md bg-white flex flex-col">
          {/*Financial Record*/}
          <div className="">
            <div className="flex justify-between">
              <div className="">
                <p>Financial Record</p>
              </div>
              <div className="">
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mr-3 ml-3">
              <div className="flex flex-col border-solid border-2 rounded-md items-center">
                <p>Total Balance</p>
                <p>KES 25000.00</p>
                <p>31% from last month</p>
              </div>
              <div className="flex flex-col border-solid border-2 rounded-md items-center">
                <p>Total Deposited</p>
                <p>KES 19000.00</p>
                <p>2% from last month</p>
              </div>
              <div className="flex flex-col border-solid border-2 rounded-md items-center">
                <p>Total Paid</p>
                <p>KES 16000.00</p>
                <p>15% from last month</p>
              </div>
            </div>
          </div>
          {/*End Financial Record*/}
          {/*Statics*/}
          <div className=" rounded-md">
            <p>Stastics</p>
          </div>
          {/*End Statics*/}
          {/*transaction History*/}
          <div className="flex flex-col rounded-md ">
            <div className="">
              <p>Transaction History</p>
              <p>History of the last 3 months</p>
            </div>
            <div className="">
              <div className="relative overflow-x-auto">
                <table className=" mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
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
    </>
  );
};

export default UserWalletPage;
