import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
//  import Header from "./components/headers/header"
import Listing from './components/listParking';

import LoginPage from './components/userAuthentication.js/login';
import ProductPage from './components/parkingSpace/productPage';
import IndianStandardTime from './components/time'
import Register from './components/userAuthentication.js/register';
import ForgotPassword from './components/userAuthentication.js/settingPassword';
import MapComponent2 from './components/location/map2';
import ParkingSpaceRegister from './components/parkingSpace/registerParkingSpace';
import Otp from './components/userAuthentication.js/otpverification';
import Bookings from './components/payments/bookings';
import Succes from './components/payments/success';
import Cancel from './components/payments/cancel';
import ListParkings from './components/parkingSpace/allParkingLIst';
import Table from './components/dashboards/data-table';
import { useEffect, useReducer, useState } from 'react';
import { ParkingSpaceContext } from './contextApi/context';
import axios from 'axios';
import UserCantroll from './components/usersControll/users-controll';
import Home from './components/home';
import Header from './components/headers/header';
import MyAccount from './components/customers/customerAccount';
import CustomerDetails from './components/customers/customer-details';
import CustomerVehicle from './components/customers/customerVehicle';
import VehicleDetails from './components/customers/vehicleDetails';
import BookingsList from './components/customers/bookingsList';
import { startGetCustomer } from './actions/customerActions/customerProfile';
import { startgetVehicles } from './actions/customerActions/customerVehicle'
import { startGetBookings } from "./actions/customerActions/customerBookings" 
import { useDispatch } from 'react-redux';
function geoWithinSpace(state,action){
  switch(action.type){
    case "GET_PARKINGSPACE_RADIUS":{
      return action.payload
    }
    default :{
      return [...state]
    }
  }
}

function App() {
  const [locationParking,latDispatch]=useReducer(geoWithinSpace,[])
  const [center, setCenter] = useState([0, 0])
  const [radius, setRadius] = useState(10)
  const dispatch=useDispatch()
//   const [usersState,usersDispatch]=useReducer(usersReducer,{

//   isLoggedIn:false
// })
//find current lat and log
useEffect(() => {
  dispatch(startGetCustomer());
  dispatch(startgetVehicles());
  dispatch(startGetBookings());
  (async () => {

      if (navigator.geolocation) {
          console.log(true)
          console.log(navigator.geolocation.getCurrentPosition((location) => {
              console.log("dhwdh", location)
              const { latitude, longitude } = location.coords
              setCenter([latitude, longitude])
          }))
      }
  })()
}, [])
  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //     usersDispatch({
  //       type:"SIGN_IN",
  //       payload:true
  //     })
  //   }
  // })
 useEffect(()=>{
  (async()=>{
    try{
      const response=await axios.get(`http://localhost:3045/api/parkingSpace/radius?lat=${center[0]}&log=${center[1]}&radius=${radius}`)
      console.log("sdfer",response.data)
      latDispatch(({type:"GET_PARKINGSPACE_RADIUS",payload:response.data}))
    }catch(err){
      console.log(err)
    }
  })()
 },[center,radius])
 const setHandleRadius=(r)=>{
  setRadius(r)
 }
  const loginToast = () => {
    toast.success('logged in succesfully', {
      position: "top-right",
      autoClose: 2000,
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
    <div className=''>
      <BrowserRouter>
      <ParkingSpaceContext.Provider value={
        {locationParking,
          setHandleRadius,
          center, setCenter,
          setRadius,radius
        }
      }>
        <Header/>
        {/* <Bookings/> */}
         {/* <MapComponent2/> */}
        {/* <Table/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage loginToast={loginToast}/>}/>
          <Route path='/usersControll' element={<UserCantroll/>}/>
          <Route path='/register'element={<Register registerToast={registerToast}/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/success' element={<Succes/>}/>
          {/* <Route path='/cancel' element={<Cancel/>}/> */}

          <Route path='/spaceBookingPage' element={<ProductPage/>}/> 
          <Route path='/myAccount' element={<MyAccount/>}/>
          <Route path='/account' element={<CustomerDetails/>}/>
          <Route path='/vehicles' element={<CustomerVehicle/>}/>
          <Route path='/VEHICLEDETAILS/:id' element={<VehicleDetails/>}/>
          <Route path='/bookings' element={<BookingsList/>}/>
          


          <Route path='/spaceBookingPage/:id' element={<ProductPage/>}/> 

        </Routes>
        <ToastContainer/>
      </ParkingSpaceContext.Provider>
      </BrowserRouter> 
    </div>

  );
}

export default App;
