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

function updateChartData(coinName, chartData): Action {
  console.log("updateChartData", chartData)
  return {
      type: ActionTypes.GET_CHART_DATA,
      coinName: coinName,
      chartData: chartData
    }
}


export function fetchChart(coinName) {

  return async (dispatch) => {
    return dispatch(updateChartData(coinName, await fetchChartData(coinName)))
  };
}

export function fetchTickers() {

  return async (dispatch) => {
    return dispatch(storeTickers(await fetchTickerData()))
  };
}
