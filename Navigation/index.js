import {
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import Map from '../Containers/Map';
import List from '../Containers/List';
import Form from '../Containers/Form';

const base = createStackNavigator({
  Map,
  List,
  Form,
}, {
  headerMode: 'none',
});

export default createAppContainer(base);

export const routes = {
  map: 'Map',
  list: 'List',
  form: 'Form',
};
