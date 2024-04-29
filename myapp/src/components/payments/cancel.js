import axios from 'axios'
import { useEffect } from 'react'
export default function Cancel(){
    useEffect(()=>{
        const stripeId = localStorage.getItem('stripeId')
        (async()=>{
           try{
            const response= await axios.put(`http://localhost:3045/api/payment/status/update/${stripeId}`)
            console.log('response from stripe put request',response.data)
            const bookingId=response.data.bookingId
            const updatedBooking=await axios.put(`http://localhost:3045/api/payment/failer/${bookingId}`)
            console.log("update",updatedBooking.data)
           }catch(err){
            console.log(err)
           }
        })()
    },[])
    return (
        <div>
            <p></p>
        </div>
    )
}