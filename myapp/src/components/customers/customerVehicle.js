import React, { useState } from "react";
import VehiclesList from "./vehiclesList";
import VehiclesRegistration from "./vehicleRegistration";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import image from "../../images/gt650.jpg";
import im from "../../images/himalayan.avif";

export default function CustomerVehicle() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div className="container-fluid vh-100" style={{ 
            backgroundImage: `url(${im})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
        <div className="container-fluid" style={{ paddingTop: "60px" }}>
            <div className="row">
                <div className="col-lg-10">
                    <VehiclesList />
                </div>
                <div className="col-lg-2">
                    <div className="d-flex justify-content-end mb-3">
                        <Button color="success" onClick={toggle}>Add Vehicle</Button>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle} style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                    Vehicle Registration
                </ModalHeader>
                <ModalBody style={{ backgroundColor: '#f0f0f0', padding: '0px' }}>
                    <img src={image} alt="Constant Image" style={{ width: "100%", marginBottom: "0px" }} />
                    <div style={{ marginTop: "0px" }}><VehiclesRegistration /></div>
                </ModalBody>
                <ModalFooter style={{ backgroundColor: '#3f51b5', borderTop: 'none' }}>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        </div>
    );
}
