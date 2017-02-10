import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

export const configureStore = (reducer) => {
    /* eslint-disable no-undef */
    /* eslint-disable indent */
    const isProductionEnv = process.env.NODE_ENV === 'production'
    /* eslint-enable no-undef */

    const prodMiddlewares = [
        promise,
        thunk
    ],
    devMiddlewares = [
        createLogger()
    ]
    /* eslint-enable indent */

    const middlewares = isProductionEnv? [ ...prodMiddlewares ] : [ ...prodMiddlewares, ...devMiddlewares ]

    const initialState = {}

    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(...middlewares)
    )

    return store
}
