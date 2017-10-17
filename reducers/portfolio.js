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

function sumTransactions(transactions) {
  const sum = {
    totalQuantity: 0,
    totalCost: 0,
  }
  transactions && transactions.forEach(transaction => {
    const quantity = Number(transaction.quantity);
    const tradePrice = Number(transaction.tradePrice);

    if(transaction.transactionType === 0) {
      //BUY
      sum.totalQuantity += quantity
      sum.totalCost += quantity * tradePrice
    }else {
      //SELL
      sum.totalQuantity -= quantity
      sum.totalCost -= quantity * tradePrice
    }
  })
  console.log("Transactions", transactions, sum)
  return sum
}

function createNewPortfolio(key) {
  return {
  name: "Untitled",
  assets: [],
  portfolioValue: null,
  portfolioCost: null,
  portfolioProfit: null,
  portfolioProfitPercent: null,
  key: key
  }
}

function createNewAsset(symbol) {
  return {
    symbol,
    totalQuantity: 0,
    totalCost: 0,
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
        })

        if(allPortfoliosAreUsed) {
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
      const { assets } = newState.portfolios[state.selectedIndex]
      const asset = assets[assets.findIndex(a => a.symbol === symbol)]
      asset.transactions.push(createNewTransaction(quantity, tradePrice, transactionType))

      const { totalQuantity, totalCost } = sumTransactions(asset.transactions)

      asset.totalQuantity = totalQuantity
      asset.totalCost = totalCost

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
