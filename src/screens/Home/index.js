import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {RemoveAccessToken} from '../../utils/storage';
import {handlerSignOut} from '../../redux/actions/authAction';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handlerLogOut = async () => {
    await RemoveAccessToken();
    dispatch(handlerSignOut(null));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'green',
          borderRadius: 10,
        }}
        onPress={handlerLogOut}>
        <Text style={{fontSize: 15, color: '#fff'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
