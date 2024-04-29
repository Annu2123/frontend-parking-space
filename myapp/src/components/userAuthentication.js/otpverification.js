import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function Otp(){
    const navigate=useNavigate()
    const [otp,setOtp]=useState()
    const handleSubmit=async(e)=>{
        e.preventDefault()
       const  formData={
        otp:otp,
        email:localStorage.getItem("email")
       }
      try{
        const response=await axios.put("http://localhost:3045/api/verify/emails",formData)
        alert(response.data)
        navigate("/login")
      }catch(err){
        console.log(err)
      }
    }
    return (
        <div style={{ paddingTop: '80px' }}>
            <form onSubmit={handleSubmit}>
             <label>enter your otp</label>
             <input type="number" value={otp} onChange={(e)=>{setOtp(e.target.value)}}/><br/>
               <input type="submit" placeholder="verify"/>
             </form>
        </div>
    )
}