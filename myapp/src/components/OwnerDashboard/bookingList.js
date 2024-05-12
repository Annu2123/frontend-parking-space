import { Container, Table, Col, Row } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { startGetBookings, startApproveBooking } from '../../actions/ownerActions'
import { useDispatch, useSelector } from "react-redux"

export default function ParkingSpaceBooking() {
  const dispatch = useDispatch()
  const [booking, setBooking] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [currentBooking, setCurrentBooking] = useState([])
  const [selectedParkingId, setSelectedParkingId] = useState('')
  const [sort,setSort]=useState('')
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }
  const handleClick = async (id) => {
    dispatch(startApproveBooking(id))
  }

  const parkingSpace = useSelector((state) => {
    return state.owners.parkingSpace
  })
  useEffect(() => {
    (async () => {
      console.log(page)
      try {
        const response = await axios.get(`http://localhost:3045/api/myParkingSpace/booking?page=${page}&&limit=${limit}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        console.log(response.data)
        setBooking(response.data.bookings)
      } catch (err) {
        console.log(err)
      }

    }
    )()
  }, [page, limit])
  //   const booking = useSelector((state) => {
  //     return state.owners.spaceBookings
  // })
  console.log("bookings", booking)
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
  console.log(sort)
  const sortFunction = () => {
    return booking?.filter((ele) => {
       if(ele.status.toLowerCase().includes(sort.toLowerCase()))
        return ele
    })
}
console.log("sdfgfds",sortFunction())
  return (
    <>
      <Container style={{ paddingTop: '60px' }}>
      <select onChange={(e)=>{setSort(e.target.value)}}>
      <option value="completed">completed</option>
      <option value="failed">failed</option>
      <option value="pending">pending</option>
      <option value="success">payment success</option>
    </select>
        <Table border="1" style={{ paddingTop: '70px' }}>
          <thead>
            <tr>
              <th>Customers</th>
              <th>Date</th>
              <th>Start</th>
              <th>EndTime</th>
              <th>space Name</th>
              <th>vehicle No</th>
              <th>payment</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            { sortFunction().length > 0 &&
              sortFunction()?.map((ele) => {
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
                setPage(prev => prev - 1)
              }} disabled={page <= 1} >Previous</button>
            </li>
            <li>{page}</li>
            <li className="page-item">
              <button className="page-link" onClick={() => {
                setPage(prev => prev + 1)
              }}>Next</button>
            </li>
          </ul>
        </nav>
      </Container>
    </>
  )
}