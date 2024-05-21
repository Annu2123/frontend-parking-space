import { useState } from 'react'
import { Button } from 'reactstrap'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { startParkingSpaceBooking } from '../../actions/customerActions/customerBookings'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
export default function BookingModal(props){
    const {availableSeat,user,id,parkingType,startDateTime,endDateTime,vehicleType,totalAmount,cancel,toggle}=props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedSeats, setSelectedSeats] = useState(null);
    const toggleSeat = (seat) => {
        setSelectedSeats(selectedSeats === seat ? null : seat)
    }

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString)
        const year = dateObj.getFullYear()
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
        const day = ('0' + dateObj.getDate()).slice(-2)
        const hours = ('0' + dateObj.getHours()).slice(-2)
        const minutes = ('0' + dateObj.getMinutes()).slice(-2)
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }
    const popUp = () => {
        Swal.fire({
            title: `hello ${user?.users.name}`,
            text: "Your booking request is success please wait for approval",
            icon: "success"
        })
    }
    const handleClick = async () => {
        const bookingForm = {
            vehicleId: vehicleType,
            amount: totalAmount,
            startDateTime: `${formatDate(startDateTime)}`,
            endDateTime: `${formatDate(endDateTime)}`
        }
        dispatch(startParkingSpaceBooking(id, parkingType, bookingForm, popUp, navigate))
    }
    const handleCancel=()=>{
        cancel()
        toggle()
    }
    return (
        <>
         {availableSeat?.capacity > 0 ? (<div>
                <Form.Group controlId="seatSelection">
                    <Form.Label className="text-center"><strong>Select a parking lot</strong></Form.Label>
                    <div style={{ border: '2px solid #03cffc', padding: '10px', width: '250px' }}>
                        {[...Array(Number(availableSeat.capacity))].map((_, index) => (
                            <div className={'rounded text-center'}
                                key={index}
                                onClick={() => toggleSeat(index + 1)}
                                style={{
                                    width: '40px',
                                    height: '35px',
                                    border: '1px solid #037ffc',
                                    margin: '2px',
                                    display: 'inline-block',
                                    backgroundColor: selectedSeats === index + 1 ? '#0b7a0f' : 'transparent',
                                    cursor: 'pointer',
                                }}
                            >
                                {index + 1}

                            </div>
                        ))}
                    </div>

                </Form.Group>
                <div>
                    <div>
                        total Amount- {totalAmount}
                    </div>
                    {selectedSeats ? <div className='justify-content-center d-flex'><button type='button' className='btn btn-primary' onClick={handleClick}>
                        Book Now
                    </button>
                    </div>
                        : <p className='text-success'>please select the slot</p>}
                </div>
                <div  className='justify-content-center d-flex mt-2'>
                <button type='button' className='btn btn-danger' onClick={handleCancel}>
                        cancel
                    </button>
                </div>
        
            </div>
            ) : <p></p>}
        </>
    )
}