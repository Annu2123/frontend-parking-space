import { useEffect, useState, useContext } from "react"
import { ParkingSpaceContext } from "../../contextApi/context"
import axios from 'axios'
import { Link } from "react-router-dom"
import { Col, Row,Container } from "react-bootstrap"
import { getDistance } from 'geolib'
// import getDistance from 'geolib/es/getDistance'
export default function ListParkings() {
  const [parking, setParking] = useState([])
  const { locationParking,center } = useContext(ParkingSpaceContext)
  const calculateDistance=(userGeo,parkingGeo)=>{
     return getDistance(userGeo,parkingGeo,1)
  }
  // useEffect(()=>{
  //     (async()=>{
  //         try{
  //             const response=await axios.get('http://localhost:3045/api/parkingSpace')
  //             console.log(response.data)
  //             setParking(response.data)
  //         }catch(err){
  //             console.log(err)
  //         }
  //     })()
  // },[])
  return (
    <div className="container mt-4" style={{ paddingTop: '40px',paddingBottom:"60px" }}>
    <div className="row">
        {locationParking.length !=0 ? (locationParking.map((ele, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
                <Link to={`/spaceBookingPage/${ele._id}`} className="text-decoration-none text-dark">
                    <div className="card shadow-sm h-100">
                        <img src={`http://localhost:3045/uploads/${ele.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <Container>
                            <Row>
                              <Col>
                              <p className="card-text">{ele.title}</p>
                              </Col>
                              {/* <Col>
                              <p className="card-text">{ele.amenities}</p>
                              </Col> */}
                            </Row>
                            <Row>
                              <Col>
                              <p>pricing starting from {ele.spaceTypes[0].amount} per hour</p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                              <p>distance from your location is {Math.round(calculateDistance(center,ele.address.coordinates)/1000)} kilometer</p>
                              </Col>
                            </Row>
                          </Container>
                        </div>
                    </div>
                </Link>
            </div>
        ))):(<p className="text-center bold">No Parking Space Found</p>)}
    </div>
</div>

  )
}

