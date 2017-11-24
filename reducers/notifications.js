// @flow

"use strict"

import { ActionTypes, TransactionTypes } from "../constants/Types"

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION: {
      const {below, above, alertType, symbol} = action
      const newNotifications = JSON.parse(JSON.stringify(state))
      console.log("Reducers ", action)
      if(!newNotifications[symbol]) {
        newNotifications[symbol] = []
      }

      newNotifications[symbol].push({
        below,
        above,
        alertType
      })
      return newNotifications
    }
    case ActionTypes.REMOVE_NOTIFICATION: {
      const {index, symbol} = action
      const newNotifications = JSON.parse(JSON.stringify(state))
      newNotifications[symbol].splice(index, 1);
      return newNotifications      
    }
    default: {
      return state
    }
  }
}
