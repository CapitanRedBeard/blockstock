// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function addAsset(symbol): Action {
  return {
      type: ActionTypes.ADD_ASSET,
      symbol
    }
}

export function removeAsset(symbol): Action {
  return {
      type: ActionTypes.REMOVE_ASSET,
      symbol
    }
}

export function switchPortfolio(index): Action {
  return {
      type: ActionTypes.SWITCH_PORTFOLIO,
      index
    }
}

export function addTransaction(symbol, transactionType, quantity, tradePrice): Action {
  return {
      type: ActionTypes.ADD_TRANSACTION,
      symbol,
      transactionType,
      quantity,
      tradePrice
    }
}
