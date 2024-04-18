import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux';
export default function Header() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/otp')

    }
    const user=useSelector((state)=>{
        return state.users
    })
    console.log("header user",user.users.role)
    return (


        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">
                <a className="navbar-brand" href="#">Booking App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            {isEmpty(localStorage.getItem('token')) ? (
                                <Link className="nav-link" to="/login">Login</Link>
                            ) : (
                                <>
                                {user.users.role == 'owner' ? 
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            My Account
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link to="/main" className="dropdown-item" >My Account</Link>
                                            <Link to="/parkingSpaceBooking" className="dropdown-item" >booking</Link>
                                            <Link to="/addparking" className="dropdown-item" >add space </Link>
                                            <Link to="/myspace" className="dropdown-item" href="#">My space</Link>
                                            
                                            <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                        </div>
                                    </li>
                                    :(
                                        <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            My Account
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">My Orders</a>
                                            <a className="dropdown-item" href="#">customer</a>
                                            <a className="dropdown-item" href="#">bookingr</a>
                                            <a className="dropdown-item" href="#">Saved Cards</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Edit Profile</a>
                                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                                        </div>
                                    </li>
                                    )}
                                </>
                            )}
                        </li>
                    </ul>

                </div>
            </div>
        </nav>



    )
}


// import { Link,useNavigate } from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap';
// import { isEmpty } from 'lodash';

// export default function Header() {
//   const navigate=useNavigate()
//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     navigate('/')
// };
//     return (
//         <Navbar bg="dark" variant="dark" expand="lg">
//             <Navbar.Brand href="#">ps</Navbar.Brand>
//             <Navbar.Toggle aria-controls="navbarNav" />
//             <Navbar.Collapse id="navbarNav">
//                 <Nav className="ml-auto">
//                     {(isEmpty(localStorage.getItem('token')))?(
//                       <>
//                         <Nav.Link as={Link} to="/register">Register</Nav.Link>
//                         <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                         </>
//                     ):(
//                         <>
//                     <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//                     <Nav.Link as={Link} to="/myAccount">myAccount</Nav.Link>
//                     </>
//                     )}
//                     <Nav.Link href="#">Service</Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     );
// }