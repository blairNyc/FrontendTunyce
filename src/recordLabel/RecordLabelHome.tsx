

const RecordLabelHome = () => {

    return (
        <div className="h-screen">
            <div className="container">
                <p>Top Artist</p>
            </div>

            
            <div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img src="https://picsum.photos/200/300" alt="profile" className="h-24 w-24 rounded-full" />

                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            
                        </div>
                </div>


            </div>

        </div>
    )
}

export default RecordLabelHome;
