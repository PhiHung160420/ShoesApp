import React from 'react';
import {
  FlatList, Image, StyleSheet,
  Text, View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Materia from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { CustomPopup, HeaderBar, ModalInput, OptionButton } from '../../components/common';
import { COLORS, CONSTANST, ICONS, SIZES } from '../../constants';
import { appThemeSelector } from '../../redux/selectors/themeSelector';

const iconName = 'arrow-back-outline';

const ProfileComponent = (props) => {
  const {
    profile,
    isModalVisible,
    reload,
    onPressOption,
    setModalVisible,
    entryPassword,
    modalContent,
    showModalSuccess,
    validPassword,
    isChangePasswordSuccess,
    setEntryPassword,
    handlerChangePassword,
    handlerClickChangePassword,
    setShowModalSuccess
  } = props;

  const appTheme = useSelector(appThemeSelector);

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={iconName} />

      <View style={[styles.content, {backgroundColor: appTheme.backgroundColor}]}>
        <View style={styles.infoContainer}>
          <View style={styles.infoProfileStyle}>
            <Image source={{uri: profile?.avatar}} style={styles.avatarStyle} />

            <Text style={[styles.name, {color: appTheme.textColor}]}>{profile?.name}</Text>
          </View>
        </View>

        <View style={styles.subInfoContainer}>
          <View style={styles.emailContainer}>
            {profile ? (
              <Materia name="email" size={15} color={appTheme.textColor} />
            ) : null}
            <Text style={[styles.emailText, {color: appTheme.textColor}]}>{profile?.email}</Text>
          </View>

          <View style={styles.phoneContainer}>
            {profile ? (
              <AntDesign name="phone" size={15} color={appTheme.textColor} />
            ) : null}
            <Text style={[styles.phoneText, {color: appTheme.textColor}]}>{profile?.phone}</Text>
          </View>
        </View>

        <View style={styles.optionContainer}>
          <FlatList
            data={CONSTANST?.tools}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            renderItem={({item, index}) => (
              <OptionButton 
                key={reload}
                index={index}
                title={item.text}
                icon={item.icon}
                onPress={() => onPressOption(item.id)}
              />
            )}
          />
        </View>
      </View>

      <ModalInput
        isPasswordFiled
        isVisible={isModalVisible}
        title="New Password"
        placeholder="New Password"
        onChangeText={value => handlerChangePassword(value)}
        leftButtonTitle="CANCEL"
        onPressLeftButton={() => setModalVisible(false)}
        rightButtonTitle="CHANGE"
        onPressRightButton={handlerClickChangePassword}
        validTextField={validPassword?.isValid}
        messageError={validPassword?.msgError}
        entryPassword={entryPassword}
        handleEntryPassword={() => setEntryPassword(!entryPassword)}
      />

      <CustomPopup 
        isVisible={showModalSuccess}
        title={modalContent?.title}
        content={modalContent?.content}
        mainButton="OK"
        onPressMainButton={() => setShowModalSuccess(false)}
        icon={isChangePasswordSuccess ? ICONS.success : ICONS.failed}
        containerStyle={{backgroundColor: showModalSuccess ? COLORS.orange : COLORS.gainsboro}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 2,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    marginTop: -30,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  optionContainer: {
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
  name: {
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

export default ProfileComponent;
