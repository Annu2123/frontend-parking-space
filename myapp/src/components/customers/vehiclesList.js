import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startgetVehicles } from "../../actions/customerActions/customerVehicle";

export default function VehiclesList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startgetVehicles());
    }, [dispatch]);

    const vehicles = useSelector((state) => state.customer.vehicles);

    return (
        <div className="container py-5">
            <h2 className="text-white mb-3">Vehicle List</h2>
            <p className="text-white mb-4"></p>
            <div className="row">
                {vehicles.map((vehicle, index) => (
                    <div key={vehicle._id} className="col-md-4 mb-4">
                        <Link to={`/VEHICLEDETAILS/${vehicle._id}`} style={{ textDecoration: 'none', color: '#483C32' }}>
                            <div className="card bg-white text-black h-100"> 
                                <div className="card-header" style={{ backgroundColor: '#483C32' }}> {/* Add custom style for card header color */}
                                    <h5 className="card-title">{vehicle.vehicleName}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><b>Vehicle Name</b>: {vehicle.vehicleName}</p>
                                    <p className="card-text"><b>Vehicle Type</b>: {vehicle.vehicleType}</p>
                                    <p className="card-text"><b>Vehicle Number</b>: {vehicle.vehicleNumber}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
