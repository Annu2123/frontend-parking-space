import '../../bookingList.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

export default function BookingsList() {
    const navigate=useNavigate()
    const bookings = useSelector(state => state.customer.bookings);
    // Helper function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [filterOption, setFilterOption] = useState('all');
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    const dateTimeOptions = {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'UTC',
    };

    // Filter and sort bookings based on selected date and filter option
    const filteredBookings = bookings
        .filter(booking => {
            if (selectedDate) {
                // Only include bookings that start on the selected date
                return booking.startDateTime.split('T')[0] === selectedDate;
            }
            return true; // If no date is selected, don't filter out any bookings based on date
        })
        .filter(booking => {
            if (filterOption === 'all') return true;
            if (filterOption === 'pending') return booking.status === 'pending';
            if (filterOption === 'completed') return booking.status === 'completed';
            return false;
        });

    const handlePayment = async (id, amount) => {
        const paymentForm = {
            bookingId: id,
            amount: Number(amount),
        };
        try {
            const response = await axios.post('http://localhost:3045/api/create-checkout-session', paymentForm);
            localStorage.setItem('stripeId', response.data.id);
            window.location = response.data.url;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bookings-list">
            <div className="mb-3">
                <label htmlFor="date-picker" className="form-label">Select date:</label>
                <input
                    type="date"
                    id="date-picker"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="filter-option" className="form-label">Filter by booking status:</label>
                <select
                    id="filter-option"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <h3>Number of bookings: {filteredBookings.length}</h3>
            <div className="row">
                {filteredBookings.map((ele, i) => {
                    const startTime = new Date(ele.startDateTime);
                    const endTime = new Date(ele.endDateTime);
                    const formattedStartTime = new Intl.DateTimeFormat('en-GB', dateTimeOptions).format(startTime);
                    const formattedEndTime = new Intl.DateTimeFormat('en-GB', dateTimeOptions).format(endTime);
                    const spaceType = ele.parkingSpaceId.spaceTypes.find(e => e._id === ele.spaceTypesId);
                    const linkStyle = {
                        textDecoration: 'none',
                        color: ele.status === 'completed' && ele.paymentStatus === 'completed' ? 'green' : 'blue',
                    };

                    // Determine card color based on booking status
                    const cardColor = ele.status === 'completed' ? 'bg-success' :
                        ele.status === 'pending' ? 'bg-primary' :
                            'bg-light'; // Default color for 'all'
                    const cardClickHandler = () => {
                        if (ele.status === 'completed') {
                            navigate(`/review/${ele._id}`);  // Use the booking ID or a relevant identifier
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
                                        {/* <strong>Start Time:</strong> {formattedStartTime}<br />
                                        <strong>End Time:</strong> {formattedEndTime} */}
                                    </p>
                                    <p className="card-text"><strong>Status:</strong> {ele.approveStatus ? 'Approved' : 'Waiting'}</p>
                                    <p className="card-text"><strong>Space Type:</strong> {spaceType ? spaceType.types : "N/A"}</p>
                                    <p className="card-text"><strong>Vehicle:</strong> {ele.vehicleId ? ele.vehicleId.vehicleName : "N/A"}</p>
                                    <p className="card-text"><strong>Amount:</strong> {ele.amount}</p>
                                    {ele.status !== 'completed' && (
                                        <>
                                            <span><strong>Payment Status</strong> </span>
                                            {ele.paymentStatus === 'completed' ? (
                                                <span className="text-success">Completed</span>
                                            ) : ele.approveStatus ? (
                                                <button
                                                    style={linkStyle}
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => { handlePayment(ele._id, ele.amount) }}
                                                >
                                                    {ele.paymentStatus === 'pending' ? 'Make Payment' : 'Successful'}
                                                </button>
                                            ) : (
                                                <button className="btn btn-sm btn-outline-secondary" disabled>
                                                    {ele.paymentStatus === 'pending' ? 'Make Payment' : 'Successful'}
                                                </button>
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
    );
}



