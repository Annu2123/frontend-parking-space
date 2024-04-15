import axios from 'axios'
import { filter } from 'lodash'
import React, { useState, useContext } from 'react'
import { ParkingSpaceContext } from "../../contextApi/context"
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
export default function Filter(props) {
    const { id } = props
    const { locationParking } = useContext(ParkingSpaceContext)
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [ParkingType, setParkingType] = useState('')
    const [availableSeat, setAvaibleSeat] = useState('')
    const [selectedSeats, setSelectedSeats] = useState(null);
    const [totalAmount, setTotalAmount] = useState('')
    const toggleSeat = (seat) => {
        setSelectedSeats(selectedSeats === seat ? null : seat)
    }
    console.log("saa", locationParking)
    console.log(ParkingType)
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
    }
    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    }
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
    }


    // Formating  the date to yyyy-mm-dd
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
    const calculateDuration = () => {
        // Convert start and end times to Date objects
        const startDate = new Date(`${selectedDate}T${startTime}`)
        const endDate = new Date(`${selectedDate}T${endTime}`)
        // Calculate the difference in milliseconds
        const difference = endDate - startDate
        // Convert milliseconds to hours
        const durationHours = difference / (1000 * 60 * 60)
        return durationHours
    }
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3045/api/parkingSpace/${id}/spaceType/${ParkingType}?startDateTime=${selectedDate}T${startTime}&endDateTime=${selectedDate}T${endTime}`)
            console.log(response.data)
            setAvaibleSeat(response.data)
            calculateTotalAmount()
        } catch (err) {
            console.log(err)
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
        const filteredSpace = filterSpace();
        const selectedSpaceType = filteredSpace?.spaceTypes?.find((ele) => ele._id === ParkingType);
        if (selectedSpaceType) {
            return setTotalAmount(selectedSpaceType.amount * calculateDuration())

        }
        return 0
    }
    const handleClick = async () => {
        const bookingForm = {
            vehicleId: "65fe556cc91c4e1012b5a0c6",
            amount: totalAmount,
            startDateTime: `${selectedDate}T${startTime}:00`,
            endDateTime: `${selectedDate}T${endTime}:00`
        }
        console.log("bookingForm",bookingForm)
        try {
            const response = await axios.post(`http://localhost:3045/api/booking/${id}/spaceTypes/${ParkingType}`, bookingForm, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(totalAmount)
    return (
        <>
            <Form.Group controlId="dateSelection">
                <Form.Label>Select date:</Form.Label>
                <Form.Control
                    type="date"
                    value={formatDate(selectedDate)}
                    onChange={handleDateChange}
                />
            </Form.Group>

            <label htmlFor="start-time">Start Time:</label>
            <input
                type="time"
                id="start-time"
                value={startTime}
                onChange={handleStartTimeChange}
                step="3600"
            />

            <label htmlFor="end-time">End Time:</label>
            <input
                
                type="time"
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
            />

            {/* selecting type of parking */}
            <label>select parking type</label>
            <select onChange={(e) => { setParkingType(e.target.value) }} >
                {filterSpace()?.spaceTypes?.map((ele) => {
                    return <option key={ele._id} value={ele._id}>{ele.types}</option>
                })}
            </select>

            <div>
                {startTime && endTime && (
                    <p>Duration: {calculateDuration()} hours</p>

                )}
            </div>

            <button onClick={handleSearch}>search space</button>

            {/* Seat Selection */}
            {availableSeat ? (<div>
                <Form.Group controlId="seatSelection">
                    <Form.Label>Select your slot:</Form.Label>
                    <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>

                        {[...Array(Number(availableSeat))].map((_, index) => (
                            <div
                                key={index}
                                onClick={() => toggleSeat(index + 1)}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    border: '1px solid #ccc',
                                    margin: '2px',
                                    display: 'inline-block',
                                    backgroundColor: selectedSeats === index + 1 ? '#ccc' : 'transparent',
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
                    </Button>): <p>please select the slot</p>}
                    
                </div>
            </div>
            ) : <p>no Space is available</p>}

        </>
    )
}