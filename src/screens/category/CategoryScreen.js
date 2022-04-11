import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryComponent } from '../../components';
import { actFetchGetProductByCategoryRequest } from '../../redux/actions/categoryAction';
import { getProductsByCategorySelector } from '../../redux/selectors/categorySelector';

const CategoryScreen = ({route, navigation}) => {
  const {id} = route.params;

  const dispatch = useDispatch();

  const listProduct = useSelector(getProductsByCategorySelector);

  useEffect(() => {
    dispatch(actFetchGetProductByCategoryRequest(id));
  }, []);

  const onPressProductDetail = (item) => {
    navigation.navigate('ProducDetailScreen', {item})
  };

  return (
    <CategoryComponent 
      id={id}
      listProduct={listProduct} 
      onPressProductDetail={onPressProductDetail}
    />
  );
};

export default CategoryScreen;
