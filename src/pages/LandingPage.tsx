// import React from 'react';
// import Backdrop from '../components/Backdrop';   
import {BiChevronLeftCircle, BiChevronRightCircle} from 'react-icons/bi';   
const ButtonStyle=({text}:{text:string})=>(<button className='w-full rounded-md hover:bg-red-600 my-3 font-bold uppercase text-white bg-text-primary py-3'>{text}</button>)
export const JointTunce = ()=>(
    <div className='h-screen flex pt-8 justify-center md:items-center'>
        <div className='bg-black w-4/5 md:w-1/2 max-h-[500px] rounded-xl'>
            <div className='flex py-8 flex-col md:flex-row w-full h-full px-2 items-center'>
                    <img src='/tunyce-light-text.jpeg'
                        alt='tunyce media'
                        className='w-full md:w-1/2 min-h-[200px] h-3/4'
                    />
                    <div className='m-4 md:ml-4 w-full md:w-1/2'>
                        <p className='text-white text-2xl'>Join the Tunyce community</p>
                        <p className='text-white text-sm'>Already have an account?</p>
                        <ButtonStyle text='Sign Up'/>
                        <ButtonStyle text='Sign In'/>
                    </div>
            </div>
        </div> 
    </div>
);
const BoldText= ({text}:{text:string})=><h2 className="font-bold md:text-2xl text-xl my-4">{text}</h2>
const RowContainer = ({text}:{text:string})=>(
    <div className="flex items-center w-full justify-between px-3">
        <BoldText text={text}/>
        <div>
            <BiChevronLeftCircle className="text-2xl inline-block mx-1"/>
            <BiChevronRightCircle className="text-2xl inline-block mx-1"/>
        </div>
    </div>
);
const GenreBox = ({text,bgcolor}:{text:string, bgcolor:string})=>(
    <p className={`px-4 cursor-pointer text-white mx-1 my-2 rounded font-semibold py-1 ${bgcolor}`}>
        {text}
    </p>
);
const EasyAfterNoon = ({text,image}:{text:string,image:string})=>(
    <div style={{backgroundImage:`url(${image}`}} className="w-full relative bg-opacity-10 bg-black cursor-pointer h-40  bg-cover bg-center bg-no-repeat rounded">
        <div className='absolute bottom-2 left-1/4'>
            <h2 className="text-white text-center text-2xl font-bold">{text}</h2>
        </div>
    </div>
)
const MusItem = ({plays,title}:{plays:string,title:string})=>(
    <div className="flex border p-2 cursor-pointer hover:scale-105 m-2 min-w-[250px]">
        <img src="/tunyce-light-text.jpeg" alt="tunyce media" className="w-1/4 h-auto rounded-xl"/>
        <div className="ml-3 w-3/4">
            <h4 className="text-sm uppercase font-bold">{title}</h4>
            <p className="">{plays}Plays</p>
        </div>
    </div>
)
function LandingPage() {
    return (
        <div className='w-full h-full py-8'>
            <div className="grid grid-cols-3 md:grid-cols-3 xs:grid-cols-5 ">
                <GenreBox text="Hip hop" bgcolor="bg-pink-400"/>
                <GenreBox text="Afro pop" bgcolor="bg-red-500"/>
                <GenreBox text="Dancehall" bgcolor="bg-lime-300"/>
                <GenreBox text="Jazz" bgcolor="bg-purple-600"/>
                <GenreBox text="Rhumba" bgcolor="bg-blue-500"/>
                <GenreBox text="Gengetone" bgcolor="bg-pink-400"/>
                <GenreBox text="Kenyan" bgcolor="bg-pink-400"/>
                <GenreBox text="Reggae" bgcolor="bg-orange-500"/>
            </div>
            <div className="mx-4 w-full my-6">
                <div>
                    <p>MUSIC TO GET YOU STARTED</p>
                    <RowContainer text='Popular'/>
                    <div className="grid grid-cols-1 md:grid-cols-3 xs:grid-cols-5 gap-1">
                        <MusItem plays='32K' title='DJ Cleft beats'/>
                        <MusItem plays='32K' title='Best club banger mix DJ 38k'/>
                        <MusItem plays='32K' title='DJ Cleft beats'/>
                        <MusItem plays='32K' title='DJ Cleft beats'/>
                    </div>
                </div>
                <div>
                    <RowContainer text='New Releases'/>
                    <div className="grid grid-cols-2 md:grid-cols-3 xs:grid-cols-5 gap-2">
                        <EasyAfterNoon image='/E.png' text='Easy Afternoon'/>
                        <EasyAfterNoon image='/U.png' text='Easy Afternoon'/>
                        <EasyAfterNoon image='/W.png' text='Easy Afternoon'/>
                        <EasyAfterNoon image='/Q.png' text='Easy Afternoon'/>
                        <EasyAfterNoon image='/T.png' text='Easy Afternoon'/>
                        <EasyAfterNoon image='/Y.png' text='Easy Afternoon'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;