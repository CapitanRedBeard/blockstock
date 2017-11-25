// @flow

"use strict"

import { combineReducers } from "redux"

import market from "./market"
import portfolio from "./portfolio"
import notifications from "./notifications"
import settings from "./settings"

export default combineReducers({
  portfolio,
  market,
  notifications,
  settings
})
