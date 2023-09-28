import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io"
import {useGetAllMixesQuery, useGetAllTrendingMixesQuery} from "../app/api/GlobalApiSlice"
import { Link } from 'react-router-dom';

interface CommonProps{
    title?: string
    owner?: string
    srcUrl?:string
    additionalStyles?: React.HTMLAttributes<HTMLDivElement>['className'] | undefined| string
    children?: React.ReactNode
    seeAllPath?: string
    path?:string
}

export const SectionTitle = ({title}: CommonProps) => {
    return(
        <div className="w-full flex justify-between items-center">
            <h3 className="text-lg font-semibold">
                 {title}
            </h3>
            <Link to="/explore/innerpage" className="text-text-primary cursor-pointer font-bold ml-2">See All</Link>
        </div>
    )
}
export const FeaturedItem = ({title,children,additionalStyles, owner,srcUrl}:CommonProps)=>(
    <div className={`w-1/3 min-w-[280px] mx-3 relative ${additionalStyles} flex flex-col cursor-pointer items-center justify-end pb-4 h-40`}>
        <img src={`${srcUrl}`} alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center"/>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl"></div>
        <div className="absolute  z-40">
            <h4 className="text-white text-center font-bold text-xl">
                {`${title?.slice(0, 20)}...`}
            </h4>
            <p className="text-center">{owner}</p>
        </div>
        {children}
    </div>
);
export const MusicItem = ({path,owner,srcUrl,title}:CommonProps)=>(
    <a href={path} className="min-w-[150px] mx-2 cursor-pointer hover:scale-105">
        <img src={`${srcUrl}`} alt="" className="w-32 h-32 rounded-xl object-cover"/>
        <h4 className="font-bold">
             {`${title?.slice(0, 20)}...`}
        </h4>
        <p className="uppercase text-xs">{owner}</p>
    </a>
)
export const RowScroll = ({children}:CommonProps)=>(
    <div className="w-full flex items-center no-scrollbar overflow-x-auto">
        {children}
    </div>
)

const ExplorePage = () => {
      const { data: allMixes } = useGetAllMixesQuery(1)
      const { data: trendingMixes } = useGetAllTrendingMixesQuery(1)

    return (
        <div className="mt-8 relative w-full no-scrollbar overflow-y-auto">
            <h2 className="text-2xl text-text-primary font-bold">Explore</h2>
            <div className="mt-10">
                <SectionTitle title="Featured Mixes"/>
                <div className="w-full flex items-center overflow-x-scroll">
                     {trendingMixes?.map((mix: any) => (
                        <FeaturedItem title={`${mix?.name}`} owner={`${mix?.owner}`} srcUrl={
                              mix && mix?.thumbnail
                                ? mix?.thumbnail
                                : 'https://png.pngtree.com/png-vector/20190605/ourmid/pngtree-headphones-icon-png-image_1477434.jpg'
                            }/>
                     ))}

                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="All mixes"/>
                <div className="w-full flex items-center">
                    <IoIosArrowDropleftCircle className="text-2xl mx-2 absolute left-0 text-text-primary"/>
                    <div className="flex mx-7 w-full relative overflow-y-hidden overflow-x-scroll items-center">
                        {allMixes?.map((mix: any) => (
                                <MusicItem
                                title={`${mix?.name}`} 
                                owner={`${mix?.owner}`}
                                srcUrl={
                                mix && mix?.thumbnail
                                ? mix?.thumbnail
                                : 'https://png.pngtree.com/png-vector/20190605/ourmid/pngtree-headphones-icon-png-image_1477434.jpg'
                                 }
                                />
                        ))}

                    </div>
                    <IoIosArrowDroprightCircle className="text-2xl absolute right-0 mx-2 text-text-primary"/>
                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="New Releases"/>
                <div className="w-full flex items-center">
                     {allMixes?.map((mix: any) => (
                                <MusicItem
                                title={`${mix?.name}`} 
                                owner={`${mix?.owner}`}
                                srcUrl={
                                mix && mix?.thumbnail
                                ? mix?.thumbnail
                                : 'https://png.pngtree.com/png-vector/20190605/ourmid/pngtree-headphones-icon-png-image_1477434.jpg'
                                 }
                                />
                        ))}
                </div>
            </div>
            {/* <Player/> */}
        </div>
    );
};

export default ExplorePage;