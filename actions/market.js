// @flow

"use strict"

import { ActionTypes } from "../constants/Types"
import { fetchTickerData } from "../api/marketAPI"

function storeTickers(tickers): Action {
  console.log("fetchTickers actions", tickers)
  return {
      type: ActionTypes.GET_TICKERS,
      tickers: tickers
    }
}

export function fetchTickers() {

  return async (dispatch) => {
    return dispatch(storeTickers(await fetchTickerData()))
  };
}
