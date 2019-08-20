import {
    GET_BUOYS,
    BUOY_ERROR
}from '../actions/types';


const initialState = {
    buoys: [],
    buoy: null,
    loading: true,
    error: {}
}

export default function (state=initialState,action){
    const { type,payload} = action;
    switch(type){
        case GET_BUOYS:
            return{
                ...state,
                buoys: payload,
                loading: false
            };
        case BUOY_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state
    }
}