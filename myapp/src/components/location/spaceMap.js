import { Icon ,latLng} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import pin from './img/pin.png'
import './map.css'
import { useRef, useContext, useEffect } from 'react'
import { ParkingSpaceContext } from '../../contextApi/context'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
export default function SpaceMap(props) {
    const { id } = props
    const { locationParking,center } = useContext(ParkingSpaceContext)
    console.log("location", locationParking)
    const parking = locationParking?.find((ele) => {
        if (ele._id == id) {
            return ele
        }
    })
    console.log("id", id)
    console.log("center", center)
    const mapRef = useRef(null)
    const customMarker = new Icon({
        iconUrl: pin,
        iconSize: [38, 38]
    })
    useEffect(() => {
        const map = mapRef.current
        if (map && parking.address.coordinates && Array.isArray(parking.address.coordinates) && parking.address.coordinates.length === 2) {
            map.setView(parking.address.coordinates);
        }
    }, [])

    return (
        <div className="container mt-0 mb-2 " >
            {parking?.address.coordinates[0] != 0 &&
                <MapContainer ref={mapRef} center={parking?.address.coordinates}
                    zoom={11} style={{ height: '400px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={parking?.address.coordinates
                    } icon={customMarker} >
                        <Popup></Popup>
                    </Marker>
                </MapContainer>
            }
        </div>
    )
}