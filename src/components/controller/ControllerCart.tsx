import { AiOutlineClose } from "react-icons/ai"

const ControllerCart = () => {
    return (
        <div className="container h-screen mx-auto mt-8 p-4 mt-4 bg-white bg-auto bg-no-repeat bg-center rounded-lg">
            <h2 className="text-2xl font-bold bg text-universal-primary mb-2">Artists</h2>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">
                                <h4 className="text-2xl font-bold">DEEJAY</h4>
                            </th>
                            <th scope="col"></th>
                            <th scope="col">
                                <h4 className="text-2xl font-bold">PRICE</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200">
                                    <AiOutlineClose className="w-6 h-6 text-universal-primary" />
                                </div>
                            </th>
                            <td className="w-64"> 
                                <div className="w-60 h-28 relative rounded-lg pb-56 bg-cover bg-slate-500" />
                            </td>
                            <td >
                                <p className="text-lg font-medium text-gray-900 dark:text-white">Deejay Steve</p>                                
                            </td>
                            <td>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">Ksh 100</p>
                                
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200">
                                    <AiOutlineClose className="w-6 h-6 text-universal-primary" />
                                </div>
                            </th>
                            <td>
                                <div className="w-64 h-28 relative rounded-lg pb-56 bg-cover bg-slate-500" />
                            </td>
                            <td>
                                Deejay Steve
                            </td>
                            <td>
                                Ksh 100
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200">
                                    <AiOutlineClose className="w-6 h-6 text-universal-primary" />
                                </div>
                            </th>
                            <td>
                                <div className="w-64 h-28 relative rounded-lg pb-56 bg-cover bg-slate-500" />
                            </td>
                            <td>
                                Deejay Steve
                            </td>
                            <td>
                                Ksh 100
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* <div className="grid grid-cols-3">
                <div
                    className={`bg-white rounded-lg`}
                >
                    <div className="flex flex-row mb-2">


                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200">
                            <AiOutlineClose className="w-6 h-6 text-universal-primary" />
                        </div>

                        <div className="w-40 h-28 relative rounded-lg pb-56 bg-cover bg-slate-500" />

                        <h1 className="text-2xl font-bold">Deejay Steve</h1>
                        <h1 className="text-2xl font-bold">Ksh 100</h1>


                    </div>

                </div>
            </div> */}
        </div>
    );
};

export default ControllerCart;