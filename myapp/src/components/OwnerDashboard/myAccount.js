import { useDispatch, useSelector } from "react-redux"
import { startApproveBooking, startGetBookings, startGetParkingSpace } from "../../actions/ownerActions"
import { useEffect,useState } from "react"
import axios from 'axios'
export default function OwnerMain() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startGetBookings())
        dispatch(startGetParkingSpace())
    },[])
    
    // useEffect(()=>{
    //     (async()=>{
    //         try{
    //             const response=await axios.get('http://localhost:3045/api/myParkingSpace/booking',{
    //                 headers:{
    //                     Authorization:localStorage.getItem('token')
    //                 }
    //             })
    //             setBooking(response.data)
    //             console.log("parkingBooking",response.data)
    //         }catch(err){
    //             console.log(err)
    //         }

    //     })()
    // },[])
    const handleApprove = (id) => {
        dispatch(startApproveBooking(id))
    }
    const booking = useSelector((state) => {
        return state.owners.spaceBookings
    })
    const parkingSpace = useSelector((state) => {
        return state.owners.parkingSpace
    })
    const convertDate = (val) => {
        const dateObj = new Date(val)
        const date = dateObj.toISOString().split('T')[0]
        return date
    }

    const timeConvert = (val) => {
        const dateObj = new Date(val)
        const ISTOptions = { timeZone: 'Asia/Kolkata', hour12: true } // Include hour12 option
        const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)// convert utc to indian time
        const timeArray = ISTDateString.split(',')[1].trim().split(':')//// extracting the time from ISTDateString 
        const hours = timeArray[0]
        const minutes = timeArray[1]
        const amPm = timeArray[2].split(' ')[1]
        return hours + ':' + minutes + ' ' + amPm
    }
    const todayBooking = () => {
        return booking?.filter((ele) => {
            console.log(convertDate(ele.startDateTime))
            if (convertDate(ele.startDateTime) === convertDate(new Date()) && ele.approveStatus ==true) {
                return ele
            }
        })
    }
    const todayBookingRequest = () => {
        const currentDate = new Date(); // Get the current date and time
    
        return booking?.filter((ele) => {
            const startDateTime = new Date(ele.startDateTime); // Convert startDateTime to a Date object
            
            // Compare both the date and time
            if (startDateTime.getFullYear() === currentDate.getFullYear() &&
                startDateTime.getMonth() >= currentDate.getMonth() &&
                startDateTime.getDate() >= currentDate.getDate() &&
                startDateTime.getHours() >= currentDate.getHours() &&
                ele.approveStatus == false) {
                return ele
            }
        })
    }

    console.log("dsds", todayBooking())

    const allTwoWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return booking?.filter((space) => {
                if (ele.spaceTypes[0]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }

    const allFourWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return booking?.filter((space) => {
                if (ele.spaceTypes[1]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }
    const twoWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return todayBooking()?.filter((space) => {
                if (ele.spaceTypes[0]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }
    console.log("hgffg", twoWheelerBooking())
    const FourWheelerBooking = () => {
        return parkingSpace.map((ele) => {
            return todayBooking()?.filter((space) => {
                if (ele.spaceTypes[1]._id == space.spaceTypesId) {
                    return space
                }
            })
        })
    }

    const totalRevenue = () => {
        return booking.reduce((acc, cv) => {
            if(cv.paymentStatus =="success"){
                acc = acc + cv.amount
                return acc
           }else{
            return acc
           }
            
        }, 0)
    }
    const todayRevenue = () => {
        return todayBooking().reduce((acc, cv) => {
            if(cv.paymentStatus =="success"){
                acc = acc + cv.amount
                return acc
           }else{
            return acc
           }
            
        }, 0)
    }
    console.log(totalRevenue())
    console.log(FourWheelerBooking())
    console.log("todayBooking",todayBooking())
    console.log("toddapp",todayBookingRequest())
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
                                <h5 className="card-title"> Total Bookings-{booking?.length}</h5>
                                <h6 className="card-subtitle mb-2 text-body">Four Wheeler-{allFourWheelerBooking()[0]?.length } </h6>
                                <h6 className="card-subtitle mb-2 text-body">Two Wheeler-{ allTwoWheelerBooking()[0]?.length} </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md " style={{ marginLeft: "10px" }}>
                        <div className="card mt-3 mt-md-0" style={{ maxWidth: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Earnings</h5>
                                <h6 className="card-subtitle mb-2 text-body">Total Earnings-{totalRevenue()}</h6>
                                <h6 className="card-subtitle mb-2 text-body">Today Earnings-{todayRevenue()}</h6>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
                {todayBookingRequest().length != 0 ? (todayBookingRequest().map((ele) => {
                  
                        return  <div className=" d-flex justify-content-center align-items-center mt-5 " key={ele._id}>
                        <div className="card shadow-sm" style={{ width: "30rem" }}>
                            <div className="card-body text-center">
                                <p>{ele.customerId.name} is send a booking request from {timeConvert(ele.startDateTime)}  {timeConvert(ele.endDateTime)}
                                    <button type="button" className="btn btn-primary" onClick={() => { handleApprove(ele._id) }}>Accept</button>
                                     <button type="button" className="btn btn-danger ml-2" > cancel</button>
                                     <button type="button" className="btn btn-info ml-2" > more</button></p>
                            </div>
                        </div>
                        </div>
                   
                })) : ( <div className="text-center" style={{ paddingTop: '60px' }}>
                <p className="display-8">No Booking to approve</p>
            </div>)}
           

        </>

    )
}