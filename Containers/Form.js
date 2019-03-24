import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import isLatLong from 'validator/lib/isLatLong';
import InputBox from '../Components/InputBox';
import styles from '../Styles/Form';
import { addOrUpdateMarker } from '../Actions';
import { routes } from '../Navigation';

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
    const { addOrUpdateMarker, navigation: { navigate, getParam } } = this.props;
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
      const uuid = getParam('uuid', '');
      // const uuid = hasUuid || await UUIDGenerator.getRandomUUID();
      const marker = {
        uuid,
        name,
        latitude: Number(latitude),
        longitude: Number(longitude),
        address: 'fetching address...',
      }

      addOrUpdateMarker(marker);
      navigate(routes.map);
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
  addOrUpdateMarker,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);