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
const NotFoundRouter: RouteObject = {
  path: "*",
  element: <NotFound />,
}
function App() {
  const curr_loggedin_user= useAppSelector((state:RootState)=>state.auth.auth.curr_loggedin_user);
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
        NotFoundRouter,
      ]
    }:NotFoundRouter,
    curr_loggedin_user===""?{
      element: <DefaultLayout/>,
      children:[
        {
          path:'/',
          element: <LandingPage/>
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]
    }:{},
    // NotFoundRouter,
    {
      path:'/faqs',
      element: <FreqAskedQuesPage/>
    },
    {
      path:'/terms-conditions',
      element: <TermsConditionsPage/>
    },
    curr_loggedin_user==="is_normaluser"?{
      element: <UserLayout />,
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path:'/',
          element: <Homepage/>
        },
        {
          path:'/explore',
          element: <ExplorePage/>
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
      ]
    }:NotFoundRouter,
    {
      element: <Login/>,
      path:'/login',
    },
    {
      element:<SignUp/>,
      path:'/signup'
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
