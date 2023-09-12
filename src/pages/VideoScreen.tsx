const MusicItem = () => (
    <div className="w-full my-2 border p-2 rounded-md cursor-pointer hover:bg-slate-100 flex">
        <div className="w-1/2">
            <img src="https://picsum.photos/200/300" alt="" className="w-full h-24 rounded-sm inline-block object-cover"/>
        </div>
        <div className="mx-2">
            <h4 className="font-semibold mx-1">DJ 38K latest Mixes (Naija Love)</h4>
            <p className="text-sm mx-1">DJ 38K</p>
            <p>3 months ago.</p>
        </div>
    </div>
)
function VideoScreen() {
    return (
        <div className='mt-8 w-full h-full'>
            <h1>Video Screen</h1>
            <div className="w-full mt-5">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-3 md:col-span-2">
                        <video loop src="https://www.w3schools.com/html/mov_bbb.mp4" controls  className="w-full h-96 rounded-lg"></video>
                        <div className="mt-4 mx-4">
                            <div className="inline-block px-1 ">
                                <h4 className="font-bold text-slate-600 text-lg">Dynamite</h4>
                                <p className="my-3">BTS</p>
                            </div>
                            <p className="text-sm">Dj Shady, also known as the Blind Woodturner, learned his craft by listening to hundreds of hours of YouTube videos and experimenting in his workshop. Now he’s a YouTube creator himself, sells his products worldwide, and does demonstrations all around the country. Learned his craft by listening to hundreds of hours of YouTube videos and experimenting in his workshop. Now he’s a YouTube creator himself, sells his products worldwide, and does demonstrations all around the country.</p>
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
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>
                        <MusicItem/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoScreen;