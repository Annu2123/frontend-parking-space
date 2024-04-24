import axios from 'axios'
export const startGetBookings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3045/api/myParkingSpace/booking',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
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
            dispatch(setParking(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startAddParkingSpace=(formData,resetForm,navigate)=>{
    return async(dispatch)=>{
        try {
            const response = await axios.post('http://localhost:3045/api/parkingSpace/Register', formData, {
              headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
              }
            })
           dispatch( setParkingAdd(response.data))
           resetForm()
           navigate('/myspace')
          } catch (err) {
            console.log(err)
          } 
    }
}

const setParkingAdd=(data)=>{
    return {
        type:"SET_PARKING_ADD",
        payload:data
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
