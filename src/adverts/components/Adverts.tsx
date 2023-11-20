import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

interface AdvertData {
  id: number;
  title: string;
  type: string;
  link: string;
  
}

const Adverts: React.FC = () => {

  const userToken: string | null = useAppSelector((state: RootState) => state.persistAuth.auth.access);
  const [adverts, setAdverts] = useState<AdvertData[]>();
    
  useEffect(() =>{

    const fetchData = async () => {
      try {
  
        const responseRoute = await axios.get('https://warm-journey-18609535df73.herokuapp.com/api/v1/adverts/all/', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
  
        const data = responseRoute.data;
        console.log(data)
  
        setAdverts(data)
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Do nothing
      }

      
    };
    
    fetchData();

  })




  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="font-semibold">My Adverts</h2>
      <div className="mt-4 w-full flex flex-col gap-2">
        {adverts?.map((advert) => (
          <div key={advert.id} className='w-full flex flex-row space-x-10 p-1 gap-2 border-b justfy-center align-center'>
            <img
              src={advert.link}
              alt={advert.title}
              className="rounded-lg h-10 w-10"
            />
            <h3 className="font-semibold mt-2">{advert.title}</h3>
            <p className='mt-2'>{advert.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adverts;
