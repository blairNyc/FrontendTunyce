import './App.css';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserLayout from './components/Layout';
import Homepage from './pages/Homepage';
import ExplorePage from './user/ExplorePage';
import NotFound from './pages/NotFound';
import CreatorsPage from './pages/Creators';
import CreatorsList from './pages/CreatorsList';
import Creator from './components/Creator';
import FreqAskedQuesPage from './pages/FreqAskedQuesPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import VideoScreen from './pages/VideoScreen';
import "./App.css";
import Layout from "./components/Layout";
import Aboutpage from "./pages/Aboutpage";
import MixesPage from "./user/MixesPage";
import MusicPage from "./user/MusicPage";
import Login from './components/auth/userLogin';
import SignUp from './components/auth/userSignUp';
import ArtistPage from "./user/ArtistPage";
import LandingPage from './pages/LandingPage';
import DefaultLayout from './components/DefaultLayout';
import RestaurantLayout from './restaurant/components/RestaurantLayout';
import RestaurantHomePage from './restaurant/pages/RestaurantHomePage';
import RestaurantWalletPage from './restaurant/pages/RestaurantWalletPage';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import ArtistsPage from './pages/ArtistsPage';
import TrendingPage from './pages/TrendingPage';
import SearchPage from './pages/SearchPage';
import NewPage from './pages/NewPage';
import ContentCreatorDashboard from './components/creator/ContentCreatorDashboard';
import MyContent from './components/creator/MyContent';
import FilmmakerDashboard from './components/filmMaker/FilmmakerDashboard';
import FilmmakerWatch from './components/filmMaker/FilmmakerWatch';
import UserWalletPage from "./wallets/UserWalletPage";
import MatatuPage from "./matatus/MatatuPage";
import UserHome from './user/UserHome';
import ControllerCart from './components/controller/ControllerCart';
import ControllerCreators from './components/controller/ControllerCreators';
import AllContollerCreatorsPage from './components/controller/AllContollerCreatorsPage';
import MatatuLayout from './matatus/components/MatatuLayout';
// import { UserTypes } from './types';
import InnerPage from './components/inner-page'
import FilmmakerWalletPage from './components/filmMaker/FilmmakerWallet';


const NotFoundRouter: RouteObject = {
  path: "*",
  element: <NotFound />,
}


const router = createBrowserRouter([
  {
    element: <MatatuLayout/>,
    children:[
      {
        path:'/matatu',
        element: <MatatuPage/>
      },{
        path: '/restaurant/:id/my-wallet',
        element: <RestaurantWalletPage />
      },
      {
        path: "/faqs",
        element: <FreqAskedQuesPage />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditionsPage />,
      },
      NotFoundRouter,
    ]
  },
  {
    element: <DefaultLayout/>,
    children:[
      {
        path:'/',
        element: <LandingPage/>
      },
      {
        path: "/artists",
        element: <ArtistsPage />,
      },
      {
        path:'/search',
        element: <SearchPage/>
      },
      {
        path: "/artists/:id",
        element: <Creator/>,
      },
      {
        path:'/trending',
        element: <TrendingPage/>
      },
      {
        path:'/trending/:id',
        element:<VideoScreen/>
      },
      {
        path:'/new',
        element: <NewPage/>
      },
      {
        path:'/filmmaker_wallet',
        element: <FilmmakerWalletPage />
      }
    ]
  },
  NotFoundRouter,
  {
    path:'/faqs',
    element: <FreqAskedQuesPage/>
  },
  {
    path:'/terms-conditions',
    element: <TermsConditionsPage/>
  },
  {
    element: <Layout />,
    children: [
      NotFoundRouter,
      {
        path:'/home',
        element: <Homepage/>
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/explore/innerpage",
        element: <InnerPage />,
      },
      {
        path: "/creators",
        element: <CreatorsPage />,
      },
      {
        path: "/creators/deejays",
        element: <CreatorsList />,
      },
      {
        path: "/creators/deejays/:id",
        element: <Creator />,
      },
      {
        path: "creators/videos/:id",
        element: <VideoScreen />,
      },
      {
        path: "/music",
        element: <MusicPage />,
      },
      {
        path: "/mixes",
        element: <MixesPage />,
      },
      {
        path: "/artist",
        element: <ArtistPage />,
      },
      {
        path: "/creator",
        element: <ContentCreatorDashboard />
      },
      {
        path: "/creator/my_contents",
        element: <MyContent />
      },
      {
        path: "/film_maker",
        element: < FilmmakerDashboard/>
      },
      {
         path: "/filmmaker-watch/:id", 
         element: < FilmmakerWatch />
      },
      {
        path: "/user-wallet",
        element: <UserWalletPage />,
      },
     
      {
        path: "/about",
        element: <Aboutpage />,
      },
      {
        path: "/userhome",
        element: <UserHome />
      },
      {
        path: "/cart",
        element: <ControllerCart />
      },
      {
        path: "/controller-creators",
        element: <ControllerCreators />
      },
      {
        path: "/all-controller-creators",
        element: <AllContollerCreatorsPage />
      }
    ]
  },
  {
    element: <Login/>,
    path:'/login',
  },
  {
    element:<SignUp/>,
    path:'/signup'
  }
])

console.log(router);
function App() {
  const curr_loggedin_user= useAppSelector((state:RootState)=>state.persistAuth.auth.curr_loggedin_user);
	console.log(curr_loggedin_user);
  const router = createBrowserRouter([
    curr_loggedin_user==="is_restaunt"? {
      element: <RestaurantLayout/>,
      children:[
        {
          path:'/restaurant/',
          element: <RestaurantHomePage/>
        },
        {
          path:'/restaurant/my-wallet',
          element:<RestaurantWalletPage/>
        },
        // NotFoundRouter,
      ]
    }:curr_loggedin_user==="is_normaluser"?{
      element: <UserLayout />,
      children: [
          {
          path:'/home',
          element: <Homepage/>
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path:'/explore',
          element: <ExplorePage/>
        },
        {
          path: "/explore/innerpage",
          element: <InnerPage />,
        },
        {
            path:'/creators',
            element: <CreatorsPage/>
        },
        {
          path: '/creators/deejays',
          element: <CreatorsList/>
        },
        {
          path: '/creators/deejays/:id',
          element: <Creator/>
        },
        {
          path:'creators/videos/:id',
          element: <VideoScreen/>
        },
        {
          path: "/music",
          element: <MusicPage />,
        },
        {
          path: "/mixes",
          element: <MixesPage />,
        },
        {
          path: "/artist",
          element: <ArtistPage />,
        },
        {
          path: "/userhome",
          element: <UserHome />
        },
        {
          path: "/cart",
          element: <ControllerCart />
        },
        {
          path: "/controller-creators",
          element: <ControllerCreators />
        },
        {
          path: "/all-controller-creators",
          element: <AllContollerCreatorsPage />
        },
        {
          path: '/matatu',
          element: <MatatuPage />,
        }
      ]
    }:curr_loggedin_user === "is_matatu" ? {
		element:<MatatuLayout/>,
		children:[
			{
				path:'/matatu',
				element: <MatatuPage/>,
			}
		],
    }
    :curr_loggedin_user === "" ? {
          element: <DefaultLayout />,
          children: [
              {
                  path: '/',
                  element: <LandingPage />
              },
              NotFoundRouter
          ]
      } : NotFoundRouter,
      {
        element: <Login />,
         path: '/login',
      },
      {
         element: <SignUp />,
        path: '/signup'
      },
      {
          path: '/faqs',
          element: <FreqAskedQuesPage />
      },
      {
          path: '/terms-conditions',
          element: <TermsConditionsPage />
      },
  ]);
  return <RouterProvider router={router} />;
}

export default App;