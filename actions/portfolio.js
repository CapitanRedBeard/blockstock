// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function addAsset(symbol): Action {
  return {
      type: ActionTypes.ADD_ASSET,
      symbol: symbol,
    }
}
