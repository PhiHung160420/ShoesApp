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
import {getProfile} from '../../services/profileAPI';
import {GetAccessToken} from '../../utils/storage';
import Materia from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToolProfle from './ToolProfle';

const iconName = 'arrow-back-outline';

const ProfileScreen = () => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get profile
  const myProfile = useSelector(getProfileSelector);

  // state my profile
  const [profile, setProfile] = useState({});

  // get access token
  const token = useSelector(getAccessTokenSelector);

  // get profile info from api
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then(res => setProfile(res.data.content))
        .catch(err => console.log(err));
    }
  }, [myProfile]);

  // render list tools
  const renderListTools = ({item}) => {
    return <ToolProfle item={item} profile={profile} />;
  };

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={iconName} />
      {/* HEADER BAR */}

      {/* CONTENT */}
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.backgroundColor},
        ]}>
        {/* INFO PROFILE */}
        <View style={styles.infoProfileContainer}>
          <View style={styles.infoProfileStyle}>
            {/* IMAGES */}
            <Image source={{uri: profile.avatar}} style={styles.avatarStyle} />
            {/* IMAGES */}

            {/* ICON ADD PHOTO */}
            <TouchableOpacity style={styles.iconContainer}>
              <Materia name="add-a-photo" size={30} color="white" />
            </TouchableOpacity>
            {/* ICON ADD PHOTO */}

            {/* NAME */}
            <Text style={[styles.nameStyle, {color: appTheme.textColor}]}>
              {profile.name}
            </Text>
            {/* NAME */}
          </View>
        </View>
        {/* INFO PROFILE */}

        {/* EMAIL - PHONE */}
        <View style={styles.subInfoContainer}>
          {/* EMAIL */}
          <View style={styles.emailContainer}>
            <Materia name="email" size={15} color={appTheme.textColor} />
            <Text style={[styles.emailText, {color: appTheme.textColor}]}>
              {profile.email}
            </Text>
          </View>
          {/* EMAIL */}

          {/* PHONE */}
          <View style={styles.phoneContainer}>
            <AntDesign name="phone" size={15} color={appTheme.textColor} />
            <Text style={[styles.phoneText, {color: appTheme.textColor}]}>
              {profile.phone}
            </Text>
          </View>
          {/* PHONE */}
        </View>
        {/* EMAIL - PHONE */}

        {/* TOOLS PROFILE */}
        <View style={styles.toolsProfileContainer}>
          <FlatList
            data={tools}
            keyExtractor={item => item.icon}
            renderItem={renderListTools}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
        </View>
        {/* TOOLS PROFILE */}
      </View>
      {/* CONTENT */}
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
  },
  emailText: {
    fontSize: 14,
    marginLeft: 5,
  },
  phoneContainer: {
    flexDirection: 'row',
  },
  phoneText: {
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ProfileScreen;