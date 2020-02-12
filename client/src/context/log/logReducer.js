import { GET_LOGS, LOG_ERROR, FILTER_LOGS, CLEAR_FILTERED_LOGS } from "../types";

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
      case FILTER_LOGS:
        return {
          ...state,
          filtered: state.logs.filter(log => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return log.username.match(regex) || log.action.match(regex);
          })
        };
      case CLEAR_FILTERED_LOGS:
        return {
          ...state,
          filtered: null
        };
    default:
      return state;
  }
};
