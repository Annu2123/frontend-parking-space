import axios from "axios"
export const GET_RATINGS="GET_RATINGS"
export const startGetRatings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get("http://127.0.0.1:3045/api/reviews/list")
            dispatch(getRatings(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
const getRatings=(data)=>{
    return{
        type:GET_RATINGS,
        payload:data
    }
}