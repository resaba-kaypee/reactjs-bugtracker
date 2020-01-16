import { LOG_FAIL, LOG_SUCCESS, GET_LOGS, LOG_ERROR } from "../types";


export default (state, action) => {
  switch(action.type){
    case LOG_SUCCESS:
      return {
        ...state,
        logs: action.payload
      }
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      }
    default:
      return state;
  }
}