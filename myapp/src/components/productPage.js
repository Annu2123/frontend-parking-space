import{ useState} from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
export default function ProductPage(){
    const [selectedSeats, setSelectedSeats] = useState(null);

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
                    <h2>Slot Selection</h2>
                    <div>
                        {/* Seat Selection */}
                        <Form.Group controlId="seatSelection">
                            <Form.Label>Select your seat:</Form.Label>
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
                            backgroundColor: selectedSeats ===index + 1 ? '#ccc' : 'transparent',
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
                            <Form.Control type="time" placeholder="Start Time" />
                            <Form.Control type="time" placeholder="End Time" />
                        </Form.Group>

                        {/* Date Selection */}
                        <Form.Group controlId="dateSelection">
                            <Form.Label>Select date:</Form.Label>
                            <Form.Control type="date" />
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