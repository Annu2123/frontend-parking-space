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

export const startGetAllCustomer=()=>{
    return async(dispatch)=>{
        try{
            const customers = await axios.get('http://localhost:3045/api/customer', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
            })
            console.log(customers.data)
            dispatch(setCustomer(customers.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startGetAllOwner=(currentPage)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3045/api/owner?page=${currentPage}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(response.data)
                dispatch(setOwners(response.data.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startGetAllBooking=()=>{
    return async(dispatch)=>{
        try{
            const bookings = await axios.get('http://localhost:3045/api/allBooking', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
              dispatch(setBookings(bookings.data))
        }catch(err){
            console.log(err)
        }
    }
}

// export const startGetAllApprovalList=()=>{
//     return async(dispatch)=>{
//         try{
//             const approvalList=await axios.get('http://localhost:3045/api/parkingSpace/approvalList',{
//                         headers:{
//                             Authorization:localStorage.getItem('token')
//                         }
//                        })
//                        console.log("list",approvalList.data)
//                        dispatch(setList(approvalList.data))
//         }catch(err){
//             console.log(err)
//         }
//     }
// }
export const startDisableOwner=(id,DisableError,disAblePopUP)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3045/api/disable/owner/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setDisableOwner(response.data))
            // disAblePopUP()
        }catch(err){
            console.log(err)
            DisableError(err.response.data.error)
        }
    }
}
export const startApproveParkings=(id,acceptedPopUp,toggle)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.put(`http://localhost:3045/api/parkingSpace/approve/${id}`,{},{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(setApprove(response.data))
            acceptedPopUp()
            toggle()
        }catch(err){
            console.log(err)
        }
    }
}
const setDisableOwner=(data)=>{
    return {
        type:"SET_OWNER_DISABLE",
        payload:data
    }
}
const setApprove=(data)=>{
    return {
        type:"SET_APPROVE_PARKING",
        payload:data
    }
}
// const setList=(data)=>{
//     return {
//         type:"SET_APPROVAL_LIST",
//         payload:data
//     }
// }

const setBookings=(data)=>{
    return{
        type:"SET_ALL_BOOKINGS",
        payload:data
    }
}
const setOwners=(data)=>{
    return {
        type:"SET_ALL_OWNERS",
        payload:data
    }
}
const setCustomer=(data)=>{
    return {
        type:"SET_ALL_CUSTOMER",
        payload:data
    }
}
const setParkingSpaces=(data)=>{
    return {
        type:"SET_ALL_PARKINGS",
        payload:data
    }
}