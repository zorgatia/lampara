import axios from 'axios';

import {
    PLAGE_ERROR,
    GET_PLAGES,
    GET_PLAGE,
    SET_PLAGE,
    ADD_PLAGE,
    PLAGE_LOADING

}from './types';


//get plages
export const getPlages = () => async dispatch => {
    try{
        const res = await axios.get('/web/plage');

        dispatch({
            type: GET_PLAGES,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: PLAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getCurrentPlage = (id) => async dispatch => {
    try{
        const res = await axios.get(`/web/plage/${id}`);

        dispatch({
            type: GET_PLAGE,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: PLAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addPlage = () => async dispatch => {
    try{
        dispatch({
            type: ADD_PLAGE
        })

    }catch(err){
        dispatch({
            type: PLAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
export const updateCurrentPlage = () => async dispatch => {
    try{
        const res = await axios.get('/web/plage');

        dispatch({
            type: SET_PLAGE,
          //  payload: res.data
        })

    }catch(err){
        dispatch({
            type: PLAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
export const loadPlage = () => async dispatch=>{
    try {
        dispatch({
            type: PLAGE_LOADING,
          //  payload: res.data
        })
    }catch(err){
        dispatch({
            type: PLAGE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}