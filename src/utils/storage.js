import AsyncStorage from '@react-native-async-storage/async-storage';

/* access token */
export const SetAccessTokenToStorage = async value => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (error) {
    console.log(error);
  }
};

export const getAccessTokenFromStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const removeAccessTokenInStorage = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.log(error);
  }
};
/* access token */

/* products favorite */
export const setProductsFavoriteToStorage = async values => {
  try {
    await AsyncStorage.setItem('productsFavorite', values);
  } catch (err) {
    console.log(err);
  }
};

export const getProductsFavoriteFromStorage = async () => {
  try {
    return await AsyncStorage.getItem('productsFavorite');
  } catch (error) {
    console.log(error);
  }
};

export const removeProductsFavoriteInStorage = async () => {
  try {
    await AsyncStorage.removeItem('productsFavorite');
  } catch (error) {
    console.log(error);
  }
};
/* products favorite */
