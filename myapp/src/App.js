import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import Header from './components/header';
import Listing from './components/listParking';
import ServiceLocator from './components/location';
import LoginPage from './components/userAuthentication.js/login';
import ProductPage from './components/parkingSpace/productPage';
import IndianStandardTime from './components/time'
import Register from './components/userAuthentication.js/register';
import MapComponent from './components/location/map';
import MapComponent2 from './components/location/map2';
import ParkingSpaceRegister from './components/parkingSpace/registerParkingSpace';
import Otp from './components/userAuthentication.js/otpverification';
import Bookings from './components/payments/bookings';
import Succes from './components/payments/success';
import Cancel from './components/payments/cancel';
import ListParkings from './components/parkingSpace/allParkingLIst';

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
      <BrowserRouter>
      {/* <MapComponent/> */}
       
        <Header />
        {/* <Bookings/> */}
         {/* <MapComponent2/> */}
         {/* <ListParkings/> */}
        <ParkingSpaceRegister/>
       
        <Routes>
          <Route path='/login' element={<LoginPage loginToast={loginToast}/>}></Route>
          <Route path='/register'element={<Register registerToast={registerToast}/>}></Route>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/success' element={<Succes/>}/>
          <Route path='/cancel' element={<Cancel/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter> 

          {/* <Listing /> */}

      {/* <ProductPage /> */}
      {/* <ServiceLocator />
      <IndianStandardTime /> */}

    </div>

  );
}

export default App;
