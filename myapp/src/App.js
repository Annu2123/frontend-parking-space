import { ToastContainer, toast } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
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
import { startGetSpaceCarts } from './actions/customerActions/customerSpaceCart';


import PaymentPage from './components/payments/bookings';
import OwnerDetail from './components/admin-dashborad/OwnerDetail';
import { useDispatch, useSelector } from 'react-redux';
import ParkingSpaceBooking from './components/OwnerDashboard/bookingList';
import { startGetUserDetail } from './actions/users';
import MySpace from './components/OwnerDashboard/mySpace';
import OwnerMain from './components/OwnerDashboard/myAccount';
import PrivateRoute from './components/privateRoute/privateRoutes';
import Admin from './components/admin-dashborad/admin';
import ReviewBooking from './components/customers/reviewBooking';
import SpaceCart from './components/customers/spaceCartReg'
function geoWithinSpace(state, action) {
  switch (action.type) {
    case "GET_PARKINGSPACE_RADIUS": {
      return action.payload
    }
    default: {
      return [...state]
    }
  }
}

function App() {
  const [locationParking, latDispatch] = useReducer(geoWithinSpace, [])
  const [center, setCenter] = useState([0, 0])
  const [radius, setRadius] = useState(10)
  const dispatch = useDispatch()
  //   const [usersState,usersDispatch]=useReducer(usersReducer,{

  //   isLoggedIn:false
  // })
  //find current lat and log
  const user = useSelector((state) => {
    return state.users
  })
  
  useEffect(()=>{
    console.log("dsdksdksdkskkk")
   if(user?.users?.role === 'customer'){
    dispatch(startGetCustomer())
    dispatch(startgetVehicles())
    dispatch(startGetBookings())
    dispatch(startGetSpaceCarts())
   }
  },[user])
  useEffect(() => {
    (async () => {

      if (navigator.geolocation) {
        console.log(true)
        console.log(navigator.geolocation.getCurrentPosition((location) => {
          console.log("dhwdh", location)
          const { latitude, longitude } = location.coords
          setCenter([latitude, longitude])
        }))
      }
    })();
  }, [])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(startGetUserDetail())
    }
  }, [dispatch])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3045/api/parkingSpace/radius?lat=${center[0]}&log=${center[1]}&radius=${radius}`)
        console.log("sdfer", response.data)
        latDispatch(({ type: "GET_PARKINGSPACE_RADIUS", payload: response.data }))
      } catch (err) {
        console.log(err)
      }
    })()
  }, [center, radius])
  const setHandleRadius = (r) => {
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

  const registerToast = () => {
    toast.success('Successfully created account', {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  const parkingRegisterToast = () => {
    toast.success('Successfully created parking Space', {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }
  return (
    <div className=''>
      <BrowserRouter>
        <ParkingSpaceContext.Provider value={
          {
            locationParking,
            setHandleRadius,
            center, setCenter,
            setRadius, radius
          }
        }>
          <Header />
          {/* <Bookings/> */}
          {/* <MapComponent2/> */}
          {/* <Table/> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage loginToast={loginToast} />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/usersControll' element={<UserCantroll />} />
            <Route path='/register' element={<Register registerToast={registerToast} />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/success' element={<Succes />} />
            <Route path='/cancel' element={<Cancel/>}/>
            <Route path='/spaceBookingPage' element={<ProductPage />} />
            <Route path='/myAccount' element={<PrivateRoute permmitedRoles={['customer']}> 
            <MyAccount />
              </PrivateRoute>} />
            <Route path='/account' element={<PrivateRoute permmitedRoles={['customer']}>
            <CustomerDetails />
              </PrivateRoute>} />
            <Route path='/vehicles' element={<PrivateRoute permmitedRoles={['customer']}>
              <CustomerVehicle />
              </PrivateRoute>} />
            <Route path='/VEHICLEDETAILS/:id' element={<PrivateRoute permmitedRoles={['customer']}>
              <VehicleDetails />
            </PrivateRoute>} />
            <Route path='/bookings' element={<PrivateRoute permmitedRoles={['customer']}>
              <BookingsList />
            </PrivateRoute>} />
            <Route path='/paymentPage/:id' element={<PaymentPage />} />
            <Route path='/review/:id' element={<ReviewBooking/>}/>
            <Route path='/spaceCart' element={<SpaceCart/>}/>
            <Route path='/spaceBookingPage/:id' element={
              <PrivateRoute permmitedRoles={['customer']}>
                  <ProductPage/>
              </PrivateRoute>}/>

            {/* owner Routes */}
            <Route path='/myspace' element={<PrivateRoute permmitedRoles={['owner']}>
              <MySpace />
            </PrivateRoute>} />
            <Route path='/main' element={<PrivateRoute permmitedRoles={['owner']}>
              <OwnerMain />
            </PrivateRoute>} />
            <Route path='/parkingSpaceBooking' element={<PrivateRoute permmitedRoles={['owner']}>
              <ParkingSpaceBooking />
            </PrivateRoute>} />
            <Route path='/addParking' element={<PrivateRoute permmitedRoles={['owner']}>
              <ParkingSpaceRegister parkingRegisterToast={parkingRegisterToast} />
            </PrivateRoute>} />
            {/* admin routes */}
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/ownerDetails' element={<OwnerDetail/>}/>
          </Routes>
          <ToastContainer />
        </ParkingSpaceContext.Provider>
      </BrowserRouter>
    </div>

  );
}

export default App;
