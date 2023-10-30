import DepositIcon from '/deposit.svg';
import WithdrawIcon from '/withdraw.svg';
import {BsGraphUpArrow, BsGraphDownArrow} from 'react-icons/bs';
import Chart from 'react-apexcharts';
import { useCheckWalletBalanceQuery, useConnectWalletMutation } from '../../app/api/GlobalApiSlice';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

interface MessageData {
    id: number;
    uuid: string;
    amount: string;
    owner: number;
}

interface BalanceResponse {
    message: MessageData;
}

const ActionButton=({text,children}:{text:string, children:React.ReactNode})=>(
    <button className="bg-bg-primary flex items-center hover:bg-gray-200 text-white px-4 py-1">
        {children}
        <span className='text-text-primary text-xs md:text-sm font-bold'>{text}</span>
    </button>
);
const StatItem = ({text,children,price }:{text:string,price:string,children:React.ReactNode})=>(
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
const TableHeaderText= ({text}:{text:string})=><th className='px-1 text-xs py-2'>{text}</th>
const TableDataText = ({text,additionalStyles}:{text:string,additionalStyles?:string})=><td className={`px-1 ${additionalStyles} text-xs py-2`}>{text}</td>
const date = new Date('12/12/2021');
function RestaurantWalletPage() {

    const contentCreator = useAppSelector((state: RootState) => state.persistAuth.auth.is_contentcreator);

    const apexOptions = { 
        series: [{
            name: 'Deposit',
            data: [31, 40, 28, 51, 42, 109, 100],
            type:'area'
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
            colors: ["#43E2B7","#F25D3B"],
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

    const [submitWalletUser] = useConnectWalletMutation()
    const { data: walletBalance } = useCheckWalletBalanceQuery(1)

    const [totalWalletBalance, setTotalWalletBalance] = useState<BalanceResponse>()

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

        if (walletBalance !== null) {
            setTotalWalletBalance(walletBalance)
        }
    }, [walletBalance])
    
    return (
        <div className="mt-8  h-screen">
            <div className="flex w-full items-center justify-between">
                <h2 className="md:text-2xl text-text-primary font-bold">My Wallet</h2>
                <div className='flex items-center'>
                    <ActionButton text='Deposit'>
                        <img src={DepositIcon} alt="" className="w-6 h-6 mr-2"/>
                    </ActionButton>
                    <ActionButton text='Withdraw'>
                        <img src={WithdrawIcon} alt="" className="w-6 h-6 mr-2"/>
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
                            {totalWalletBalance ? (
                                <StatItem price={`KES ${totalWalletBalance?.message.amount}`} text='Total Earnings' >
                                    <BsGraphUpArrow className='text-md mx-2 text-green-400 inline-block' />
                                </StatItem>
                            ) : (
                                <StatItem price={`KES 0`} text='Total Earnings' >
                                    <BsGraphUpArrow className='text-md mx-2 text-green-400 inline-block' />
                                </StatItem>
                            )}

                            {totalWalletBalance ? (
                                <StatItem price={`KES ${totalWalletBalance?.message.amount}`} text='Total Earned' >
                                    <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                                </StatItem>
                            ) : (
                                <StatItem price={'KES 0'} text='Total Earned' >
                                    <BsGraphDownArrow className='text-md mx-2 text-text-primary inline-block' />
                                </StatItem>
                            )
                            }
                            <StatItem price={'KES 16000'} text='Total Withdrawn' >
                                <BsGraphUpArrow className='text-md mx-2 text-text-primary inline-block'/>
                            </StatItem>
                        </div>
                    </div>
                    <div >
                        <h2 className='text-xl my-3 font-bold text-black'>Statistics</h2>
                        <div style={{backgroundColor:'#fafafa',border:'1px solid #ccc'}} className='border-2 rounded-2xl'>
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
                                    background:'#fff'
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
                    <div style={{backgroundColor:'#fafafa',border:'1px solid #ccc'}} className='my-2 mt-2 rounded-lg'>
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
                                        <TableHeaderText text='Name'/>
                                        <TableHeaderText text='Data'/>
                                        <TableHeaderText text='TransID'/>
                                        <TableHeaderText text='Quantity'/>
                                        <TableHeaderText text='Type'/>
                                        <TableHeaderText text='Status'/>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-left'>
                                        <td className='px-1 flex items-center text-xs py-2'>
                                            <img src="https://picsum.photos/200/300" alt="" className="w-5 h-5 rounded-full inline-block object-cover"/>
                                            <span></span> DJ Kalonje
                                        </td>
                                        <TableDataText text={date.toDateString()}/>
                                        <TableDataText text='RY6842CGJB'/>
                                        <TableDataText text='Ksh 2000'/>
                                        <TableDataText text='Deposit'/>
                                        <TableDataText additionalStyles='text-green-600' text='Success'/>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantWalletPage;