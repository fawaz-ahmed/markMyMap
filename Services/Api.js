import apisauce from 'apisauce';
import Config from 'react-native-config';

export const createBackendServer = (baseURL = Config.BASE_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 0,
  });

  if (__DEV__) {
    api.addMonitor(response => {
      console.log('api response', response);
    });
  }

  const createMarker = (body) => api.post('/marker', body);
  const updateMarker = (uuid, body) => api.put(`/marker/${uuid}`, body);
  const deleteMarker = (uuid) => api.delete(`/marker/${uuid}`);
  const getAllMarkers = () => api.get('/markers');

  return {
    createMarker,
    updateMarker,
    deleteMarker,
    getAllMarkers,
  };
};

export const problems = {
  NONE: null,
  CLIENT_ERROR: 'CLIENT_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  CANCEL_ERROR: 'CANCEL_ERROR',
};
