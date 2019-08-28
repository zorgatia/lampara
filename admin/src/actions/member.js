import axios from "axios";
import {setAlert} from './alert'

import { GET_MEMBERS, MEMBER_ERROR, ADD_MEMBER, DEL_MEMBER } from "./types";

export const getMembers = () => async dispatch => {
  try {
    const res = await axios.get("web/user/members");

    dispatch({
      type: GET_MEMBERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MEMBER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const registerMember = ({ email, type }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json"
      }
    };
    const body = JSON.stringify({ email, type });
    const res = await axios.post("/web/user", body, config);
    dispatch({
      type: ADD_MEMBER,
      payload: res.data
    });
  } catch (err) {}
};

export const removeMember = id => async dispatch => {
  try {
    await axios.delete(`/web/user/${id}`);
    dispatch({
      type: DEL_MEMBER,
      payload: id
    });
    dispatch(
        setAlert('delete','asd')
    );
  } catch (err) {}
};
