import React, {useEffect} from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadingSelector} from '../../redux/selectors/loadingSelector';
import {handlerLoading} from '../../redux/actions/loadingAction';

const Loading = ({listCate, listProducts}) => {
  return (
    <LottieView
      source={require('../../assets/icons/loading.json')}
      autoPlay
      loop
    />
  );
};

export default Loading;
