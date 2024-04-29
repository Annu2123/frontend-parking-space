
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useEffect } from "react";
// import { startGetSpaceCarts,startRemoveSpaceCart} from "../../actions/customerActions/customerSpaceCart";
// export default function SpaceCart() {
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.customer.cart);
//     console.log(cart);
//     useEffect(()=>{
//         dispatch(startGetSpaceCarts())
//     },[])
//     const handleRemove=(id)=>{
//         dispatch(startRemoveSpaceCart(id))
//     }
//     return (
//         <Container style={{ paddingTop: "60px" }}>
//             <h3>Cart List: {cart.length}</h3>
//             <Row>
//                 {cart ? (
//                     cart.map((ele, index) => (
//                         ele.parkingSpace?(
//                             <Col key={index} lg={4} md={6} className="mb-4">
//                             <Card className="shadow-sm">
//                                 <Card.Img variant="top" src={`http://localhost:3045/uploads/${ele.parkingSpace.image}`} alt={ele.parkingSpace.title} style={{ maxHeight: "200px" }} />
//                                 <Card.Body>
//                                     <Card.Title>{ele.parkingSpace.title}</Card.Title>
//                                     <Card.Text>{ele.parkingSpace.amenities}</Card.Text>
//                                     {/* <Card.Text>Pricing starting from ${ele.parkingSpace.spaceTypes[0].amount} per hour</Card.Text> */}
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <Link to={`/spaceBookingPage/${ele.parkingSpace?._id}`} className="btn btn-primary">
//                                             Go to Book
//                                         </Link>
//                                         <Button variant="danger" onClick={()=>{
//                                             handleRemove(ele._id)
//                                         }} >
//                                             Remove
//                                         </Button>
//                                     </div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         ):
//                     ))
//                 ) : (
//                     <Col>
//                         <p>No Parking Spaces Found in Cart</p>
//                     </Col>
//                 )}
//             </Row>
//         </Container>
//     );
// }
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import { startGetSpaceCarts, startRemoveSpaceCart } from "../../actions/customerActions/customerSpaceCart";

export default function SpaceCart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.customer.cart);
    console.log(cart);

    useEffect(() => {
        dispatch(startGetSpaceCarts());
    }, []);

    const handleRemove = (id) => {
        dispatch(startRemoveSpaceCart(id));
    };

    return (
        <Container style={{ paddingTop: "60px" }}>
            <h3>Cart List: {cart.length}</h3>
            <Row>
                {cart.map((ele, index) => (
                    <Col key={index} lg={4} md={6} className="mb-4">
                        <Card className="shadow-sm">
                            {ele.parkingSpace ? (
                                <>
                                    <Card.Img variant="top" src={`http://localhost:3045/uploads/${ele.parkingSpace.image}`} alt={ele.parkingSpace.title} style={{ maxHeight: "200px" }} />
                                    <Card.Body>
                                        <Card.Title>{ele.parkingSpace.title}</Card.Title>
                                        <Card.Text>{ele.parkingSpace.amenities}</Card.Text>
                                        {/* <Card.Text>Pricing starting from ${ele.parkingSpace.spaceTypes[0].amount} per hour</Card.Text> */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to={`/spaceBookingPage/${ele.parkingSpace?._id}`} className="btn btn-primary">
                                                Go to Book
                                            </Link>
                                            <Button variant="danger" onClick={() => { handleRemove(ele._id); }} >
                                                Remove
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </>
                            ) : (
                                <Card.Body>
                                    <Card.Title>This ParkingSpace is not avaialble</Card.Title>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => { handleRemove(ele._id); }} >
                                            Remove
                                        </Button>
                                    </div>
                                </Card.Body>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
