import axios from 'axios'
export const startGetAllParkingSpace=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3045/api/parkingSpace',{
                headers:{
                    Authorization:localStorage.getItem('token')}
            })
            console.log("admine",response.data)
            dispatch(setParkingSpaces(response.data)) 
        }catch(err){
            console.log(err)
        }        
    }
}
const setParkingSpaces=(data)=>{
    return {
        type:"SET_ALL_PARKINGS",
        payload:data
    }
}