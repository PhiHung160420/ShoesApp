import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FavoriteScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteScreen;
