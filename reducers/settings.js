// @flow

"use strict"

import { ActionTypes } from "../constants/Types"

const initialState = {
  darkTheme: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_THEME: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.darkTheme = !newState.darkTheme
      return newState
    }
    default: {
      return state
    }
  }
}
