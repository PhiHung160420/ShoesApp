export const phoneRegExp =
/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateUsername = (value, data, setData, validate, setValidate) => {
  if (value.trim().length >= 4) {
    setData({...data, name: value});
    setValidate({...validate, name: {...validate.name, isValid: true}});
  } else {
    setData({...data, name: value});
    setValidate({...validate, name: {...validate.name, isValid: false}});
  }
};

export const validateEmail = (value, data, setData, validate, setValidate) => {
  if (value.match(regexEmail)) {
    setData({...data, email: value});
    setValidate({...validate, email: {...validate.email, isValid: true}});
  } else {
    setData({...data, email: value});
    setValidate({...validate, email: {...validate.email, isValid: false}});
  }
};

export const validatePhoneNumber = (value, data, setData, validate, setValidate) => {
  if (value.match(regexPhone)) {
    setData({...data, phone: value});
    setValidate({...validate, phone: {...validate.phone, isValid: true}});
  } else {
    setData({...data, phone: value});
    setValidate({...validate, phone: {...validate.phone, isValid: false}});
  }
};

export const validatePassword = (value, data, setData, validate, setValidate) => {
  if (value.trim().length >= 6) {
    setData({...data, password: value});
    setValidate({
      ...validate,
      password: {...validate.password, isValid: true},
    });
  } else {
    setData({...data, password: value});
    setValidate({
      ...validate,
      password: {...validate.password, isValid: false},
    });
  }
};