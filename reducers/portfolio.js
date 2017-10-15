// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const COLOR_PROFILES = [
  ['#FF4E50', '#F9D423'],
  ['#93F9B9', '#1D976C'],
  ['#C04848', '#480048'],
  ['#5f2c82', '#49a09d'],
  ['#283048', '#859398']
]

const initialState = {
  portfolios: [
    {
      name: "Portfolio One",
      assets: [],
      gradient: COLOR_PROFILES[0],
      key: "0"
    },
    {
      name: "Portfolio Two",
      assets: [],
      gradient: COLOR_PROFILES[1],
      key: "1"
    },
    {
      name: "Portfolio Three",
      assets: [],
      gradient: COLOR_PROFILES[2],
      key: "2"
    },
    {
      name: "Portfolio Four",
      assets: [],
      gradient: COLOR_PROFILES[3],
      key: "3"
    },
    {
      name: "Portfolio Five",
      assets: [],
      gradient: COLOR_PROFILES[4],
      key: "4"
    }
  ],
  selectedIndex: 0
}

const newPortfolio = {
  name: "Untitled",
  assets: [],
  key: "0"
}

function createNewAsset(symbol, quantity, cost) {
  return {
    symbol,
    quantity,
    cost,
  }
}

export default (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case ActionTypes.ADD_ASSET:
      const updatePortfolio = newState.portfolios[state.selectedIndex]
      const assetAlreadyExists = Boolean(updatePortfolio.assets.find(a => a.symbol === action.symbol))

      if(!assetAlreadyExists) {
        updatePortfolio.assets.push(createNewAsset(action.symbol))
      }
      newState.portfolios[state.selectedIndex] = updatePortfolio
      return newState
    case ActionTypes.REMOVE_ASSET:
      const assets = newState.portfolios[state.selectedIndex].assets
      const findSymbolIndex = assets.findIndex(a => a.symbol === action.symbol)
      assets.splice(findSymbolIndex, 1)
      return newState
    case ActionTypes.ADD_TRANSACTION:
      return newState
    case ActionTypes.SWITCH_PORTFOLIO:
      return {...state, selectedIndex: action.index}
    default:
      return state
  }
}
