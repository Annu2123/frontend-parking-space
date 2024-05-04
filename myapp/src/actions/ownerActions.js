import axios from 'axios'
export const startGetBookings=()=>{
    return async(dispatch)=>{
        try{
            const response=await axios.get('http://localhost:3045/api/myParkingSpace/booking',{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            dispatch(setSpaceBooking(response.data))
           console.log("parkingBooking",response.data)
        }catch(err){
            console.log(err)
        }
    }
}

export const startApproveBooking=(id,approvePopUP)=>{
    return async(dispatch)=>{
        try{
            const response =await axios.put(`http://localhost:3045/api/approve/booking/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log("approv",response.data)
            dispatch(setApprove(response.data))
            approvePopUP()
        }catch(err){
            console.log(err)
        }
    }
}

export const startRejectBooking=(id,RejectPopUP)=>{
     return async(dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3045/api/reject/booking/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
           dispatch(setReject(response.data)) 
           RejectPopUP()
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
            console.log("parkings",response.data)
            dispatch(setParking(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startAddParkingSpace=(formData,resetForm,navigate,popUp)=>{
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
           popUp()
           navigate('/myspace')
          } catch (err) {
            console.log(err)
            alert(err.msg)
            dispatch(setServerError(err.response.data))
          } 
    }
}

export const startRemoveParkingSpace=(id,deletePopUP)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.delete(`http://localhost:3045/api/parkingSpace/remove/${id}`,{
               headers:{
                   Authorization:localStorage.getItem('token')
               }
            })
            console.log(response.data)
            dispatch(setRemoveParkingSpace(response.data))
            deletePopUP()
           }catch(err){
               console.log(err)
           }
    }
}

export const startActiveOrDisableParkings=(id)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3045/api/parkingSpace/disable/${id}`,{},{
               headers:{
                   Authorization:localStorage.getItem('token')
               }
            })
            console.log(response.data)
            dispatch(setDisableOrActive(response.data))
           }catch(err){
               console.log(err)
           }
    }
}

const setReject=(data)=>{
    return {
        type:"SET_BOOKING_REJECT",
        payload:data
    }
}
const setDisableOrActive=(data)=>{
    return {
        type:"SET_ACTIVE_OR_DISABLE",
        payload:data
    }
}
const setServerError=(data)=>{
    return {
        type:"SET_SERVER_ERROR",
        payload:data
    }
}
const setRemoveParkingSpace=(data)=>{
    return {
        type:"SET_REMOVE_PARKINGSPACE",
        payload:data
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
const setSpaceBooking=(data)=>{
    return {
        type:"SET_SPACE_BOOKINGS",payload:data
    }
}
const setApprove=(data)=>{
    return {
        type:"SET_APPROVE",payload:data
    }
}
