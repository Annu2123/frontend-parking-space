import axios from"axios"
export const GET_BOOKINGS="GET_BOOKINGS"
export const startGetBookings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get("http://localhost:3045/api/bookings/list",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            dispatch(getbookings(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
const getbookings=(data)=>{
    return{
        type:GET_BOOKINGS,
        payload:data
    }
}