import { Card, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"
export default function CurrentBooking(props) {
    const { currentBooking, parkingSpace } = props
    const [selectedParkingId, setSelectedParkingId] = useState('')
    const selectedParkingSpace = () => {
        return parkingSpace.find((ele) => {
            if (ele._id == selectedParkingId) {
                return ele
            }
        })
    }
    
    console.log("selel", selectedParkingSpace())
    console.log("hbdddhwwj", currentBooking)
    return (
        <>
            <div className="text-center" style={{ paddingTop: '60px' }}>
                <p className="display-6">Current Bookings</p>
            </div>
            <select className="form-select col-4" style={{ width: "6rem" }} onChange={(e) => { setSelectedParkingId(e.target.value) }}>
                <option></option>
                {parkingSpace?.map((ele) => {
                    return <option key={ele._id} value={ele._id}>{ele.title}</option>
                })}
            </select>
            <Container className="mt-4 mb-4" style={{ border: "2px solid #037ffc" }}>
                <Row>
                    <Col sm={12} md={6}>
                        <div className="text-center" style={{ paddingTop: '10px' }}>
                            <p className="display-8">Two wheeler</p>
                        </div>
                        <Card>
                            <div className="container text-center" style={{ paddingTop: '20px' }}>
                                <div className="row">
                                    {/* {[...Array(selectedParkingSpace()?.spaceTypes[0].capacity)].map((_, index) => {
                                        console.log("cduud", currentBooking) */}
                                       {currentBooking && currentBooking.map((ele)=>{
                                              if(ele.spaceTypeId == selectedParkingSpace.spaceTypes[0]._ele){
                                                return (
                                                    
                                                        <div className="col-md-4">
                                                            <div className={`card text-center mb-2 ml-2 }`} style={{ width: "8rem", height: "60px", position: "relative" }}>
                                                                <div className="card-body">
                                                                    {/* <p>{booking?.amount}</p> */}
                                                                    {/* <h6 className="card-text">{booking ? (booking.approveStatus ? 'Approved' : 'Pending') : 'Available'}</h6> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    
                                                )
                                              }
                                       })
                                       }
                                    {/* })} */}
                                </div>
                            </div>
                        </Card>
                    </Col>


                    <Col sm={12} md={6}>
                        <div className="text-center" style={{ paddingTop: '10px' }}>
                            <p className="display-8">Four Wheeler</p>
                        </div>
                        <Card>
                            <div className="container text-center" style={{ paddingTop: '20px' }}>
                                <div className="row">
                                    {[...Array(selectedParkingSpace()?.spaceTypes[1].capacity)].map((_, index) => {
                                        const spaceTypeId = selectedParkingSpace()?.spaceTypes[1]._id;
                                        const booking = currentBooking?.find(ele => ele.spaceTypesId === spaceTypeId && ele.status === "pending")
                                        console.log("currentBookingfin", booking)
                                        const bookingAmount = booking ? booking.amount : null;

                                        // Determine the color based on whether there's a booking for the specific space type ID
                                        const cardColor = booking ? 'bg-danger' : 'bg-success';

                                        return (
                                            <div className="col-md-4" key={index}>
                                                <div className={`card text-center mb-2 ml-2 ${cardColor}`} style={{ width: "8rem", height: "60px", position: "relative" }}>
                                                    <div className="card-body">
                                                        <p>{bookingAmount}</p>
                                                        {/* Display additional booking details if needed */}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}