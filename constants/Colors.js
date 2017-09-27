const tintColor = '#05FB97';
const alertColor = '#EF853E';

const Colors = {
  tintColor,
  tabDefaultDark: '#D9D9D9',
  tabSelectedDark: tintColor,
  tabBackgroundDark: '#0F1C25',
  tabBackgroundSelectedDark: '#0F1C25',

  loaderColorDark: tintColor,

  canvasDark: '#11202D',
  cardBackgroundDark: '#162A3A',
  labelTextDark: '#527B92',
  valueTextDark: '#F9F9FA',

  inTheBlackColor: tintColor,
  inTheRedColor: '#FC4157',

  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
};

export function getInTheBlackOrRedColor(val) {
  return val < 0 ? Colors.inTheRedColor : Colors.inTheBlackColor
}

export default Colors
