const actions = {
  SAVE_MARKER: 'SAVE_MARKER',
  ADD_UPDATE_MARKER: 'ADD_UPDATE_MARKER',
  CREATE_MARKER: 'CREATE_MARKER',
  CREATE_MARKER_REQUEST: 'CREATE_MARKER_REQUEST',
  UPDATE_MARKER: 'UPDATE_MARKER',
  UPDATE_MARKER_REQUEST: 'UPDATE_MARKER_REQUEST',
  DELETE_MARKER: 'DELETE_MARKER',
  saveMarker: (marker) => ({
    type: actions.SAVE_MARKER,
    marker,
  }),
  addOrUpdateMarker: (marker) => ({
    type: actions.ADD_UPDATE_MARKER,
    marker,
  }),
  // createMarker: (marker) => ({
  //   type: actions.ADD_MARKER,
  //   marker,
  //   // meta: {
  //   //   offline: {
  //   //     effect: { url: '/api/follow', method: 'POST', json: { userId } },
  //   //     commit: { type: 'FOLLOW_USER_COMMIT', meta: { userId } },
  //   //     rollback: { type: 'FOLLOW_USER_ROLLBACK', meta: { userId } }
  //   //   }
  //   // }
  // }),
  // editMarker: (marker) => ({
  //   type: actions.EDIT_MARKER,
  //   marker,
  // }),
  deleteMarker: (uuid) => ({
    type: actions.DELETE_MARKER,
    uuid,
  }),
};

module.exports = actions;
