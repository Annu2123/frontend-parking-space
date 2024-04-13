import axios from "axios"
export const GET_CUSTOMER="GET_CUSTOMER"
export const startGetCustomer=()=>{
    return async(dispatch)=>{
       try{
        const response=await axios.get("http://localhost:3045/api/users/accounts",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        dispatch(getCustomer(response.data))
       }catch(err){
        console.log(err)
       }
    }
}
const getCustomer=(data)=>{
    console.log(data,'data')
    return{
        type:GET_CUSTOMER,
        payload:data
    }
}