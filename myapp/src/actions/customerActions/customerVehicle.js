import axios from "axios"
 export const CREATE_VEHICLE = 'CREATE_VEHICLE';
 export const GET_VEHICLES = 'GET_VEHICLES';
 export const REMOVE_VEHICLE = 'REMOVE_VEHICLE';
 export const UPDATE_VEHICLE="UPDATE_VEHICLE"
export const startCreateVehicle=(formData,resetForm,navigate)=>{
return async(dispatch)=>{
 try{
  const result=await axios.post("http://localhost:3045/API/vehicle/register",formData,{
    headers:{
      Authorization:localStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    }
  })
  dispatch(createVehicle(result.data))
  resetForm()
  navigate(`/VEHICLEDETAILS/${result.data._id}`)
 }catch(err){
  console.log(err)
 }
}
}
export const startgetVehicles=()=>{
    return async(dispatch)=>{
            try{
              const response=await axios.get("http://localhost:3045/API/vehicles/list",{
                headers:{
                  Authorization:localStorage.getItem("token"),
                }
              }) 
              dispatch(getVehicles(response.data))
            }catch(err){
              console.log(err)
            }
    }
}
export const startRemoveVehicle=(id,navigate)=>{
  return async(dispatch)=>{
      try{
        const response =await axios.delete(`http://localhost:3045/API/vehicles/remove/${id}`,{
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })
        dispatch(removeVehicle(response.data))
        alert("removed successfuly")
        navigate("/vehicles")
      }catch(err){
        console.log(err)
      }
    }
    }
export const startUpdateVehicle=(id,formData,resetForm,navigate)=>{
  return async(dispatch)=>{
     try{
      const response=await axios.put(`http://localhost:3045/API/vehicles/update/${id}`,formData,{
        headers:{
          Authorization:localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(updateVehicle(response.data))
      navigate("/vehicles")
     }catch(err){
      console.log(err)
     }
  }
}
const createVehicle=(data)=>{
  return{
    type:CREATE_VEHICLE,
    payload:data
  }
}
const getVehicles=(data)=>{
    return{
        type:GET_VEHICLES,
        payload:data
    }
}
const removeVehicle=(data)=>{
  return{
    type:REMOVE_VEHICLE,
    payload:data
  }
}
const updateVehicle=(data)=>{
  return{
    type:UPDATE_VEHICLE,
    payload:data
  }
}