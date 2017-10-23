import { CurrencyType } from '../constants/Currency'
import { TransactionTypes } from '../constants/Types'
import numeral from 'numeral'

export function formatMoney(value, currencyType = 'USD') {
  return numeral(Number(value)).format(`${CurrencyType[currencyType]}0.00a`).toUpperCase();
}

export function matchesFloat(value) {
  return value.match(/^(?:(?:0|[1-9][0-9]*)(?:\.[0-9]*)?|\.[0-9]+)$/g);
}

export function formatPercent(value ) {
  if(isNaN(value)) {
    return ""
  }
  return numeral(Number(value)).format('0.00%')
}

export function formatQuantity(value ) {
  return numeral(Number(value)).format(`0.00a`).toUpperCase();
}

export function formatSupply(supply, symbol) {
  const formattedSupply =  Number(supply).toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
  return `${formattedSupply} ${symbol}`
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

export function sumPortfolio(assets, tickers) {
  const sum = {
    totalValue: 0,
    totalCost: 0,
    totalProfit: 0,
    highestValue: 0
  }

  assets && assets.forEach(asset => {
    const { totalQuantity, totalCost } = asset
    const tickerData = tickers.find(t => t.symbol === asset.symbol)
    sum.totalCost += totalCost
    sum.totalValue += totalQuantity * tickerData.price_usd
    sum.totalProfit = sum.totalValue - sum.totalCost
    if(sum.highestValue < totalQuantity * tickerData.price_usd) {
      sum.highestValue = totalQuantity * tickerData.price_usd
    }
  })
  return sum
}

export function calculateProfit(currentPrice, totalCost, quantity) {
  const currentValue = (Number(currentPrice) * quantity)
  const profit =  currentValue - totalCost

  return {
    profit,
    profitPercent: profit / totalCost,
    currentValue
  }
}
