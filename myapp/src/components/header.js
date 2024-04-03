
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
                            <Link to="/register" className="nav-link" href="#">Register</Link>
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
}