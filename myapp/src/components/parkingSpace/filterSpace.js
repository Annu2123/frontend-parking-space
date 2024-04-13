import axios from 'axios'
import React, { useState } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
export default function FilterSpace() {
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
    }
    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    }
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
    }


    // Format the date to yyyy-mm-dd
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

        // Return the duration in hours
        return durationHours;
    }
    const handleSearch=async()=>{
           try{
            const response=await axios.get(`http://localhost:3045/api/parkingSpace/66155acbe4615d11b9e245df/spaceType/66155acbe4615d11b9e245e0?startDateTime=${selectedDate}T${startTime}&endDateTime=${selectedDate}T${endTime}`)
            console.log(response.data)
           }catch(err){
            console.log(err)
           }
    }
    console.log(`${selectedDate}T${startTime}`)

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
            />

            <label htmlFor="end-time">End Time:</label>
            <input
                type="time"
                id="end-time"
                value={endTime}
                onChange={handleEndTimeChange}
            />

            <div>
                {startTime && endTime && (
                    <p>Duration: {calculateDuration()} hours</p>
                )}
            </div>

            <button onClick={handleSearch}>search Space</button>
        </>
    )
}