const initialState={
    currentUser:"null",
    loading:false
}

const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser:action.payload
            }
        case "SET_LOADING":
            return{
                ...state,
                loading:action.payload
            }
        case "EMPTY_USER":
            return initialState
        default:
            return state
    }
}

export default userReducer;