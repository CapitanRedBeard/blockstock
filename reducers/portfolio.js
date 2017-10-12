// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  portfolios: [{
    name: "New Portfolio",
    assets: {}
  }],
  currentPortfolio: 0
}

const newPortfolio = {
  name: "Untitled",
  assets: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ASSET:
      const newState = JSON.parse(JSON.stringify(state))

      const updatePortfolio = newState.portfolios[state.currentPortfolio]
      if(!updatePortfolio.assets[action.symbol]) {
        updatePortfolio.assets[action.symbol] = {}
      }
      newState.portfolios[state.currentPortfolio] = updatePortfolio
      // if(action.cost) {
      //   newPortfolio[action.symbol].cost = action.cost
      // }
      // if(action.amount) {
      //   newPortfolio[action.symbol].amount = action.amount
      // }
      return newState
    default:
      return state
  }
}
