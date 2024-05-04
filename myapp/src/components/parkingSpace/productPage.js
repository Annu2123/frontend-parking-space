import { useState, useContext } from 'react'
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { ParkingSpaceContext } from '../../contextApi/context'
import FilterSpace from './filterSpace'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SpaceMap from '../location/spaceMap';
import { Grid } from '@mui/material';
export default function ProductPage() {
    const { id } = useParams()
    const { locationParking } = useContext(ParkingSpaceContext)
    const user = useSelector((state) => {
        return state.users
    })
    return (
        <>
         <Container style={{ paddingTop: '70px' }}>
            <Row>
                <Col sm={12} md={6} >
                    {locationParking && locationParking.map((ele) => {
                        if (ele._id == id) {
                            return <Card style={{ width: '100%', border: 'none' }} key={ele._id}>
                                <Card.Title className='text-center'>{ele.title}</Card.Title>
                                <Card.Img variant="top" src={`http://localhost:3045/uploads/${ele.image}`} className="img-fluid" style={{ maxHeight: '200px' }} />
                                <Card.Body>
                                    <h6>Facilties</h6>
                                    <ul>
                                        <li>{ele.amenities}</li>
                                        <li>parking for {ele.spaceTypes[0].types} {ele.spaceTypes[1].types}</li>
                                        <li>{ele.propertyType}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        }
                    })}
                </Col>
                <Col sm={12} md={6} >
                    <FilterSpace id={id} user={user} />
                </Col>
            </Row>
        </Container>
        <Container>
        <Row >
                <Col sm={12} >
                    <Card className='mt-0' style={{ width: '100%', border: 'none' }} >
                        <SpaceMap id={id} />
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
       
    )
}