import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryComponent } from '../../components';
import { fetchProductByCategoryAction } from '../../redux/actions/categoryAction';
import { listProductByCategorySelector } from '../../redux/selectors/categorySelector';

const CategoryScreen = ({route, navigation}) => {
  const {id} = route.params;

  const dispatch = useDispatch();

  const listProduct = useSelector(listProductByCategorySelector);

  useEffect(() => {
    dispatch(fetchProductByCategoryAction(id));
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
