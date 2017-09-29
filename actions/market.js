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

function updateChartData(coinName, timeFrame, chartData): Action {
  return {
      type: ActionTypes.GET_CHART_DATA,
      coinName: coinName,
      timeFrame: timeFrame,
      chartData: chartData
    }
}


export function fetchChart(coinName, timeFrame) {

  return async (dispatch) => {
    return dispatch(updateChartData(coinName, timeFrame, await fetchChartData(coinName, timeFrame)))
  };
}

export function fetchTickers() {

  return async (dispatch) => {
    return dispatch(storeTickers(await fetchTickerData()))
  };
}
