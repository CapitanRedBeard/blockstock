import { compose, createStore, applyMiddleware } from 'redux'
import { logger } from "redux-logger"
import thunk from 'redux-thunk';

import app from './reducers'
const middlewares = [logger, thunk]

export default function configureStore() {
  let store = createStore(app, {}, compose(applyMiddleware(...middlewares)))

  return store
}
