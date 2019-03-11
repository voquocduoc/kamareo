'use strict';

exports.__esModule = true;
exports.watchViewStoreDetail = watchViewStoreDetail;
exports.default = rootSaga;

var _effects = require('redux-saga/effects');

var _reduxForm = require('redux-form');

var _MockApi = require('../MockApi');

var _MockApi2 = _interopRequireDefault(_MockApi);

var _actionTypes = require('../actionTypes');

var _actionCreators = require('../actionCreators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(watchViewStoreDetail),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(rootSaga); /* eslint-disable no-constant-condition */

function watchViewStoreDetail() {
    var _ref, storeId, selectedStore;

    return regeneratorRuntime.wrap(function watchViewStoreDetail$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 12;
                        break;
                    }

                    _context.next = 3;
                    return (0, _effects.take)(_actionTypes.VIEW_STORE_ID);

                case 3:
                    _ref = _context.sent;
                    storeId = _ref.storeId;
                    _context.next = 7;
                    return (0, _effects.call)(_MockApi2.default.getStore, parseInt(storeId));

                case 7:
                    selectedStore = _context.sent;
                    _context.next = 10;
                    return (0, _effects.put)((0, _actionCreators.selectStoreToView)(selectedStore));

                case 10:
                    _context.next = 0;
                    break;

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function rootSaga() {
    return regeneratorRuntime.wrap(function rootSaga$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.fork)(watchViewStoreDetail);

                case 2:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}