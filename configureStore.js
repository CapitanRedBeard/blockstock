import { compose, createStore, applyMiddleware } from 'redux'
import { autoRehydrate } from 'redux-persist'
import reduxReset from 'redux-reset'

import { logger } from "redux-logger"
import thunk from 'redux-thunk';

import reducers from './reducers'
const middlewares = [thunk]

middlewares.push(logger)

export default function configureStore() {
  let store = createStore(reducers, {}, compose(applyMiddleware(...middlewares), autoRehydrate(), reduxReset()))

  return store
}
