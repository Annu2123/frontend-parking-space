import { Container,Button,Col,Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { startActiveOrDisableParkings } from '../../actions/ownerActions'
import { useDispatch } from 'react-redux'
export default function CustomerInfo(props) {
    const dispatch=useDispatch()
    const {customerId, toggle,todayBookingRequest } = props
    const handleOk=()=>{
        toggle()
    }
    const filterCustBookingDetails=()=>{
        return todayBookingRequest?.filter((ele)=>{
            if(ele._id == customerId){
                return ele
            }
        })
    }

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
    const calculateDuration = (startDateTime,endDateTime) => {
        // Convert start and end times to Date objects
        const startDate = new Date(`${startDateTime}`)
        const endDate = new Date(`${endDateTime}`)
        // Calculate the difference in milliseconds
        const difference = endDate - startDate
        // Convert milliseconds to hours
        const durationHours = difference / (1000 * 60 * 60)
        return durationHours
    }

    return (
        <>
            {filterCustBookingDetails()?.map((ele) => {
                return <Card style={{ width: '18rem', border: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="card w-100" >
                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>{ele.title}</Card.Title>
                        <Card.Text>
                           <h6>Customer Name :{ele.customerId.name}</h6>
                           <h6>parking Name:{ele.parkingSpaceId.title}</h6>
                           <h6>Date:{convertDate(ele.startDateTime)}</h6>
                           <h6>Start Time :{timeConvert(ele.startDateTime)}</h6>
                           <h6>End Time:{timeConvert(ele.endDateTime)}</h6> 
                           <h6>SpaceType:{ele.vehicleId.vehicleType}</h6>  
                           <h6>total Duration:{calculateDuration(ele.startDateTime,ele.endDateTime)}</h6>   
                                                                  
                        </Card.Text>
                        
                               <Button onClick={handleOk}>Ok </Button>
                                                                    
                    </Card.Body>
                </Card>
            })}

        </>
    )
}