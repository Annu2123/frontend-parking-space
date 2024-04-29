import { useEffect, useState, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet'
import { ParkingSpaceContext } from '../../contextApi/context';
import axios from 'axios'; // For making HTTP requests
import 'leaflet/dist/leaflet.css'
import pin from './img/pin.png'
import user from './img/user.png'

import { Icon } from 'leaflet'
import './map.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser } from '@fortawesome/free-solid-svg-icons'
function reverseLatLon(arr) {
    return [arr[1], arr[0]]
}
export default function MapComponent2() {
    const [address, setAddress] = useState("")
    const { center, setCenter, radius, locationParking, setHandleRadius } = useContext(ParkingSpaceContext)
    console.log("parki", locationParking)
    const mapRef = useRef(null)


    const customMarker = new Icon({
        iconUrl: pin,
        iconSize: [38, 38]
    })
    const userMarker=new Icon({
        iconUrl:user,
        iconSize: [38, 38]
    })
    // Function to handle address input change
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    // Function to convert address to geolocation using Geoapify
    const convertAddressToLocation = async () => {
        try {
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=4a35345ee9054b188d775bb6cef27b7c`);
            const location = response.data.features[0].geometry.coordinates;
            setCenter(reverseLatLon(location))
            //  console.log(reverseLatLon(location))
            setAddress('')
            console.log(response.data)
        } catch (error) {
            console.error('Error converting address to location:', error);
        }
    };

    useEffect(() => {
        const map = mapRef.current;
        if (map && center && Array.isArray(center) && center.length === 2) {
            map.setView(center);
        }
    }, [center]);


    const handleRadius = (r) => {
        setHandleRadius(r)
    }
    return (
        <div className="container mt-2 mb-2 " style={{ paddingTop: '70px' }}>

            {/* Leaflet map */}
            {center[0] != 0 &&
                <MapContainer ref={mapRef}
                    center={center} zoom={11} style={{ height: '400px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Circle representing the radius */}
                    <Circle center={center} radius={radius * 1000} />

                    {/* Display nearby services as markers */}
                    {locationParking && locationParking.map((space, index) => (
                        <Marker key={index} position={space.address.coordinates
                        } icon={customMarker}>
                            <Popup><Link to={`/spaceBookingPage/${space._id}`}>{space.title}</Link></Popup>
                        </Marker>
                    ))}
                   <Marker position={center} icon={userMarker}>
                      <Popup>You are hear</Popup>
                   </Marker>
                </MapContainer>
            }

            {/* Input for adjusting the radius */}
            <div className="text-center">
                <div className="row justify-content-center">
                    <div className="col-auto mt-3">
                        <input
                            type="range"
                            style={{width:'18rem'}}
                            min="1"
                            max="50"
                            step="1"
                            value={radius}
                            onChange={(e) => { handleRadius(parseInt(e.target.value)) }}
                        />
                    </div>
                    <div className="col-auto mt-2">
                        <span>{radius} km</span>
                    </div>
                </div>
                <div className="row justify-content-center">
                <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                style={{ width: "40%", height: "10%" }}
           />
            <div className="col-auto">
            <button type='button' className='btn btn-info' onClick={convertAddressToLocation}>Get Parking</button>
                    </div>
                    </div>
            </div>

            {/* Input for entering address */}
           
            <p className="text-center mt-4 mb-4">Parking spaces available in your location: <span className="badge bg-primary">{locationParking.length}</span></p>


        </div>
    );
}
