import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startActiveOrDisableParkings, startGetParkingSpace, startRemoveParkingSpace } from "../../actions/ownerActions"
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import EditSpace from "./editSpace"
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import BookingCalender from "./advanceBooking"
export default function MySpace() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('')
    const toggle = () => setModal(!modal)
    const parkingSpace = useSelector((state) => {
        return state.owners.parkingSpace
    })

    const user = useSelector((state) => {
        return state.users
      })
    const handleCLick = (id) => {
        setEditId(id)
        toggle()
    }
    const deletePopUP=()=>{
        Swal.fire({
            title: "Deleted!",
            text: `${user?.users?.name} Your space space has been.`,
            icon: "success"
          })
       }
       const DeleteError = (error) => {
        Swal.fire({
            title: `${error}`,
            text: ` cancel delete request.`,
            icon: "cancel"
        })
    }
    const DisableError = (error) => {
        Swal.fire({
            title: `${error}`,
            text: ` cancel disable request.`,
            icon: "cancel"
        })
    }
    const handleAdd=()=>{
         navigate('/addparking')
    }
    const handleDelete=async(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You will not able to revert it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRemoveParkingSpace(id,deletePopUP,DeleteError))
            }
          })
    }
    const handleDisable=async(id,activeStatus)=>{ 
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: activeStatus ? "Yes, disable it!": "yes active it"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startActiveOrDisableParkings(id, DisableError))
            }
          })
    }
    return (
        <>
            <div class="container text-center" style={{ paddingTop: '60px' }}>
                <h3 className="mt-4">Total Space-{parkingSpace.length}</h3>
                <div class="row">
                    {parkingSpace.length >0  ? parkingSpace.map((ele) => {
                        return <div class="col-md-4"  key={ele._id}>
                            <div class="card text-center mb-3 mt-4 ml-4" style={{ width: "18rem", position: "relative" }}>
                                <span className={ele.approveStatus ? "badge text-bg-success" : "badge text-bg-danger"} style={{ position: "absolute", top: 0, right: 0 }}>
                                    {ele.approveStatus ? ("approve") : ("pending")}
                                </span>
                                <div class="card-body bg-light">
                                    <h5 class="card-title">{ele.title}</h5>
                                    <h6 class="card-text">
                                    <button type="button" className="btn btn-info" onClick={()=>{handleCLick(ele._id)}}>more</button>
                                    <button type="button" className="btn btn-danger ml-2" onClick={()=>{handleDelete(ele._id)}}> delete</button>
                                <button type="button" className={ele.activeStatus ? " btn btn-success ml-2" : "btn btn-danger ml-2"} onClick={()=>{handleDisable(ele._id,ele.activeStatus)}}>{ele.activeStatus ? ("active"):("disable")}</button>
                                    </h6>                           
                                </div>
                            </div>
                        </div>
                    }):((<div className="text-center" style={{ paddingTop: '60px' }}>
                   <Link to="/addParking"><p className="display-8">No Parking please Add</p></Link>
                </div>))}

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-primary" onClick={handleAdd}>Add Space</button>
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