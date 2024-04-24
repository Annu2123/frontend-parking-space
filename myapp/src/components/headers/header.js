import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { isEmpty } from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import { startSetUser } from '../../actions/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
// import logo from '../../images/logo.avif'
export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(startSetUser())
        navigate('/')

    }
    const user = useSelector((state) => {
        return state.users
    })
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom flex-wrap fixed-top">
            <div className="container">
                <a className="navbar-brand" href="#">
                {/* <img src={logo} alt="Logo" className="logo" /> */}
                    PickParkings</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            {!localStorage.getItem('token') && <Link to="/register" className="nav-link">
                            <FontAwesomeIcon icon={faUserPlus} />Register</Link>}
                        </li>
                        <li className="nav-item">
                            {isEmpty(localStorage.getItem('token')) ? (
                                <Link className="nav-link" to="/login">
                                     <FontAwesomeIcon icon={faHomeUser} />Login</Link>
                            ) : (
                                <>
                                    {Object.keys(user).length !== 0 && user.users.role === 'owner' ? (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                My Account
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link to="/main" className="dropdown-item">My Account</Link>
                                                <Link to="/parkingSpaceBooking" className="dropdown-item">Booking</Link>
                                                <Link to="/addparking" className="dropdown-item">Add Space</Link>
                                                <Link to="/myspace" className="dropdown-item">My Space</Link>
                                                <Link to='/' className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                            </div>
                                        </li>
                                    ) : Object.keys(user).length !== 0 && user.users.role === 'admin' ? (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                My Account
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item" href="#">My Detail</a>
                                                <a className="dropdown-item" href="#">Customer</a>
                                                <Link to="/bookings" className="dropdown-item">Bookings</Link>
                                                <Link to="/ownerDetails" className="dropdown-item" href="#">owners</Link>
                                              
                                                <Link className="dropdown-item" to='/' onClick={handleLogout}>Logout</Link>
                                            </div>
                                        </li>
                                    ) : Object.keys(user).length !== 0 && user.users.role === 'customer' ? (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                My Account
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link to="/account" className="dropdown-item" href="#"> Account</Link>
                                                <Link to="/bookings" className="dropdown-item" href="#">My bookings</Link>
                                                <Link to="/vehicles" className="dropdown-item" href="#">my vehicles</Link>
                                                <Link className="dropdown-item" to='/' onClick={handleLogout}>Logout</Link>
                                            </div>
                                        </li>
                                    ) : null}
                                </>
                            )}
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    )
}