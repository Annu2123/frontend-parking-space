import axios from "axios";
export const startGetUserDetail=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3045/api/users/accounts',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log("users",response.data)
            dispatch(setUser(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
export const startSetUser=()=>{
    return (dispatch)=>{
        dispatch(setUserEmpty())
    }
}
const setUserEmpty=()=>{
    return {
        type:"SET_USER_EMPTY",
       
    }
}
const setUser=(data)=>{
    return {
        type:"SET_USERS",
        payload:data
    }
}