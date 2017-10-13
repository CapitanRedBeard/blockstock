// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  portfolios: [
    {
      name: "Portfolio One",
      assets: {},
      key: "0"
    },
    {
      name: "Portfolio Two",
      assets: {},
      key: "1"
    },
    {
      name: "Portfolio Three",
      assets: {},
      key: "2"
    },
    {
      name: "Portfolio Four",
      assets: {},
      key: "3"
    },
    {
      name: "Portfolio Five",
      assets: {},
      key: "4"
    }
  ],
  selectedIndex: 0
}

const newPortfolio = {
  name: "Untitled",
  assets: {},
  key: "0"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ASSET:
      const newState = JSON.parse(JSON.stringify(state))

      const updatePortfolio = newState.portfolios[state.selectedIndex]
      if(!updatePortfolio.assets[action.symbol]) {
        updatePortfolio.assets[action.symbol] = {}
      }
      newState.portfolios[state.selectedIndex] = updatePortfolio
      // if(action.cost) {
      //   newPortfolio[action.symbol].cost = action.cost
      // }
      // if(action.amount) {
      //   newPortfolio[action.symbol].amount = action.amount
      // }
      return newState
    case ActionTypes.SWITCH_PORTFOLIO:
      return {...state, selectedIndex: action.index}
    default:
      return state
  }
}
