const initialState={
    spaceBookings:[],
    parkingSpace:[],
    bookingsRequest:[]
}
const ownersReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_SPACE_BOOKINGS":{
             return {...state,spaceBookings:action.payload}
        }
        case "SET_BOOKING_REQUEST":{
            return {...state,bookingsRequest:action.payload}
        }
        case "SET_APPROVE":{
            return {...state,bookingsRequest:state.bookingsRequest.filter(ele=>ele._id!==action.payload._id)
            }
        }
        case "SET_BOOKING_REJECT":{
            return {...state,bookingsRequest:state.bookingsRequest.filter((ele)=>{
                if(ele._id != action.payload._id){
                    return ele
                }
            })}
        }
        case "SET_PARKING_SPACE":{
            return {...state,parkingSpace:action.payload}
        }
        case "SET_PARKING_ADD":{
            return {...state,parkingSpace:[...state.parkingSpace,action.payload]}
        }
        case "SET_REMOVE_PARKINGSPACE":{
            return {...state,parkingSpace:state.parkingSpace.filter((ele)=>{
                 if(ele._id != action.payload._id ){
                    return ele
                 }
            })}
        }
        case "SET_ACTIVE_OR_DISABLE":{
            return {...state,parkingSpace:state.parkingSpace.map((ele)=>{
                if(ele._id === action.payload._id){
                    return action.payload
                }else{
                    return ele
                }
            })}
        }
        default :{
            return state
        }
    }
}
export default ownersReducers