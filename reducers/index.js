// @flow

"use strict"

import { combineReducers } from "redux"

import market from "./market"
import portfolio from "./portfolio"
import notifications from "./notifications"

export default combineReducers({
  portfolio,
  market,
  notifications,
})
