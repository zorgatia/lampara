import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    SET_PROFILE,
    PASSWORD_CHANGED
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

export const updateCurrentProfile = ({username,dateNaissance,nom,prenom,region,cite,zip,adress}) => async dispatch =>{
    try {

        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        const body = JSON.stringify({username,dateNaissance,nom,prenom,region,cite,zip,adress});
        const res = await axios.put('/web/user/profile', body, config);
        dispatch({
            type: SET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status:err.response.status}
        });
    }
}

export const changePassword= ({oldPassword,newPassword})=>async dispatch =>{
    try {
        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        };
        const body = JSON.stringify({oldPassword,newPassword});
        const res = await axios.post('/web/user/changepassword', body, config);
        dispatch({
            type: PASSWORD_CHANGED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.data, status:err.response.status}
        });
    }
}
