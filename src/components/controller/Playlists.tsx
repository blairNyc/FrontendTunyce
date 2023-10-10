import { useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useGetAllPlayListsQuery } from "../../user/UsersState";
import CreatePlayListModal from "./components/CreatePlaylist";
const ArtistItem = ({playlist}:PlayListProps) => {
    return(
        <Link to={`/my-playlists/${playlist.id}`} className="flex hover:scale-105 hover:bg-slate-100 py-4 rounded-lg flex-col items-center">
            <img src={playlist.cover} className="w-36 h-36 rounded-full bg-gray-200"/>
            <p className="text-center text-black text-xl font-bold">{playlist.name}</p>
            <p className="text-center text-sm font-light">{playlist.description}</p>
            <p className="text-text-secondary  text-xs">{playlist.songs.length} Songs . 10 days ago </p>
            <button className="border-text-primary border-2  text-center font-bold bg-gray-200 w-2/5 text-black px-3 rounded-2xl">View</button>
        </Link>
    )
}
interface IPlayList{
    id: number,
    name: string,
    description: string,
    cover: string,
    songs: Array<string>
}
interface PlayListProps{
    playlist: IPlayList
}

export default function PlayListsPage(){
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    }
    const {data} = useGetAllPlayListsQuery(1);
    console.log(data,'playlists');
    return (
        <>
            <div className="container">
                {/*Subtitles*/}
                <div className="flex items-center justify-between my-3 px-2 text-red-500">
                    <div className="">
                        <h3 className="font-bold">My Playlists</h3>
                    </div>
                    <div className=" flex">
                        <button className="flex items-center border p-1" onClick={toggleModal}>
                            <VscDiffAdded />
                            <h4 className="ml-2 mr-3">New Playlist</h4>
                        </button>
                    </div>
                </div>
                    {
                        data.length === 0 ? (
                        <div className="flex flex-col mt-4 items-center">
                            <img src="/empty.jpg" className=" w-1/2 md:w-1/3"/>
                            <p className="text-center text-sm font-bold">
                                Seems like you don't have any playlists yet
                            </p>
                            <button className="flex rounded-full items-center border bg-text-primary py-1 px-2" onClick={toggleModal}>
                                <h4 className="ml-2 text-white font-bold mr-3">New Playlist</h4>
                            </button>
                        </div>) :
                        <div className="mt-1 grid  grid-cols-2 lg:grid-cols-5 md:grid-cols-3 ">
                            {data.map((playlist:IPlayList,id:number)=>(
                                <ArtistItem key={id} playlist={playlist}/>
                            ))}
                        </div>
                    }
            </div>
            <CreatePlayListModal isOpen={isOpen} onClose={toggleModal}/>
        </>
    );
}