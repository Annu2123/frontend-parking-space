import { useDispatch, useSelector } from "react-redux"
import { startApproveBooking } from "../../actions/ownerActions"
export default function OwnerMain() {
    const dispatch=useDispatch()
    const booking = useSelector((state) => {
        return state.owners.bookings
    })
    const parkingSpace = useSelector((state) => {
        return state.owners.parkingSpace
    })
    const convertDate = (val) => {
        const dateObj = new Date(val)
        const date = dateObj.toISOString().split('T')[0]
        return date
      }
    const todayBooking=()=>{
        return booking.filter((ele)=>{
            console.log(convertDate(ele.startDateTime))
            if(convertDate(ele.startDateTime) == convertDate(new Date())){
                return ele
            }
        })
    }

    console.log("dsds",todayBooking())
    const dateConvert = (val) => {
        const dateObj = new Date(val)
        const ISTOptions = { timeZone: 'Asia/Kolkata' };
        const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)
        const hours = ISTDateString.split(',')[1].trim().split(':')[0]
        return hours
      }
      const handleApprove=(id)=>{
        dispatch(startApproveBooking(id))
      }
      const twoWheelerBooking=()=>{
        return parkingSpace.map((ele)=>{
            return todayBooking()?.filter((space)=>{
                if(ele.spaceTypes[0]._id == space.spaceTypesId){
                    return space
                }
            })
        })
        
      }
      console.log("hgffg",twoWheelerBooking())
      const FourWheelerBooking=()=>{
        return parkingSpace.map((ele)=>{
            return todayBooking()?.filter((space)=>{
                if(ele.spaceTypes[1]._id == space.spaceTypesId){
                    return space
                }
            })
        })
        
      }
      console.log(FourWheelerBooking())
    return (
        <>
            <div className="d-flex justify-content-end mt-4 mr-4" style={{ paddingTop: '60px' }}>
                <button type="button" className="btn btn-primary">
                    Notifications <span className="badge text-bg-secondary">4</span>
                </button>
            </div>
            <div className="container text-center mt-4">
                <div className="row">
                    <div className="col-md ml-5">
                        <div className="card" style={{ maxWidth: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Today bookings-{todayBooking()?.length}</h5>
                                <h6 className="card-subtitle mb-2 ">Two wheeler-{twoWheelerBooking()[0]?.length}</h6>
                                <h6 className="card-subtitle mb-2 ">Four wheeler-{FourWheelerBooking()[0]?.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md " style={{ marginLeft: "10px" }}>
                        <div className="card mt-3 mt-md-0" style={{ maxWidth: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title"> Bookings</h5>
                                <h6 className="card-subtitle mb-2 text-body">Total Booking-{booking?.length}</h6>
                                <h6 className="card-subtitle mb-2 text-body">Four Wheeler-{ } </h6>
                                <h6 className="card-subtitle mb-2 text-body">Four Wheeler-{ } </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" d-flex justify-content-center align-items-center mt-5 ">
                <div className="card shadow-sm" style={{width:"36rem"}}>
                    <div className="card-body text-center">
                    { todayBooking().length !=0 ? (todayBooking().map((ele)=>{
                        return <p>{ele.customerId.name} is send a book request from {dateConvert(ele.startDateTime)}  {dateConvert(ele.endDateTime)}  
                        <button type="button" className="btn btn-primary" onClick={()=>{handleApprove(ele._id)}}>Accept</button></p>
                    })): (<p>no bookings</p>)}
                    </div>
                </div>
            </div>
            
        </>

    )
}