import { useEffect, useState, useContext } from "react"
import { ParkingSpaceContext } from "../../contextApi/context"
import axios from 'axios'
import { Link } from "react-router-dom"
import { Col, Row, Container, Button } from "react-bootstrap"
import { getDistance } from 'geolib'
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { startAddSpaceCart } from "../../actions/customerActions/customerSpaceCart";
// import getDistance from 'geolib/es/getDistance'
export default function ListParkings() {
  const [parking, setParking] = useState([])
  const dispatch = useDispatch()
  const { locationParking, center } = useContext(ParkingSpaceContext)
  const calculateDistance = (userGeo, parkingGeo) => {
    return getDistance(userGeo, parkingGeo, 1)
  }
  const cart = useSelector(state => state.customer.cart);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const isSpaceInCart = (spaceId) => {
    return cart.some(item => item.parkingSpace && item.parkingSpace._id === spaceId);
  };
  const handleAddToCart = (spaceId) => {
    if (isSpaceInCart(spaceId)) {
      const updatedSpaces = selectedSpaces.filter(id => id !== spaceId);
      setSelectedSpaces(updatedSpaces);
    } else {
      const updatedSpaces = [...selectedSpaces, spaceId];
      setSelectedSpaces(updatedSpaces);
    }
    dispatch(startAddSpaceCart(spaceId));
  };
  return (
    <div className="container mt-4" style={{ paddingTop: '40px', paddingBottom: "60px" }}>
      <div className="row">
        {locationParking.length != 0 ? (locationParking.map((ele, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">         
              <div className="card shadow-sm h-100">
                <img src={`http://localhost:3045/uploads/${ele.image}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <Container>
                    <Row>              
                        <h5 className="card-text text-center">{ele.title}</h5>                    
                      {/* <Col>
                              <p className="card-text">{ele.amenities}</p>
                              </Col> */}
                    </Row>
                    <Row>
                      {/* <Col>
                              <p>pricing starting from {ele.spaceTypes[0].amount} per hour</p>
                              </Col> */}
                      <Col>
                        <p>distance from your location is {Math.round(calculateDistance(center, ele.address.coordinates) / 1000)} k</p>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col>
                              <p>distance from your location is {Math.round(calculateDistance(center,ele.address.coordinates)/1000)} kilometer</p>
                              </Col> */}
                      <Col sm={8}>
                        <Link to={`/spaceBookingPage/${ele._id}`} className="btn btn-primary" style={{ width: '8rem' }}>
                          Go..Book
                        </Link>

                      </Col>
                      <Col sm={4} >
                        <Button variant="link" className="p-0 border-0" onClick={() => handleAddToCart(ele._id)}>
                          {selectedSpaces.includes(ele._id) || isSpaceInCart(ele._id) ? <BsBookmarkFill style={{ color: 'red', fontSize: '1.5rem' }} /> : <BsBookmark style={{ color: 'black', fontSize: '1.5rem' }} />}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            
          </div>
        ))) : (<p className="text-center bold">No Parking Space Found</p>)}
      </div>
    </div>

  )
}

