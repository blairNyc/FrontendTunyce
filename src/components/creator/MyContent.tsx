import React, { useState } from 'react';
import Videos from './Videos';
import Live from './Live';
import Playlist from './Playlist';
import TopContent from './TopContent ';

type ActiveNavItem = 'videos' | 'live' | 'playlist';

const MyContent: React.FC = () => {
    const [activeNav, setActiveNav] = useState<ActiveNavItem>('videos');

    const handleTabChange = (navItem: ActiveNavItem) => {
        setActiveNav(navItem);
    };

    return (
        <div className='flex'>
            <div className="min-h-screen p-8 container mx-auto mt-8 ml-4 mr-4  bg-white gap-4 bg-auto bg-no-repeat bg-center rounded-lg">
                <div className="">
                    <ul className="flex space-x-20">
                        <li
                            onClick={() => handleTabChange('videos')}
                            className={`cursor-pointer ${activeNav === 'videos'
                                ? 'text-orange-500 font-semibold border-b-2 border-orange-500'
                                : ''
                                }`}
                        >
                            Videos
                        </li>
                        <li
                            onClick={() => handleTabChange('live')}
                            className={`cursor-pointer ${activeNav === 'live'
                                ? 'text-orange-500 font-semibold border-b-2 border-orange-500'
                                : ''
                                }`}
                        >
                            Live
                        </li>
                        <li
                            onClick={() => handleTabChange('playlist')}
                            className={`cursor-pointer ${activeNav === 'playlist'
                                ? 'text-orange-500 font-semibold border-b-2 border-orange-500'
                                : ''
                                }`}
                        >
                            Playlist
                        </li>
                    </ul>
                </div>
                <div className="component-container">
                    {activeNav === 'videos' && <Videos />}
                    {activeNav === 'live' && <Live />}
                    {activeNav === 'playlist' && <Playlist />}
                </div>
            </div>
            <div className="ml-4 mt-4 w-1/2">
                <TopContent />
            </div>
        </div>
    );
};

export default MyContent;
