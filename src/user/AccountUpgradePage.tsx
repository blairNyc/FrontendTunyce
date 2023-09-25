const AccountUpgradePage = () => {
    return (
        <div className="container h-screen w-full">
            <h2 className="text-2xl font-bold text-universal-primary mt-3">Account Upgrade</h2>
            <div className="w-20 md:w-1/3 sm:w-full">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an account to upgrade to: </label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Content Creator</option>
                    <option>Matatu Owner</option>
                    <option>Restaurant Owner</option>
                    <option>Record Label</option>
                    <option>Film Maker</option>
                    <option>Advertiser</option>
                </select>
            </div>
        </div>
    );
};

export default AccountUpgradePage;