import axios from "axios";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Container, Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

function ReviewBooking() {
    const { id } = useParams();
    const booking = useSelector(state => state.customer.bookings.find(b => b._id === id));
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

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
            const response = await axios.post(`http://localhost:3045/api/booking/${id}/parkingSpace/${booking.parkingSpaceId?._id}`, formData, {
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
        <Container style={{paddingTop:"60px"}}>
            <h2 className="text-center mt-4">Review for Parking Space: {booking.parkingSpaceId?.title}</h2>
            <Row className="justify-content-center">
                <Col sm={6} className="text-center">
                    <div className="image-container">
                        <img
                            src={`http://localhost:3045/uploads/${booking.parkingSpaceId?.image}`}
                            alt={booking.parkingSpaceId?.title}
                            className="booking-image img-fluid"
                            style={{ maxHeight: "300px" }}  // Control the size of the image here
                        />
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col sm={6} className="text-center">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <ReactStarsRating
                                count={5}
                                value={rating}
                                onChange={handleRatingChange}
                                size={40}
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
                        <button type="submit" color="primary">Submit</button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ReviewBooking;
