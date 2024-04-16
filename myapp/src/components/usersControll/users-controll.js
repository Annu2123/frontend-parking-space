import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import Owner from "./owner"
import Admin from "./admin"
import Customer from "./customer"
// import Customer from "./customer"
export default function UserCantroll(){
    const token=localStorage.getItem('token')
    const [role,setRole]=useState(null)
    console.log("assas",role)
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
            <Owner/>
           ): null}
           {role === "customer" ? (
            <Customer/>
           ):null}
        </>
    )
}