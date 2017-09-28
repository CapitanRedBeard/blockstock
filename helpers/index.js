import { CurrencyType } from '../constants/Currency'

export function formatMoney(value, currencyType = 'USD') {
  return CurrencyType[currencyType] + Number(value).toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
}
