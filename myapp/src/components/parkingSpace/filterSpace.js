import axios from 'axios'
import { filter } from 'lodash'
import React, { useState, useContext } from 'react'
import { ParkingSpaceContext } from "../../contextApi/context"
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startParkingSpaceBooking } from '../../actions/customerActions/customerBookings'
import { Grid, TextField } from '@mui/material';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
export default function Filter(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, user } = props
    const { locationParking } = useContext(ParkingSpaceContext)
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [parkingType, setParkingType] = useState('')
    const [availableSeat, setAvaibleSeat] = useState({})
    const [selectedSeats, setSelectedSeats] = useState(null);
    const [totalAmount, setTotalAmount] = useState('')
    const [vehicleType, setvehicleType] = useState('')
    const [bookingError, setBookingError] = useState({})
    const[queryError,setQueryError]=useState("")
    const errors = {}

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
        bookingValidation()
        console.log(errors)
        if (Object.keys(errors).length == 0 && Object.keys(availableSeat).length ==0) {
            try {
                const response = await axios.get(`http://localhost:3045/api/parkingSpace/${id}/spaceType/${parkingType}?startDateTime=${formatDate(startDateTime)}&endDateTime=${formatDate(endDateTime)}`)
                console.log(response.data)
                setAvaibleSeat(response.data)
                calculateTotalAmount()
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
    const popUp = () => {
        Swal.fire({
            title: `hello ${user.users.name}`,
            text: "Your booking request is success please wait for approval",
            icon: "success"
        })
    }
    const handleClick = async () => {
        const bookingForm = {
            vehicleId: vehicleType,
            amount: totalAmount,
            startDateTime: `${formatDate(startDateTime)}`,
            endDateTime: `${formatDate(endDateTime)}`
        }
        dispatch(startParkingSpaceBooking(id, parkingType, bookingForm, popUp, navigate))
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
      console.log(availableSeat)
      console.log(queryError)
    return (
        <Grid fluid style={{ marginRight: 0, marginLeft: 0 }}>
            <Row className="align-items-center" >
                <Col xs={12} md={6}>
                    <Form.Group>
                        <DatePicker
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
                            {bookingError.startDateTime  && <p>{bookingError.startDateTime}</p>}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Group controlId="time">
                  
                        <DatePicker
                            selected={endDateTime}
                            onChange={handleEndChange}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            placeholderText='EndDateTime'
                            minDate={new Date()}
                            filterTime={filterPassedTime}
                            className={bookingError.endDateTime ? "form-control is-invalid" : "form-control"}
                        />
                       
                        <Form.Control.Feedback type="invalid">
                            {bookingError.endDateTime && bookingError.endDateTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col xs={12} md={6} style={{width:"16rem"}} className='ml-4'>
                    <Form.Group controlId='spaceType'>
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
                </Col>
                <Col xs={12} md={6} style={{width:"16rem"}} className=''>
                    <Form.Group controlId='vehicleType'>
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
                </Col>
            </Row>
            <div>
                {startDateTime && endDateTime && (
                    <p>Duration: {calculateDuration()} hours</p>
                )}
            </div>
            <button type='button' className=' btn btn-primary mt-2' onClick={handleSearch}>search space</button>
            <div>    {queryError && <p>{queryError}</p>}</div>
            {/* lot Selection */}
            {availableSeat.capacity >0 ? (<div>
                <Form.Group controlId="seatSelection">
                    <Form.Label>Select your slot:</Form.Label>
                    <div style={{ border: '2px solid #03cffc', padding: '10px', width: '250px' }}>
                        {[...Array(Number(availableSeat.capacity))].map((_, index) => (
                            <div className={'rounded text-center'}
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
                    {selectedSeats ? <div><Button variant="primary" block onClick={handleClick}>
                        Book Now
                    </Button>
                      <Button className='ml-4' variant='danger' block onClick={()=>{setAvaibleSeat({})}}>cancel</Button></div>
                    : <p className='text-success'>please select the slot</p>}
                </div>
            </div>
            ) : <p></p>}
        </Grid>
    )
}