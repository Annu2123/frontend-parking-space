import { Container,Button,Col,Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { startActiveOrDisableParkings } from '../../actions/ownerActions'
import { useDispatch } from 'react-redux'
export default function OwnerInfo(props) {
    const dispatch=useDispatch()
    const {ownerId, toggle,owners ,parkingSpaces} = props
    console.log(ownerId)
    const owner=()=>{
        return owners.filter((ele)=>{
            if(ele._id == ownerId){
                return ele
            }
        })
    }
    console.log("space",parkingSpaces)
    const parkingSpaceOwn=parkingSpaces?.filter((ele)=>{
                    if(ele.ownerId._id == ownerId){
                        return ele
                    }
    })
    console.log(parkingSpaceOwn)
    const handleOk=()=>{
        toggle()
    }
    const handleDisable=async(id)=>{ 
        dispatch(startActiveOrDisableParkings(id))
    }
    console.log("osod",owner())
    console.log(owners)
    return (
        <>
            {owner()?.map((ele) => {
                return <Card style={{ width: '18rem', border: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="card w-100" >
                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>{ele.title}</Card.Title>
                        <Card.Text>
                           <h6>Owner Name :{ele.name}</h6>
                           <h6>phone :{ele.phone}</h6>
                           <h6>Email:{ele.email}</h6> 
                           <h6>Parking Space Own:</h6>     
                      {parkingSpaceOwn.length > 0 ? parkingSpaceOwn?.length >0 && parkingSpaceOwn?.map((ele)=>{
                            return <li key={ele._id}>{ele.title} <button type="button" className={ele.activeStatus ? " btn btn-success ml-2" : "btn btn-danger ml-2"} onClick={()=>{handleDisable(ele._id)}}>{ele.activeStatus ? ("active"):("disable")}</button></li>
                           }):(<p>0 space</p>)}                                                
                        </Card.Text>
                        
                               <Button onClick={handleOk}>Ok </Button>
                                                                    
                    </Card.Body>
                </Card>
            })}

        </>
    )
}