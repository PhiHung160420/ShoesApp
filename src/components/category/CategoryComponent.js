import React, { useRef } from 'react';
import {
  Animated, StyleSheet, Text,
  View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { HeaderBar } from '../common';
import { SIZES, ICONS } from '../../constants';
import { getAppThemeSelector } from '../../redux/selectors/themeSelector';
import CategoryItem from './CategoryItem';

const CategoryComponent = ({listProduct, id, onPressProductDetail}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={ICONS.arrow_back}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>{id}</Text>
        </View>
      </HeaderBar>

      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={[styles.contentContainer, {backgroundColor: appTheme.backgroundColor}]}>
        <Animated.FlatList
          data={listProduct}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listProductContainer}
          snapToInterval={150}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          renderItem={({item, index}) => (
            <CategoryItem
              key={index}
              item={item} 
              index={index} 
              scrollY={scrollY} 
              onPress={() => onPressProductDetail(item)}
            />
          )}
        />
      </Animatable.View>
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

export default CategoryComponent;
