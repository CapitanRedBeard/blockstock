// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function submitNotification(below, above, alertType, symbol): Action {
  return {
      type: ActionTypes.ADD_NOTIFICATION,
      below,
      above,
      alertType,
      symbol
    }
}

export function removeNotification(index, symbol): Action {
  return {
      type: ActionTypes.REMOVE_NOTIFICATION,
      index,
      symbol
    }
}
