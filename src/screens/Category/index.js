import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {SIZES, COLORS} from '../../constants';
import {actFetchGetProductByCategoryRequest} from '../../redux/actions/categoryAction';
import {getProductsByCategorySelector} from '../../redux/selectors/categorySelector';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getProductByCategory} from '../../services/categoriesAPI';
import * as Animatable from 'react-native-animatable';
import ProductItem from './ProductItem';

const iconName = 'arrow-back-outline';

const CategoryScreen = ({route, navigation}) => {
  // get category id
  const {id} = route.params;

  // use dispatch
  const dispatch = useDispatch();

  // initial animated
  const scrollY = useRef(new Animated.Value(0)).current;

  // get list product by category
  const listProduct = useSelector(getProductsByCategorySelector);

  // get appTheme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get product by category
  useEffect(() => {
    dispatch(actFetchGetProductByCategoryRequest(id));
  }, []);

  // render list product
  const renderProduct = ({item, index}) => {
    return <ProductItem item={item} index={index} scrollY={scrollY} />;
  };

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={iconName}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>
            {id}
          </Text>
        </View>
      </HeaderBar>
      {/* HEADER BAR */}

      {/* LIST PRODUCT */}
      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.backgroundColor},
        ]}>
        <Animated.FlatList
          data={listProduct}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listProductContainer}
          snapToInterval={150}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
        />
      </Animatable.View>
      {/* LIST PRODUCT */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    marginTop: -30,
    paddingVertical: 8,
  },
  listProductContainer: {
    paddingTop: 10,
    paddingBottom: 60,
    paddingHorizontal: 10,
  },
});

export default CategoryScreen;
