import { Table } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { startGetBookings, startApproveBooking } from '../../actions/ownerActions'
import { useDispatch, useSelector } from "react-redux"
export default function ParkingSpaceBooking() {
  const dispatch = useDispatch()
  const booking = useSelector((state) => {
    return state.owners.bookings
  })
  console.log('store', booking)
  const handleClick = async (id) => {
    // console.log(id)
    //  try{
    //   const response=await axios.put(http://localhost:3045/api/approve/booking/${id},{},{
    //     headers:{
    //       Authorization:localStorage.getItem('token')}
    //   })
    //   console.log(response.data)
    //  }catch(err){
    //   console.log(err)
    //  }
    dispatch(startApproveBooking(id))
  }
  useEffect(() => {
    // (async()=>{
    //   try{
    //     const response=await axios.get('http://localhost:3045/api/myParkingSpace/booking',{
    //       headers:{'Authorization':localStorage.getItem('token')}
    //     })
    //     console.log(response.data)
    //     setBooking(response.data)
    //   }catch(err){
    //     console.log(err)
    //   }
    // })()
    dispatch(startGetBookings())
  }, [dispatch])
  
  const dateConvert = (val) => {
    const dateObj = new Date(val)
    const ISTOptions = { timeZone: 'Asia/Kolkata' };
    const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)
    const hours = ISTDateString.split(',')[1].trim().split(':')[0]
    return hours
  }
  const convertDate = (val) => {
    const dateObj = new Date(val)
    const date = dateObj.toISOString().split('T')[0]
    return date
  }
  const convertTime = (val) => {
    const dateObj = new Date(val)
    const ISTOptions = { timeZone: 'Asia/Kolkata' };
    const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)
    const hours = ISTDateString.split(',')[1].trim().split(':')[0]
    return hours

  }
  return (
    <>
      <table border="1" style={{ paddingTop: '70px' }}>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>date</th>
            <th>startTime</th>
            <th>enddate</th>
            <th>vehicle name</th>
            <th>payment</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {
            booking.map((ele) => {
              return <tr>
                <td>{ele.customerId.name}</td>
                <td>{convertDate(ele.startDateTime)}</td>
                <td>{dateConvert(ele.startDateTime)}</td>
                <td>{convertTime(ele.endDateTime)}</td>
                {/* <td>{ele.vehicleId.vehicleName}</td> */}
                <td>{ele.paymentStatus}</td>
                <td>{ele.approveStatus ? (<p>booking approved</p>) : <button onClick={() => { handleClick(ele._id) }}>Accept</button>}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}