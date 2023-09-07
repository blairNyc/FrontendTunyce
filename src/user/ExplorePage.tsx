const ExplorePage = () => {
    return (
        <div className="my-10 w-full">
            <h2 className="text-2xl text-text-primary font-bold">Explore</h2>
            <div className="my-10">
                <div className="my-5 w-full flex justify-between items-center">
                    <h3 className="text-xl font-bold">Featured Mixes</h3>
                    <p className="text-text-primary font-bold ml-2">See All</p>
                </div>
                <div className="w-full flex items-center">
                    <div className="w-1/3 mx-3 relative h-40">
                        <img src="https://picsum.photos/200/300" alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-cover"/>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl">
                            <h4 className="text-white text-center font-bold text-xl">Live Water</h4>
                            <p className="text-center">Dj - Freshy</p>
                        </div>
                    </div>
                    <div className="w-1/3 mx-3 relative h-40">
                        <img src="https://picsum.photos/200/300" alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-cover"/>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl">
                            <h4 className="text-white text-center font-bold text-xl">Live Water</h4>
                            <p className="text-center">Dj - Freshy</p>
                        </div>
                    </div>
                    <div className="w-1/3 mx-3 relative h-40">
                        <img src="https://picsum.photos/200/300" alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-cover"/>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl">
                            <h4 className="text-white text-center font-bold text-xl">Live Water</h4>
                            <p className="text-center">Dj - Freshy</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 pt-1">
                <div className="my-5 w-full flex justify-between items-center">
                    <h3 className="text-xl font-bold">Featured Mixes</h3>
                    <p className="text-text-primary font-bold ml-2">See All</p>
                </div>
                <div className="w-full flex items-center">
                    <div>
                        <img src="https://picsum.photos/200/300" alt="" className="w-24 h-24 rounded-xl object-cover"/>
                        <h4>Like Water</h4>
                        <p className="uppercase text-xs">Dj - Freshy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;