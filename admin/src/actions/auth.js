import axios from "axios";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from "./types";
import setAuthToken from '../utils/setAuthToken';


//load user
export const loadUser = () => async dispatch =>{

    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res= await axios.get('/web/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register user
export const register = ({ username, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "Application/json"
        }
    };

    const body = JSON.stringify({ username, email, password });

    try {
        const res = await axios.post("/web/user", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "Application/json"
        }
    };
    

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/web/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//logout 
export const logout = () =>dispatch => {
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE});
}
