import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../Styles/Button';

export default class AddButton extends PureComponent {

  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.listContainer}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{'≡'}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

AddButton.propTypes = {
  onPress: PropTypes.func,
};
