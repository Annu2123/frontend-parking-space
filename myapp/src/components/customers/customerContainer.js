// import { Link } from "react-router-dom"
 import CustomerHeader from "../headers/customerHeader"
 import MapComponent2 from "../location/map2"
export default function CustomerContainer(){
    return(
        <div className="row">
            <div className="row-md-3">
         <CustomerHeader/>
            </div >
            <div className="row-md-4">
            <MapComponent2/>
            </div>
            <div className="col-md-3"></div>
        </div>
        
    )
}