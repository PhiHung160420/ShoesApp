import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';
import {SIZES} from '../../../constants';
import * as Animatable from 'react-native-animatable';

const ModalUpload = ({
  onPressCancel,
  onPressTakePhoto,
  onPressChooseFromLibrary,
}) => {
  return (
    <Animatable.View animation="slideInUp" delay={30} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.panelTitleStyle}>
          <Text style={styles.title}>Upload Photo</Text>
        </View>
        <Text style={styles.subTitle}>Choose Your Profile Picture</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={onPressTakePhoto}>
          <Text style={styles.buttonTextStyle}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={onPressChooseFromLibrary}>
          <Text style={styles.buttonTextStyle}>Choose From Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={onPressCancel}>
          <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SIZES.size_80,
    left: 0,
    right: 0,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.lightGray3,
    paddingHorizontal: SIZES.padding,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  content: {
    alignItems: 'center'
  },
  title: {
    fontSize: SIZES.size_25,
    fontWeight: '500',
  },
  subTitle: {
    fontSize: SIZES.size_18,
    color: COLORS.gray,
    marginTop: SIZES.size_5
  },
  buttonContainer: {
    marginTop: SIZES.size_15,
    marginBottom: SIZES.size_15
  },
  buttonStyle: {
    height: SIZES.size_40,
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginVertical: SIZES.size_7,
  },
  buttonTextStyle: {
    fontSize: SIZES.size_20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ModalUpload;
