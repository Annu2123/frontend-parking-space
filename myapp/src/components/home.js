import { Card } from "react-bootstrap"
import Listing from "./listParking"
import MapComponent2 from "./location/map2"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faMap} from '@fortawesome/free-solid-svg-icons'
import Footer from "./pages/footer"
import ListParkings from "./parkingSpace/allParkingLIst"
import { useState } from "react"

export default function Home() {
    const [view,setView]=useState("")
    const handleView=(str)=>{
        setView(str)
    }
    return (
        <>   
            <div className="d-flex justify-content-end mt-4 mr-4" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1000,
                paddingTop: '60px'
            }}>
                <Card class=" bg-light" style={{ border: "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button onClick={()=>{handleView('list')}} type="button" className="btn btn-primary m-1"><FontAwesomeIcon icon={faList} />List</button>
                        <button onClick={()=>{handleView('map')}} type="button" className="btn btn-primary m-1"><FontAwesomeIcon icon={faMap} />Map</button>
                    </div>
                </Card>
            </div>          
        { view==''? <div> <MapComponent2 />
           <ListParkings /></div> :( view =='map' ?  <MapComponent2 />
          :( view =="list" ? <ListParkings />:<p></p>))
            }
            <Footer />
        </>
    )
}