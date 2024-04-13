 admin-dashboard
// import { Link} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'
// import { isEmpty } from 'lodash'
// import './style.css'
// export default function Header() {
//     const navigate=useNavigate()
//     const handleLogout=()=>{
//         localStorage.removeItem('token')
//         navigate('/otp')
        
//     }
//     return (


//         <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
//             <div className="container">
//                 <a className="navbar-brand" href="#">Booking App</a>
//                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav ml-auto">
                        
//                         <li className="nav-item">
//                             <Link to="/register" className="nav-link">Register</Link>
//                         </li>
//                         <li className="nav-item">
//                         {isEmpty(localStorage.getItem('token'))?(
//                          <Link className="nav-link" to="/login">Login</Link> 
//                         ):(<Link className="nav-link" onClick={handleLogout}>Logout</Link>)}
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">service</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>



//     )
// }

import { Link,useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { isEmpty } from 'lodash';

export default function Header() {
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
};
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">ps</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    {(isEmpty(localStorage.getItem('token')))?(
                      <>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </>
                    ):(<Nav.Link onClick={handleLogout}>Logout</Nav.Link>)}
                    <Nav.Link href="#">Service</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import './style.css'
export default function Header() {
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
                        {isEmpty(localStorage.getItem('token'))&& (
                        <li className="nav-item">
                         <Link className="nav-link" to="/login">Login</Link> 
                        </li>
                        )}
                        <li className="nav-item">
                            <a className="nav-link" href="#">service</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



    )
main
}