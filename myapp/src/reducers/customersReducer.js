import { CREATE_VEHICLE, REMOVE_VEHICLE, GET_VEHICLES, UPDATE_VEHICLE } from "../actions/customerActions/customerVehicle"
import { GET_CUSTOMER } from "../actions/customerActions/customerProfile"
import { GET_BOOKINGS,SET_NEW_BOOKING,REMOVE_BOOKING } from "../actions/customerActions/customerBookings"
import { GET_CART,CREATE_SPACECART ,REMOVE_SPACECART} from "../actions/customerActions/customerSpaceCart"
import bookings from "../components/payments/bookings"
const initialState = {
    account: {},
    vehicles: [],
    bookings: [],
    cart: []
}
export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VEHICLES:
            return { ...state, vehicles: [...action.payload] }
        case REMOVE_VEHICLE:
            return {
                ...state, vehicles: state.vehicles.filter((ele) => {
                    return ele._id != action.payload._id
                })
            }
        case CREATE_VEHICLE:
            return {
                ...state, vehicles: [...state.vehicles, action.payload]
            }
        case UPDATE_VEHICLE:
            return {
                ...state, vehicles: state.vehicles.map((ele) => {
                    if (ele._id == action.payload._id) {
                        return action.payload
                    } else {
                        return ele
                    }
                })
            }
        case GET_CUSTOMER:
            return {
                ...state, account: action.payload
            }
        case GET_BOOKINGS:
            return {
                ...state, bookings: action.payload
            }
        
        case SET_NEW_BOOKING: {
            return { ...state, bookings: [...state.bookings, action.payload] }
        }
        case REMOVE_BOOKING:{
            return {...state,bookings:state.bookings.filter((ele)=>{
                return ele._id!=action.payload.id
            })}
        }
        case CREATE_SPACECART:{
            console.log(action.payload,'pppppp')
            return {...state,cart:[...state.cart,action.payload]}
        }
        case GET_CART:{
            return{...state,cart:action.payload}
        }
        case REMOVE_SPACECART:{
            return{...state,cart:state.cart.filter((ele)=>{
                return ele._id!=action.payload._id
            })}
        }
        case "SET_SERVER_ERROR":{
            return {...state,serverError:action.payload}
        }
        case "SET_PAYMENT_SUCCESS":{
            return {...state,bookings:state.bookings.map((ele)=>{
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