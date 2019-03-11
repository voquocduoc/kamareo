/*eslint-disable no-unused-vars*/
import "babel-polyfill";
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import storeReducer from "./reducers/store";
import rootSaga from './sagas/rootSaga'
import { MuiThemeProvider } from "material-ui";
import { Provider } from "react-redux";
import App from "./App";
import { reducer as reduxFormReducer } from 'redux-form'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    combineReducers({
        storeReducer,
        form: reduxFormReducer
    }),
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </Provider>
        ,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)
