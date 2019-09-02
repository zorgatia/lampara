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

export const addPlage = () => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };
    const body = JSON.stringify({});
    const res = await axios.post("/web/plage", body, config);
    dispatch({
      type: ADD_PLAGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PLAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const loadPlage = () => async dispatch => {
    dispatch({
        type: LOAD_PLAGE
      });
}
