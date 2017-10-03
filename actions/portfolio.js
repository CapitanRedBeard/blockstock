// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function modifyCurrency(symbol, cost, amount): Action {
  return {
      type: ActionTypes.MODIFY_CURRENCY,
      symbol: symbol,
      cost: cost,
      amount: amount,
    }
}

export function removeCurrency(symbol): Action {
  return {
      type: ActionTypes.REMOVE_CURRENCY,
      symbol: symbol,
    }
}

export function addCurrency(symbol): Action {
  return {
      type: ActionTypes.ADD_CURRENCY,
      symbol: symbol,
    }
}
