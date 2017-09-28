// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  global: null,
  tickers: [],
  chartData: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TICKERS:
      const tickers = {tickers: action.tickers}
      return {...state, ...tickers}
    case ActionTypes.GET_CHART_DATA:
      const chartData = {
        ...state.chartData,
      }
      chartData[action.coinName] = action.chartData
      return {...state, chartData: chartData}
    default:
      return state
  }
}
