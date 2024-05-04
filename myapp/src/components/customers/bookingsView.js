import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReviewBooking from"../customers/reviewBooking"
export default function BookingsView() {
    const bookings = useSelector(state => state.customer.bookings);
    const ratings = useSelector(state => state.customer.ratings);

    const [showHistory, setShowHistory] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const completedBookings = bookings.filter(booking => booking.status === 'completed');
    const upcomingBookings = bookings.filter(
        booking => booking.status !== 'completed' && booking.approveStatus && booking.paymentStatus === 'success'
    );

    const handleRatingClick = booking => {
        setSelectedBooking(booking);
    };

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    return (
        <div style={{ paddingTop: '60px' }}>
            <div>
                <button onClick={() => setShowHistory(false)}>Show Upcoming Bookings</button>
                <button onClick={() => setShowHistory(true)}>Show History Bookings</button>
                {showHistory ? (
                    <>
                        <h3>History Bookings</h3>
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>S_NO</th>
                                    <th>Title</th>
                                    <th>Start Date/Time</th>
                                    <th>End Date/Time</th>
                                    <th>Vehicle</th>
                                    <th>Amount</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedBookings.map((ele, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ele.parkingSpaceId ? ele.parkingSpaceId.title : 'N/A'}</td>
                                        <td>{new Date(ele.startDateTime).toLocaleString()}</td>
                                        <td>{new Date(ele.endDateTime).toLocaleString()}</td>
                                        <td>{ele.vehicleId ? ele.vehicleId.vehicleName : 'N/A'}</td>
                                        <td>{ele.amount}</td>
                                        <td>
                                            <Link onClick={() => setSelectedBooking(ele)}>Show Ratings</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <h3>Upcoming Bookings</h3>
                        <div className="row">
                            {upcomingBookings.map((ele, i) => (
                                <BookingCard key={i} booking={ele} index={i} ratings={ratings} onRatingClick={handleRatingClick} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Modal show={!!selectedBooking} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ratings & Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBooking && (
                        <div>
                            <h4>{selectedBooking?.parkingSpaceId.title}</h4>
                            {getRatingForParkingSpace(ratings, selectedBooking)}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function getRatingForParkingSpace(ratings, booking) {
    const rating = ratings.find(rating => rating.parkingSpaceId === booking.parkingSpaceId._id);
    return rating ? (
        <div>
            <h2>Rating: {rating.rating}</h2>
            <h3>Review: {rating.review}</h3>
            <button>Update</button>
        </div>
    ) : <ReviewBooking bookingId={booking._id}/>
}

function BookingCard({ booking, index, }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const startTime = new Date(booking.startDateTime);
        const currentTime = new Date();
        const difference = startTime - currentTime;

        if (difference <= 0) {
            const elapsedTime = Math.abs(difference);
            return {
                days: Math.floor(elapsedTime / (1000 * 60 * 60 * 24)),
                hours: Math.floor((elapsedTime / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((elapsedTime / 1000 / 60) % 60),
                seconds: Math.floor((elapsedTime / 1000) % 60),
                ongoing: true,
            };
        } else {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                ongoing: false,
            };
        }
    }

    const formattedStartDate = new Date(booking.startDateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    const formattedEndDate = new Date(booking.endDateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    const spaceType = booking.parkingSpaceId?.spaceTypes.find(e => e._id === booking.spaceTypesId);
    const cardColor = 'bg-light'
    return (
        <div className="col-md-4" key={index}>
            <div className={`card mb-4 ${cardColor}`}>
                <div className="card-header">
                    <h5 className="card-title text-white">Booking #{index + 1}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <b>{booking.parkingSpaceId ? booking.parkingSpaceId.title : 'N/A'}</b>
                    </p>
                    <img
                        src={`http://localhost:3045/uploads/${booking.parkingSpaceId ? booking.parkingSpaceId.image : "N/A"}`}
                        className="card-img-top"
                        alt={booking.parkingSpaceId?.image}
                    />
                    <p className="card-text">
                        <strong>Start Date/Time:</strong> {formattedStartDate}<br />
                        <strong>End Date/Time:</strong> {formattedEndDate}
                    </p>
                    <p className="card-text"><strong>Space Type:</strong> {spaceType ? spaceType.types : 'N/A'}</p>
                    <p className="card-text"><strong>Vehicle:</strong> {booking.vehicleId ? booking.vehicleId.vehicleName : 'N/A'}</p>
                    <p className="card-text"><strong>Amount:</strong> {booking.amount}</p>
                </div>
                {booking.status !== 'completed' && (
                    <div className="card-footer">
                        {timeLeft.ongoing ? (
                            <span>Booking is ongoing!</span>
                        ) : (
                            <>
                                <span>Time to start booking: </span>
                                {timeLeft.days > 0 && (
                                    <span>
                                        {timeLeft.days} {timeLeft.days === 1 ? 'day' : 'days'}{' '}
                                    </span>
                                )}
                                {timeLeft.hours > 0 && (
                                    <span>
                                        {timeLeft.hours} {timeLeft.hours === 1 ? 'hour' : 'hours'}{' '}
                                    </span>
                                )}
                                {timeLeft.minutes > 0 && (
                                    <span>
                                        {timeLeft.minutes} {timeLeft.minutes === 1 ? 'minute' : 'minutes'}{' '}
                                    </span>
                                )}
                                {timeLeft.seconds > 0 && (
                                    <span>
                                        {timeLeft.seconds} {timeLeft.seconds === 1 ? 'second' : 'seconds'}{' '}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
