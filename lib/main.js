'use strict';

exports.__esModule = true;
exports.store = undefined;

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _store = require('./reducers/store');

var _store2 = _interopRequireDefault(_store);

var _rootSaga = require('./sagas/rootSaga');

var _rootSaga2 = _interopRequireDefault(_rootSaga);

var _materialUi = require('material-ui');

var _reactRedux = require('react-redux');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _reduxForm = require('redux-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose; /*eslint-disable no-unused-vars*/

var sagaMiddleware = (0, _reduxSaga2.default)();
var store = exports.store = (0, _redux.createStore)((0, _redux.combineReducers)({
    storeReducer: _store2.default,
    form: _reduxForm.reducer
}), composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware)));

sagaMiddleware.run(_rootSaga2.default);

var action = function action(type) {
    return store.dispatch({ type: type });
};

function render() {
    _reactDom2.default.render(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _materialUi.MuiThemeProvider,
            null,
            _react2.default.createElement(_App2.default, null)
        )
    ), document.getElementById('root'));
}

render();
store.subscribe(render);