import { useSelector } from 'react-redux';
import { Container, Table, Button, Row, Col, Modal, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminCustomers() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vehicleCounts, setVehicleCounts] = useState({ fourWheeler: 0, twoWheeler: 0 });
  const [bookings, setBookings] = useState([]);
  const [activeCategory, setActiveCategory] = useState("unverified"); // New state for active category
  const customers = useSelector((state) => state.admin.allCustomer);
  const verifiedVehicles = vehicles.filter((ele) => !ele.isVerified);
  console.log(verifiedVehicles,'iiiii')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3045/api/vehicles/details", {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        setVehicles(result.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };
    fetchData();
  }, []);

  const handleViewVehicleDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleViewCustomerDetails = (customer) => {
    setSelectedVehicle(null);
    setSelectedCustomer(customer);
    getVehicles(customer._id);
    getBookings(customer._id);
    setShowModal(true);
  };

  const getVehicles = (customerId) => {
    const counts = { fourWheeler: 0, twoWheeler: 0 };
    vehicles.filter((ele) => ele.customerId._id === customerId)
      .forEach((vehicle) => {
        if (vehicle.vehicleType === "fourWheeler") {
          counts.fourWheeler += 1;
        } else {
          counts.twoWheeler += 1;
        }
      });
    setVehicleCounts(counts);
  };

  const getBookings = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3045/api/bookings/admin/list/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleAccept = async (vehicleId) => {
    try {
     const response= await axios.put(`http://localhost:3045/api/vehicle/approval/${vehicleId}`,{},{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      const result = await axios.get("http://localhost:3045/api/vehicles/details", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      setVehicles(result.data);
    } catch (err) {
      console.error("Error accepting vehicle:", err);
    }
  };
  return (
    <Container style={{ paddingTop: '80px' }}>
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => setActiveCategory("unverified")}
            className={activeCategory === "unverified" ? "active" : ""}
          >
            Unverified Vehicles
          </Button>{" "}
          <Button
            variant="outline-primary"
            onClick={() => setActiveCategory("customers")}
            className={activeCategory === "customers" ? "active" : ""}
          >
            Customers
          </Button>
        </Col>
      </Row>
      {activeCategory === "unverified" && (
        <Row>
          <Col>
            <h3 className="text-center mb-4">Unverified Vehicles</h3>
            {verifiedVehicles.length > 0 ? verifiedVehicles.map((vehicle, index) => (
              <div className="card bg-white text-black h-100" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{vehicle.vehicleName}</h5>
                  <p className="card-text">{vehicle.customerId.name} is waiting for approval</p>
                  <Button variant="primary" onClick={() => handleViewVehicleDetails(vehicle)}>View Details</Button>
                  <Button variant="success" className="ms-2" onClick={() => handleAccept(vehicle._id)}>Accept</Button>
                  <Button variant="danger" className="ms-2" >Reject</Button>
                </div>
              </div>
            )) : <p>No vehicles awaiting verification.</p>}
          </Col>
        </Row>
      )}
      {activeCategory === "customers" && (
        <Row>
          <Col>
            <h3 className="text-center mb-4">Customer Details</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone || 'N/A'}</td>
                    <td>
                      <Button variant="info" onClick={() => handleViewCustomerDetails(customer)}>More</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVehicle ? 'Vehicle Details' : 'Customer Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVehicle && (
            <Card>
              <Card.Body>
                <Card.Title>{selectedVehicle.vehicleName}</Card.Title>
                <Card.Text>
                  <p><strong>Customer Name:</strong> {selectedVehicle.customerId.name}</p>
                  <p><strong>Vehicle Number:</strong> {selectedVehicle.vehicleNumber}</p>
                  <p><strong>Vehicle Type:</strong> {selectedVehicle.vehicleType}</p>
                  <p><strong>Vehicle Documents:</strong>
                    <a href={`http://localhost:3045/uploads/${selectedVehicle.documents}`} target="_blank" rel="noopener noreferrer">View Document</a>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          {selectedCustomer && (
            <Card>
              <Card.Body>
                <Card.Title>{selectedCustomer.name}</Card.Title>
                <Card.Text>
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Phone:</strong> {selectedCustomer.phone || 'N/A'}</p>
                  <p><strong>Vehicles:</strong> Four Wheeler: {vehicleCounts.fourWheeler}, Two Wheeler: {vehicleCounts.twoWheeler}</p>
                  <p><strong>Bookings:</strong> {bookings.length}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
