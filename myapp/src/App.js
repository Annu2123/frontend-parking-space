import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
//  import Header from "./components/headers/header"
import Listing from './components/listParking';
import ServiceLocator from './components/location';
import LoginPage from './components/userAuthentication.js/login';
import ProductPage from './components/parkingSpace/productPage';
import IndianStandardTime from './components/time'
import Register from './components/userAuthentication.js/register';
import ForgotPassword from './components/userAuthentication.js/settingPassword';
import MapComponent from './components/location/map';
import MapComponent2 from './components/location/map2';
import ParkingSpaceRegister from './components/parkingSpace/registerParkingSpace';
import Otp from './components/userAuthentication.js/otpverification';
import Bookings from './components/payments/bookings';
import Succes from './components/payments/success';
import Cancel from './components/payments/cancel';
import ListParkings from './components/parkingSpace/allParkingLIst';
import CustomerContainer from './components/customers/customerContainer';
import MyAccount from './components/customers/customerAccount';
import CustomerVehicle from './components/customers/customerVehicle';
import configurStore from './store/configureStore';
import { Provider } from 'react-redux';
import{useDispatch} from"react-redux"
import { useEffect } from 'react';
import axios from "axios"
import { startgetVehicles } from './actions/customerActions/customerVehicle';
import VehicleDetails from './components/customers/vehicleDetails';
import CustomerDetails from './components/customers/customer-details';
import { startGetCustomer } from './actions/customerActions/customerActions';
import { startGetBookings } from './actions/customerActions/customerBookings';
// import {Typography, Button} from '@mui/material'
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(startgetVehicles());
    dispatch(startGetCustomer());
    // dispatch(startGetBookings());
  },[])
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

  const parkingRegisterToast = ()=>{
    toast.success('Successfully created parking Space', {
      position:"top-right",
      autoClose:2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }
  return (
    <div>
      {/* <CustomerContainer/> */}
      {/* <MapComponent/> */}
       
        {/* <Header /> */}
        {/* <Bookings/> */}
         {/* <MapComponent2/> */}
         {/* <ListParkings/> */}

        {/* <ParkingSpaceRegister parkingRegisterToast={parkingRegisterToast}/> */}
        
        <Routes>
          {/* <Route path='/login' element={<LoginPage loginToast={loginToast}/>}></Route>
          <Route path='/register'element={<Register registerToast={registerToast}/>}></Route>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/success' element={<Succes/>}/>
          <Route path='/cancel' element={<Cancel/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/> */}
          <Route path='/' element={<CustomerContainer/>}/>
          <Route path='/myAccount' element={<MyAccount/>}></Route>
          <Route path='/vehicles'element={<CustomerVehicle/>}/>
          <Route path="/VEHICLEDETAILS/:id" element={<VehicleDetails/>}/>
          <Route path='/account' element={<CustomerDetails/>}/>
        </Routes>
        <ToastContainer/>

          {/* <Listing /> */}

      {/* <ProductPage /> */}
      {/* <ServiceLocator />
      <IndianStandardTime /> */}
    </div>

  );
}

export default App;
