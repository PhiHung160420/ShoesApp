import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StatusBar, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants';

const SplashComponent = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          delay={500}
          duration={SIZES.duration * 2}
          style={styles.logo}
          source={require('../../assets/images/logo.png')}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={800}
        duration={SIZES.duration * 2}
        style={styles.footer}>
        <Text style={styles.title}>Everything you need is already inside</Text>
        <Text style={styles.text}>Log In With Account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color={COLORS.white} size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  logo: {
    width: SIZES.deviceHeight * 0.28,
    height: SIZES.deviceHeight * 0.28,
  },
  title: {
    fontSize: 28,
    color: '#05375a',
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 18,
    fontFamily: 'Roboto Mono',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    borderRadius: 20,
    width: 200,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textSign: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontFamily: 'Roboto Mono',
  },
});

export default SplashComponent;
