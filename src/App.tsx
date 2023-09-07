import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ExplorePage from "./user/ExplorePage";
import NotFound from "./pages/NotFound";
import MusicPage from "./user/MusicPage";
import MixesPage from "./user/MixesPage";
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
