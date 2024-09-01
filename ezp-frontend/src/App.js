import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import AdminLogin from './Pages/AdminLogin'
import UserForm from './Pages/UserForm';
import AdminAccess from './Pages/AdminAccess';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

//Creating an array of object
const routerConfig = createBrowserRouter([
    {path:"/", element:<Home/> },
    {path: "/main/authenticate", element:<UserLogin/> },
    {path: "/admin/authenticate", element:<AdminLogin/> },
    {path: "/main/userForm", element:<UserForm/> },
    {path: "/admin/adminAccess", element:<AdminAccess/> },
  ]); 

function App() {
  return (
    <>
      <RouterProvider router={routerConfig} />
      <ToastContainer/>
    </>
  );
}

export default App;
