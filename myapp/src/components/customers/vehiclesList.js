import { useEffect } from "react"
import {useDispatch, useSelector}from "react-redux"
import { Link } from "react-router-dom"
import { startgetVehicles } from "../../actions/customerActions/customerVehicle"
export default function VehiclesList(){
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startgetVehicles())
    })
    const vehicles=useSelector((state)=>{
        return state.customer.vehicles
    })
    return(
        <div style={{paddingTop:"60px"}}>
            <h2>vehiclesList-{vehicles.length}</h2>
            <table className="table table-dark table-striped-columns">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>name</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                 {vehicles?.map((ele,i)=>{
                    return(
                        <tr key={ele._id}>
                            <td>{i+1}</td>
                            <td>{ele.vehicleName}</td>
                            <td><Link to={`/VEHICLEDETAILS/${ele._id}`}  style={{ textDecoration: 'none', color: 'inherit' }}>view details</Link></td>
                        </tr>
                    )
                 })}
                </tbody>
            </table>
        </div>
    )

}