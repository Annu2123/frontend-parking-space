const initialState={
    ownersAllParkings:[]
}
const adminReducers=(state=initialState,action)=>{
    switch(action.type){
        case "SET_ALL_PARKINGS":{
            return {...state,ownersAllParkings:action.payload}
        }
        default:{
            return state
        }
    }
}
export default adminReducers