import {View} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = () => {
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

export default Loading;
