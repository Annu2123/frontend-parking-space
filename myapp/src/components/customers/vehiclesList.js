import {useSelector}from "react-redux"
import { Link } from "react-router-dom"
export default function VehiclesList(){
    const vehicles=useSelector((state)=>{
        return state.customer.vehicles
    })
    console.log(vehicles,'vvv')
    return(
        <div>
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
                            <td><Link to={`/VEHICLEDETAILS/${ele._id}`}>view details</Link></td>
                        </tr>
                    )
                 })}
                </tbody>
            </table>
        </div>
    )

}