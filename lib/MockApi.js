'use strict';

exports.__esModule = true;
exports.stores = undefined;

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _stores = require('./data/stores');

var _stores2 = _interopRequireDefault(_stores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stores = exports.stores = _stores2.default;

exports.default = {
    getStore: function getStore(id) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                var store = (0, _find2.default)(stores, { id: id });
                resolve(store);
            }, 0);
        });
    },
    getRedInvoice: function getRedInvoice(id) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                var redInvoice = (0, _find2.default)(redInvoices, { id: id });
                resolve(redInvoice);
            }, 0);
        });
    }
};