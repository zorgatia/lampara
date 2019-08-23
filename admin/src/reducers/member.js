import {
  GET_MEMBERS,
  MEMBER_ERROR,
  ADD_MEMBER,
  DEL_MEMBER
} from "../actions/types";

const initialState = {
  members: [],
  member: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    
    case ADD_MEMBER:
    case GET_MEMBERS:
      return {
        ...state,
        members: payload,
        loading: false
      };
    case DEL_MEMBER:
        return {
            ...state,
            members: state.members.filter(member=>member._id !== payload),
            loading:false
        }

    case MEMBER_ERROR:
      return {
        ...state,
        members: null,
        loading: false
      };

    default:
      return state;
  }
}
