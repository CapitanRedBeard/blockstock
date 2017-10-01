import { getTimeStampFrame } from '../helpers'

const RESPONSE_STATUS = {
  OK: 200
}

// async function _fetch(url) {
//   return await fetch(url)
//   if(response.status === RESPONSE_STATUS.OK) {
//     return response.json()
//   }
// }

export async function fetchGlobalMarketData() {
  const response = await fetch('https://api.coinmarketcap.com/v1/global/')
  if(response.status === RESPONSE_STATUS.OK) {
    return response.json()
  }
}

export async function fetchTickerData() {

  const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100')

  if(response.status === RESPONSE_STATUS.OK) {
    return response.json()
  }
  return []
}

export async function fetchChartData(coinName, timeFrame) {
  const timeStampFrame = getTimeStampFrame(timeFrame)
  const correctCoinName = coinName.replace(' ', '-')
  const response = await fetch(`https://graphs.coinmarketcap.com/currencies/${correctCoinName}/${timeStampFrame}`)

  if(response.status === RESPONSE_STATUS.OK) {
    return response.json()
  }
  return []
}
