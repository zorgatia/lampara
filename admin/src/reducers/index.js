import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import profile from './profile'
import plage from './plage';
import buoy from './buoy'
export default combineReducers({
    alert,
    auth,
    profile,
    plage,
    buoy
});
