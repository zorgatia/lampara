import { GET_BUOYS, BUOY_ERROR, ADD_BUOY, SET_BUOY, REMOVE_BUOY } from "../actions/types";

const initialState = {
  buoys: [],
  buoy: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BUOYS:
      return {
        ...state,
        buoys: payload,
        loading: false
      };

    case SET_BUOY:
      return {
        ...state,
        buoy: payload
      }
    case REMOVE_BUOY:
      return {
        ...state,
        buoy: null
      }
    case BUOY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
