import React, { PureComponent } from 'react';
// import {Text, View} from 'react-native';
import MapView from 'react-native-maps';
import styles from '../Styles/Map';

export default class Map extends PureComponent {
  render() {
    return (
      <MapView
        // ref={ref => { this.state.mapRef = ref; }}
        loadingEnabled
        // onRegionChange={() => { this.setState({ isChangingLocation: true }); }}
        // onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.container}
        initialRegion={{
          latitude: 52.520008,
          longitude: 13.404954,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        }}
        // showsCompass={false}
      />
    );
  }
}
