import{createStore,combineReducers,applyMiddleware} from"redux"
import {thunk}from "redux-thunk"
import customerReducer from "../reducers/customersReducer"
const configurStore=()=>{
    const store=createStore(combineReducers({
        customer:customerReducer
    }),applyMiddleware(thunk))
    return store
}
export default configurStore