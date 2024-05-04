import { Container, Table,Col, Row } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { startGetBookings, startApproveBooking } from '../../actions/ownerActions'
import { useDispatch, useSelector } from "react-redux"

export default function ParkingSpaceBooking() {
  const dispatch = useDispatch()
 const [booking,setBooking]=useState([])
  const[limit,setLimit]=useState(5)
  const [page, setPage] = useState(1)
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }
  const handleClick = async (id) => {
    dispatch(startApproveBooking(id))
  }
  
  useEffect(()=>{
    (async()=>{
      console.log(page)
      try{
        const response = await axios.get(`http://localhost:3045/api/myParkingSpace/booking?page=${page}&&limit=${limit}` , {
          headers:{
            Authorization:localStorage.getItem('token')
          }})
        console.log(response.data)
        setBooking(response.data)
      } catch(err){
        console.log(err)
      }

    }
  )()
  },[page , limit])
  
  const parkingSpace = useSelector((state) => {
    return state.owners.parkingSpace
})

//   const booking = useSelector((state) => {
//     return state.owners.spaceBookings
// })
 console.log("bookings",booking)
  const convertDate = (val) => {
    const dateObj = new Date(val)
    const date = dateObj.toISOString().split('T')[0]
    return date
  }
  
  const convertTime = (val) => {
    const dateObj = new Date(val);
    const ISTOptions = { timeZone: 'Asia/Kolkata', hour12: true } // Include hour12 option
    const ISTDateString = dateObj.toLocaleString('en-IN', ISTOptions)// convert utc to indian time
    const timeArray = ISTDateString.split(',')[1].trim().split(':')//// extracting the time from ISTDateString 
    const hours = timeArray[0]
    const minutes = timeArray[1]
    const amPm = timeArray[2].split(' ')[1]
    return hours + ':' + minutes + ' ' + amPm
}
// const vehicleType = (id) => {
//   return parkingSpace.map((ele) => {
//       return  ele.spaceTypes?.filter((type) => {
//           if (type._id == id) {
//               return type.types
//           }
//       })
//   })

// }
// const vehicleType=(id)=>{
//   const type=''
//    for(let i=0;i<parkingSpace.length;i++){
//     parkingSpace.spaceTypes.reduce((acc,cv)=>{
//       if(cv._id == id){
//         acc = cv.type
//         return acc
//       }
//      },type)
//   }
//   return type
// }

//console.log(vehicleType())
console.log(booking)
  return (
    <>
    <Container style={{ paddingTop: '80px',marginLeft:'20px',marginLeft:"20px" }}>
      <Row>
      <Col md={6}>
        <h3 className="text-center">Today booking</h3>
        <Table>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>date</th>
            <th>startTime</th>
            <th>endTime</th>
            <th>vehicle </th>
            <th>payment</th>
            <th>action</th>
          </tr>
        </thead>
        </Table>
      </Col>
      {/* <hr className="vertical-line"></hr> */}
      <Col md={6}>
      <h3 className="text-center">Today Completed booking</h3>
        <Table>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>startTime</th>
            <th>endTime</th>
            <th>space Name</th>
            <th>vehicle</th>
            <th>payment</th>
            <th>Status</th>
          </tr>
        </thead>
        </Table>
      </Col>
      </Row>
    </Container>
    <Container style={{ paddingTop: '40px' }}>
      <Table border="1" style={{ paddingTop: '70px' }}>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>startTime</th>
            <th>endTime</th>
            <th>space Name</th>
            <th>vehicle No</th>
            <th>payment</th>
            <th>Status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {
            booking?.map((ele) => {
              return <tr>
                <td>{ele.customerId.name}</td>
                <td>{convertDate(ele.startDateTime)}</td>
                <td>{convertTime(ele.startDateTime)}</td>
                <td>{convertTime(ele.endDateTime)}</td>
                <td>{ele.parkingSpaceId.title}</td>
                <td>{ele.vehicleId.vehicleNumber}</td>
                <td>{ele.paymentStatus}</td>
                <td>{ele.status}</td>
                <td>{ele.approveStatus ? (<p>booking approved</p>) : <button onClick={() => { handleClick(ele._id) }}>Accept</button>}</td>
                
              </tr>
            })
          }
        </tbody>
      </Table>
      <nav aria-label="Page navigation example ">
  <ul class="pagination d-flex justify-content-end">
      <li className="page-item">
                    <button className="page-link" onClick={() => {
                       
                      setPage(prev=>prev- 1)}} disabled={page <=1} >Previous</button>
                </li>
                <li>{page}</li>
                <li className="page-item">
                    <button className="page-link" onClick={() =>{ 
                     
                      setPage(prev=>prev+ 1)
                      }}>Next</button>
                </li>
  </ul>
</nav>
    </Container>
    </>
  )
}