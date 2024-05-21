import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import Swal from 'sweetalert2'
export default function Otp(){
    const navigate=useNavigate()
    const [otp,setOtp]=useState()
    const loginPop=()=>{
      Swal.fire({
        title: "Otp varified",
        text: "Please Login",
        icon: "success"
      })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
       const  formData={
        otp:otp,
        email:localStorage.getItem("email")
       }
      try{
        const response=await axios.put("http://localhost:3045/api/verify/emails",formData)
        // alert(response.data)
        loginPop()
        navigate("/login")
      }catch(err){
        console.log(err)
      }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ paddingTop: '60px' }}>
           <form onSubmit={handleSubmit} className="mt-4">
    <div className="form-group">
        <label htmlFor="otp">Enter Your OTP</label>
        <input 
            type="number" 
            className="form-control" 
            id="otp" 
            value={otp} 
            onChange={(e) => { setOtp(e.target.value) }} 
            placeholder="Enter OTP"
            required 
        />
    </div>
    <button type="submit" className="btn btn-primary text-center">Verify</button>
</form>

        </Container>
    )
}