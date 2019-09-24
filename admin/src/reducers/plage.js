import {
  GET_PLAGE,
  SET_PLAGE,
  GET_PLAGES,
  PLAGE_ERROR,
  ADD_PLAGE,
  LOAD_PLAGE,
  EDIT_PLAGE,
  ADD_BUOY
} from "../actions/types";

const initialState = {
  plages: [],
  plage: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PLAGE:
      return {
        ...state,
        loading: true
      };
    case GET_PLAGE:
      return {
        ...state,
        plage: payload,
        loading: false
      };
    case GET_PLAGES:
      return {
        ...state,
        plages: payload,
        loading: false
      };
    case PLAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_BUOY:
      return {
        ...state,
        plages: state.plages.map(p => {
          if (p._id === payload._id) return payload;
          return p;
        })
      };
    case EDIT_PLAGE:
      return {
        ...state,
        plages: state.plages.map(p => {
          if (p._id === payload._id) return payload;
          return p;
        })
      };
    case ADD_PLAGE:
      return {
        ...state,
        plages: [...state.plages, payload],
        loading: false
      };
    case SET_PLAGE:
      return {
        ...state,
        plages: state.plages.map(plage =>
          plage._id === payload.id ? payload : plage
        )
      };
    default:
      return state;
  }
}
