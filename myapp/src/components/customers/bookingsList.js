import '../../bookingList.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { startRemoveBooking, startGetBookings } from '../../actions/customerActions/customerBookings';
import ReviewBooking from './reviewBooking';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function BookingsList() {
    const [modal, setModal] = useState(false);
    const [bookingId, setBookingId] = useState(null)
    const toggle = () => setModal(!modal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetBookings());
    }, [dispatch]);

    const bookings = useSelector(state => state.customer.bookings);
    console.log(bookings,'bookings')

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [filterOption, setFilterOption] = useState('all');
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    const filteredBookings = bookings.filter(booking => {
        if (selectedDate) {
            return booking.startDateTime.split('T')[0] === selectedDate;
        }
        return true;
    }).filter(booking => {
        if (filterOption === 'all') return true;
        if (filterOption === 'pending') return booking.status === 'pending';
        if (filterOption === 'completed') return booking.status === 'completed';
        return false;
    });

    useEffect(() => {
        const socket = socketIOClient('http://localhost:3045');
        socket.on('connection', () => {
            console.log('Connected to server');
        });
        socket.on('bookingId', (data) => {
            console.log(data.id, 'socketid');
            dispatch(startRemoveBooking(data.id));
        });
        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    const handlePayment = async (id, amount) => {
        try {
            const response = await axios.post('http://localhost:3045/api/create-checkout-session', {
                bookingId: id,
                amount: Number(amount),
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            localStorage.setItem('stripeId', response.data.id);
            console.log("payment", response.data);
            window.location = response.data.url;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bookings-list" style={{ paddingTop: "60px" }}>
            <div className="container">
                <div className="card shadow-sm mb-4" style={{ width: "100%" }}>
                            <div className="card-body text-center" style={{color: '#483C32'}}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <div style={{ flex: 0.8 }}>
                                        {bookings.length !== 0 ? (
                                            bookings.map((ele, index) => {
                                                if (ele.approveStatus === true && ele.paymentStatus === "pending") {
                                                    return (
                                                        <p key={index}>
                                                            Your {ele.parkingSpaceId ? ele.parkingSpaceId.title : "N/A"} booking is approved. Make payment
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => handlePayment(ele._id, ele.amount)}
                                                            >
                                                                Make Payment
                                                            </button>
                                                        </p>
                                                    );
                                                }
                                                return null;
                                            })
                                        ) : <p>No bookings</p>}
                                    </div>
                                    <div style={{ flex: 0.2 }}>
                                        <Link  to="/bookingsView"style={{ textDecoration: 'none' }}>Bookings View</Link>
                                    </div>
                            </div>
                        </div>
                </div>
                <div style={{
                    backgroundColor: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <div className="row align-items-center mb-3">
                        <div className="col-md-6">
                            <label htmlFor="date-picker" className="form-label">Select date:</label>
                            <input
                                type="date"
                                id="date-picker"
                                className="form-control"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="filter-option" className="form-label">Filter by booking status:</label>
                            <select
                                id="filter-option"
                                className="form-control"
                                value={filterOption}
                                onChange={(e) => setFilterOption(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>

                <h3>Number of bookings: {filteredBookings.length}</h3>
                <div className="row">
                    {filteredBookings.map((ele, i) => {
                        const startTime = new Date(ele.startDateTime);
                        const endTime = new Date(ele.endDateTime);
                        const formattedStartTime = startTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                        const formattedEndTime = endTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                        const spaceType = ele.parkingSpaceId && ele.parkingSpaceId.spaceTypes ? ele.parkingSpaceId.spaceTypes.find(e => e._id === ele.spaceTypesId) : null;
                        const linkStyle = {
                            textDecoration: 'none',
                            color: ele.status === 'completed' && ele.paymentStatus === 'success' ? 'green' : 'blue',
                        };

                        const cardColor = ele.status === 'completed' ? 'bg-success' :
                            ele.status === 'pending' ? 'bg-warning' :
                                'bg-light';
                        const cardClickHandler = () => {
                            if (ele.status === 'completed') {
                                setBookingId(ele._id)
                                toggle(ele._id);
                            }
                        };

                        return (
                            <div className="col-md-4" key={i} onClick={cardClickHandler}>
                                <div className={`card mb-4 ${cardColor}`}>
                                    <div className="card-header">
                                        <h5 className="card-title text-white">Booking #{i + 1}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            <strong>Parking Name:</strong> {ele.parkingSpaceId ? ele.parkingSpaceId.title : "N/A"}
                                        </p>
                                        <p className="card-text">
                                            <strong>Start Time:</strong> {formattedStartTime}<br />
                                            <strong>End Time:</strong> {formattedEndTime}
                                        </p>
                                        <p className="card-text"><strong> Owner Approval Status:</strong> {ele.approveStatus ? 'Approved' : 'Waiting'}</p>
                                        <p className="card-text"><strong>Space Type:</strong> {spaceType ? spaceType.types : "N/A"}</p>
                                        <p className="card-text"><strong>Vehicle:</strong> {ele.vehicleId ? ele.vehicleId.vehicleName : "N/A"}</p>
                                        <p className="card-text"><strong>Amount:</strong> {ele.amount}</p>
                                        {ele.status == 'pending' && (
                                            <>
                                                <span><strong>Payment Status:</strong> </span>
                                                {ele.paymentStatus === 'success' ? (
                                                    <span className="text-success">Completed</span>
                                                ) : ele.approveStatus ? (
                                                    <button
                                                        style={linkStyle}
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => handlePayment(ele._id, ele.amount)}
                                                    >
                                                        Make Payment
                                                    </button>
                                                ) : (
                                                    <span>Pending</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle} style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                        Add Review
                    </ModalHeader>
                    <ModalBody style={{ backgroundColor: '#f0f0f0', padding: '0px' }}>
                        <div style={{ marginTop: "0px" }}><ReviewBooking bookingId={bookingId} /></div>
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: '#3f51b5', borderTop: 'none' }}>
                        <Button color="secondary" onClick={toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}
