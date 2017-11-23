// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function submitNotification(below, above, alertType): Action {
  return {
      type: ActionTypes.ADD_NOTIFICATION,
      below,
      above,
      alertType
    }
}
