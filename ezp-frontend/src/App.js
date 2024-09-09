import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import AdminLogin from './Pages/AdminLogin'
import UserForm from './Pages/UserForm';
import AdminAccess from './Pages/AdminAccess';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import UserDepositForm from './Pages/UserDepositForm';
import MakeTransaction from './Components/MakeTransaction';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import FetchingUserData from './Pages/FetchingUserData';

//Creating an array of object
const routerConfig = createBrowserRouter([
    {path:"/", element:<Home/> },
    {path: "/main/authenticate", element:<UserLogin/> },
    // {path: "/admin/data", element:<FetchingUserData/>},
    {path: "/admin/authenticate", element:<AdminLogin/> },
    {path: "/main/userForm", element:<UserForm/> },
    {path:"/main/userForm1",element:<MakeTransaction/>},
    {path: "/admin/adminAccess", element:<AdminAccess/> },
    {path: "/main/userDepositForm", element:<UserDepositForm/> },
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