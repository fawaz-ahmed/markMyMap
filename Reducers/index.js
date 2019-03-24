import { combineReducers } from 'redux';
import { SAVE_MARKER, DELETE_MARKER } from '../Actions';

const markers = (state = {}, action) => {
  switch(action.type) {
    case SAVE_MARKER:
      return {
        ...state,
        [action.marker.uuid]: action.marker,
      };
    case DELETE_MARKER:
      delete state[action.uuid];
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
