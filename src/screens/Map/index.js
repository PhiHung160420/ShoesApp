import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {getAllStoreAPI} from '../../services/storeAPI';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MapScreen = ({navigation: {goBack}}) => {
  // state region
  const [region, setRegion] = useState({
    latitude: 10.771663,
    longitude: 106.669631,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // state markers
  const [markers, setMarkers] = useState([]);

  // on region change
  const onRegionChange = region => {
    setRegion(region);
  };

  useEffect(() => {
    getAllStoreAPI()
      .then(res => {
        res.data.content.map(item => {
          item.latitude = Number(item.latitude);
          item.longtitude = Number(item.longtitude);
        });
        setMarkers(res.data.content);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        {/* BUTTON BACK  */}
        <TouchableOpacity style={styles.buttonBack} onPress={() => goBack()}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        {/* BUTTON BACK  */}

        {/* SEARCH BAR */}
        <TextInput
          style={styles.searchInput}
          placeholder={'Search'}
          placeholderTextColor={'#666'}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {/* SEARCH BAR */}
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
            <Image
              source={require('../../assets/icons/location.png')}
              style={{height: 35, width: 35}}
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
    width: '100%',
    height: '100%',
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
    backgroundColor: '#6495ed',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonBack: {
    width: 50,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
  },
});

export default MapScreen;
