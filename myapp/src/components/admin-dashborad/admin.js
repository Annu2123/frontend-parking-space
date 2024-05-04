import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faDollarSign, faHomeUser, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import ownersReducers from '../../reducers/ownersReduceres';
import { Row, Container, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { startApproveParkings,  startGetAllParkingSpace,startGetAllBooking, startGetAllCustomer, startGetAllOwner } from '../../actions/adminsActions';
import SpaceInfo from './spaceInfoModel';
export default function Admin() {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [spaceId, setSpaceId] = useState('')
    const toggle = () => setModal(!modal)
    useEffect(() => {
        dispatch(startGetAllCustomer())
        dispatch(startGetAllOwner())
        dispatch(startGetAllBooking())
        dispatch(startGetAllParkingSpace())

    },[])
    const customers = useSelector((state) => {
        return state.admin.allCustomer
    })
    const owners = useSelector((state) => {
        return state.admin.allOwners
    })
    const bookings = useSelector((state) => {
        return state.admin.bookings
    })
   const acceptedPopUp=()=>{
    Swal.fire({
        title: "Accepted!",
        text: "You have approved space listing.",
        icon: "success"
      })
   }
    const handleApprove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to approve!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!"
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(startApproveParkings(id,acceptedPopUp,toggle))
            }
          });
       
    }
    const parkingSpaces=useSelector((state)=>{
        return state.admin.ownersAllParkings
    })
    const list= parkingSpaces.filter((ele)=>{
            if(ele.approveStatus == false){
                return ele
            }
        })
    
    const totalRevenue = () => {
        return bookings.reduce((acc, cv) => {
            acc = acc + cv.amount
            return acc
        }, 0)
    }
    const bookingsByMonth = bookings.reduce((acc, booking) => {
        const month = new Date(booking.startDateTime).getMonth(); // Month is zero-indexed
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(booking.startDateTime)); // Get month name
        acc[monthName] = (acc[monthName] || 0) + 1; // Count bookings for each month
        return acc;
    }, {})
    // Prepare data for Recharts
    const data = Object.keys(bookingsByMonth).map(monthName => ({
        month: monthName,
        bookings: bookingsByMonth[monthName]
    }))
    const handleMore = (spaceId) => {
        setSpaceId(spaceId)
        toggle()
    }
   
    return (
        <>
            <div className="container text-center" style={{ paddingTop: '60px' }}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                            <div className="card-body bg-light">
                                <h5 className="card-title"> <FontAwesomeIcon icon={faUser} /> Customers</h5>
                                <p className="card-text font-weight-bold fs-5">{customers.length}</p>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                            <div className="card-body bg-light">
                                <h5 className="card-title"><FontAwesomeIcon icon={faUser} /> Space Ownesr</h5>
                                <p className="card-text font-weight-bold fs-5">{owners.length}</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                            <div className="card-body bg-light">
                                <h5 className="card-title"><FontAwesomeIcon icon={faDollarSign} /> Revenue</h5>
                                <p className="card-text font-weight-bold fs-5">{totalRevenue()}</p>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Container style={{ paddingTop: '60px' }} bordered>
                <Row>
                    <Col sm={5} classNameName=" m-0 bg-light">
                      {list.length != 0 ?  list.map((ele) => {
                            return <div classNameName=" d-flex justify-content-center align-items-center mt-2 ">
                                <div classNameName="card shadow-sm" style={{ width: "28rem" }}>
                                    <div classNameName="card-body text-center">
                                        <p>listing request from {ele.ownerId.name}{" " + " "}
                                            <button onClick={() => { handleApprove(ele._id) }} type="button " classNameName="btn btn-primary">Accept</button>
                                            <button onClick={() => { handleMore(ele._id) }} type="button " classNameName=" ml-2 btn btn-info">more</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }):( <div classNameName="text-center" style={{ paddingTop: '60px' }}>
                        <p classNameName="display-8">No listing request for space </p></div> )}
                    </Col>
                    <Col sm={7} m-0 style={{ height: "300px" }} >
                        <ResponsiveContainer width="100%" height="100%" >
                            <BarChart width={8} height={20} data={data}>
                                {/* <CartesianGrid */}
                                {/* stroke="grey"    // Change the color of grid lines */}
                                {/* strokeDasharray="3 3"  // Change the pattern of grid lines to dashed */}
                                {/* /> */}
                                <XAxis dataKey='month' />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='bookings' fill="blue" />

                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalBody classNameName="d-flex justify-content-center align-items-center">                  
                       
                        <SpaceInfo spaceId={spaceId} list={list} handleApprove={handleApprove} toggle={toggle} />
                   
                </ModalBody>
            </Modal>
        </>
    )
}


