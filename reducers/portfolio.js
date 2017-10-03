// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  portfolio: {

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MODIFY_CURRENCY:
      const newPortfolio = {...portfolio}
      if(!newPortfolio[action.symbol]) {
        newPortfolio[action.symbol] = {}
      }
      if(action.cost) {
        newPortfolio[action.symbol].cost = action.cost
      }
      if(action.amount) {
        newPortfolio[action.symbol].amount = action.amount
      }
      return newPortfolio
    default:
      return state
  }
}
