
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faDollarSign, faHomeUser, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ownersReducers from '../../reducers/ownersReduceres';
import { Row, Container, Col } from 'react-bootstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
export default function Admin() {
    const [owners, setOwners] = useState([])
    const [customers, setCustomer] = useState([])
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const customers = await axios.get('http://localhost:3045/api/customer', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setCustomer(customers.data)
                console.log("customer", customers.data)
                const owners = await axios.get('http://localhost:3045/api/owner', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setOwners(owners.data)
                console.log("owners", owners.data)
                const bookings = await axios.get('http://localhost:3045/api/allBooking', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setBookings(bookings.data)
                console.log(bookings.data)

               const approvalList=await axios.get('http://localhost:3045/api/parkingSpace/approvalList',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
               })
               console.log("list",approvalList.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
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
console.log("data",data)
console.log("data",bookingsByMonth)
    return (
        <>
            <div class="container text-center" style={{ paddingTop: '60px' }}>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                            <div class="card-body bg-light">
                                <h5 class="card-title"> <FontAwesomeIcon icon={faUser} /> Customers</h5>
                                <p class="card-text font-weight-bold fs-5">{customers.length}</p>


                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                            <div class="card-body bg-light">
                                <h5 class="card-title"><FontAwesomeIcon icon={faUser} /> Space Ownesr</h5>
                                <p class="card-text font-weight-bold fs-5">{owners.length}</p>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                            <div class="card-body bg-light">
                                <h5 class="card-title"><FontAwesomeIcon icon={faDollarSign} /> Revenue</h5>
                                <p class="card-text font-weight-bold fs-5">{totalRevenue()}</p>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Container style={{ paddingTop: '60px' }} bordered>
                <Row>
                    <Col sm={5} className=" m-0 bg-light">
                        <div className=" d-flex justify-content-center align-items-center mt-5 ">
                            <div className="card shadow-sm" style={{ width: "36rem" }}>
                                <div className="card-body text-center">

                                    <p>New request for listing parking Space {" " + " "}
                                    <button type="button " className="btn btn-primary">Accept</button>
                                    <button type="button " className=" ml-2 btn btn-info">more</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={7}m-0 >
                        <ResponsiveContainer width="100%" >
                            <BarChart width={8} height={20} data={data}>
                                {/* <CartesianGrid */}
                                    {/* stroke="grey"    // Change the color of grid lines */}
                                    {/* strokeDasharray="3 3"  // Change the pattern of grid lines to dashed */}
                                {/* /> */}
                                <XAxis dataKey='month' />

                                <YAxis  />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='bookings' fill="blue" />

                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Container>
        </>
    )
}