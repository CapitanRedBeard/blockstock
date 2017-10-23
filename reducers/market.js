// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  global: null,
  tickers: [],
  chartData: {},
  favorites: {}
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
      if(!chartData[action.symbol]) {
        chartData[action.symbol] = {}
      }
      chartData[action.symbol][action.timeFrame] = action.chartData
      return {...state, chartData: chartData}
    case ActionTypes.TOGGLE_FAVORITE:
      const toggledFavoites = {...state.favorites}
      toggledFavoites[action.symbol] = !Boolean(toggledFavoites[action.symbol])
      return {...state, favorites: toggledFavoites}
    default:
      return state
  }
}
