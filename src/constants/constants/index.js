import { Platform } from 'react-native';

const mastercard = require('../../assets/images/mastercard.png');
const paypal = require('../../assets/images/paypal.png');
const visa = require('../../assets/images/visa.png');

const backend_url = 'http://svcy3.myclass.vn/api/';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const payments = [
  {
    id: 1,
    image: mastercard,
    name: 'MasterCard',
    selected: true,
  },
  {
    id: 2,
    image: paypal,
    name: 'Paypal',
    selected: false,
  },
  {
    id: 3,
    image: visa,
    name: 'Visa',
    selected: false,
  },
];

const tools = [
  {
    id: 'wallet',
    icon: 'wallet',
    text: 'Wallet',
  },
  {
    id: 'orderHistory',
    icon: 'switcher',
    text: 'Order History',
  },
  {
    id: 'profile',
    icon: 'profile',
    text: 'Update Profile',
  },
  {
    id: 'lock',
    icon: 'lock',
    text: 'Change Password',
  },
  {
    id: 'logout',
    icon: 'logout',
    text: 'Logout',
  },
];

const CONSTANST = {
  backend_url,
  tools,
  payments,
  isIOS,
  isAndroid
}

export default CONSTANST;