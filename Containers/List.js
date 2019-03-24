import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles/List';
import AddButton from '../Components/AddButton';
import { routes } from '../Navigation';
import { deleteMarker } from '../Actions';

class List extends PureComponent {

  onEdit = (uuid) => {
    const { navigation: { navigate }, markers } = this.props;
    const marker = markers[uuid];
    navigate(routes.form, { ...marker });
  };

  renderItem = ({ item: uuid }) => {
    const { markers, deleteMarker } = this.props;
    const { name, latitude, longitude, address } = markers[uuid];

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.latLngText}>{address}</Text>
        <Text style={styles.latLngText}>{`Latitude : ${latitude}`}</Text>
        <Text style={styles.latLngText}>{`Longitude : ${longitude}`}</Text>
        <View style={styles.buttonscontainer}>
          <TouchableOpacity style={styles.button} onPress={() => { this.onEdit(uuid); }}>
            <Text style={styles.buttonText}>{'Edit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ styles.button, { backgroundColor: 'red', marginLeft: 10 } ]}
            onPress={() => { deleteMarker(uuid); }}
          >
            <Text style={styles.buttonText}>{'Delete'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { markers, navigation: { navigate } } = this.props;
    return (
      <Fragment>
        <FlatList
          data={Object.keys(markers)}
          renderItem={this.renderItem}
        />
        <AddButton onPress={() => {navigate(routes.form) }} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ markers }) => ({
  markers,
});

const mapDispatchToProps = {
  deleteMarker,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
