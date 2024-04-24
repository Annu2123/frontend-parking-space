import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import Admin from "../admin-dashborad/admin"
import Customer from "./customer"
import OwnerMain from "../OwnerDashboard/myAccount"
import { useNavigate } from "react-router-dom"
export default function UserCantroll(){
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const [role,setRole]=useState(null)
    useEffect(()=>{
        try{
            const {role}=jwtDecode(token)
            if(role ==='admin' || role==='owner' || role==='customer'){
                setRole(role)
            }else{
                console.log("role is invalide please check again login detils")
            }
        }catch(err){
            console.log("something went wrong")
        }
    },[token])
    return (
        <>
           {role ==='admin' ? (
            <Admin/> 
           ): null}
           {role === 'owner' ? (
            <OwnerMain/>
           ): null}
           {role === "customer" ? (
            navigate("/")
           ):null}
        </>
    )
}