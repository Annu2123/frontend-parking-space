import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import axios from 'axios'; // For making HTTP requests
import 'leaflet/dist/leaflet.css'
import pin from './img/pin.png'
import { Icon} from 'leaflet'
import './map.css'
function reverseLatLon(arr) {
    return [arr[1], arr[0]]
}
export default function MapComponent2(){
    const [address, setAddress] = useState(''); // State to store user's address
    const [center, setCenter] = useState([0, 0]); // State to store center of the map
    const [radius, setRadius] = useState(10); // State to store radius of the circle
    const [services, setParkingServices] = useState([]); // State to store nearby services

    const mapRef = useRef(null)


    const customMarker = new Icon({
        iconUrl: pin,
        iconSize: [38, 38]
    })

    useEffect(() => {

        (async () => {

            if (navigator.geolocation) {
                console.log(true)
                console.log(navigator.geolocation.getCurrentPosition((location) => {
                    // console.log("lag",location.coords.longitude)
                    // console.log("lan",location.coords.latitude)
                    console.log("dhwdh", location)
                    const { latitude, longitude } = location.coords
                    setCenter([latitude, longitude])
                }))
            }

        })()
    }, [])
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

    useEffect(() => {
        if (center[0] != 0) {
            (async () => {
                try {
                    const response = await axios.get(`http://localhost:3045/api/parkingSpace/radius?lat=${center[0]}&log=${center[1]}&radius=${radius}`)
                    console.log("sds", response.data)
                    setParkingServices(response.data)
                    setAddress('')
                } catch (err) {
                    console.log(err)
                }
            })()

        }

    }, [center, radius])
    // Function to find nearby services based on user's location
    //const findNearbyServices = () => {
    // Make API request to find nearby services based on center and radius
    // Update services state with the response
    // };

    return (
    <div className="container mt-2 mb-2 ">

        {/* Leaflet map */}
        {center[0] != 0 &&
            <MapContainer ref={mapRef}
                center={center} zoom={15} style={{ height: '400px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Circle representing the radius */}
                    <Circle center={center} radius={radius * 1000} />

                    {/* Marker for user's location */}
                    {/* <Marker position={center}>
                    <Popup>User's Location</Popup>
                    </Marker> */}

                    {/* Display nearby services as markers */}
                    {services && services.map((space, index) => (
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
                onChange={(e) => setRadius(parseInt(e.target.value))}
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
            <p>parking space available in your location -{services.length}</p>

     </div>
    );
}
