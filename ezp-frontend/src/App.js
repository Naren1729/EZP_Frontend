import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import AdminLogin from './Pages/AdminLogin'

//Creating an array of object
const routerConfig = createBrowserRouter([
    {path:"/", element:<Home/> },
    {path: "/main/authenticate", element:<UserLogin/> },
    {path: "/admin/authenticate", element:<AdminLogin/> }
  ]); 

function App() {
  return (
    <>
      <RouterProvider router={routerConfig} />
    </>
  );
}

export default App;
