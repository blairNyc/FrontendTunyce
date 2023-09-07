import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import ExplorePage from './user/ExplorePage';
import NotFound from './pages/NotFound';
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
