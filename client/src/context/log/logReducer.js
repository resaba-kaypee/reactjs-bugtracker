import { GET_LOGS, LOG_ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case LOG_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
