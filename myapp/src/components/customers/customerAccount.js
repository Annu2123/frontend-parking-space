import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function MyAccount() {
    return (
        <div className="container mt-4" style={{paddingTop:"60px"}}>
            <div className="row">
                <div className="row-md-4">
                    <h2>My Account</h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to="/account" className="d-block">Account</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/bookings" className="d-block">My Bookings</Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/vehicles" className="d-block">My Vehicles</Link>
                        </li>
                    </ul>
                </div>
                <div className="row-md-8"> {/* Placeholder for other content */}
                </div>
            </div>
        </div>
    );
}

