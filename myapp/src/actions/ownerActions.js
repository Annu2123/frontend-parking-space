import axios from 'axios'
export const startGetBookings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3045/api/myParkingSpace/booking',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log("booking",response.data)
            dispatch(setBooking(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startApproveBooking=(id)=>{
    return async(dispatch)=>{
        try{
            const response =await axios.put(`http://localhost:3045/api/approve/booking/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setApprove(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startGetParkingSpace=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3045/api/parkingSpace/my',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log('sdads',response.data)
            dispatch(setParking(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
const setParking=(data)=>{
    return {
        type:"SET_PARKING_SPACE",
        payload:data
    }
}
const setBooking=(data)=>{
    return {
        type:"SET_BOOKINGS",payload:data
    }
}
const setApprove=(data)=>{
    return {
        type:"SET_APPROVE",payload:data
    }
}