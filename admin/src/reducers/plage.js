import {
    GET_PLAGE,
    PLAGE_ERROR
}from '../actions/types'


const initialState = {
    plages: [],
    plage: null,
    loading: true,
    error: {}
}

export default function (state=initialState,action){
    const { type,payload} = action;
    switch(type){
        case GET_PLAGE:
            return{
                ...state,
                plages: payload,
                loading: false
            };
        case PLAGE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state
    }
}