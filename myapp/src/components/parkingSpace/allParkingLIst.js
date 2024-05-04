
import React, { useEffect, useState, useContext } from 'react';
import { ParkingSpaceContext } from '../../contextApi/context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Button, Modal } from 'react-bootstrap';
import { getDistance } from 'geolib';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { startAddSpaceCart } from '../../actions/customerActions/customerSpaceCart';
import StarRatings from 'react-star-ratings'; // Make sure to install this package

export default function ListParkings() {
  const { locationParking, center } = useContext(ParkingSpaceContext);
  const [showModal, setShowModal] = useState(false);
  const [currentReviews, setCurrentReviews] = useState([]);
  const dispatch = useDispatch();
  const ratings = useSelector(state => state.customer.ratings);
  const calculateDistance = (userGeo, parkingGeo) => {
    return getDistance(userGeo, parkingGeo, 1);
  };
  const calculateAverageRating = (parkingId) => {
    const relevantRatings = ratings.filter(r => r.parkingSpaceId === parkingId);
    const averageRating = relevantRatings.reduce((acc, curr) => acc + curr.rating, 0) / relevantRatings.length;
    return averageRating || 0;
  };

  const cart = useSelector(state => state.customer.cart);
  const [selectedSpaces, setSelectedSpaces] = useState([]);

  const isSpaceInCart = (spaceId) => {
    return cart.some(item => item.parkingSpace && item.parkingSpace._id === spaceId);
  }

  const handleAddToCart = (spaceId) => {
    if (isSpaceInCart(spaceId)) {
      const updatedSpaces = selectedSpaces.filter(id => id !== spaceId);
      setSelectedSpaces(updatedSpaces);
    } else {
      const updatedSpaces = [...selectedSpaces, spaceId];
      setSelectedSpaces(updatedSpaces);
    }
    dispatch(startAddSpaceCart(spaceId));
  }
  
  const handleShowReviews = (parkingId) => {
    setCurrentReviews(ratings.filter(review => review.parkingSpaceId === parkingId));
    setShowModal(true);
  }

  return (
    <div className="container mt-4" style={{ paddingTop: '40px', paddingBottom: "60px" }}>
      <div className="row">
        {locationParking.length !== 0 ? locationParking.map((ele, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <img src={`http://localhost:3045/uploads/${ele.image}`} className="card-img-top" alt={ele.title} />
              <div className="card-body">
                <Container>
                  <Row>
                    <h5 className="card-text text-center">{ele.title}</h5>
                  </Row>
                  <Row>
                    <Col>
                    <p>distance from your location is {Math.round(calculateDistance(center, ele.address.coordinates) / 1000)} k</p>
                    </Col>
                  </Row>
                  <Row>
                    <StarRatings
                      rating={calculateAverageRating(ele._id)}
                      starDimension="30px"
                      starSpacing="3px"
                      starRatedColor="gold"
                    />
                  </Row>
                  <Row>
                    <Col>
                      <Link onClick={() => handleShowReviews(ele._id)}>Reviews</Link>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={8}>
                      <Link  to={`/spaceBookingPage/${ele._id}`} className="btn btn-primary" style={{ width: '8rem', textDecoration: 'none' }}>
                        Go..Book
                      </Link>
                    </Col>
                    <Col sm={4}>
                      <Button variant="link" className="p-0 border-0" onClick={() => handleAddToCart(ele._id)}>
                        {selectedSpaces.includes(ele._id) || isSpaceInCart(ele._id) ? <BsBookmarkFill style={{ color: 'red', fontSize: '1.5rem' }} /> : <BsBookmark style={{ color: 'black', fontSize: '1.5rem' }} />}
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        )) : <p className="text-center bold">No Parking Space Found</p>}
      </div>
  {/* model for showing reviews */}
  <Modal show={showModal} onHide={() => setShowModal(false)} centered scrollable>
  <Modal.Header closeButton style={{ background: '#ffffcc', color: 'black' }}>
        <Modal.Title>Reviews for Parking Space</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-light" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        <h2 className="mb-3">Number of Reviews: {currentReviews.length}</h2>
        {currentReviews.length > 0 ? currentReviews.map((review, index) => (
            <div key={index} className="mb-3 p-2" style={{ borderLeft: '5px solid royalblue', background: 'white', borderRadius: '5px' }}>
                <strong className="text-secondary">Customer:</strong> <span className="text-primary">{review.customerId.name}</span> <br />
                <strong className="text-secondary">Rating:</strong> <span className="text-dark"><StarRatings
                      rating={review.rating}
                      starDimension="20px"
                      starSpacing="3px"
                      starRatedColor="gold"
                    /></span><br/>
                <strong className="text-secondary">Review:</strong> <span className="text-dark">{review.review}</span>
            </div>
        )) : <div className="text-center text-secondary">No reviews yet.</div>}
    </Modal.Body>
    <Modal.Footer className="bg-white">
        <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Close
        </Button>
    </Modal.Footer>
</Modal>
    </div>
  );
}
