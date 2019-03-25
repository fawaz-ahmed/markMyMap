import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';
import UUIDGenerator from 'react-native-uuid-generator';
import { connect } from 'react-redux';
import isLatLong from 'validator/lib/isLatLong';
import InputBox from '../Components/InputBox';
import styles from '../Styles/Form';
import { createMarker, saveMarker, updateMarker } from '../Actions';
import { routes } from '../Navigation';
import { getAddress } from '../Helpers';

class Form extends PureComponent {

  state = {
    name: this.props.navigation.getParam('name', ''),
    nameError: '',
    latitude: `${this.props.navigation.getParam('latitude', '')}`,
    latitudeError: '',
    longitude: `${this.props.navigation.getParam('longitude', '')}`,
    longitudeError: '',
  };

  onSubmit = async () => {
    const { saveMarker, createMarker, updateMarker,
      navigation: { navigate, getParam, goBack } } = this.props;
    let nameError = '', latitudeError = '', longitudeError = '';
    const name = this.state.name.trim();
    const latitude = this.state.latitude.trim();
    const longitude = this.state.longitude.trim();
    const latLng = `${latitude},${longitude}`;

    // Apply validation checks
    if (!name) {
      nameError = 'Name cannot be empty,';
    }

    if (!latitude) {
      latitudeError = 'Latitude cannot be empty.';
    } else if (isNaN(latitude)) {
      latitudeError = 'Enter a valid number.';
    } else if (!isLatLong(latLng)) {
      latitudeError = 'Invalid data. Either latitude,longitude or both are incorrect.';
    }

    if (!longitude) {
      longitudeError = 'Longitude cannot be empty.'
    }  else if (isNaN(longitude)) {
      longitudeError = 'Enter a valid number.';
    } else if (!isLatLong(latLng)) {
      longitudeError = 'Invalid data. Either latitude,longitude or both are incorrect.';
    }

    this.setState({
      nameError,
      latitudeError,
      longitudeError,
    });

    if (!nameError && !latitudeError && !longitudeError) {
      // proceed to submit
      const hasUuid = !!getParam('uuid', '');

      const marker = {
        uuid: hasUuid ? getParam('uuid', '') : await UUIDGenerator.getRandomUUID(),
        name,
        latitude: Number(latitude),
        longitude: Number(longitude),
        address: 'fetching address...',
      };

      saveMarker(marker);
      navigate(routes.map);

      InteractionManager.runAfterInteractions(async () => {
        marker.address = await getAddress({ latitude, longitude });

        if(hasUuid) {
          // Update marker
          updateMarker(marker);
        } else {
          // Create marker
          createMarker(marker);
        }
      });
    }
  };

  render() {
    const { navigation: { getParam } } = this.props;
    const {
      name, nameError,
      latitude, latitudeError,
      longitude, longitudeError
    } = this.state;
    const uuid = getParam('uuid', '');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{uuid ? 'Edit marker' : 'Add a marker'}</Text>
        <InputBox
          ref={r => { this.nameRef = r; }}
          label={'Name'}
          value={name}
          onChangeText={name => { this.setState({ name }); }}
          marginBottom={10}
          keyboardType={'default'}
          returnKeyType={'next'}
          onSubmitEditing={() => { this.latitudeRef.focus(); }}
          maxLength={40}
          error={nameError}
        />
        <InputBox
          ref={r => { this.latitudeRef = r; }}
          label={'Latitude'}
          value={latitude}
          onChangeText={latitude => { this.setState({ latitude }); }}
          marginBottom={10}
          keyboardType={'numeric'}
          returnKeyType={'next'}
          onSubmitEditing={() => { this.longitudeRef.focus(); }}
          maxLength={20}
          error={latitudeError}
        />
        <InputBox
          ref={r => { this.longitudeRef = r; }}
          label={'Longitude'}
          value={longitude}
          onChangeText={longitude => { this.setState({ longitude }); }}
          marginBottom={20}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          onSubmitEditing={() => { this.onSubmit(); }}
          maxLength={20}
          error={longitudeError}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
            <Text style={styles.buttonText}>{'Save'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  saveMarker,
  createMarker,
  updateMarker,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);