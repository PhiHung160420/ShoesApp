import React, {useEffect, useState} from 'react';
import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  CategoryScreen,
  ProducDetailScreen,
  PaymentScreen,
  UpdateProfile,
} from '../screens/index';
import RootTab from './rootTab';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/authSelector';
import {GetAccessToken} from '../utils/storage';
import {handlerSignIn} from '../redux/actions/authAction';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const [authSuccess, setAuthSuccess] = useState(false);

  const accessToken = useSelector(getAccessTokenSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const setAccessTokenToRedux = async () => {
      const accessStorage = await GetAccessToken();

      if (accessStorage) {
        dispatch(handlerSignIn(accessStorage));
      }
    };

    setAccessTokenToRedux();
  }, []);

  useEffect(() => {
    if (accessToken) {
      setAuthSuccess(true);
    } else {
      setAuthSuccess(false);
    }
  }, [accessToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {authSuccess ? (
          <>
            <Stack.Screen component={RootTab} name="HomeScreen" />
            <Stack.Screen component={CategoryScreen} name="CategoryScreen" />
            <Stack.Screen
              component={ProducDetailScreen}
              name="ProducDetailScreen"
            />
            <Stack.Screen component={PaymentScreen} name="PaymentScreen" />
            <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
          </>
        ) : (
          <>
            <Stack.Screen component={SplashScreen} name="SplashScreen" />
            <Stack.Screen component={SignInScreen} name="SignInScreen" />
            <Stack.Screen component={SignUpScreen} name="SignUpScreen" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
