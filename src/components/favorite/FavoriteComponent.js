import React from 'react';
import {
  FlatList,
  Image, StyleSheet,
  Text, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderBar, FavoriteCard } from '../../components/common';
import { IMAGES, SIZES } from '../../constants';
import { appThemeSelector } from '../../redux/selectors/themeSelector';
import COLORS from '../../constants/colors/index';

const FavoriteComponent = (props) => {
  const {
    productsFavorite,
    handlerRemoveProduct,
  } = props;
  
  const appTheme = useSelector(appThemeSelector);

  return (
    <View style={styles.container}>
      <HeaderBar>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>My Favorite</Text>
        </View>
      </HeaderBar>
      <View style={[styles.contentContainer, {backgroundColor: appTheme.backgroundColor}]}>
        {typeof productsFavorite == 'object' && productsFavorite.length !== 0 ? 
          <FlatList
            data={productsFavorite}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            contentContainerStyle={styles.contentContainerStyle}
            snapToInterval={110}
            renderItem={({index, item}) => (
              <FavoriteCard 
                item={item}
                index={index}
                handlerRemoveCard={() => handlerRemoveProduct(item?.id)}
              />
            )}
          /> :
          <View style={styles.emptyContainer}>
            <Image source={IMAGES.empty_list} style={styles.emptyIcon}/>
            <Text style={styles.emptyText}>No favorites yet</Text>
            <Text style={styles.emptySubText}>Tap on the heart to add to your favorites!</Text>
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: SIZES.size_30,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    color: COLORS.white
  },
  contentContainer: {
    flex: 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    marginTop: -SIZES.size_20,
  },
  contentContainerStyle: {
    paddingTop: SIZES.size_10,
    paddingBottom: SIZES.size_150,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.size_80,
  },
  emptyIcon: {
    width: SIZES.size_300,
    height: SIZES.size_300,
  },
  emptyText: {
    fontSize: SIZES.size_25,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: SIZES.radius
  },
  emptySubText: {
    fontSize: SIZES.size_18,
    fontWeight: '400',
    textAlign: 'center',
  }
});

export default FavoriteComponent;
