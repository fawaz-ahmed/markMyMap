import Config from 'react-native-config';
const baseUrl = Config.BASE_URL;
const markersUrl = `${baseUrl}/markers`;
const markerUrl = `${baseUrl}/marker`;

const actions = {
  SAVE_MARKER: 'SAVE_MARKER',
  CREATE_MARKER: 'CREATE_MARKER',
  UPDATE_MARKER: 'UPDATE_MARKER',
  DELETE_MARKER: 'DELETE_MARKER',
  GET_ALL_MARKERS: 'GET_ALL_MARKERS',
  SAVE_ALL_MARKERS: 'SAVE_ALL_MARKERS',
  saveMarker: (marker) => ({
    type: actions.SAVE_MARKER,
    marker,
  }),
  deleteMarker: (uuid) => ({
    type: actions.DELETE_MARKER,
    payload: uuid,
    meta: {
      offline: {
        effect: {
          url: `${markerUrl}/${uuid}`,
          method: 'DELETE',
        },
      }
    }
  }),
  getAllMarkers: () => ({
    type: actions.GET_ALL_MARKERS,
    meta: {
      offline: {
        effect: {
          url: markersUrl,
          method: 'GET',
        },
        commit: { type: actions.SAVE_ALL_MARKERS },
      }
    }
  }),
  createMarker: (marker) => ({
    type: actions.CREATE_MARKER,
    payload: marker,
    meta: {
      offline: {
        effect: {
          url: markerUrl,
          method: 'POST',
          json: marker,
        },
      }
    }
  }),
  updateMarker: (marker) => ({
    type: actions.UPDATE_MARKER,
    payload: marker,
    meta: {
      offline: {
        effect: {
          url: `${markerUrl}/${marker.uuid}`,
          method: 'PUT',
          json: marker,
        },
      }
    }
  }),
};

module.exports = actions;
