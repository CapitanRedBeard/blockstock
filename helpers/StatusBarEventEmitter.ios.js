// @flow

"use strict"

import { NativeModules, NativeEventEmitter } from "react-native"

export default new NativeEventEmitter(NativeModules.StatusBarEventEmitter)
