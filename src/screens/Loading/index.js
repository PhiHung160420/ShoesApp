import React, {useEffect} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadingSelector} from '../../redux/selectors/loadingSelector';
import {handlerLoading} from '../../redux/actions/loadingAction';

const LoadingScreen = ({listCate, listProducts}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        source={require('../../assets/icons/shopping.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingScreen;
