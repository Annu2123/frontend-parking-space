import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header';
import Listing from './components/listParking';
import ServiceLocator from './components/location';
import LoginPage from './components/login';
import ProductPage from './components/productPage';
import IndianStandardTime from './components/time'
import Register from './components/register';
import MapComponent from './components/location/map';
import MapComponent2 from './components/location/map2';
// import {Typography, Button} from '@mui/material'
function App() {

  
  const loginToast = () => {
    toast.success('logged in succesfully', {
      position: "top-right",
      autoClose: 12000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  const registerToast = ()=>{
    toast.success('Successfully created account', {
      position:"top-right",
      autoClose:2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }
  return (
    <div>
      {/* <BrowserRouter> */}
      {/* <MapComponent/> */}
      <MapComponent2/>
        {/* <Header /> */}
       
        {/* <Routes>
          <Route path='/login' element={<LoginPage loginToast={loginToast}/>}></Route>
          <Route path='/register'element={<Register registerToast={registerToast}/>}></Route>
        </Routes>
        <ToastContainer/>
      </BrowserRouter> */}

      {/* <Listing />

      <ProductPage />
      <ServiceLocator />
      <IndianStandardTime /> */}

    </div>

  );
}

export default App;
