import axios from 'axios';

import {
    GET_BUOYS,
    BUOY_ERROR
}from './types';


export const getBuoys = () => async dispatch => {
    try{
        const res = await axios.get('web/buoy/location');

        dispatch({
            type: GET_BUOYS,
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: BUOY_ERROR,
            //payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
