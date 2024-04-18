import axios from "axios"
import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetParkingSpace } from "../../actions/ownerActions"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import EditSpace from "./editSpace"
export default function MySpace() {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('')
    const toggle = () => setModal(!modal)
    const parkingSpace = useSelector((state) => {
        return state.owners.parkingSpace
    })
    useEffect(() => {
        // (async()=>{
        //     try{
        //         const response=await axios.get('http://localhost:3045/api/parkingSpace/my',{
        //             headers:{
        //                 Authorization:localStorage.getItem('token')
        //             }
        //         })
        //        console.log("sapce",response.data)
        //        setParking(response.data)
        //     }catch(err){
        //         console.log(err)
        //     }
        // })()
        dispatch(startGetParkingSpace())
    }, [])
    const handleCLick = (id) => {
        setEditId(id)
        toggle()
    }
    return (
        <>
            <div class="container text-center">
                <h3 className="mt-6">Total Space-{parkingSpace.length}</h3>
                <div class="row">
                    {parkingSpace && parkingSpace.map((ele) => {
                        return <div class="col" onClick={()=>{handleCLick(ele._id)}} key={ele._id}>
                            <div class="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                                <span className={ele.approveStatus ? "badge text-bg-success" : "badge text-bg-danger"} style={{ position: "absolute", top: 0, right: 0 }}>
                                    {ele.approveStatus ? ("approve") : ("pending")}
                                </span>
                                <div class="card-body">
                                    <h5 class="card-title">{ele.title}</h5>
                                    <p class="card-text">{ele.address.city}</p>
                                    <p class="card-text">{ele.amenities}</p>
                                    <p class="card-text">{ }</p>
                                    <p class="card-text"></p>
                                    <a class="btn btn-primary"></a>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-primary">Add Space</button>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Edit Your Parking Space</ModalHeader>
                <ModalBody>
                  <EditSpace editId={editId} toggle={toggle}/>
                </ModalBody>
            </Modal>
        </>
    )
}