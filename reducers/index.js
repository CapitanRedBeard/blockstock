// @flow

"use strict"

import { combineReducers } from "redux"

import market from "./market"
import portfolio from "./portfolio"

export default combineReducers({
  portfolio,
  market,
})
