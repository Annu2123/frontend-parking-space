import { useDispatch, useSelector } from "react-redux"
import { startApproveBooking, startGetBookingRequest, startGetBookings, startGetParkingSpace, startRejectBooking } from "../../actions/ownerActions"
import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Container, Col, Row, } from "react-bootstrap"
import { Table } from "reactstrap"
import "../OwnerDashboard/style.css"
import BookingCalender from "./advanceBooking"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import CustomerInfo from "./CustomerModal"
import CurrentBooking from "./currentBooking"
export default function OwnerMain() {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [todayBookings, setTodayBookings] = useState([])
    const [showPopup, setShowPopUp] = useState(false)
    const [selectedParkingId, setSelectedParkingId] = useState('')
    const [customerId, setCustomerId] = useState('')
    const [currentBooking, setCurrentBooking] = useState([])
    const toggle = () => setModal(!modal)
    console.log("pid", selectedParkingId)
    const user = useSelector((state) => {
        return state.users
    })
    const booking = useSelector((state) => {
        return state.owners.spaceBookings
    })
    console.log("allbookingdd",booking)
    const currentBookingRequest = useSelector((state) => {
        return state.owners.bookingsRequest
    })
    const parkingSpace = useSelector((state) => {
        return state.owners.parkingSpace
    })
    const handleCanvas=async()=>{
        console.log("hiiii")
       dispatch(startGetBookingRequest())
      }
    const RejectPopUP = () => {
        Swal.fire({
            title: "Rejected!",
            text: `Rejected booking.`,
            icon: "success"
        })
    }
    
    const handleReject = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: ` You want to reject booking request from ${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Yes, Reject it!",
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRejectBooking(id, RejectPopUP))
            }
        })

    }
    useEffect(() => {
        dispatch(startGetBookings())
        dispatch(startGetParkingSpace())
    }, [])
    useEffect(() => {
        (async () => {
            try {
                console.log("fghgfd")
                const response = await axios.get(`http://localhost:3045/api/booking/today`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log("onlybooking", response.data)
                setTodayBookings(response.data)

            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3045/api/current/booking', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                setCurrentBooking(response.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    const approvePopUP = () => {
        Swal.fire({
            title: "Accepted!",
            text: ` accepted booking.`,
            icon: "success"
        })
    }
    const handleApprove = (id, name) => {
        Swal.fire({
            title: "Are you sure?",
            text: ` You want to accept booking request from ${name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startApproveBooking(id, approvePopUP))
            }
        })
    }
    const convertDate = (val) => {
        const dateObj = new Date(val);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    const timeConvert = (val) => {
        const dateObj = new Date(val)
        const ISTOptions = { timeZone: 'Asia/Kolkata', hour12: true } // Include hour12 option
        const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)// convert utc to indian time
        const timeArray = ISTDateString.split(',')[1].trim().split(':')//// extracting the time from ISTDateString 
        const hours = timeArray[0]
        const minutes = timeArray[1]
        const amPm = timeArray[2].split(' ')[1]
        return hours + ':' + minutes + ' ' + amPm
    }
    const todayAllBooking = () => {
        const today = convertDate(new Date()); // Get today's date in YYYY-MM-DD format
        return booking?.filter((ele) => {
            // Compare dates and approval status
            return convertDate(ele.startDateTime) === today && ele.approveStatus === true;
        });
    }
    const todayBookingRequest = () => {
        const currentDate = new Date(); // Get the current date and time

        return booking?.filter((ele) => {
            const startDateTime = new Date(ele.startDateTime); // Convert startDateTime to a Date object
            // Compare both the date and time
            return (startDateTime > currentDate &&
                ele.approveStatus == false)
        })
    }
    const allTwoWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return booking?.filter((space) => {
                if (space.approveStatus == true && ele.spaceTypes[0]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }

    const allFourWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return booking?.filter((space) => {
                if (space.approveStatus == true && ele.spaceTypes[1]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }
    const twoWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return todayAllBooking()?.filter((space) => {
                if (ele.spaceTypes[0]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }
    const FourWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return todayAllBooking()?.filter((space) => {
                if (ele.spaceTypes[1]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }

    const totalRevenue = () => {
        return booking.reduce((acc, cv) => {
            if (cv.paymentStatus == "success") {
                acc = acc + cv.amount
                return acc
            } else {
                return acc
            }

        }, 0)
    }
    const todayRevenue = () => {
        return todayAllBooking().reduce((acc, cv) => {
            if (cv.paymentStatus == "success") {
                acc = acc + cv.amount
                return acc
            } else {
                return acc
            }

        }, 0)
    }
    const handleMore = (id) => {
        setCustomerId(id)
        toggle()
    }
    
    
      const convertTime = (val) => {
        const dateObj = new Date(val);
        const ISTOptions = { timeZone: 'Asia/Kolkata', hour12: true } // Include hour12 option
        const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)// convert utc to indian time
        const timeArray = ISTDateString.split(',')[1].trim().split(':')//// extracting the time from ISTDateString 
        const hours = timeArray[0]
        const minutes = timeArray[1]
        const amPm = timeArray[2].split(' ')[1]
        return hours + ':' + minutes + ' ' + amPm
      }
    const selectedParkingSpace = () => {
        return parkingSpace?.find((ele) => {
          if (ele._id == selectedParkingId) {
            return ele
          }
        })
      }
      // Filter two-wheeler bookings
      const twoWheelerBookings = currentBooking.filter(booking => {
        return booking.spaceTypesId === selectedParkingSpace()?.spaceTypes[0]._id
      })
    
      // Filter four-wheeler bookings
      const fourWheelerBookings = currentBooking.filter(booking => {
        return booking.spaceTypesId === selectedParkingSpace()?.spaceTypes[1]._id
      })
      console.log("bboking",booking)
      console.log("todatallbooking",todayAllBooking())
    return (
        <>
            <div className="d-flex justify-content-end mt-4 mr-4" style={{ paddingTop: '60px' }}>
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={handleCanvas}>Bookings Requests</button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                    
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <Container>
                            <Row>
                                <Col md={12} style={{ margin: "0" }}>
                                    <div className="text-center" >
                                        <h4 className="display-7">Booking Requests</h4>
                                    </div>
                                    {currentBookingRequest.length != 0 ? (currentBookingRequest.map((ele) => {

                                        return <div className=" d-flex justify-content-center align-items-center " key={ele._id}>
                                            <div className="card shadow-sm" style={{ width: "100%" }}>
                                                <div className="card-body text-center">
                                                    <p>
                                                        {ele.customerId.name} has sent a booking request for {convertDate(ele.startDateTime)} {timeConvert(ele.startDateTime)} {timeConvert(ele.endDateTime)}<br />
                                                        <button type="button" className="btn btn-primary" onClick={() => { handleApprove(ele._id, ele.customerId.name) }}>Accept</button>
                                                        <button type="button" className="btn btn-danger ml-2" onClick={() => { handleReject(ele._id, ele.customerId.name) }}>Cancel</button>
                                                        <button type="button" className="btn btn-info ml-2" onClick={() => { handleMore(ele._id) }}>More</button>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>

                                    })) : (<div className="text-center" style={{ paddingTop: '60px' }}>
                                        <p className="display-8">No Booking to approve</p>
                                    </div>)}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            <div className="container text-center mt-4">
                <div className="row">
                    <div className="col-md ml-5">
                        <div className="card " style={{ maxWidth: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Today bookings-{todayAllBooking()?.length}</h5>
                                <h6 className="card-subtitle mb-2 ">Two wheeler-{twoWheelerBooking()[0]?.length}</h6>
                                <h6 className="card-subtitle mb-2 ">Four wheeler-{FourWheelerBooking()[0]?.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md " style={{ marginLeft: "10px" }}>
                        <div className="card mt-3 mt-md-0" style={{ maxWidth: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title"> Total Bookings-{allFourWheelerBooking()[0]?.length + allTwoWheelerBooking()[0]?.length}</h5>
                                <h6 className="card-subtitle mb-2 text-body">Four Wheeler-{allFourWheelerBooking()[0]?.length} </h6>
                                <h6 className="card-subtitle mb-2 text-body">Two Wheeler-{allTwoWheelerBooking()[0]?.length} </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md " style={{ marginLeft: "10px" }}>
                        <div className="card mt-3 mt-md-0" style={{ maxWidth: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Earnings</h5>
                                <h6 className="card-subtitle mb-2 text-body">Total Earnings-{totalRevenue()}</h6>
                                <h6 className="card-subtitle mb-2 text-body">Today Earnings-{todayRevenue()}</h6>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
             <Container style={{ paddingTop: '30px' }}>
        <Row>
          <Col md={6}>
            <div className="row">
              <select className="form-select col-4" style={{ width: "6rem" }} onChange={(e) => { setSelectedParkingId(e.target.value) }}>
                <option></option>
                {parkingSpace?.map((ele) => {
                  return <option key={ele._id} value={ele._id}>{ele.title}</option>
                })}
              </select>
            </div>
            <div class="row">
              <div class="col">
                <h4>Two wheeler</h4>
              </div>
              <div class="col">
                <h6>total Booked:{twoWheelerBookings?.length}</h6>
              </div>
              <div class="col">
                <h6>Remainig:{selectedParkingSpace()?.spaceTypes[0].capacity - twoWheelerBookings.length}</h6>
              </div>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>customer Name</th>
                  <th>startTime</th>
                  <th>endTime</th>
                  <th>vehicle </th>
                </tr>
              </thead>
              <tbody>
                {twoWheelerBookings?.map((ele) => {
                  return <tr>
                    <td>{ele.customerId.name}</td>
                    <td>{convertTime(ele.startDateTime)}</td>
                    <td>{convertTime(ele.endDateTime)}</td>
                    <td>{ele.vehicleId.vehicleName}</td>
                  </tr>
                }
                )}
              </tbody>
            </Table>
          </Col>
          {/* <hr className="vertical-line"></hr> */}
          <Col md={6} style={{ paddingTop: "40px" }}>
          <div class="row">
              <div class="col">
                <h4>Four wheeler</h4>
              </div>
              <div class="col">
                <h6>total Booked:{fourWheelerBookings?.length}</h6>
              </div>
              <div class="col">
                <h6>Remaining:{selectedParkingSpace()?.spaceTypes[1].capacity - fourWheelerBookings.length}</h6>
              </div>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>customer Name</th>
                  <th>startTime</th>
                  <th>endTime</th>
                  <th>vehicle</th>
                </tr>
              </thead>
              <tbody>
                {fourWheelerBookings?.map((ele) => {
                  return <tr>
                    <td>{ele.customerId.name}</td>
                    <td>{convertTime(ele.startDateTime)}</td>
                    <td>{convertTime(ele.endDateTime)}</td>
                    <td>{ele.vehicleId.vehicleName}</td>
                  </tr>
                }
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
            <Container> 
                <Row>
                    <Col>
                        <CurrentBooking currentBooking={currentBooking} parkingSpace={parkingSpace} />
                    </Col>
                </Row>
            </Container>

            {/* <Container>
                <BookingCalender booking={booking} />
            </Container> */}
            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalBody className="d-flex justify-content-center align-items-center">

                    < CustomerInfo customerId={customerId} todayBookingRequest={currentBookingRequest} toggle={toggle} />

                </ModalBody>
            </Modal>
        </>

    )
}