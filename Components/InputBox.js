import React, { forwardRef, memo } from 'react';
import { TextField } from 'react-native-material-textfield';
import Colors from '../Colors';

export default memo(forwardRef((props, ref) => (
  <TextField
    ref={ref}
    {...props}
    textColor={Colors.inputTextColor}
    fontSize={16}
    titleFontSize={12}
    labelFontSize={12}
    labelPadding={12}
    inputContainerPadding={8}
    activeLineWidth={0.5}
    tintColor={Colors.inputTintColor}
    baseColor={Colors.inputTintColor}
    containerStyle={{
      marginBottom: props.marginBottom || 0,
    }}
  />
)));
