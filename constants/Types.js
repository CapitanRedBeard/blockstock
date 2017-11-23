export const ActionTypes = {
  GET_TICKERS: "GET_TICKERS",
  GET_CHART_DATA: "GET_CHART_DATA",
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE",

  ADD_ASSET: "ADD_ASSET",
  REMOVE_ASSET: "REMOVE_ASSET",
  SWITCH_PORTFOLIO: "SWITCH_PORTFOLIO",
  ADD_TRANSACTION: "ADD_TRANSACTION",

  ADD_NOTIFICATION: "ADD_NOTIFICATION"
}


export const TimeFrames = [
  {
    label: "1D"
  },
  {
    label: "1W"
  },
  {
    label: "1M"
  },
  {
    label: "3M"
  },
  {
    label: "1Y"
  }
]

export const TransactionTypes = [
  {
    label: "BUY",
  },
  {
    label: "SELL",
  },
]

export const AlertTypes = [
  {
    label: "ONCE",
  },
  {
    label: "PERSIST",
  },
]
