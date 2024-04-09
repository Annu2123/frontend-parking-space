import { useState,useEffect } from "react";
import axios from 'axios'
export default function (){
    const [booking,setBooking]=useState('')
    const [amount,setAmount]=useState()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const paymentForm={
            bookingId:booking,
            amount:Number(amount)
        }
        try{
            const response=await axios.post('http://localhost:3045/api/create-checkout-session',paymentForm)
            //Store the transaction id in local storage
              localStorage.setItem('stripeId', response.data.id)
        
             //Redirecting the user to the chekout page of stripe
              window.location = response.data.url; 
        }catch(err){
            console.log(err)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>enter booking Id</label>
                <input type="text" value={booking} onChange={(e)=>{setBooking(e.target.value)}}/><br/>
                <label>amount</label>
                <input type="text" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/><br/><br/>
                <input type="submit" placeholder="pay"/>
            </form>
        </div>
    )
}