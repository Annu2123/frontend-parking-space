import OwnerDashBoard from "../OwnerDashboard/dashBorad";
import '../../App.css'
import Customer from "./customer";
import Cancel from "../payments/cancel";
import ParkingSpaceRegister from "../parkingSpace/registerParkingSpace";
import { Route, Routes,Link } from "react-router-dom";
export default function Owner(){
    return (
       <div className="owner-container">
         <OwnerDashBoard/>
         <Routes><Route path='/addParking' element={<ParkingSpaceRegister/>}/></Routes>
        
       </div>
    )
}