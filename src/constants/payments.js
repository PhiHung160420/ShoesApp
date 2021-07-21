const mastercard = require('../assets/images/mastercard.png');
const paypal = require('../assets/images/paypal.png');
const visa = require('../assets/images/visa.png');

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

export default payments;
