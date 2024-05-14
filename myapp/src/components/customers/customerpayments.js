import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetPayments } from "../../actions/customerActions/customerPayments";

export default function CustomerPayments() {
    const payments = useSelector((state) => state.customer.payments);
    const bookings = useSelector((state) => state.customer.bookings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetPayments());
    }, [dispatch]);

    const formatDateTime = (dateTimeString) => {
        const paymentDateTime = new Date(dateTimeString);
        const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hour12: true };
        return paymentDateTime.toLocaleString("en-US", options);
    };

    const parkingSpace = (id) => {
        const space = bookings.find((e)=>{
            if(e._id === id){
                return "hi"
            }else{
                return "N/A"
            }
        }) ;
        return space
      
    };

    return (
        <div className="container mt-5">
            <h2>Payments - {payments.length}</h2>
            {payments.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Payment Date/Time</th>
                            <th scope="col">Parking Space</th>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{formatDateTime(payment.createdAt)}</td>
                                <td>{parkingSpace(payment.bookingId)}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payments found.</p>
            )}
        </div>
    );
}
