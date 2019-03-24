import {all, takeLatest, call, put, delay} from 'redux-saga/effects';
import Geocoder from 'react-native-geocoder';
import UUIDGenerator from 'react-native-uuid-generator';
import Config from 'react-native-config';
import {
  ADD_UPDATE_MARKER,
  SAVE_MARKER,
  CREATE_MARKER,
  UPDATE_MARKER,
  DELETE_MARKER,
  GET_ALL_MARKERS,
  SAVE_ALL_MARKERS,
} from '../Actions';
import { createBackendServer } from '../Services/Api';

const api = createBackendServer();

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

function* deleteMarker({ uuid }) {
  const response = yield call(api.deleteMarker, uuid);
  // console.log('response', response);

  if (!response.ok) {
    // console.log('unable to del marker');
    // save data for offline sync later on
  }
}

function* updateMarker({ marker }) {
  const response = yield call(api.updateMarker, marker.uuid, marker);
  // console.log('response', response);

  if (!response.ok) {
    // console.log('unable to save marker');
    // save data for offline sync later on
  }
}

function* createMarker({ marker }) {
  const response = yield call(api.createMarker, marker);
  // console.log('response', response);

  if (!response.ok) {
    // console.log('unable to save marker');
    // save data for offline sync later on
  }
}

function* fetchAllMarkers() {
  const response = yield call(api.getAllMarkers);
  console.log('response', response);

  if (response.ok) {
    const markers = response.data || {};
    yield put({ type: SAVE_ALL_MARKERS, markers });
  }
}

function* addOrUpdateMarker({ marker }) {
  // decide whether this marker needs to be created or updated
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
    takeLatest(DELETE_MARKER, deleteMarker),
    takeLatest(GET_ALL_MARKERS, fetchAllMarkers),
  ]);
}