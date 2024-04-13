// import { useSelector } from "react-redux"
// export default function CustomerDetails(){
//     const customer=useSelector((state)=>{
//         return state.customer.account
//     })
//     return(
//         <div className="row">
//             <div>
//             <h2>acoount details</h2>
//            <p>{customer.name}</p>
//            <p>{customer.email}</p>
//            <p>{customer.phone}</p>
//            <p>{customer.role}</p>  
//             </div>
         
//         </div>
//     )
// }
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomerDetails() {
    const customer = useSelector(state => state.customer.account);

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header as="h2">Account Details</Card.Header>
                        <Card.Body>
                            <Card.Text><strong>Name:</strong> {customer.name}</Card.Text>
                            <Card.Text><strong>Email:</strong> {customer.email}</Card.Text>
                            <Card.Text><strong>Phone:</strong> {customer.phone}</Card.Text>
                            <Card.Text><strong>Role:</strong> {customer.role}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
