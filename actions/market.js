// @flow

"use strict"

import { ActionTypes } from "../constants/Types"
import { fetchTickerData, fetchChartData } from "../api/marketAPI"

function storeTickers(tickers): Action {
  return {
      type: ActionTypes.GET_TICKERS,
      tickers: tickers
    }
}

function updateChartData(symbol, timeFrame, chartData): Action {
  return {
      type: ActionTypes.GET_CHART_DATA,
      symbol: symbol,
      timeFrame: timeFrame,
      chartData: chartData.Data
    }
}


export function fetchChart(symbol, timeFrame) {

  return async (dispatch) => {
    return dispatch(updateChartData(symbol, timeFrame, await fetchChartData(symbol, timeFrame)))
  };
}

export function fetchTickers() {

  return async (dispatch) => {
    return dispatch(storeTickers(await fetchTickerData()))
  };
}

export function favoriteCurrency(symbol): Action {
  return {
      type: ActionTypes.TOGGLE_FAVORITE,
      symbol: symbol,
    }
}
