import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { SIZES } from '../../../constants';
import { appThemeSelector } from '../../../redux/selectors/themeSelector';

const OptionButton = (props) => {
  const {
    icon,
    title,
    onPress,
    buttonContainer,
    titleContainer,
    index
  } = props;

  const appTheme = useSelector(appThemeSelector);

  return (
    <Animatable.View animation="fadeInLeft" duration={SIZES.duration + index * 150}>
      <TouchableOpacity 
        style={[styles.container, buttonContainer, {backgroundColor: appTheme.flatlistbackgroundItem}]}
        onPress={onPress}
      >
        <AntDesign name={icon} size={SIZES.size_35} color={icon == 'logout' ? '#dc143c' : appTheme.textColor}/>

        <View style={styles.content}>
          <Text style={[styles.title, titleContainer, {color: icon == 'logout' ? '#dc143c' : appTheme.textColor}]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.deviceWidth - 20,
    height: 80,
    borderRadius: SIZES.radius * 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
});

export default OptionButton;
