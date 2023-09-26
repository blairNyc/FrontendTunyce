import { FiSearch } from "react-icons/fi";

const CreatorItem = () => {
    return (
        <a className="flex hover:scale-105 hover:bg-slate-100 py-4 rounded-lg flex-col items-center">
            <a href="/artists/3"><img src="https://picsum.photos/200/300" className="w-36 h-36 rounded-full bg-gray-200" />
            <p className="text-center text-black text-xl font-bold">Justin Beiber</p>
                <p className="text-center text-sm font-light">30K Subscribers</p></a>
            <button className="border-text-primary border-2 text-center font-medium bg-gray-200  text-black px-2 rounded-2xl">Subscribe</button>
        </a>
    )
}
const AllContollerCreatorsPage = () =>  {
    return (
        <div className='w-full mt-4 h-screen'>
            <h2 className="text-2xl text-text-primary font-bold">All Creators</h2>
            <div className="mt-1 grid grid-cols-2 lg:grid-cols-8 md:grid-cols-4 ">
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                <CreatorItem />
                
            </div>
        </div>
    );
}

export default AllContollerCreatorsPage