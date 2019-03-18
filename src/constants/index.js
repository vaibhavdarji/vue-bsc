const MAX_DONATE = 700;
const CURRENCY = 'USD';

const ERROR_TEXT_CLASS = 'error--text title font-weight-bold';

const THEME = {
  BG_COLOR: '#F4F4F4',
  LPB_COLOR: '#2979FF', 
  BTN_TEXT_COLOR: 'white',
  ERROR_TEXT_CLASS
}

const BUTTON = {
  BG_COLOR: THEME.LPB_COLOR,
  COLOR: THEME.BTN_TEXT_COLOR,
  SIZE: 'large'
};

const LINEAR_PROGRESS_BAR = {
  COLOR: THEME.LPB_COLOR,
  BG_COLOR: THEME.BG_COLOR,
};

const DONATE_OPTIONS = [
  2,
  5,
  10,
  15,
  20,
  50
];

const USER_INFO = {
  amount: 0,
  userName: '',
  userEmail: '',
  cardNo: '',
  cardExp: '',
  cardCVC: '',
  cardUserName: ''
};

export default {
  MAX_DONATE,
  DONATE_OPTIONS,
  USER_INFO,
  CURRENCY,
  MAX_DONATE,
  BUTTON,
  LINEAR_PROGRESS_BAR,
  THEME
};