import { CREATE_VEHICLE,REMOVE_VEHICLE,GET_VEHICLES} from "../actions/customerActions/customerVehicle"
import { GET_CUSTOMER } from "../actions/customerActions/customerProfile"
import { GET_BOOKINGS } from "../actions/customerActions/customerBookings"
import { SET_NEW_BOOKING } from "../actions/customerActions/customerBookings"
import bookings from "../components/payments/bookings"
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
            return{
                ...state,account:action.payload
            }
        case GET_BOOKINGS:
            return{
                ...state,bookings:action.payload
            }
        case SET_NEW_BOOKING:{
            return {...state,bookings:[...state.bookings,action.payload]}
        }
            default:{
                return state
            }
    }
    
}