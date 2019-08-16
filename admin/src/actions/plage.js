import axios from 'axios';
import {setAlert} from './alert';
import {
    PLAGE_ERROR,
    GET_PLAGE
}from './types';


//get plages
export const getPlages = () => async dispatch => {
    try{
        const res = await axios.get('/web/plage');

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
