import { CREATE_VEHICLE,REMOVE_VEHICLE,GET_VEHICLES} from "../actions/customerActions/customerVehicle"
import { GET_CUSTOMER } from "../actions/customerActions/customerActions"
const initialState={
    account:{},
    vehicles:[],
    bookings:[]
}
export default function customerReducer(state=initialState,action){
    switch(action.type){
        case GET_VEHICLES:
            return {...state,vehicles:[...action.payload]}
        case REMOVE_VEHICLE:
            console.log(action.payload,'reee')
            return{
                ...state,vehicles:state.vehicles.filter((ele)=>{
                    return ele._id!=action.payload._id
                })
            }
        case CREATE_VEHICLE:
            return{
                ...state,vehicles:[...state.vehicles,action.payload]
            }
        case GET_CUSTOMER:
            console.log(action.payload,'cuu')
            return{
                ...state,account:action.payload
            }

    }
    return state
}