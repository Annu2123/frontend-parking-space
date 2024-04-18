import '../../bookingList.css'
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
export default function BookingsList() {
    const [filterOption, setFilterOption] = useState('all');
    const bookings = useSelector((state) => state.customer.bookings);

    const dateTimeOptions = {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'UTC',
    };

    const filterBookings = bookings.filter((ele) => {
        if (filterOption === 'all') return true;
        if (filterOption === 'pending') return ele.status === 'pending';
        if (filterOption === 'completed') return ele.status === 'completed';
        return false;
    });


    const handlePayment=async(id,amount)=>{
        const paymentForm={
            bookingId:id,
            amount:Number(amount)
        }
        try{
            const response=await axios.post('http://localhost:3045/api/create-checkout-session',paymentForm)
            //Store the transaction id in local storage
              localStorage.setItem('stripeId', response.data.id)
        
             //Redirecting the user to the chekout page of stripe
              window.location = response.data.url; 
        }catch(err){
            console.log(err)
        }

    }
    return (
        <div className="bookings-list">
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
            <h3>Number of bookings: {filterBookings.length}</h3>
            <div className="row">
                {filterBookings.map((ele, i) => {
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

                    return (
                        <div className="col-md-4" key={i}>
                            <div className={`card mb-4  `}>
                                <div className="card-header">
                                    <h5 className="card-title text-white">Booking #{i + 1}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">
                                        <strong>Parking Name:</strong> {ele.parkingSpaceId.title}
                                    </p>
                                    <p className="card-text">
                                        <strong>Start Time:</strong> {formattedStartTime}<br />
                                        <strong>End Time:</strong> {formattedEndTime}
                                    </p>
                                    <p className="card-text"><strong>Status:</strong> {ele.approveStatus ? 'Approved' : 'Waiting'}</p>
                                    <p className="card-text"><strong>Space Type:</strong> {spaceType?.types}</p>
                                    <p className="card-text"><strong>Vehicle:</strong> {ele.vehicleId?.vehicleName}</p>
                                    <p className="card-text"><strong>Amount:</strong> {ele.amount}</p>
                                            {ele.status !== 'completed' && (
                                                <>
                                                    <span><strong>payment_Status</strong> </span>
                                                    {ele.paymentStatus === 'completed' ? (
                                                        <span className="text-success">Completed</span>
                                                    ) : ele.approveStatus ? (
                                                        <button                  
                                                            style={linkStyle}
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={()=>{handlePayment(ele._id,ele.amount)}}
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



