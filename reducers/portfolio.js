// @flow

"use strict"

import { ActionTypes, TransactionTypes } from "../constants/Types"

const initialState = {
  portfolios: [
    {
      name: "Portfolio One",
      assets: [],
      key: "0"
    },
  ],
  selectedIndex: 0
}

function createNewPortfolio(key) {
  return {
  name: "Untitled",
  assets: [],
  key: key
  }
}

function createNewAsset(symbol) {
  return {
    symbol,
    transactions: []
  }
}

function createNewTransaction( quantity, tradePrice, transactionType) {
  return {
    quantity,
    tradePrice,
    transactionType
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ASSET: {
        const newState = JSON.parse(JSON.stringify(state))
        const updatePortfolio = newState.portfolios[state.selectedIndex]
        const assetAlreadyExists = Boolean(updatePortfolio.assets.find(a => a.symbol === action.symbol))

        if(!assetAlreadyExists) {
          updatePortfolio.assets.push(createNewAsset(action.symbol))
        }
        newState.portfolios[state.selectedIndex] = updatePortfolio

        let allPortfoliosAreUsed = true
        newState.portfolios.forEach(portfolio => {
          if(!portfolio.assets.length) {
            allPortfoliosAreUsed = false
          }
          console.log("allPortfoliosAreUsed1", portfolio.assets.length)

        })

        if(allPortfoliosAreUsed) {
          console.log("allPortfoliosAreUsed2", allPortfoliosAreUsed)

          newState.portfolios.push(createNewPortfolio(String(newState.portfolios.length)))
        }

        return newState
    }
    case ActionTypes.REMOVE_ASSET:{
      const newState = JSON.parse(JSON.stringify(state))
      const assets = newState.portfolios[state.selectedIndex].assets
      const findSymbolIndex = assets.findIndex(a => a.symbol === action.symbol)
      assets.splice(findSymbolIndex, 1)
      return newState
    }
    case ActionTypes.ADD_TRANSACTION: {
      const newState = JSON.parse(JSON.stringify(state))
      const {symbol, quantity, tradePrice, transactionType} = action
      const assets = newState.portfolios[state.selectedIndex].assets
      const findSymbolIndex = assets.findIndex(a => a.symbol === symbol)
      assets[findSymbolIndex].transactions.push(createNewTransaction(quantity, tradePrice, transactionType))
      return newState
    }
    case ActionTypes.SWITCH_PORTFOLIO: {
      return {...state, selectedIndex: action.index}
    }
    default: {
      return state
    }
  }
}
