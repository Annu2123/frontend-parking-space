import axios from"axios"
export const GET_BOOKINGS="GET_BOOKINGS"
export const SET_NEW_BOOKING="SET_NEW_BOOKING"
export const REMOVE_BOOKING="REMOVE_BOOKING"
export const startGetBookings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get("http://localhost:3045/api/bookings/list",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            dispatch(GetBookings(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startParkingSpaceBooking=(id, parkingType,formData,popUp,navigate)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.post(`http://localhost:3045/api/booking/${id}/spaceTypes/${parkingType}`,formData, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            console.log("booo",response.data)
            dispatch(setSpaceBooking(response.data))
            dispatch(setServerError({}))
            popUp()
            navigate("/bookings")
        } catch (err) {
            console.log(err)
            dispatch(setServerError(err.response.data.errors))
        }
    }
}
export const startRemoveBooking=(id)=>{
    console.log(id,'sociod')
    return{
        type:REMOVE_BOOKING,
        payload:id
    }
}

export const startPaymentStatusSuccess=(id,navigate)=>{
    return async(dispatch)=>{
        try{
         const response=await axios.put(`http://localhost:3045/api/booking/payment/update/${id}`)
         console.log(response.data)
         dispatch(setPaymentSuccess(response.data))
         navigate("/bookings")
        }catch(err){
            console.log(err)
        }
    }
}
const setPaymentSuccess=(data)=>{
    return {
        type:"SET_PAYMENT_SUCCESS",
        payload:data
    }
}
const setServerError=(data)=>{
    return {
        type:"SET_SERVER_ERROR",
        payload:data
    }
}

const setSpaceBooking=(data)=>{
    return {
        type:SET_NEW_BOOKING,
        payload:data
    }
}
const GetBookings=(data)=>{
    return{
        type:GET_BOOKINGS,
        payload:data
    }
}