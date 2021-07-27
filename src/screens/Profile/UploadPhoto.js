import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import * as Animatable from 'react-native-animatable';

const UploadPhoto = ({
  handlerShowHidePanel,
  takePhotoFromCammara,
  choosePhotoFromLibrary,
}) => {
  return (
    <Animatable.View animation="slideInUp" delay={50} style={styles.container}>
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.panelTitleStyle}>
            <Text style={styles.panelTitleText}>Upload Photo</Text>
          </View>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCammara}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={handlerShowHidePanel}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: SIZES.height / 3,
    backgroundColor: COLORS.gainsboro,
    paddingHorizontal: 20,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  panelTitleText: {
    fontSize: 25,
    marginTop: 5,
    fontWeight: '500',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 5,
  },
  panelButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UploadPhoto;
