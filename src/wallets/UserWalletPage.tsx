import { useEffect, useState } from "react";
import DepositModal from "./DepositModal";
import DepositIcon from '/deposit.svg';
import WithdrawIcon from '/withdraw.svg';
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs';
import Chart from 'react-apexcharts';
import { useCheckWalletBalanceQuery, useCheckWalletTransactionsQuery, useConnectWalletMutation } from "../app/api/GlobalApiSlice";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { Transaction } from "../types";
const ActionButton = ({ text, children }: { text: string, children: React.ReactNode }) => (
  <button className="bg-bg-primary flex items-center hover:bg-gray-200 text-white px-4 py-1">
    {children}
    <span className='text-text-primary text-xs md:text-sm font-bold'>{text}</span>
  </button>
);
const StatItem = ({ text, children, price }: { text: string, price: string, children: React.ReactNode }) => (
  <div className='border py-3 m-2 px-2 rounded-xl w-full md:w-48 h-28 border-b-gray-200'>
    <p className='text-sm lg:sm text-slate-600 my-1'>{text}</p>
    <h2 className='text-sm lg:text-lg font-bold text-black my-1'>{price}</h2>
    <p className='text-xs text-slate-600 my-1'>
      {children}
      {/*  */}
      <span className='text-xs lg:text-sm text-green-400'>31% </span>
      from 30 days
    </p>
  </div>
);
const TableHeaderText = ({ text }: { text: string }) => <th className='px-1 text-xs py-2'>{text}</th>
const TableDataText = ({ text, additionalStyles }: { text: string, additionalStyles?: string }) => <td className={`px-1 ${additionalStyles} text-xs py-2`}>{text}</td>
const date = new Date('10/28/2023');


interface MessageData {
  id: number;
  uuid: string;
  amount: string;
  owner: number;
}

interface BalanceResponse {
  message: MessageData;
}

interface TransactionResponse {
  message : Transaction
}

const capitalizeFirstLetter = (text:string)=>{
  return text[0].toUpperCase()+text.slice(1,text.length)
}

const UserWalletPage = () => {
  
  const authVal = useAppSelector((state: RootState) => state.persistAuth.auth);

  const[submitWalletUser] = useConnectWalletMutation()

  const { data: walletBalance } = useCheckWalletBalanceQuery(1)
  const { data: transactionHistory } = useCheckWalletTransactionsQuery(1)
  console.log(transactionHistory)

  const [totalWalletBalance, setTotalWalletBalance] = useState<BalanceResponse>()

  const [transactionHistoryDetails, setTransactionHistoryDetails] = useState<TransactionResponse>()
  // console.log(transactionHistoryDetails)


  useEffect(() => {
    const fetchData = async () => {
      try {
        await submitWalletUser(1)
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    if(walletBalance !== null) {
      setTotalWalletBalance(walletBalance)
    }
  }, [walletBalance])

  
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);

  const openDepositModal = () => {
    setIsDepositModalOpen(true);
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

  const apexOptions = {
    series: [{
      name: 'Deposit',
      data: [31, 40, 28, 51, 42, 109, 100],
      type: 'area'
    }, {
      name: 'Spent',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      background: '#fff',
      dataLabels: {
        enabled: false
      },
      colors: ["#43E2B7", "#F25D3B"],
      stroke: {
        curve: 'smooth',
        width: [1, 1.5, 5],
        dashArray: [0, 8, 1]
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  };


  return (
    
    <div className="mt-8  h-screen">
      <div className="flex w-full items-center justify-between">
        <h2 className="md:text-2xl text-text-primary font-bold">My Wallet</h2>
        <div className='flex items-center'>
          <div onClick={openDepositModal}>
            <ActionButton text='Deposit'>
              <img src={DepositIcon} alt="" className="w-6 h-6 mr-2" />
            </ActionButton>
          </div>
          <ActionButton text='Withdraw'>
            <img src={WithdrawIcon} alt="" className="w-6 h-6 mr-2" />
          </ActionButton>
        </div>
      </div>
      <div className='grid grid-cols-4'>
        <div className='bg-white col-span-4 lg:col-span-3 w-full rounded-xl h-full md:mx-2 px-2'>
          <div className='my-2'>
            <div className='flex p-2 items-center justify-between'>
              <h2 className='text-sm md:text-xl font-bold text-black'>Financial Record</h2>
              <select id="countries" className="bg-white border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-text-primary focus:border-text-primary  dark:bg-gray-700 dark:border-text-primary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Last 30 days</option>
                <option value="US">Last One week</option>
                <option value="CA">Ngara road</option>
              </select>
            </div>
            <div className='flex flex-wrap md:flex-nowrap items-center'>
              { 
                authVal.username == "telkom" ? (
                  <div>
                    {totalWalletBalance ? (
                      <StatItem price={`KES ${150 * 73}`} text='Total Balance' >
                        <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                      </StatItem>
                    ) : (
                      <StatItem price={'KES 0'} text='Total Balance' >
                        <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                      </StatItem>
                    )
                    }
                  </div>
                ) : (
                  <div>
                      {totalWalletBalance ? (
                        <StatItem price={`KES ${totalWalletBalance?.message.amount}`} text='Total Deposited' >
                          <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                        </StatItem>
                      ) : (
                        <StatItem price={'KES 0'} text='Total Deposited' >
                          <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                        </StatItem>
                      )
                      }
                  </div>
                )
              }

              {
                authVal.username == "telkom" ? (
                  <div>
                    {totalWalletBalance ? (
                      <StatItem price={`KES ${150 * 73}`} text='Total Deposited' >
                        <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                      </StatItem>
                    ) : (
                      <StatItem price={'KES 0'} text='Total Deposited' >
                        <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                      </StatItem>
                    )
                    }
                  </div>
                ) : (
                  <div>
                      {totalWalletBalance ? (
                        <StatItem price={`KES ${totalWalletBalance?.message.amount}`} text='Total Balance' >
                          <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                        </StatItem>
                      ) : (
                        <StatItem price={'KES 0'} text='Total Balance'>
                          <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                        </StatItem>
                      )
                      }
                  </div>
                )
              }

              {
                authVal.username == "telkom" ? (
                  <div>
                    <StatItem price={'KES 0'} text='Total Withdrawn' >
                      <BsGraphUpArrow className='text-md mx-2 text-text-primary inline-block' />
                    </StatItem>
                  </div>
                ) : (
                  <div>
                      <StatItem price={'KES 0'} text='Total Spent' >
                        <BsGraphUpArrow className='text-md mx-2 text-text-primary inline-block' />
                      </StatItem>
                  </div>
                )
              }

            </div>
          </div>
          <div >
            <h2 className='text-xl my-3 font-bold text-black'>Statistics</h2>
            <div style={{ backgroundColor: '#fafafa', border: '1px solid #ccc' }} className='border-2 rounded-2xl'>
              <Chart
                options={{
                  chart: {
                    height: 350,
                    type: "area",
                    zoom: {
                      enabled: false
                    },
                    toolbar: {
                      show: false
                    },
                    background: '#fff'
                  },
                  dataLabels: {
                    enabled: false
                  },
                  colors: ["#43E2B7", "#F25D3B"],
                  stroke: {
                    curve: 'smooth',
                    width: [1, 1.5, 5],
                    dashArray: [0, 8, 1]
                  },
                  xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                  },
                  tooltip: {
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                  }
                }}
                series={apexOptions.series}
                type={"area"}
                height={350}
                width={"100%"}
              />
            </div>
          </div>
          <div style={{ backgroundColor: '#fafafa', border: '1px solid #ccc' }} className='my-2 mt-2 rounded-lg'>
            <div className='border-b my-9 border-slate-400'>
              <div className='mt-4'>
                <h2 className='text-xl font-bold mx-3 text-black'>Transaction History</h2>
                <p className='mx-3 mb-3 text-sm text-slate-400'>History of last 3 month</p>
              </div>
            </div>
            <div className='relative overflow-x-auto no-scrollbar'>
              <table className='w-full'>
                <thead>
                  <tr className='text-left'>
                    <TableHeaderText text='Name' />
                    <TableHeaderText text='Date' />
                    <TableHeaderText text='Trans.ID' />
                    <TableHeaderText text='Amount' />
                    <TableHeaderText text='Type' />
                    <TableHeaderText text='Status' />
                  </tr>
                </thead>
                <tbody>
                  {
                    transactionHistory && transactionHistory.map((transaction)=>(
                      <tr>
                        <td className='px-1 flex items-center text-xs py-2'>
                          Tester12
                        </td>
                        <TableDataText text={new Date(transaction.transaction_date).toDateString()}/>
                        <TableDataText text={transaction.transaction_id.slice(0,6)} />
                        <TableDataText text={transaction.amount.toString()} />
                        <TableDataText text={capitalizeFirstLetter(transaction.type)} />
                        <TableDataText additionalStyles='text-green-600' text='Success' />
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default UserWalletPage;
