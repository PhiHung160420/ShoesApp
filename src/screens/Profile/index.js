import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES, tools} from '../../constants';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {getProfileSelector} from '../../redux/selectors/profileSelector';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getProfileAPI} from '../../services/profileAPI';
import {getAccessTokenFromStorage} from '../../utils/storage';
import Materia from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolProfle from './ToolProfle';
import {handlerSignOut} from '../../redux/actions/authAction';

const iconName = 'arrow-back-outline';

const ProfileScreen = ({navigation}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get profile
  const profile = useSelector(getProfileSelector);

  // use dispatch
  const dispatch = useDispatch();

  // render list tools
  const renderListTools = ({item, index}) => {
    return <ToolProfle item={item} index={index} profile={profile} />;
  };

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={iconName} />
      {/* HEADER BAR */}

      <View
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.backgroundColor},
        ]}>
        {/* INFO PROFILE */}
        <View style={styles.infoProfileContainer}>
          <View style={styles.infoProfileStyle}>
            {/* IMAGES */}
            <Image source={{uri: profile?.avatar}} style={styles.avatarStyle} />
            {/* IMAGES */}

            {/* NAME */}
            <Text style={[styles.nameStyle, {color: appTheme.textColor}]}>
              {profile?.name}
            </Text>
            {/* NAME */}
          </View>
        </View>
        {/* INFO PROFILE */}

        {/* EMAIL - PHONE */}
        <View style={styles.subInfoContainer}>
          {/* EMAIL */}
          <View style={styles.emailContainer}>
            {profile ? (
              <Materia name="email" size={15} color={appTheme.textColor} />
            ) : null}
            <Text style={[styles.emailText, {color: appTheme.textColor}]}>
              {profile?.email}
            </Text>
          </View>
          {/* EMAIL */}

          {/* PHONE */}
          <View style={styles.phoneContainer}>
            {profile ? (
              <AntDesign name="phone" size={15} color={appTheme.textColor} />
            ) : null}
            <Text style={[styles.phoneText, {color: appTheme.textColor}]}>
              {profile?.phone}
            </Text>
          </View>
          {/* PHONE */}
        </View>
        {/* EMAIL - PHONE */}

        {/* TOOLS PROFILE */}
        <View style={styles.toolsProfileContainer}>
          <FlatList
            data={tools}
            keyExtractor={item => item.id}
            renderItem={renderListTools}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
        </View>
        {/* TOOLS PROFILE */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    marginTop: -30,
  },
  infoProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  toolsProfileContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -100,
    marginHorizontal: 10,
  },
  infoProfileStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  nameStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Roboto Mono',
  },
  iconContainer: {
    position: 'absolute',
    left: '20%',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: SIZES.radius * 5,
  },
  subInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
    marginHorizontal: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Roboto Mono',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'Roboto Mono',
  },
});

export default ProfileScreen;
