import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import styles from '../Styles/Map';
import AddButton from '../Components/AddButton';
import ListButton from '../Components/ListButton';
import { routes } from '../Navigation';

class Map extends PureComponent {

  state = {
    mapReady: false,
  };

  getMarkers = () => {
    const { markers } = this.props;
    const uuids = Object.keys(markers);

    return uuids.map(uuid => {
      const { latitude, longitude, name: title, address: description } = markers[uuid];
      return {
        key: `${uuid}`,
        title,
        latitude,
        longitude,
        description,
      };
    });
  };

  updateMap = () => {
    const markers = this.getMarkers();
    if (!this.map || !markers.length || !this.state.mapReady) return;

    this.map.fitToElements(true);
    // this.map.fitToCoordinates(
    //   markers,
    //   {
    //     edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
    //     animated: true,
    //   }
    // );
  };

  onMapLayout = () => {
    this.setState({ mapReady: true }, this.updateMap);
  }

  componentDidUpdate() {
    setImmediate(this.updateMap);
  }

  render() {
    const { navigation: { navigate } } = this.props;
    const markers = this.getMarkers();

    return (
      <Fragment>
        <MapView
          ref={ref => { this.map = ref; }}
          loadingEnabled
          style={styles.container}
          onLayout={this.onMapLayout}
        >
          {markers.map(marker => <Marker {...marker} coordinate={{ ...marker }} />)}
        </MapView>
        <ListButton onPress={() => {navigate(routes.list) }} />
        <AddButton onPress={() => {navigate(routes.form) }} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ markers }) => ({
  markers,
});

export default withNavigationFocus(connect(mapStateToProps)(Map));
