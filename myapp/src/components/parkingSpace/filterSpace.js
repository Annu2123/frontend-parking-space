import axios from 'axios'
import React, { useState, useContext } from 'react'
import { ParkingSpaceContext } from "../../contextApi/context"
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BookingModal from './bookingModal'
export default function Filter(props) {
    const { id, user } = props
    const { locationParking } = useContext(ParkingSpaceContext)
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [parkingType, setParkingType] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [vehicleType, setvehicleType] = useState('')
    const [bookingError, setBookingError] = useState({})
    const [queryError, setQueryError] = useState("")
    const errors = {}
    const [modal, setModal] = useState(false)
    const [availableSeat, setAvaibleSeat] = useState({})
    const toggle = () => setModal(!modal)
    const handleBooking = () => {
        toggle()
    }

    const serverError = useSelector(state => state.customer.serverError)
    const vehicles = useSelector((state) => {
        return state.customer.vehicles
    })
    console.log("vehicle", vehicles)

    const handleStartChange = (start) => {
        console.log('sdt', new Date(start))
        setStartDateTime(start)

    }
    const handleEndChange = (end) => {
        setEndDateTime(end)
    }
    const bookingValidation = () => {
        if (startDateTime.length == 0) {
            errors.startDateTime = "please select the dte"
        }
        if (new Date(startDateTime) < new Date()) {
            errors.startDateTime = "date should be greater than today"
        }
        if (endDateTime.length == 0) {
            errors.endDateTime = "please choose end time"
        }
        if (endDateTime <= startDateTime) {
            errors.endDateTime = "end time should be greater than startDateTime"
        }
        if (startDateTime >= endDateTime) {
            errors.startDateTime = "start time must be less than endTime"
        }
        if (parkingType.length == 0) {
            errors.parkingType = "please select parking type"
        }
        if (vehicleType.length == 0) {
            errors.vehicleType = "please select a vehicle"
        }
        // if (startTime <= new Date(selectedDate).getHours()) {
        //     errors.startTime = "please select time more than current time"
        // }
    }

    // Formating  the date to yyyy-mm-dd
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString)
        const year = dateObj.getFullYear()
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
        const day = ('0' + dateObj.getDate()).slice(-2)
        const hours = ('0' + dateObj.getHours()).slice(-2)
        const minutes = ('0' + dateObj.getMinutes()).slice(-2)
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }

    const calculateDuration = () => {
        // Convert start and end times to Date objects
        const startDate = new Date(`${startDateTime}`)
        const endDate = new Date(`${endDateTime}`)
        // Calculate the difference in milliseconds
        const difference = endDate - startDate
        // Convert milliseconds to hours
        const durationHours = difference / (1000 * 60 * 60)
        return durationHours
    }
    const handleSearch = async () => {
        bookingValidation()
        console.log(errors)
        if (Object.keys(errors).length == 0 && Object.keys(availableSeat).length == 0) {
            try {
                const response = await axios.get(`http://localhost:3045/api/parkingSpace/${id}/spaceType/${parkingType}?startDateTime=${formatDate(startDateTime)}&endDateTime=${formatDate(endDateTime)}`)
                console.log(response.data)
                setAvaibleSeat(response.data)
                calculateTotalAmount()
                handleBooking()
            } catch (err) {
                console.log(err)
                setQueryError(err.response.data.error)
            }
        } else {
            setBookingError(errors)
        }
    }

    const filterSpace = () => {
        return locationParking.find((ele) => {
            if (ele._id == id) {
                return ele
            }
        })
    }
    const handleParkingType = (id) => {
        setParkingType(id)
    }
    const typeSelected = () => {
        return filterSpace()?.spaceTypes?.find((ele) => {
            if (ele._id == parkingType) {
                return ele
            }
        })
    }
    const filterVehicle = () => {
        return vehicles?.filter((ele) => {
            if (ele.vehicleType.toLowerCase().includes(typeSelected()?.types.toLowerCase())) {
                return ele
            }
        })
    }
    console.log(filterVehicle(),'fiiiivv')
    //calculating total amount 
    const calculateTotalAmount = () => {
        const filteredSpace = filterSpace()
        const selectedSpaceType = filteredSpace?.spaceTypes?.find((ele) => ele._id === parkingType);
        if (selectedSpaceType) {
            return setTotalAmount(selectedSpaceType.amount * calculateDuration())
        }
        return 0
    }
    function getCurrentTime() {
        const now = new Date();
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        return `${hour}:${minute}`;
    }

    // const handleStartTimeChange = (e) => {
    //     const selectedTime = e.target.value;
    //     const currentTime = getCurrentTime();

    //     // Compare the selected time with the current time
    //     if (selectedTime < currentTime) {
    //         // If selected time is before current time, reset the value
    //         setStartTime(currentTime);
    //     } else {
    //         // Otherwise, update the start time state
    //         setStartTime(selectedTime);
    //     }
    // };
    const filterPassedTime = (time) => {
        const currentDate = new Date()
        const selectedDate = new Date(time)
        return currentDate.getTime() < selectedDate.getTime();
    }

    return (
        <>
            <div class="header text-center">
                <h4>Find space </h4>
            </div>
            <div class="card rounded" style={{ width: "27rem", }} >
                <div class="card-body text-center">
                    <Form.Group className="mb-4">
                        <DatePicker
                            style={{ margin: "auto" }}
                            selected={startDateTime}
                            onChange={handleStartChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            placeholderText='startDateTime'
                            minDate={new Date()}
                            filterTime={filterPassedTime}
                            isInvalid={bookingError.startDateTime}
                            className={bookingError.startDateTime ? "form-control is-invalid" : "form-control"}
                        />
                        <Form.Control.Feedback type="invalid">
                            {bookingError.startDateTime && <p>{bookingError.startDateTime}</p>}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="time" className="mb-4">
                        <DatePicker
                            selected={endDateTime}
                            onChange={handleEndChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            placeholderText='EndDateTime'
                            minDate={new Date()}
                            filterTime={filterPassedTime}
                            className={bookingError.endDateTime ? "form-control is-invalid" : "form-control mt-4"}
                        />
                        <Form.Control.Feedback type="invalid">
                            {bookingError.endDateTime && bookingError.endDateTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='spaceType' className="mb-4">
                        {/* <Form.Label>Space Type</Form.Label> */}
                        <Form.Control
                            name='spaceType'
                            as="select"
                            isInvalid={bookingError.parkingType}
                            onChange={(e) => handleParkingType(e.target.value)}>
                            <option value="">Select space type...</option>
                            {filterSpace()?.spaceTypes?.map((ele) => (
                                <option key={ele._id} value={ele._id}>{ele.types}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {bookingError.parkingType && bookingError.parkingType}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId='vehicleType' className="mb-4">
                        {/* <Form.Label>select vehicle</Form.Label> */}
                        <Form.Control
                            as="select"
                            disabled={parkingType.length == 0}
                            isInvalid={bookingError.vehicleType}
                            onChange={(e) => setvehicleType(e.target.value)}>
                            <option value="">Select a vehicle type</option>
                            {filterVehicle().map((ele) => (
                                <option key={ele._id} value={ele._id}>{ele.vehicleName}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {bookingError.vehicleType && bookingError.vehicleType}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-center" >
                        <button type="button" class="btn btn-primary mt-2 align-items-center" onClick={handleSearch}>Search Space</button>
                    </div>
                    <div>    {queryError && <p>{queryError}</p>}</div>
                    <div>
                        {startDateTime && endDateTime && (
                            <p>Duration: {calculateDuration()} hours</p>
                        )}
                    </div>
                </div>
            </div>


            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalBody className="d-flex justify-content-center align-items-center">

                    <BookingModal id={id} parkingType={parkingType} availableSeat={availableSeat} user={user} toggle={toggle}
                        startDateTime={startDateTime} endDateTime={endDateTime} vehicleType={vehicleType} totalAmount={totalAmount} />

                </ModalBody>
            </Modal>
        </>

    )
}