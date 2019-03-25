import Geocoder from 'react-native-geocoder';
import Config from 'react-native-config';

export const getAddress = async ({ latitude, longitude }) => {
  try {
    Geocoder.fallbackToGoogle(Config.GOOGLE_API_KEY);
    const res = await Geocoder.geocodePosition({ lat: Number(latitude), lng: Number(longitude) });
    return res[0].formattedAddress;
  }
  catch(err) {
    return 'Failed to fetch address';
  }
};
