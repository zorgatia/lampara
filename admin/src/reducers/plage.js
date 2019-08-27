import {
  GET_PLAGE,
  SET_PLAGE,
  GET_PLAGES,
  PLAGE_ERROR,ADD_PLAGE, PLAGE_LOADING
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
      case PLAGE_LOADING:
          return{
              ...state,
              loading:true
          }
    case GET_PLAGE:
      return {
        ...state,
        plage: payload,
        plages: null,
        loading: false
      };
    case GET_PLAGES:
      return {
        ...state,
        plage: null,
        plages: payload,
        loading: false
      };
    case PLAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_PLAGE:
      return {
        ...state,
        plage: null,
        loading: false
      };
    default:
      return state;
  }
}
