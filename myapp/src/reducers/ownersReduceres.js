const initialState={
    bookings:[],
    parkingSpace:[]
}
const ownersReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_BOOKINGS":{
            return {...state,bookings:action.payload}
        }
        case "SET_APPROVE":{
            return {...state,bookings:state.bookings.map((ele)=>{
                if(ele._id == action.payload._id){
                    return action.payload
                }else{
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
        default :{
            return state
        }
    }
}
export default ownersReducers