import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllMixesQuery, useGetMediaDetailsQuery } from "../app/api/GlobalApiSlice";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { LoadingSkeleton } from "../components/LoadingSkeletonList";
import { Mix } from "../types";

interface MediaInformation {
    message: {
        id: number;
        owner: {
            username: string;
            id: number;
            email: string;
        };
        name: string;
        video_thumbnail: string;
        views: number;
        description: string;
        created_at: string;
        media: {
            id: number;
            media_url: string;
        };
        genres: {
            id: number;
            name: string;
            image: string;
            description: string;
        };
    };
}

interface CommonProps {
    title?: string
    owner?: string
    srcUrl?: string
    additionalStyles?: React.HTMLAttributes<HTMLDivElement>['className'] | undefined | string
    children?: React.ReactNode
    seeAllPath?: string
    path?: string
    onClick?: (id: string) => void;

}

// const MusicItem = () => (
//     <div className="w-full my-2 border p-2 rounded-md cursor-pointer hover:bg-slate-100 flex">
//         <div className="w-1/2">
//             <img src="https://picsum.photos/200/300" alt="" className="w-full h-24 rounded-sm inline-block object-cover"/>
//         </div>
//         <div className="mx-2">
//             <h4 className="font-semibold mx-1">DJ 38K latest Mixes (Naija Love)</h4>
//             <p className="text-sm mx-1">DJ 38K</p>
//             <p>3 months ago.</p>
//         </div>
//     </div>
// )

export const MusicVideoScreen = ({ path, owner, srcUrl, title }: CommonProps) => (
    <Link to={path ?? ''} className="w-full my-2 border p-2 rounded-md cursor-pointer hover:bg-slate-100 flex">
    <div className="w-1/2">
            <img src={`${srcUrl}`} alt="" className="w-full h-24 rounded-sm inline-block object-cover"/>
             </div>
             <div className="mx-2">
            <h4 className="font-semibold mx-1">{`${title?.slice(0, 20)}...`}</h4>
                 <p className="text-sm mx-1">{owner}</p>
                 {/* <p>3 months ago.</p> */}
             </div>
    
    </Link>
    // <Link to={path ?? ''} className="min-w-[150px] mx-2 cursor-pointer hover:scale-105" onClick={() => onClick?.('some-id')}>
    //     <img src={`${srcUrl}`} alt="" className="w-32 h-32 rounded-xl object-cover" />
    //     <h4 className="font-bold">
    //         {`${title?.slice(0, 20)}...`}
    //     </h4>
    //     <p className="uppercase text-xs">{owner}</p>
    //     <div className="flex">
    //         <button className=" sm:text-sm md:text-md lg:text-xl">
    //            Hello
    //         </button>
    //         <button className=" sm:text-sm md:text-md lg:text-xl ml-1">
    //             Play
    //         </button>
    //     </div>
    // </Link>
)


function VideoScreen() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();

    const [currentMediaId, setCurrentMediaId] = useState<string>('')

    useEffect(() => {
        setCurrentMediaId(id ?? '')
    }, [id, currentMediaId])

    const { data: videoData } = useGetMediaDetailsQuery(currentMediaId)

    const { data: allMixes, isLoading: isLoadingMix } = useGetAllMixesQuery(1)

    // console.log(allMixes)

    const [mediaInfo, setMediaInfo] = useState<MediaInformation>()
    useEffect(() => {
        if(videoData !== null) {
            setMediaInfo(videoData)
        }        
    },[videoData])

    if(videoData !== null) {
        console.log(videoData)
    }

    if (!mediaInfo?.message.media.media_url) return <div>Loading...</div>;

    const isYouTubeUrl = (mediaInfo: MediaInformation) => {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        return youtubeRegex.test(mediaInfo.message.media.media_url);
    };
    
    const handleItemClick = (id: string) => {
        setCurrentMediaId(id)
        navigate(`/creators/videos/${id}`)
    
    };

    return (
        <div className='mt-8 w-full h-full'>
            <div className="w-full mt-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 md:col-span-2">
                        {isYouTubeUrl(mediaInfo) ? (
                                // If it's a YouTube video, use ReactPlayer
                                <ReactPlayer
                                    url={mediaInfo.message.media.media_url}
                                    width='100%'
                                    height='65vh'
                                    playing={true}
                                    controls
                                />
                            ) : (
                                <div>Please try a youtube video.</div>
                                // <video
                                //     ref={mediaInfo.message.media.media_url}
                                //     controls
                                //     autoPlay
                                //     style={{ width: '100%', height: '100%' }}
                                //     />
                            )
                        }
                        
                        
                        <div className="mt-4 mx-4">
                            <div className="inline-block px-1 ">
                                <h4 className="font-bold text-slate-600 text-lg">{mediaInfo?.message.name}</h4>
                                <p className="my-3">{mediaInfo?.message.owner.username}</p>
                            </div>
                            <p className="text-sm">{mediaInfo?.message.description}</p>
                            <div className="flex mt-4">
                                <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover"/>
                                <input type="text" placeholder="Add a comment" className="border-b-2 bg-inherit border-black px-2 py-0 outline-none ml-2 w-3/4"/>
                            </div>
                            <div className="flex mt-4">
                                <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover"/>
                                <div className="mx-3">
                                    <h4 className="font-bold text-black text-sm">Dynamite <span className="text-slate-400 font-medium">8 hours ago</span></h4>
                                    <p className="text-xs">Wow, the music is amazing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-3">
                        {
                            isLoadingMix ? (
                                [1, 2, 3, 4, 5,].map((index) => (<LoadingSkeleton key={index} />))
                            ) : (
                                allMixes?.filter((mix: Mix) => mix.media.media_url.includes('youtube.com'))
                                    .map((mix: Mix) => (
                                        <MusicVideoScreen
                                            title={`${mix?.name}`}
                                            path={`/creators/videos/${mix.id}`}
                                            owner={`${mix?.owner?.username}`}
                                            srcUrl="https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                            onClick={() => handleItemClick(mix.id)}                  
                                        />
                                        // <MusicItem
                                        //     title={`${mix?.name}`}
                                        //     owner={`${mix?.owner?.username}`}
                                        //     srcUrl="https://images.unsplash.com/photo-1653361953232-cd154e54beff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fHRyZW5kaW5nJTIwbWl4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                        //     onClick={() => handleItemClick(mix.id)}
                                        // />
                                    )
                                    ))}

                        {/* <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoScreen;


{/* <video loop src="https://www.w3schools.com/html/mov_bbb.mp4" controls  className="w-full h-96 rounded-lg"></video> */ }