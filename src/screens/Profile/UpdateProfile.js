import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import Materia from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const iconName = 'arrow-back-outline';

const UpdateProfile = ({route}) => {
  const {profile} = route.params;

  // get theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state lưu giới tính được chọn
  const [gender, setGender] = useState(true);

  console.log(profile);

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={iconName}>
        <View style={styles.titleContainer}>
          <Text style={[styles.updateTitle, {color: appTheme.textColor}]}>
            UPDATE PROFILE
          </Text>
        </View>
      </HeaderBar>
      {/* HEADER BAR */}

      <View
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.subBackgroundColor},
        ]}>
        {/* AVATAR */}
        <View style={styles.avatarProfileContainer}>
          <View style={styles.avatarContainer}>
            {/* IMAGES */}
            <Image source={{uri: profile.avatar}} style={styles.avatarStyle} />
            {/* IMAGES */}

            {/* ICON ADD PHOTO */}
            <TouchableOpacity style={styles.iconStyle}>
              <Materia name="add-a-photo" size={30} color="white" />
            </TouchableOpacity>
            {/* ICON ADD PHOTO */}
          </View>
        </View>
        {/* AVATAR */}

        {/* INFO PROFILE */}
        <View style={styles.infoProfileContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* USERNAME */}
            <Text style={[styles.textField, {color: appTheme.textColor}]}>
              Username
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {borderBottomColor: appTheme.borderBottomColor},
              ]}>
              <FontAwesome name="user-o" color={appTheme.textColor} size={25} />
              <TextInput
                name="name"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>
            {/* USERNAME */}

            {/* EMAIL */}
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 25},
              ]}>
              Email
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {borderBottomColor: appTheme.borderBottomColor},
              ]}>
              <FontAwesome
                name="envelope-open"
                color={appTheme.textColor}
                size={25}
              />
              <TextInput
                name="email"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            {/* EMAIL */}

            {/* PHONE */}
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 25},
              ]}>
              Phone
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {borderBottomColor: appTheme.borderBottomColor},
              ]}>
              <FontAwesome name="phone" color={appTheme.textColor} size={25} />
              <TextInput
                name="phone"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="phone-pad"
              />
            </View>
            {/* PHONE */}

            {/* GENDER */}
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 25},
              ]}>
              Gender
            </Text>
            <View style={styles.buttonContainHorizontal}>
              <TouchableOpacity
                style={
                  gender == true ? styles.buttonSelect : styles.buttonNonSelect
                }
                onPress={() => setGender(true)}>
                <Text
                  style={
                    gender == true
                      ? styles.buttonTextSelect
                      : styles.buttonTextNonSelect
                  }>
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  gender == false ? styles.buttonSelect : styles.buttonNonSelect
                }
                onPress={() => setGender(false)}>
                <Text
                  style={
                    gender == false
                      ? styles.buttonTextSelect
                      : styles.buttonTextNonSelect
                  }>
                  Female
                </Text>
              </TouchableOpacity>
            </View>
            {/* GENDER */}
          </ScrollView>

          {/* BUTTON UPDATE */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={[styles.buttonText, {color: appTheme.textColor}]}>
                UPDATE
              </Text>
            </TouchableOpacity>
          </View>
          {/* BUTTON UPDATE */}
        </View>
        {/* INFO PROFILE */}
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
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  iconStyle: {
    position: 'absolute',
    left: '20%',
    top: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: SIZES.radius * 5,
  },
  infoProfileContainer: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  fieldStyle: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 20,
    color: COLORS.black,
  },
  textField: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainHorizontal: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonNonSelect: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  buttonSelect: {
    flexDirection: 'row',
    backgroundColor: '#00bfa5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonTextSelect: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fafafa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonTextNonSelect: {
    fontSize: 18,
    color: '#777',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonStyle: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default UpdateProfile;
