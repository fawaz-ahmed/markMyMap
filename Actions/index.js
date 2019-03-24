const actions = {
  ADD_UPDATE_MARKER: 'ADD_UPDATE_MARKER',
  SAVE_MARKER: 'SAVE_MARKER',
  CREATE_MARKER: 'CREATE_MARKER',
  UPDATE_MARKER: 'UPDATE_MARKER',
  DELETE_MARKER: 'DELETE_MARKER',
  GET_ALL_MARKERS: 'GET_ALL_MARKERS',
  SAVE_ALL_MARKERS: 'SAVE_ALL_MARKERS',
  addOrUpdateMarker: (marker) => ({
    type: actions.ADD_UPDATE_MARKER,
    marker,
  }),
  deleteMarker: (uuid) => ({
    type: actions.DELETE_MARKER,
    uuid,
  }),
  getAllMarkers: () => ({
    type: actions.GET_ALL_MARKERS,
  }),
};

module.exports = actions;
