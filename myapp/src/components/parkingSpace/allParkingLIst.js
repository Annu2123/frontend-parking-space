import { useEffect, useState } from "react"
import axios from 'axios'
export default function ListParkings(){
    const [parking,setParking]=useState([])
    useEffect(()=>{
        (async()=>{
            try{
                const response=await axios.get('http://localhost:3045/api/parkingSpace')
                console.log(response.data)
                setParking(response.data)
            }catch(err){
                console.log(err)
            }
        })()
    },[])
    return (
           <div className="container mt-4">
              <div className="row">
                {parking.map((ele)=>{
                  return <div className="col-md-4">
                           
                              
                             <div className="card post-card" style={{ width: "18rem" }}>
                             <img src={`http://localhost:3045/uploads/${ele.image}`} className="card-img-top  img-fluid" alt="..." style={{width:"200px",height:"200px"}} />
                             <div className="card-body">
                             <h5 className="card-title">{ele.title}</h5>
                             <p className="card-text"> {ele.amenities}</p>
                        
        
                             </div>
                           </div>
                         </div>
                     
                      
              })}
           </div>
        </div>
    )
}
