// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

export function toggleTheme() {
  return {
    type: ActionTypes.TOGGLE_THEME
  }
}

export function reset() {
  return {
    type: ActionTypes.RESET
  }
}
