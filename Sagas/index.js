import {all, takeLatest, call, put, delay} from 'redux-saga/effects';
import Geocoder from 'react-native-geocoder';
import UUIDGenerator from 'react-native-uuid-generator';
import Config from 'react-native-config';
import {
  ADD_UPDATE_MARKER,
  SAVE_MARKER,
  CREATE_MARKER,
  CREATE_MARKER_REQUEST,
  UPDATE_MARKER,
  UPDATE_MARKER_REQUEST,
} from '../Actions';

function* getAddress({ latitude, longitude }) {
  try {
    yield call(Geocoder.fallbackToGoogle, Config.GOOGLE_API_KEY);
    const res = yield call(Geocoder.geocodePosition, {
      lat: latitude,
      lng: longitude,
    });
    return res[0].formattedAddress;
  }
  catch(err) {
    return 'Failed to fetch address';
  }
}

function* updateMarker({ marker }) {

}

function* createMarker({ marker }) {

}

function* addOrUpdateMarker({ marker }) {
  const hasUuid = !!marker.uuid;

  if (!hasUuid) {
    marker.uuid = yield call(UUIDGenerator.getRandomUUID);
  }

  yield put({ type: SAVE_MARKER, marker });
  yield delay(100); // update marker instantly

  // get or update marker's address
  marker.address = yield call(getAddress, marker);
  yield put({ type: SAVE_MARKER, marker });

  if(hasUuid) {
    yield put({ type: UPDATE_MARKER, marker });
  } else {
    yield put({ type: CREATE_MARKER, marker });
  }
}

export default function* root() {
  yield all([
    takeLatest(ADD_UPDATE_MARKER, addOrUpdateMarker),
    takeLatest(CREATE_MARKER, createMarker),
    takeLatest(UPDATE_MARKER, updateMarker),
  ]);
}