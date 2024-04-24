import { useState } from "react"

export default function Otp(){
    const [otp,setOtp]=useState()
    const handleSubmit=(e)=>{
        e.preventDefault()
       const  formData={
        otp:otp,
        // email:localStorage.getItem(email)
       }
       console.log(formData)
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