import React, { useEffect, useState } from 'react';
import { MapComponent } from '../../components';
import { getAllStoreAPI } from '../../services/storeAPI';

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 10.771663,
    longitude: 106.669631,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);

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
    <MapComponent 
      markers={markers}
      onRegionChange={onRegionChange}
      region={region}
    />
  );
};

export default MapScreen;
