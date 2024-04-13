
import { Link } from 'react-router-dom'
import './style.css'
export default function CustomerHeader() {
    return (


        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container">
                <a className="navbar-brand" href="#">PickParking App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                            <Link to="/" className="nav-link"></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/myAccount" className="nav-link">myAccount</Link>
                        </li>
                        {/* {isEmpty(localStorage.getItem('token'))&& (
                        <li className="nav-item">
                         <Link className="nav-link" to="/login">Login</Link> 
                        </li>
                        )}
                        <li className="nav-item">
                            <a className="nav-link" href="#">service</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}