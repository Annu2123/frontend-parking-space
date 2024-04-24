import axios from 'axios'
import { filter } from 'lodash'
import React, { useState, useContext } from 'react'
import { ParkingSpaceContext } from "../../contextApi/context"
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { startParkingSpaceBooking } from"../../actions/customerActions/customerBookings"
import { TextField } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/lab'

import DatePicker from "react-datepicker"
import { setHours } from 'date-fns'
import { setMinutes } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import Swal from 'sweetalert2'
export default function Filter(props) {
    const dispatch = useDispatch()
    const { id, user } = props
    const { locationParking } = useContext(ParkingSpaceContext)
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [parkingType, setParkingType] = useState('')
    const [availableSeat, setAvaibleSeat] = useState('')
    const [selectedSeats, setSelectedSeats] = useState(null);
    const [totalAmount, setTotalAmount] = useState('')
    const [bookingError, setBookingError] = useState({})
    const errors = {}
    

    const handleStartChange = (start) => {
        console.log('sdt',new Date(start))
        setStartDateTime(start)
     
    }
    const handleEndChange = (end) => {
        setEndDateTime(end)
    }
    // const bookingValidation = () => {
    //     if (selectedDate.length == 0) {
    //         errors.selectedDate = "please select the dte"
    //     }
    //     if (new Date(selectedDate) >= new Date()) {
    //         errors.selectedDate = "date should be greater than today"
    //     }
    //     if (startTime.length == 0) {
    //         errors.startTime = "please chooose start time"
    //     }
    //     if (endTime.length == 0) {
    //         errors.endTime = "please choose end time"
    //     }
    //     if (startTime >= endTime) {
    //         errors.startTime = "start must be less than endTime"
    //     }
    //     if (endTime <= startTime) {
    //         errors.endTime = "end time must be greater than start time"
    //     }
    //     if (parkingType.length == 0) {
    //         errors.parkingType = "please select parking type"
    //     }
    //     if (startTime <= new Date(selectedDate).getHours()) {
    //         errors.startTime = "please select time more than current time"
    //     }

    // }

    // console.log(new Date())
    // console.log(selectedDate)
    const toggleSeat = (seat) => {
        setSelectedSeats(selectedSeats === seat ? null : seat)
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
        // bookingValidation()
        console.log(errors)
        if (Object.keys(errors).length == 0) {
            try {
                const response = await axios.get(`http://localhost:3045/api/parkingSpace/${id}/spaceType/${parkingType}?startDateTime=${formatDate(startDateTime)}&endDateTime=${formatDate(endDateTime)}`)
                console.log(response.data)
                setAvaibleSeat(response.data)
                calculateTotalAmount()
            } catch (err) {
                console.log(err)
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
    //calculating total amount 
    const calculateTotalAmount = () => {
        const filteredSpace = filterSpace()
        const selectedSpaceType = filteredSpace?.spaceTypes?.find((ele) => ele._id === parkingType);
        if (selectedSpaceType) {
            return setTotalAmount(selectedSpaceType.amount * calculateDuration())

        }
        return 0
    }
    const popUp=()=>{
        Swal.fire({
            title:` hello ${user.users.name}`,
            text: "Your booking request is success please wait for approval",
            icon: "success"
        })
    }
    const handleClick = async () => {
        const bookingForm = {
            vehicleId: "65fe556cc91c4e1012b5a0c6",
            amount: totalAmount,
            startDateTime: `${formatDate(startDateTime)}`,
            endDateTime:` ${formatDate(endDateTime)}`
        }
        dispatch(startParkingSpaceBooking(id, parkingType, bookingForm,popUp))
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
    
    return (
        <Container style={{ marginRight: 0, marginLeft: 0 }}>
            <Row className="align-items-center" >
                <Col xs={7}>
                    <Form.Group>
                        <DatePicker
                            selected={startDateTime}
                            onChange={handleStartChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            placeholderText='startDateTime'
                            minDate={new Date()}
                            // minTime={"00:00:00:00:00"}
                            // maxTime={"20:30:00:00:00"}
                            className={bookingError.selectedDate ? "form-control is-invalid" : "form-control"}
                        />
                        {bookingError.selectedDate && (
                            <div className="invalid-feedback">{bookingError.selectedDate}</div>
                        )}
                    </Form.Group>
                </Col>
                {/* <Col xs="auto">
                    <Form.Group controlId="start-time">
                        <Form.Label>start time</Form.Label>
                        <Form.Control
                            type="time"
                            name="start-time"
                            // min={getCurrentTime()}
                            value={startTime}
                            // onChange={handleStartTimeChange}   
                            onChange={(e) => { setStartTime(e.target.value) }}
                            isInvalid={bookingError.startTime}
                        />
                        <Form.Control.Feedback type="invalid">
                            {bookingError.startTime && bookingError.startTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col> */}
                <Col xs={5}>
                    <Form.Group controlId="time">
                          
                    <DatePicker
                            selected={endDateTime}
                            onChange={handleEndChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            placeholderText='EndDateTime'
                            className={bookingError.selectedDate ? "form-control is-invalid" : "form-control"}
                        />
                        {/* <Form.Control
                            name='start-time'
                            type="time"
                            value={endTime}
                            onChange={(e) => { setEndTime(e.target.value) }}
                            isInvalid={bookingError.endTime}
                        /> */}
                        <Form.Control.Feedback type="invalid">
                            {bookingError.endTime && bookingError.endTime1}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs="auto">
                    <Form.Group controlId='spaceType'>
                        <Form.Label>Space Type</Form.Label>
                        <Form.Control
                            name='spaceType'
                            as="select"
                            isInvalid={bookingError.parkingType}
                            onChange={(e) => setParkingType(e.target.value)}>
                            <option value="">Select a type</option>
                            {filterSpace()?.spaceTypes?.map((ele) => (
                                <option key={ele._id} value={ele._id}>{ele.types}</option>
                            ))}

                        </Form.Control>

                        <Form.Control.Feedback type="invalid">
                            {bookingError.parkingType && bookingError.parkingType}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <div>
                {startDateTime && endDateTime && (
                    <p>Duration: {calculateDuration()} hours</p>
                )}
            </div>

            <button type='button' className='btn-primary' onClick={handleSearch}>search space</button>

            {/* Seat Selection */}
            {availableSeat ? (<div>
                <Form.Group controlId="seatSelection">
                    <Form.Label>Select your slot:</Form.Label>
                    <div style={{ border: '2px solid #03cffc', padding: '10px', width: '250px' }}>

                        {[...Array(Number(availableSeat))].map((_, index) => (
                            <div className={  'rounded text-center' } 
                                key={index}
                                onClick={() => toggleSeat(index + 1)}
                                style={{
                                    width: '40px',
                                    height: '35px',
                                    border: '1px solid #037ffc',
                                    margin: '2px',
                                    display: 'inline-block',
                                    backgroundColor: selectedSeats === index + 1 ? '#0b7a0f' : 'transparent',
                                    cursor: 'pointer',
                                    
                                }}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </Form.Group>
                <div>
                    <div>
                        total Amount- {totalAmount}
                    </div>
                    {selectedSeats ? (<Button variant="primary" block onClick={handleClick}>
                        Book Now
                    </Button>) : <p>please select the slot</p>}
                </div>
            </div>
            ) : <p>no Space is available</p>}
        </Container>
    )
}