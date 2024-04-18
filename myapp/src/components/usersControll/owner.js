import OwnerDashBoard from "../OwnerDashboard/dashBorad";
import '../../App.css'
import Customer from "./customer";
import Cancel from "../payments/cancel";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from "react-router-dom";
import Dash from "./dash";
import Grid from "../OwnerDashboard/grid";
export default function Owner() {
  return (
    <div>
      <div className="mt-4">
      <Grid/>
    </div>
      {/* <OwnerDashBoard/> */}
    </div>
  )
}