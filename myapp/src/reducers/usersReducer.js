const initialState={
    users:{}
}
const usersReducers=(state=initialState,action)=>{
      switch(action.type){
        case "SET_USERS":{
            return {...state,users:{...action.payload}}
        }
        case "SET_USER_EMPTY":{
            return {}
        }
        default :{
            return state
        }
      }
}
export default usersReducers