import { FiSearch } from "react-icons/fi";
import { useGetAllTrendingMixesQuery } from "../app/api/GlobalApiSlice";
import { Mix } from "../types";
import { Link,  } from "react-router-dom";

const ArtistItem = ({name,id}:{name:string,id:string, artist:Mix}) => {
    return(
        <Link to={`/artists/${id}`} state={{name:name,id:id}} className="flex hover:scale-105 hover:bg-slate-100 py-4 rounded-lg flex-col items-center">
            <img src="https://picsum.photos/200/300" className="w-36 h-36 rounded-full bg-gray-200"/>
            <p className="text-center text-black text-xl font-bold">{name}</p>
            <p className="text-center text-sm font-light">Artist</p>
            <button className="border-text-primary border-2  text-center font-bold bg-gray-200 w-2/5 text-black px-3 rounded-2xl">View</button>
        </Link>
    )
}
function ArtistsPage() {
    const { data: trendingMixes, } = useGetAllTrendingMixesQuery([]);
    console.log(trendingMixes);
    return (
        <div className='w-full mt-4 h-full'>
            <header className="w-full mt-3 flex items-center justify-between">
                <div className="flex items-center justify-between rounded-2xl px-2 w-4/5 md:w-1/3 bg-gray-200">
                    <input type="text" placeholder="Search for Artists..." className="w-full border-none focus:border-none bg-inherit h-full rounded-2xl px-2 py-1 outline-none"/>
                    <FiSearch className="text-2xl text-black mx-2"/>
                </div>
                <div className="hidden md:flex md:flex-row flex-col items-center">
                    <a href="/signup" className="border cursor-pointer px-4 my-2 rounded-2xl border-black ">Sign Up</a>
                    <a href="/login" className="px-4 py-1 my-2 mx-3 bg-text-primary rounded-2xl text-white font-semibold">Sign In</a>
                </div>
            </header>
            <h2 className="text-2xl text-text-primary font-bold">Artists</h2>
            <div className="mt-1 grid  grid-cols-2 lg:grid-cols-5 md:grid-cols-3 ">
                {
                    trendingMixes ? trendingMixes.slice(0,10).map((n:Mix,id:number) => (
                        <ArtistItem artist={n} key={id} id={n.owner.id??''} name={n.owner.username??'Mix'} />
                    )) : (
                        <div className='mx-auto'>
                            <h2 className='text-text-primary text-xl'>No Mixes</h2>
                        </div>
                    )
                }
                
            </div>
        </div>
    );
}

export default ArtistsPage;