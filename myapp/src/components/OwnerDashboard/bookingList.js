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
  const [currentBooking,setCurrentBooking]=useState([])
  const [selectedParkingId, setSelectedParkingId] = useState('')
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }
  const parkingSpace = useSelector((state) => {
    return state.owners.parkingSpace
})
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
  useEffect(()=>{
    (async()=>{
        try{
            const response=await axios.get('http://localhost:3045/api/current/booking',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
            setCurrentBooking(response.data)
        }catch(err){
            console.log(err)
        }
    })()
},[])
 
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
const selectedParkingSpace = () => {
  return parkingSpace?.find((ele) => {
      if (ele._id == selectedParkingId) {
          return ele
      }
  })
}
// Filter two-wheeler bookings
const twoWheelerBookings = currentBooking.filter(booking => {
  return booking.spaceTypesId === selectedParkingSpace()?.spaceTypes[0]._id; // Adjust index as needed
});

// Filter four-wheeler bookings
const fourWheelerBookings = currentBooking.filter(booking => {
  return booking.spaceTypesId === selectedParkingSpace()?.spaceTypes[1]._id; // Adjust index as needed
});
console.log("12",twoWheelerBookings)
console.log("34",fourWheelerBookings)
console.log("currentbooking",currentBooking)

  return (
    <>
    <Container style={{ paddingTop: '80px',marginLeft:'20px',marginLeft:"20px" }}>
      <Row>
      <Col md={6}>
      <div className="row">
                        <select className="form-select col-4" style={{ width: "6rem" }} onChange={(e) => { setSelectedParkingId(e.target.value) }}>
                            <option></option>
                            {parkingSpace?.map((ele) => {
                                return  <option key={ele._id} value={ele._id}>{ele.title}</option>
                            })}
                        </select>                    
                        </div> 
        <Table>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>startTime</th>
            <th>endTime</th>
            <th>vehicle </th>
          </tr>
        </thead>
        <tbody>
          {twoWheelerBookings?.map((ele)=>{
              return <tr>
              <td>{ele.customerId.name}</td>
              <td>{convertTime(ele.startDateTime)}</td>
              <td>{convertTime(ele.endDateTime)}</td>
              <td>{ele.vehicleId.vehicleName}</td>
            </tr>
             }
          )}
        </tbody>
        </Table>
      </Col>
      {/* <hr className="vertical-line"></hr> */}
      <Col md={6}>
        <Table>
        <thead>
          <tr>
            <th>customer Name</th>
            <th>startTime</th>
            <th>endTime</th>          
            <th>vehicle</th>
          </tr>
        </thead>
        <tbody>
          {fourWheelerBookings?.map((ele)=>{
              return <tr>
               <td>{ele.customerId.name}</td>
              <td>{convertTime(ele.startDateTime)}</td>
              <td>{convertTime(ele.endDateTime)}</td>
              <td>{ele.vehicleId.vehicleName}</td>
            </tr>
             }
          )}
        </tbody>
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