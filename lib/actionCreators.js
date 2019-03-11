"use strict";

exports.__esModule = true;
exports.selectStoreToView = exports.selectStoreIdToView = undefined;

var _actionTypes = require("./actionTypes");

var _reduxForm = require("redux-form");

var selectStoreIdToView = exports.selectStoreIdToView = function selectStoreIdToView(storeId) {
    return { type: _actionTypes.VIEW_STORE_ID, storeId: storeId };
};

var selectStoreToView = exports.selectStoreToView = function selectStoreToView(selectedStore) {
    return { type: _actionTypes.VIEW_STORE, selectedStore: selectedStore };
};