import{ useState} from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
export default function ProductPage(){
    const [selectedSeats, setSelectedSeats] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState('10:00');
    const [selectedEndTime, setSelectedEndTime] = useState('11:00');

    const handleDateChange = date => {
        setSelectedDate(date);
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
                <Col sm={8}>
                    {/* Your existing content */}
                </Col>
                <Col sm={4}>
                    <div>
                        <h2>Space Selection</h2>
                        <Form.Group controlId="seatSelection">
                            {/* Seat Selection */}
                            {/* Your seat selection component */}
                        </Form.Group>

                        <Form.Group controlId="timeSelection">
                            <Form.Label>Choose start and end time:</Form.Label>
                            {/* Time Picker */}
                            <TimePicker
                                onChange={handleStartTimeChange}
                                value={selectedStartTime}
                                format="HH:mm"
                                disableClock={true}
                            />
                            <TimePicker
                                onChange={handleEndTimeChange}
                                value={selectedEndTime}
                                format="HH:mm"
                                disableClock={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="dateSelection">
                            <Form.Label>Select date:</Form.Label>
                            {/* Date Picker */}
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                        </Form.Group>

                        {/* Price and total amount */}
                        {/* Your existing content */}
                        {/* Button to Book */}
                        <Button variant="primary" block>
                            Book Now
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}