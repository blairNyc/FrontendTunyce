import { AiOutlineClose } from "react-icons/ai"

const ControllerCart = () => {
    return (
        <div className="container h-screen mx-auto mt-8 p-4 bg-white bg-auto bg-no-repeat bg-center rounded-lg">
            <h2 className="text-2xl font-bold bg text-universal-primary mb-2">Artists</h2>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 overflow-x-auto">
                    <table className="text-sm text-left">
                        <thead className="text-xs uppercase">
                            <tr className="h-12">
                                <th scope="col w-14 m-3"></th>
                                <th scope="col w-64">
                                    <h3 className="text-lg font-bold">DEEJAY</h3>
                                </th>
                                <th scope="col w-64"></th>
                                <th scope="col w-64">
                                    <h3 className="text-lg font-bold">PRICE</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                                <th scope="row" className="w-14 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200 hover:cursor-pointer">
                                        <AiOutlineClose className="w-6 h-6 text-universal-primary" />
                                    </div>
                                </th>
                                <td className="w-64">
                                    <div className="w-60 h-28 mr-5 relative rounded-lg pb-56 bg-cover bg-slate-500" />
                                </td>
                                <td className="w-64">
                                    <p className="text-xl font-medium text-gray-900 dark:text-white">Deejay Steve</p>
                                </td>
                                <td className="w-64">
                                    <p className="text-xl font-medium text-gray-900 dark:text-white">Ksh 100</p>
                                </td>
                            </tr>
                                                        
                        </tbody>
                    </table>
                </div>



                <div className="md:w-1/3">
                    <table className="text-sm text-left">
                        <tbody>
                            <tr className="bg-white dark:bg-gray-800">
                                <td className="w-64">
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">Subtotal</p>
                                </td>
                                <td className="w-64">
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">Ksh 100</p>
                                </td>
                            </tr>
                            <div className="h-5"/>
                            <tr className="mb-20 bg-white  dark:bg-gray-800">
                                <td className="w-64">
                                    <p className="text-3xl font-semibold text-gray-900 dark:text-white">TOTAL</p>
                                </td>
                                <td className="w-64">
                                    <p className="text-3xl font-semibold text-gray-900 dark:text-white">Ksh 100</p>
                                </td>
                            </tr>
                            <div className="h-5" />
                            <tr className="bg-white">
                                <td></td>
                                <td>
                                    <div className="flex items-center justify-center rounded-md h-10 bg-universal-primary">
                                        <p className="text-base text-semibold text-white hover:cursor-pointer   ">CHECK OUT</p>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

           
        </div>
    );
};

export default ControllerCart;