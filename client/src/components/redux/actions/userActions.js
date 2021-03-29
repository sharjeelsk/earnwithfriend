export const setCurrentUser=(user)=>{
    return {
        type:"SET_CURRENT_USER",
        payload:user
    }
}

export const setLoading=(loading)=>{
    return{
        type:"SET_LOADING",
        payload:loading
    }
}

export const setCurrentUserNull = ()=>{
    return{
        type:"EMPTY_USER"
    }
}

