import VehiclesRegistration from "./vehicleRegistration"
import VehiclesList from "./vehiclesList"
export default function CustomerVehicle() {
    return (
        <div className="row">
            <div className="col-4">
                <VehiclesList/>
            </div>
            <div className="col-8">
                 <VehiclesRegistration/>
            </div>
        </div>
    )
}