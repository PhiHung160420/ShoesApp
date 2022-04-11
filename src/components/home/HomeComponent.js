import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  FlatList, StyleSheet, Text, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { CustomPopup, HeaderBar, Loading, ProductCard, SearchInput, TextButton } from '../../components/common';
import { ICONS, SIZES } from '../../constants';
import { getAppThemeSelector } from '../../redux/selectors/themeSelector';

const HomeComponent = (props) => {
  const {
    isLoading,
    productsFavorite,
    listCate,
    listProducts,
    showHidePopup,
    handlerSessionExpired,
  } = props;

  const appTheme = useSelector(getAppThemeSelector);
  
  const navigation = useNavigation();

  const renderListProduct = ({item, index}) => {
    var isLiked = false;

    if (typeof productsFavorite == 'object') {
      productsFavorite.forEach(product => {
        if (product.id == item.id) {
          isLiked = true;
        }
      });
    }
    return <ProductCard product={item} isLiked={isLiked} />;
  };

  const renderListCategories = () => {
    return (
      <View style={styles(appTheme).categoryContainer}>
        <Text style={styles(appTheme).categoryTitle}>Categories</Text>

        <FlatList 
          data={listCate}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `Category_item_${item.id}`}
          contentContainerStyle={styles(appTheme).listCategories}
          horizontal        
          renderItem={({item, index}) => (
            <TextButton
              title={item?.category}
              buttonContainerStyle={[
                styles(appTheme).cateItemContainer,
                {
                  marginLeft: index === 0 ? SIZES.padding : SIZES.size_20,
                  marginRight: index === listCate.length - 1 ? SIZES.padding : 0
                },
              ]} 
              onPress={() => navigation.navigate('CategoryScreen', {id: item.id})}
            />
          )}
        />
      </View>
    )
  }

  return (
    <View style={styles(appTheme).container}>
      {showHidePopup && (
        <CustomPopup
          isVisible={showHidePopup}
          icon={ICONS.login}
          title="Xác thực"
          content="Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!"
          mainButton="tiếp tục"
          onPressMainButton={handlerSessionExpired}
        />
      )}

      <HeaderBar>
        <SearchInput
          containerStyle={styles(appTheme).searchContainer}
          placeholder="Find shoes"
        />
      </HeaderBar>

      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles(appTheme).contentContainer}>
          <FlatList
            data={listProducts}
            keyExtractor={item => item.id}
            renderItem={renderListProduct}
            ListHeaderComponent={renderListCategories()}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles(appTheme).listProductContainer}
            style={styles(appTheme).listProductStyle}
          />
        </View>
      )}
    </View>
  );
};

const styles = appTheme => StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      marginTop: -SIZES.size_20,
      borderTopLeftRadius: SIZES.radius * 2,
      borderTopRightRadius: SIZES.radius * 2,
      backgroundColor: appTheme.backgroundColor,
    },
    listCategories: {
      marginTop: SIZES.radius,
      marginBottom: SIZES.padding
    },
    listProductContainer: {
      paddingBottom: SIZES.size_100,
    },
    categoryTitle: {
      color: appTheme.textColor,
      fontSize: SIZES.size_25,
      fontWeight: 'bold',
      fontFamily: 'Roboto Mono',
      marginLeft: SIZES.padding
    },
    cateItemContainer: {
      height: 40,
      paddingHorizontal: SIZES.size_10,
      borderRadius: 10,
      marginLeft: 10,
      shadowOffset: {
        height: 5,
        width: 5,
      },
      shadowColor: appTheme.categoryShawdow,
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 1,
    },
    cateItemName: {
      color: appTheme.textColor,
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'Roboto Mono',
    },
    listProductStyle: {
      marginTop: SIZES.size_20
    },
    searchContainer: {
      marginTop: SIZES.padding,
    }
  });

export default memo(HomeComponent);