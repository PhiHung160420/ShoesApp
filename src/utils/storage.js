import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from 'apis/api-request';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const SHOPPING_CARTS = 'SHOPPING_CARTS';
const PRODUCTS_FAVORITE = 'PRODUCTS_FAVORITE';

export const saveDataStorage = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
		return true;
	} catch (error) {
		return false;
	}
};

export const getDataStorage = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const clearDataStorage = async () => {
	try {
		await AsyncStorage.removeItem(`@${ACCESS_TOKEN}:key`);
		await AsyncStorage.removeItem(`@${SHOPPING_CARTS}:key`);
		await AsyncStorage.removeItem(`@${PRODUCTS_FAVORITE}:key`);
		return true;
	} catch (error) {
		return false;
	}
};

export const saveAccessToken = async value => {
  saveDataStorage(`@${ACCESS_TOKEN}:key`, JSON.stringify(value));
};

export const getAccessToken = async () => {
  const result = await getDataStorage(`@${ACCESS_TOKEN}:key`);
	return result;
};

export const saveShoppingCarts = async value => {
  saveDataStorage(`@${SHOPPING_CARTS}:key`, JSON.stringify(value));
};

export const getShoppingCarts = async () => {
  const result = await getDataStorage(`@${SHOPPING_CARTS}:key`);
	return result;
};