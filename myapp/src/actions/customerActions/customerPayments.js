import axios from"axios"
export const GET_PAYMENTS="GET_PAYMENTS"
export const startGetPayments=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get("http://localhost:3045/api/payment/list",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
        dispatch(getPayments(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
const getPayments=(data)=>{
    return{
        type:GET_PAYMENTS,
        payload:data
    }
}