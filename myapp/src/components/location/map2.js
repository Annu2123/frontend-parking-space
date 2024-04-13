import { useEffect, useState, useRef ,useContext} from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { ParkingSpaceContext } from '../../contextApi/context';
import axios from 'axios'; // For making HTTP requests
import 'leaflet/dist/leaflet.css'
import pin from './img/pin.png'
import { Icon} from 'leaflet'
import './map.css'
function reverseLatLon(arr) {
    return [arr[1], arr[0]]
}
export default function MapComponent2(){
    const [address,setAddress]=useState("")
    const {center,setCenter,radius,locationParking,setHandleRadius}=useContext(ParkingSpaceContext)
console.log("parki",locationParking)
    const mapRef = useRef(null)


    const customMarker = new Icon({
        iconUrl: pin,
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

   
  const handleRadius=(r)=>{
    setHandleRadius(r)
  }
    return (
    <div className="container mt-2 mb-2 ">

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
                        } icon={customMarker} draggable={true}>
                            <Popup>{space.title}</Popup>
                        </Marker>
                    ))}
           </MapContainer>
        }

            {/* Input for adjusting the radius */}
            <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={radius}
                onChange={(e) => {handleRadius((parseInt(e.target.value)))}}
            />
            <span>{radius} km</span>

            {/* Input for entering address */}
            <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                style={{ width: "40%", height: "10%" }}

            />
            <button onClick={convertAddressToLocation}>Get Location</button><br />
            <p>parking space available in your location -{locationParking.length}</p>

     </div>
    );
}
