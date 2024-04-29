import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startRemoveVehicle } from '../../actions/customerActions/customerVehicle';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useState } from 'react';
import VehiclesRegistration from './vehicleRegistration';

export default function VehicleDetails() {
    const [editId, seteditId] = useState('')
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const vehicles = useSelector((state) => state.customer.vehicles);
    const vehicle = vehicles.find(ele => ele._id === id);
    const handleRemove = (vehicle) => {
        const confirmation = window.confirm(`Are you sure you want to remove vehicle ${vehicle.vehicleName}?`);
        if (confirmation) {
            dispatch(startRemoveVehicle(vehicle._id, navigate));
        }
    };
    const handleUpdate=(id)=>{
        seteditId(id)

    }

    return (
        <div className="container vh-100" style={{paddingTop:"60px"}}>
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6 text-center bg-light p-4 rounded shadow">
                    <h2 className="mb-4">Vehicle Details</h2>
                    {vehicle ? (
                        <div>
                            <p className="font-weight-bold">Vehicle Name: <span className="font-weight-normal">{vehicle.vehicleName}</span></p>
                            <p className="font-weight-bold">Vehicle Number: <span className="font-weight-normal">{vehicle.vehicleNumber}</span></p>
                            <p className="font-weight-bold">Vehicle Type: <span className="font-weight-normal">{vehicle.vehicleType}</span></p>
                            <p className="font-weight-bold">Vehicle Documents:
                                <span className="font-weight-normal">
                                    <a
                                        href={`http://localhost:3045/uploads/${vehicle.documents}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2"
                                    >
                                        View Document
                                    </a>
                                </span>
                            </p>
                            <p className="font-weight-bold">Vehicle Is Verified: <span className="font-weight-normal">{vehicle.isVerified ? "Verified" : "Not Verified"}</span></p>
                            <div className="mt-4">
                                <button onClick={() => {
                                    handleUpdate(id)
                                    toggle()
                                }} className="btn btn-primary mr-2">Update</button>
                                <button onClick={() => handleRemove(vehicle)} className="btn btn-danger">Remove</button>
                            </div>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>{editId}</ModalHeader>
                                <ModalBody>
                                <VehiclesRegistration editId={editId}/>
                                </ModalBody>
                               
                            </Modal>
                        </div>
                    ) : (
                        <p>No vehicle found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
