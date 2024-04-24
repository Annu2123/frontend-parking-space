import{createStore,combineReducers,applyMiddleware} from"redux"
import {thunk}from "redux-thunk"
import customerReducer from "../reducers/customersReducer"
import ownersReducers from "../reducers/ownersReduceres"
import usersReducers from "../reducers/usersReducer"
import adminReducers from "../reducers/adminReducer"
const configurStore=()=>{
    const store=createStore(combineReducers({
        users:usersReducers,
        customer:customerReducer,
        owners:ownersReducers,
        admin:adminReducers
    }),applyMiddleware(thunk))
    return store
}
export default configurStore