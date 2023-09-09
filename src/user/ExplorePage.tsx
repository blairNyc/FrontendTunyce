import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io"
// import Player from "../components/Player";
interface CommonProps{
    title: string
    owner?: string
    additionalStyles?: React.HTMLAttributes<HTMLDivElement>['className'] | undefined| string
    children?: React.ReactNode
    seeAllPath?: string
}
export const SectionTitle = ({title, seeAllPath}: CommonProps) => {
    return(
        <div className=" w-full flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <a href={seeAllPath} className="text-text-primary cursor-pointer font-bold ml-2">See All</a>
        </div>
    )
}
export const FeaturedItem = ({title,children,additionalStyles, owner}:CommonProps)=>(
    <div className={`w-1/3 min-w-[280px] mx-3 relative ${additionalStyles} flex flex-col cursor-pointer items-center justify-end pb-4 h-40`}>
        <img src="https://picsum.photos/200/300" alt="" className="w-full absolute top-0 left-0 rounded-xl h-full object-center"/>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary to-transparent rounded-xl"></div>
        <div className="absolute  z-40">
            <h4 className="text-white text-center font-bold text-xl">{title}</h4>
            <p className="text-center">{owner}</p>
        </div>
        {children}
    </div>
);
export const MusicItem = ({path}:{path?:string})=>(
    <a href={path} className="min-w-[150px] mx-2 cursor-pointer hover:scale-105">
        <img src="https://picsum.photos/200/300" alt="" className="w-32 h-32 rounded-xl object-cover"/>
        <h4 className="font-bold">Like Water</h4>
        <p className="uppercase text-xs">Dj - Freshy</p>
    </a>
)
const ExplorePage = () => {
    return (
        <div className="mt-8 relative w-full overflow-y-scroll">
            <h2 className="text-2xl text-text-primary font-bold">Explore</h2>
            <div className="mt-10">
                <SectionTitle title="Featured Mixes"/>
                <div className="w-full flex items-center overflow-x-scroll">
                    <FeaturedItem title="Heart want what it wants" owner="Dj - Freshy"/>
                    <FeaturedItem title="Live Water" owner="Dj - Freshy"/>
                    <FeaturedItem title="Anyone" owner="Justin Beiber"/>
                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="New Releases"/>
                <div className="w-full flex items-center">
                    <IoIosArrowDropleftCircle className="text-2xl mx-2 absolute left-0 text-text-primary"/>
                    <div className="flex mx-7 w-full relative overflow-y-hidden overflow-x-scroll items-center">
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>

                        <MusicItem/>
                        <MusicItem/>

                        <MusicItem/>
                        <MusicItem/>
                    </div>
                    <IoIosArrowDroprightCircle className="text-2xl absolute right-0 mx-2 text-text-primary"/>
                </div>
            </div>
            <div className="my-10 bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle title="New Releases"/>
                <div className="w-full flex items-center">
                    <MusicItem/>
                    <MusicItem/>
                    <MusicItem/>
                    <MusicItem/>
                    <MusicItem/>
                </div>
            </div>
            {/* <Player/> */}
        </div>
    );
};

export default ExplorePage;