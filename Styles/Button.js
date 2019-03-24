import { StyleSheet } from 'react-native';
import Colors from '../Colors';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    right: 23,
  },
  listContainer: {
    position: 'absolute',
    bottom: 92,
    right: 23,
  },
  buttonContainer: {
    width: 47,
    height: 47,
    borderRadius: 23.5,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 3,
  },
  buttonText: {
    fontSize: 30,
    color: Colors.white,
  },
});
