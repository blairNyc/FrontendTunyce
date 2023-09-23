import './App.css';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ExplorePage from "./user/ExplorePage";
import NotFound from "./pages/NotFound";
import CreatorsPage from "./pages/Creators";
import CreatorsList from "./pages/CreatorsList";
import Creator from "./components/Creator";
import FreqAskedQuesPage from "./pages/FreqAskedQuesPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import VideoScreen from "./pages/VideoScreen";
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
import RecordLabelHome from './recordLabel/RecordLabelHome';
import UserHome from './user/UserHome';


const NotFoundRouter: RouteObject = {
  path: "*",
  element: <NotFound />,
}


const router = createBrowserRouter([
  {
    element: <RestaurantLayout/>,
    children:[
      {
        path:'/restaurant/oliver/',
        element: <RestaurantHomePage/>
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
        path: "/matatu",
        element: <MatatuPage />,
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
        path: "/record-label",
        element: <RecordLabelHome />
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


function App() {
  return <RouterProvider router={router} />;
}

export default App;
