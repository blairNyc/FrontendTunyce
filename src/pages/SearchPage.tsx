import { FiSearch } from "react-icons/fi";
const ArtistItem = ({category,imageurl, total}:{category: string, imageurl: string,total: string}) => {
    return(
        <a href="/artists" className="flex hover:scale-105 hover:bg-slate-100 py-4 rounded-lg flex-col items-center">
            <img src={imageurl} alt={category} className="w-36 h-36 rounded-full bg-gray-200"/>
            <p className="text-center text-black text-xl font-bold">{category}</p>
            <p className="text-center text-sm font-light">{total} </p>
            <button className="border-text-primary border-2  text-center font-bold bg-gray-200 w-2/5 text-black px-3 rounded-2xl">View</button>
        </a>
    )
}
function SearchPage() {
    return (
        <div>
            <header className="w-full mt-3 flex items-center justify-between">
                <div className="flex items-center justify-between rounded-2xl px-2 w-4/5 md:w-1/3 bg-gray-200">
                    <input type="text" placeholder="search artists,podcasts, songs..." className="w-full border-none focus:border-none bg-inherit h-full rounded-2xl px-2 py-1 outline-none"/>
                    <FiSearch className="text-2xl text-black mx-2"/>
                </div>
                <div className="hidden md:flex md:flex-row flex-col items-center">
                    <a href="/signup" className="border cursor-pointer px-4 my-2 rounded-2xl border-black ">Sign Up</a>
                    <a href="/login" className="px-4 py-1 my-2 mx-3 bg-text-primary rounded-2xl text-white font-semibold">Sign In</a>
                </div>
            </header>
            <div className="mt-8">
                <h2 className="text-2xl text-text-primary font-bold">Browse Content</h2>
                <div className="mt-1 grid  grid-cols-2 lg:grid-cols-5 md:grid-cols-3">
                    <ArtistItem category="Artists" total="30 Artists" imageurl={"https://picsum.photos/200/300"} />
                    <ArtistItem category="Content Creators" total="500 creators" imageurl={"https://picsum.photos/200/300"} />
                    <ArtistItem category="Songs" total="1000 Artists" imageurl={"https://picsum.photos/200/300"} />
                    <ArtistItem category="Labels" total="1000 Artists" imageurl={"https://picsum.photos/200/300"} />
                    <ArtistItem category="Podcasts" total="1000 podcasts" imageurl={"https://picsum.photos/200/300"} />
                </div>
            </div>
        </div>
    );
}

export default SearchPage;