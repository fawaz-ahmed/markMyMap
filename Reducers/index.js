import { combineReducers } from 'redux';
import {
  SAVE_MARKER,
  DELETE_MARKER,
  SAVE_ALL_MARKERS,
  CREATE_MARKER,
  UPDATE_MARKER,
} from '../Actions';

const markers = (state = {}, action) => {
  switch(action.type) {
    case SAVE_MARKER:
      return {
        ...state,
        [action.marker.uuid]: action.marker,
      };
    case CREATE_MARKER:
      return {
        ...state,
        [action.payload.uuid]: action.payload,
      };
    case UPDATE_MARKER:
      return {
        ...state,
        [action.payload.uuid]: action.payload,
      };
    case CREATE_MARKER:
      return {
        ...state,
        [action.payload.uuid]: action.payload,
      };
    case SAVE_ALL_MARKERS:
      return action.payload;
    case DELETE_MARKER:
      delete state[action.payload];
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default combineReducers({
  markers,
});
