const initialState={
    ownersAllParkings:[],
    allCustomer:[],
    allOwners:[],
    bookings:[]
}
const adminReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_ALL_PARKINGS":{
            return {...state,ownersAllParkings:action.payload}
        }
        case "SET_ALL_CUSTOMER":{
            return {...state,allCustomer:action.payload}
        }
        case "SET_ALL_OWNERS":{
            return {...state,allOwners:action.payload}
        }
        case "SET_ALL_BOOKINGS":{
            return {...state,bookings:action.payload}
        }
        case "SET_APPROVE_PARKING":{
            return {...state, ownersAllParkings:state. ownersAllParkings.map((ele)=>{
                if(ele._id == action.payload._id){
                    return action.payload
                }else{
                    return ele
                }
            })
        }
    }
    case "SET_OWNER_DISABLE":{
        return {...state,allOwners:state.allOwners.map((ele)=>{
            if(ele._id == action.payload._id){
                return action.payload
            }else{
                return ele
            }
        })}
    }
        default:{
            return state
        }
    }
}
export default adminReducers