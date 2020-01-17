import { LOG_FAIL, SEND_LOG, GET_LOGS, LOG_ERROR } from "../types";


export default (state, action) => {
  switch(action.type){
    case SEND_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        loading: false
      }
    case LOG_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      }
    case LOG_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}