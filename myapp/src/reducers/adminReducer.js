const initialState={
    ownersAllParkings:[],
    allCustomer:[],
    allOwners:[],
    bookings:[],
    spaceApprovalList:[]
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
        case "SET_APPROVAL_LIST":{
            return {...state,spaceApprovalList:action.payload}
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
        default:{
            return state
        }
    }
}
export default adminReducers