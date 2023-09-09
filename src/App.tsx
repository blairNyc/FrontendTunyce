import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ExplorePage from './user/ExplorePage';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import Aboutpage from './pages/Aboutpage';

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: '*',
        element: <NotFound/>
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
        path:'/about',
        element: <Aboutpage /> 
      }
    ]
  },
  {
    element: <div>Login</div>,
    path:'/login',
  },
])
function App() {

  return (
    <RouterProvider router={router}  />
  )
}

export default App
