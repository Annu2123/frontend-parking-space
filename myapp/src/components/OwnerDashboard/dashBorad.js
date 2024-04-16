import { Link } from "react-router-dom"
import '../../App.css'
export default function OwnerDashBoard(){
    return (
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebaar" style={{ width: "280px" }}>
        {/* <a href={"/"} className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          <span className="fs-4">Sidebar</span>
        </a> */}
        <hr></hr>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" >
            < Link to="/cancel" className="nav-link  text-white">
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
              my account
            </Link>
          </li>
          <li >
            <Link to="/create-post" className="nav-link  text-white ">
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
              my space
            </Link>
          </li>
          <li>
            <Link to="/addparking" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
              add parking
            </Link>
          </li>
          <li>
            <Link to="bookingList" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
              Products
            </Link>
          </li>
          <li>
            <a className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
              Customers
            </a>
          </li>
        </ul>
        <hr></hr>
        <div className="dropdown">
          <a className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item">New project...</a></li>
            <li><a className="dropdown-item"></a>dnsjsnd</li>
            <li><a className="dropdown-item"></a>dnsn</li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item">search</a></li>
          </ul>
        </div>
      </div>
   
    )
}
