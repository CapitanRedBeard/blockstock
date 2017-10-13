// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function addAsset(symbol): Action {
  return {
      type: ActionTypes.ADD_ASSET,
      symbol: symbol,
    }
}

export function switchPortfolio(index): Action {
  return {
      type: ActionTypes.SWITCH_PORTFOLIO,
      index: index,
    }
}
