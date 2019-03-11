"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = store;

var _actionTypes = require("../actionTypes");

var defaultState = {
    selectedStore: null,
    image: null,
    storeId: null
};

function store() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case _actionTypes.VIEW_STORE:
            return _extends({}, state, { selectedStore: action.selectedStore });
        case _actionTypes.VIEW_STORE_ID:
            return Object.assign({}, state, {
                storeId: action.storeId
            });
        case _actionTypes.UPDATE_STORE:
            return Object.assign({}, state, {
                products: [].concat(state.selectedStore, [action.selectedStore])
            });
        case _actionTypes.UPLOAD_IMAGE:
            return Object.assign({}, state, {
                image: action.image
            });
        default:
            return state;
    }
}