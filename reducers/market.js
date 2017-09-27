// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  global: null,
  tickers: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TICKERS:
      const tickers = {tickers: action.tickers}
      return {...state, ...tickers}
    default:
      return state
  }
}
