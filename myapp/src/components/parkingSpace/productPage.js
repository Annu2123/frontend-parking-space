import { useState, useContext } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { ParkingSpaceContext } from '../../contextApi/context'
import FilterSpace from './filterSpace';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function ProductPage() {
    const { id } = useParams()
    const { locationParking } = useContext(ParkingSpaceContext)
    const user=useSelector((state)=>{
        return state.users
    })
    return (
        <Container className='mt-4' style={{ paddingTop: '70px', marginRight: '-4px',marginLeft: '0px'}}>
            <Row style={{ marginRight: 0, marginLeft: 0 }}>
                <Col sm={5} style={{ marginRight: 0, marginLeft: 0 }}>
                    {locationParking && locationParking.map((ele) => {
                        if (ele._id == id) {
                            return <Card style={{ width: '24rem' ,border:'none' }} key={ele._id}>
                                <Card.Title className='text-center'>{ele.title}</Card.Title>
                                <Card.Img variant="top" src={`http://localhost:3045/uploads/${ele.image}`}  className="img-fluid" style={{ maxHeight: '200px' }} />
                                <Card.Body>
                                    <Card.Text>
                                        {ele.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        }
                    })}
                    {/* Reviews */}
                    <div>
                        <h6>Cheap and east access parking service</h6>
                    </div>
                </Col>
                <Col sm={7} >
                       
                            <FilterSpace id={id} user={user} />     
                </Col>
            </Row>
        </Container >
    )
}