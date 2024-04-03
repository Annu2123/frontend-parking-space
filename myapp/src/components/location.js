import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

function ServiceLocator() {
    const [searchLocation, setSearchLocation] = useState('');
    const [serviceResults, setServiceResults] = useState([]);

    // Function to display services based on location
    function displayServices(location) {
        // Here you can make an AJAX call to your backend service to get services based on the location
        // For demonstration, let's assume you have an array of services
        const services = [
            { name: 'Service A', location: 'Location A' },
            { name: 'Service B', location: 'Location B' },
            { name: 'Service C', location: 'Location C' }
        ];

        // Filter services based on location
        const filteredServices = services.filter(service => service.location === location);
        setServiceResults(filteredServices);
    }

    // Function to handle current location button click
    function handleCurrentLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
                setSearchLocation(location);
                displayServices(location);
            }, function(error) {
                console.error('Error getting current location:', error);
                alert('Error getting current location. Please try again.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    return (
        <div className="container mt-5">
            <Form>
                <Form.Group controlId="searchLocation">
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={searchLocation}
                        onChange={e => setSearchLocation(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Button
                variant="primary"
                onClick={handleCurrentLocationClick}
                className="mb-3"
            >
                Use Current Location
            </Button>
            <ListGroup>
                {serviceResults.length > 0 ? (
                    serviceResults.map((service, index) => (
                        <ListGroup.Item key={index}>{service.name}</ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No services found in this location.</ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}

export default ServiceLocator;
