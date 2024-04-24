import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import {Icon, popup} from 'leaflet'
import { Container } from 'react-bootstrap'
import pin from './img/pin.png'
const MapComponent = () => {
    const [radius, setRadius] = useState(10); // Initial radius
    const center = [12.9308,77.5838]; // Initial center coordinates
    const userLocation = [12.9308,77.5838]; // User's location coordinates
   const customMarker=new Icon({
    iconUrl:pin,
    iconSize:[38,38]
   })
   const markers=[
    {
        geocode:[12.9308,77.5838],
        popup:"jayanagar"
    },
    {
        geocode:[12.9429325,77.560459],
        popup:"basavanagudi"
    },
    {

        geocode:[12.9697203,77.5571645],
        popup:"chickpete"
    }
    

   ]
    return (
        <div className="map-container">
            <MapContainer center={center} zoom={13} style={{ height: '400px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <Circle center={center} radius={radius * 1000} />

                {/* Marker for user's location */}
                {/* <Marker position={userLocation}> 
                    <Popup>User's Location</Popup>
                </Marker> */}
                {
                    markers.map(marker => 
                        <Marker position={marker.geocode} icon={customMarker}>
                            <Popup>{marker.popup}</Popup>
                        </Marker>)
                }
            </MapContainer>

            {/* Input for adjusting the radius */}
            <input
                type="range"
                min="1"
                max="50"
                step="1"
                className='justify-content-center'
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
            />
            <span>{radius} km</span>
        </div>
    );
}

export default MapComponent;
