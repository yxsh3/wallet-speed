
export default function TopBar( {setNetConnect} ) {
    return (
        <div className="flex justify-between px-9 py-4 border shadow-sm">
            <h1 className="text-2xl text-violet-900 font-bold">Speed</h1>

            <div>
                <form className="max-w-sm mx-auto">
                    <select id="countries" defaultValue="devnet" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer" onChange={(e) => {
                        // e.preventDefault();
                        setNetConnect(e.target.value);
                    }}>
                        
                        <option value="devnet">Dev Net</option>
                        <option value="mainnet">Main Net</option>
                    </select>
                </form>
            </div>

        </div>
    )
}