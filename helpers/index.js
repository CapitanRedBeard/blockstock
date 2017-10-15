import { CurrencyType } from '../constants/Currency'

export function formatMoney(value, currencyType = 'USD') {
  return CurrencyType[currencyType] + Number(value).toFixed(2).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
}

export function matchesFloat(value) {
  return value.match(/^(?:(?:0|[1-9][0-9]*)(?:\.[0-9]*)?|\.[0-9]+)$/g);
}

export function formatSupply(supply, symbol) {
  const formattedSupply =  Number(supply).toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
  return `${formattedSupply} ${symbol}`

}

const dayInMilli = 1000 * 60 * 60 * 24
const weekInMilli = dayInMilli * 7
const monthInMilli = weekInMilli * 4
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
    case 'All':
    default:
      return ""
  }
}

export function getLowHighPrice(data) {
  let lowPrice, highPrice, tmp
  if(data) {
    lowPrice = Number.POSITIVE_INFINITY;
    highPrice = Number.NEGATIVE_INFINITY;

    for (let i=data.length-1; i>=0; i--) {
        tmp = data[i][1];
        if (tmp < lowPrice) lowPrice = tmp;
        if (tmp > highPrice) highPrice = tmp;
    }
  }
  return {
    lowPrice: lowPrice,
    highPrice: highPrice
  }
}

export function getHigh(data) {
  return data && data.reduce((prev, curr) => {
      return prev[1] > curr[1] ? prev[1] : curr[1];
  });
}

export function getChange(data) {
  if(data) {
    return (((data[data.length - 1][1] - data[0][1]) / data[0][1]) * 100).toFixed(2)
  }
}
