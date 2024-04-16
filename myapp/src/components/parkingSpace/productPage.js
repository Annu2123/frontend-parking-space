import { useState, useContext } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { ParkingSpaceContext } from '../../contextApi/context'
import FilterSpace from './filterSpace';
import { useParams } from 'react-router-dom';
export default function ProductPage() {
    const { id } = useParams()
    const { locationParking } = useContext(ParkingSpaceContext)

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    {locationParking && locationParking.map((ele) => {
                        if (ele._id == id) {
                            return <div>
                                <h1>{ele.title}</h1>
                                <div><img src={`http://localhost:3045/uploads/${ele.image}`} style={{ width: "200px", height: "200px" }} /></div>
                                <h3>{ele.amenities}</h3>

                            </div>
                        }
                    })}
                    {/* Reviews */}
                    <div>
                        <h6>Cheap and east access parking service</h6>
                    </div>
                </Col>
                <Col sm={4}>
                    <div>
                        <div>
                            <FilterSpace id={id} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}