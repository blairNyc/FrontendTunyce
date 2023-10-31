import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { SectionTitle, FeaturedItem, MusicItem } from "../../user/ExplorePage";
import { useGetCreatorsQuery } from "../../components/controller/features";
function CreatorsPage() {
    const {data,isLoading}=useGetCreatorsQuery(1);
    console.log(data,isLoading);
    return (
        <div className="mt-8 w-full h-full">
            <h2 className="text-2xl text-text-primary font-bold">Creators</h2>
            <div className="mt-10">
                <SectionTitle title="Featured Creators" />
                <div className="w-full mt-1 flex items-center no-scrollbar overflow-x-auto">
                    <FeaturedItem title="">
                        <div className="absolute bottom-10">
                            <p className="font-bold z-40 text-md text-center">DJ Lensy</p>
                            <div className="flex justify-center items-center">
                                {/* <TextInfo text="Views" figure="12k" /> */}
                                {/* <TextInfo text="Subscribers" figure="30k" /> */}
                                {/* <TextInfo text="Livestreams" figure="30" /> */}
                            </div>
                        </div>
                    </FeaturedItem>
                </div>
            </div>
            <div className="my-10 relative bg-white w-full rounded-xl px-4 py-2">
                <SectionTitle seeAllPath="/creators/deejays" title="Deejays" />
                <div className="w-full flex items-center">
                    <IoIosArrowDropleftCircle className="text-2xl mx-2 absolute left-0 text-text-primary" />
                    <div className="flex mx-7 w-full relative overflow-y-hidden no-scrollbar overflow-x-scroll items-center">
                        {
                            data?.map((item,index)=>(
                                <MusicItem key={index} title={item.username} path={`/creators/deejays/${item.id}`} />
                            ))
                        }
                        {/* <MusicItem path="/creators/deejays/3" />
                        <MusicItem path="/creators/deejays/4" />
                        <MusicItem path="/creators/deejays/5" />
                        <MusicItem path="/creators/deejays/6" />
                        <MusicItem path="/creators/deejays/7" /> */}
                    </div>
                    <IoIosArrowDroprightCircle className="text-2xl absolute right-0 mx-2 text-text-primary" />
                </div>
            </div>
        </div>
    );
}

export default CreatorsPage;