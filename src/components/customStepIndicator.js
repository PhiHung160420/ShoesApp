import React from 'react';
import {Text, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const labels = ['Ordered', 'Confirmed', 'Deliverling', 'Completed'];
const icons = ['basket-sharp', 'md-thumbs-up', 'ios-location', 'checkbox'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: COLORS.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLORS.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: COLORS.primary,
};

const CustomStepIndicator = ({appTheme}) => {
  const renderLabel = ({position, stepstatus, label, currentPosition}) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Icon name={icons[position]} size={25} color={COLORS.primary} />
      <Text
        style={{
          color: position == currentPosition ? appTheme.textColor : '#aaaaaa',
        }}>
        {label}
      </Text>
    </View>
  );
  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={0}
      stepCount={4}
      labels={labels}
      renderLabel={renderLabel}
    />
  );
};

export default CustomStepIndicator;
