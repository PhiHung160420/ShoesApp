import React from 'react';
import {
  Image, SafeAreaView, StyleSheet,
  Text, TextInput, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, SIZES } from '../../constants';
import ICONS from '../../constants/icons/index';

const MapComponent = ({markers, onRegionChange, region}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => goBack()}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder={'Search'}
          placeholderTextColor={'#666'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longtitude,
            }}
            title={marker.name}
            description={marker.description}>
            <Image source={ICONS.location} style={styles.icon}
            />
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 10,
    margin: 10,
    color: '#000',
    backgroundColor: '#FFF',
    height: 40,
    fontSize: 18,
    width: '60%',
    paddingLeft: 10,
  },
  searchButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.white
  },
  buttonBack: {
    width: 50,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
  },
  icon: {
    height: SIZES.size_35, 
    width: SIZES.size_35,
  }
});

export default MapComponent;
