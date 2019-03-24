import { StyleSheet } from 'react-native';
import Colors from '../Colors';

export default StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.inputTextColor,
  },
  nameText: {
    fontSize: 30,
    color: Colors.blue,
  },
  latLngText: {
    fontSize: 20,
    color: Colors.inputTextColor,
  },
  buttonscontainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
  },
});
