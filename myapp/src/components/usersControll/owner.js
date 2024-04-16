import OwnerDashBoard from "../OwnerDashboard/dashBorad";
import '../../App.css'
import Customer from "./customer";
import Cancel from "../payments/cancel";
import { Route, Routes } from "react-router-dom";
export default function Owner(){
    return (
       <div className="owner-container">
         <OwnerDashBoard/>

        
       </div>
    )
}