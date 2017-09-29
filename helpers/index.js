import { CurrencyType } from '../constants/Currency'

export function formatMoney(value, currencyType = 'USD') {
  return CurrencyType[currencyType] + Number(value).toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
}

const dayInMilli = 1000 * 60 * 60 * 24
const weekInMilli = dayInMilli * 7
const monthInMilli = weekInMilli * 30
const threeMonthsInMilli = monthInMilli * 3
const yearInMilli = threeMonthsInMilli * 4


export function getTimeStampFrame(timeFrame) {
  const currentDate = new Date()
  const currentTime = currentDate.getTime()
  const currentYear = currentDate.getFullYear()

  switch (timeFrame) {
    case '1D':
      return `${currentTime - dayInMilli}/${currentTime}`
    case '1W':
      return `${currentTime - weekInMilli}/${currentTime}`
    case '1M':
      return `${currentTime - monthInMilli}/${currentTime}`
    case '3M':
      return `${currentTime - threeMonthsInMilli}/${currentTime}`
    case '1Y':
      return `${currentTime - yearInMilli}/${currentTime}`
    case 'YTD':
      return `${new Date(currentYear, 0).getTime()}/${currentTime}`
    case 'ALL':
      return ""
  }
}
