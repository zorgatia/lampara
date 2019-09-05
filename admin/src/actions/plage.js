import axios from "axios";


import {
  PLAGE_ERROR,
  GET_PLAGES,
  GET_PLAGE,
  SET_PLAGE,
  ADD_PLAGE,
  LOAD_PLAGE
} from "./types";

//get plages
export const getPlages = () => async dispatch => {
  try {
    const res = await axios.get("/web/plage");

    dispatch({
      type: GET_PLAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getPlage = id => async dispatch => {
  try {
    
    const res = await axios.get(`/web/plage/${id}`);
    dispatch({
      type: GET_PLAGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updatePlage = () => async dispatch => {
  try {
    //const res = await axios.get('/web/plage');

    dispatch({
      type: SET_PLAGE
      //  payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPlage = ({ nom, ville, region, mainImage, images,lat,lng, detail }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };
    const body = JSON.stringify({ nom, ville, region, mainImage, images,lat,lng, detail });
    const res = await axios.post("/web/plage", body, config);
    console.log(res.data)  
    dispatch({
      type: ADD_PLAGE,
      payload: res.data
    });
    return true;
  } catch (err) {
    dispatch({
      type: PLAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const loadPlage = () => async dispatch => {
    
  try {
    dispatch({
        type: LOAD_PLAGE
      });
    } catch (err) {
      dispatch({
        type: PLAGE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
}
