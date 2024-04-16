import { useEffect, useState ,useContext} from "react"
import { ParkingSpaceContext } from "../../contextApi/context"
import axios from 'axios'
import { Link } from "react-router-dom"
export default function ListParkings(){
    const [parking,setParking]=useState([])
    const {locationParking}=useContext(ParkingSpaceContext)
    // useEffect(()=>{
    //     (async()=>{
    //         try{
    //             const response=await axios.get('http://localhost:3045/api/parkingSpace')
    //             console.log(response.data)
    //             setParking(response.data)
    //         }catch(err){
    //             console.log(err)
    //         }
    //     })()
    // },[])
    return (
           <div className="container mt-4">
              <div className="row">
                {locationParking && locationParking.map((ele)=>{
                  return <div className="col-md-4">
                           
                           <Link to={`/spaceBookingPage/${ele._id}`}>
                             <div className="card post-card" style={{ width: "18rem" }}>
                             <img src={`http://localhost:3045/uploads/${ele.image}`} className="card-img-top  img-fluid" alt="..." style={{width:"200px",height:"200px"}} />
                             <div className="card-body">
                             <h5 className="card-title">{ele.title}</h5>
                             <p className="card-text"> {ele.amenities}</p>
                        
        
                             </div>
                           </div></Link>
                         </div>
                     
                      
              })}
           </div>
        </div>
    )
}
