import axios from 'axios';

import {
    GET_BUOYS,
    SET_BUOY,
    REMOVE_BUOY,
    ADD_BUOY,
    BUOY_ERROR,
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

export const setBuoy =(buoy) => async dispatch => {
    try {
        dispatch({
            type:SET_BUOY,
            payload:buoy
        })
    } catch (err) {
        dispatch({
            type: BUOY_ERROR,
            //payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const removeBuoy = () => async dispatch => {
    dispatch({
        type:REMOVE_BUOY
    })
}

export const addBuoy = (idPlage,num) => async dispatch => {
    try {
        const config = {
            headers: {
              "Content-Type": "Application/json"
            }
          }; console.log('dis1')
          const body = JSON.stringify({num});
          const res = await axios.post(`/web/buoy/${idPlage}`, body, config);
          
          console.log(res)
          dispatch({
            type: ADD_BUOY,
            payload: res.data
          });
          console.log('dis3')
    } catch (err) {

        dispatch({
            type: BUOY_ERROR,
            payload: err
        })
    }
}