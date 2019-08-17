import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_ERROR
}from './types';

// getcurrent users profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/web/user/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

