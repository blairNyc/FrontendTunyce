import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import ExplorePage from './user/ExplorePage';
import NotFound from './pages/NotFound';
import CreatorsPage from './pages/Creators';
import CreatorsList from './pages/CreatorsList';
import Creator from './components/Creator';
import FreqAskedQuesPage from './pages/FreqAskedQuesPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import VideoScreen from './pages/VideoScreen';
// import Aboutpage from "./pages/Aboutpage";
import MixesPage from "./user/MixesPage";
import MusicPage from "./user/MusicPage";
import ArtistPage from "./user/ArtistPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path:'/faqs',
        element: <FreqAskedQuesPage/>
      },
      {
        path:'/terms-conditions',
        element: <TermsConditionsPage/>
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
  },
  {
    element: <div>Login</div>,
    path:'/login',
  }
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
