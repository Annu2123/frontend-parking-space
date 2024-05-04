import axios from "axios";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

function ReviewBooking(props) {
    const { bookingId } = props;
    const booking = useSelector(state => state.customer.bookings.find(b => b._id === bookingId));
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const navigate=useNavigate()
    if (!booking) {
        return <div>Booking not found.</div>;
    }

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            review,
            rating
        };
        try {
            const response = await axios.post(`http://localhost:3045/api/booking/${bookingId}/parkingSpace/${booking.parkingSpaceId?._id}`, formData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            console.log(response.data, 'review');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container style={{ paddingTop: "60px" }}>
            <h3 className="text-center mt-4">Parking Space: {booking.parkingSpaceId?.title}</h3>
            <Row className="justify-content-center">
                <Col sm={6} className="text-center">
                    <div className="image-container">
                        <img
                            src={`http://localhost:3045/uploads/${booking.parkingSpaceId?.image}`}
                            alt={booking.parkingSpaceId?.title}
                            className="booking-image img-fluid"
                            style={{ maxHeight: "300px" }}  
                        />
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col sm={5} className="text-center">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <ReactStarsRating
                                count={5}
                                value={rating}
                                onChange={handleRatingChange}
                                size={20}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="comments">Comments</Label>
                            <Input
                                type="textarea"
                                name="comments"
                                id="comments"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ReviewBooking;
