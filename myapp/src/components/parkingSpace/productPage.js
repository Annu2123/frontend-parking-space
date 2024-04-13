import { useState } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
export default function ProductPage() {
    const [selectedSeats, setSelectedSeats] = useState(null);
    const [selectedStartTime, setSelectedStartTime] = useState('10:00');
    const [selectedEndTime, setSelectedEndTime] = useState('11:00');

    // Assuming you have a state to hold the selected date
    const [selectedDate, setSelectedDate] = useState('');
  console.log("date",selectedDate)
    // Function to handle date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Format the date to yyyy-mm-dd
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };


    const handleStartTimeChange = time => {
        setSelectedStartTime(time);
    };

    const handleEndTimeChange = time => {
        setSelectedEndTime(time);
    };

    const toggleSeat = (seat) => {
        setSelectedSeats(selectedSeats === seat ? null : seat)
    };
    return (
        <Container>
            <Row>
                {/* Left Side Container */}
                <Col sm={8}>
                    {/* Product Image */}
                    {/* <Image src="product-image.jpg" fluid /> */}

                    {/* Product Description */}
                    <div>
                        <h2>Description</h2>
                        <p>This is the description of the product.</p>
                    </div>

                    {/* Map */}
                    <div>
                        <h2>Map</h2>
                        {/* <Map /> */}
                    </div>

                    {/* Reviews */}
                    <div>
                        <h2>Reviews</h2>
                        <ul>
                            <li>Review 1</li>
                            <li>Review 2</li>
                            <li>Review 3</li>
                            {/* Add more reviews as needed */}
                        </ul>
                    </div>
                </Col>

                {/* Right Side Container */}
                <Col sm={4}>
                    <div>
                        {/* Slot Selection */}
                        <h2>space Selection</h2>
                        <div>
                            {/* Seat Selection */}
                            <Form.Group controlId="seatSelection">
                                <Form.Label>Select your slot:</Form.Label>
                                {/* Render seat selection component here */}
                                <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                                    {/* Render small boxes for seats */}
                                    {[...Array(6)].map((_, index) => (
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

                            {/* Time Selection */}
                            <Form.Group controlId="timeSelection">
            <Form.Label>Choose start and end time:</Form.Label>
            <TimePicker
                value={selectedStartTime}
                onChange={handleStartTimeChange}
                format="HH"
                disableClock={true}
                clearIcon={null} // Removes the clear icon
                clockIcon={null} // Removes the clock icon
                minTime="00:00"
                maxTime="23:30"
                step={30}
            />
            <TimePicker
                value={selectedEndTime}
                onChange={handleEndTimeChange}
                format="HH:mm"
                disableClock={true}
                clearIcon={null} // Removes the clear icon
                clockIcon={null} // Removes the clock icon
                minTime="00:30" // Ensure end time starts at least 30 minutes after start time
                maxTime="23:59"
                step={30}
            />
        </Form.Group>

                            <Form.Group controlId="dateSelection">
                                <Form.Label>Select date:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={formatDate(selectedDate)}
                                    onChange={handleDateChange}
                                />
                            </Form.Group>

                            {/* Price */}
                            <div>
                                <h2>Price: $100</h2>
                            </div>

                            {/* Total Amount */}
                            <div>
                                <h2>Total Amount: $100</h2>
                            </div>

                            {/* Button to Book */}
                            <Button variant="primary" block>
                                Book Now
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}