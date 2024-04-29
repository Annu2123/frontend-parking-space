import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { startPaymentStatusSuccess } from "../../actions/customerActions/customerBookings"
export default function Succes(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const stripeId = localStorage.getItem('stripeId')
    useEffect(()=>{
        (async()=>{
           try{
            const response= await axios.put(`http://localhost:3045/api/payment/status/update/${stripeId}`)
            console.log('response from stripe put request',response.data)
            const bookingId=response.data.bookingId
            dispatch(startPaymentStatusSuccess(bookingId,navigate))
           // const updatedBooking=await axios.put(`http://localhost:3045/api/booking/payment/update/${bookingId}`)
            // console.log("update",updatedBooking.data)
           }catch(err){
            console.log(err)
           }
        })()
    },[])
    return (
        <div style={{ paddingTop: '80px' }}>
            <h1>payment is succes</h1>
        </div>
    )
}