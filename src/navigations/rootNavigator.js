import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {
  CategoryScreen, LoginScreen, MapScreen, OrderDetailScreen, OrderHistoryScreen, PaymentScreen, ProducDetailScreen, RegisterScreen, SplashScreen, UpdateProfileScreen, AuthScreen
} from '../screens/index';
import RootTab from './rootTab';
import { navigationRef } from './service';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createSharedElementStackNavigator();

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none" mode="modal">
          <Stack.Screen component={AuthScreen} name="AuthScreen" />
          <Stack.Screen component={RootTab} name="HomeScreen" />
          <Stack.Screen component={CategoryScreen} name="CategoryScreen" />
          <Stack.Screen component={ProducDetailScreen} name="ProducDetailScreen" />
          <Stack.Screen component={PaymentScreen} name="PaymentScreen" />
          <Stack.Screen component={UpdateProfileScreen} name="UpdateProfileScreen" />
          <Stack.Screen component={OrderHistoryScreen} name="OrderHistoryScreen" />
          <Stack.Screen component={OrderDetailScreen} name="OrderDetailScreen" />
          <Stack.Screen component={MapScreen} name="MapScreen" />
          <Stack.Screen component={SplashScreen} name="SplashScreen" />
          <Stack.Screen component={LoginScreen} name="LoginScreen" />
          <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
