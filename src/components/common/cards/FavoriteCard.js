import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet,
  Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../../constants';
import { appThemeSelector } from '../../../redux/selectors/themeSelector';

const FavoriteCard = ({handlerRemoveCard, item, index}) => {
  const appTheme = useSelector(appThemeSelector);

  const navigation = useNavigation();

  const [reload, setReload] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', e => {
      if (e) {
        setReload(Math.random());
      }
    });
  }, []);

  return (
    <Animatable.View animation="fadeInLeft" duration={SIZES.duration + index * 300} key={reload}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ProducDetailScreen', {item})}>
        <View style={[styles.container, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
          <View style={styles.leftContainer}>
            <Image source={{uri: item.image}} style={styles.productImage} />

            <View style={styles.productNameContainer}>
              <Text style={[styles.productname, {color: appTheme.textColor}]}>{item.name}</Text>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={handlerRemoveCard}>
              <Ionicons name="heart-dislike-sharp" size={40} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: SIZES.size_100,
    borderRadius: SIZES.radius * 2,
    marginHorizontal: SIZES.size_10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: SIZES.size_5,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: SIZES.size_10,
  },
  productImage: {
    height: 140,
    width: 140,
  },
  productNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginLeft: 5,
  },
  productname: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
  },
});

export default FavoriteCard;
