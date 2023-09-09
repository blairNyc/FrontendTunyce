<<<<<<< HEAD
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ExplorePage from "./user/ExplorePage";
import NotFound from "./pages/NotFound";
import MusicPage from "./user/MusicPage";
import MixesPage from "./user/MixesPage";
=======
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ExplorePage from './user/ExplorePage';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Aboutpage from './pages/Aboutpage';

>>>>>>> 37cf602acde77ec1ac56742ac055ed106593b1cf
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <Homepage />,
      },
      {
<<<<<<< HEAD
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/music",
        element: <MusicPage />,
      },
      {
        path: "/mixes",
        element: <MixesPage />,
      },
    ],
=======
        path:'/explore',
        element: <ExplorePage/>
      },
      {
        path:'/about',
        element: <Aboutpage />
      }
    ]
>>>>>>> 37cf602acde77ec1ac56742ac055ed106593b1cf
  },
  {
    element: <div>Login</div>,
    path: "/login",
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
