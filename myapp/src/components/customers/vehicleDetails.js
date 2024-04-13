import React from 'react';
import { useParams,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { startRemoveVehicle } from '../../actions/customerActions/customerVehicle';

export default function VehicleDetails() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const vehicles = useSelector((state) => state.customer.vehicles);
    const { id } = useParams();
    const vehicle = vehicles.find(ele => ele._id === id);
    const handleRemove=(vehicle)=>{
        const conformation=window.confirm(`Are you sure to remove vehicle ${vehicle.vehicleName}`)
        if(conformation){
           dispatch(startRemoveVehicle(vehicle._id,navigate))
        }
    }
    return (
        <div className="container vh-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6 text-center bg-light p-4 rounded shadow">
                    <h2 className="mb-4">Vehicle Details</h2>
                    {vehicle ? (
                        <div>
                            <p className="font-weight-bold">Vehicle Name: <span className="font-weight-normal">{vehicle.vehicleName}</span></p>
                            <p className="font-weight-bold">Vehicle Number: <span className="font-weight-normal">{vehicle.vehicleNumber}</span></p>
                            <p className="font-weight-bold">Vehicle Type: <span className="font-weight-normal">{vehicle.vehicleType}</span></p>
                            <p className="font-weight-bold">Vehicle Documents: <span className="font-weight-normal">{vehicle.documents}</span></p>
                            <p className="font-weight-bold">Vehicle IsVerified: <span className="font-weight-normal">{vehicle.isVerified?"verified":"notVerified"}</span></p>
                            <div className="mt-4">
                                <button  className="btn btn-primary mr-2">Update</button>
                                <button onClick={()=>{
                                    handleRemove(vehicle)
                                }} className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    ) : (
                        <p>No vehicle found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

