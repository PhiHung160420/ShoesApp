import AsyncStorage from '@react-native-async-storage/async-storage';

export const SetAccessToken = async value => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (error) {
    console.log(error);
  }
};

export const GetAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export const RemoveAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.log(error);
  }
};
