import Listing from "./listParking";
import MapComponent2 from "./location/map2";
import Footer from "./pages/footer";
import ListParkings from "./parkingSpace/allParkingLIst";
export default function Home(){
    return (
        <>
        <MapComponent2/>
        <ListParkings/>
        <Footer/>
        </>
    )
}