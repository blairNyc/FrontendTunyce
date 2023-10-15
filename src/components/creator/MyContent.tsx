import { useState,useEffect } from 'react';
import Videos from './Videos';
// import Live from './Live';
// import Playlist from './Playlist';
import TopContent from './TopContent ';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
export interface Content{
    id:number,
    videorefUrl:string,
    contentOwner:number,
}
// import { useGetCreatorContentQuery } from '../../matatus/state';
import axios from 'axios';
export default function MyContent(){
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [creatorContent, setCreatorContent] = useState<Content[]>([]);
    const accessToken = useAppSelector((state: RootState) => state.persistAuth.auth.access);
    const decoded = atob(accessToken?.split('.')[1] as string);
    const user = JSON.parse(decoded);
    // const {data} = useGetCreatorContentQuery(user.user_id);
    useEffect(() => {

		const fetchData = async () => {
			try {
				// setIsLoading(!isLoading);

				const responseRoute = await axios.get(`https://warm-journey-18609535df73.herokuapp.com/api/v1/creator/content-creator/${user.user_id}/content/`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const data = responseRoute.data;
				console.log(data)
                setCreatorContent(data);
				// setMatData(data.message)

			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();

	}, []);
    console.log(creatorContent,'content');

    return (
        <div className='flex w-full'>
            <div className="min-h-screen w-full p-8 container mx-auto mt-8 bg-white gap-4 bg-auto bg-no-repeat bg-center rounded-lg">
                <h1 className='font-bold text-2xl'>Videos</h1>
                    <Videos content={creatorContent} />
                <div className="w-full"> 
                </div>
            </div>
            <div className="ml-4 mt-4 w-1/2">
                <TopContent />
            </div>
        </div>
    );
}
