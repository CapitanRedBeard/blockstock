const RESPONSE_STATUS = {
  OK: 200
}

export function getTimeFrame(timeFrame) {
  switch (timeFrame) {
    case '1D':
      return 'histominute?limit=96&aggregate=15'
    case '1W':
      return 'histohour?limit=72&aggregate=2'
    case '1M':
      return 'histohour?limit=90&aggregate=8'
    case '3M':
      return 'histoday?limit=90&aggregate=1'
    case '1Y':
      return 'histoday?limit=73&aggregate=5'
  }
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

export async function fetchChartData(fSym, time, tSym = "USD", exchange) {
  const timeFrame = getTimeFrame(time)

  const response = await fetch(`https://min-api.cryptocompare.com/data/${timeFrame}&extraParams=BlockStock&fsym=${fSym}&tryConversion=false&tsym=${tSym}`)
  if(response.status === RESPONSE_STATUS.OK) {
    return response.json()
  }
  return []
}
