'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _materialUi = require('material-ui');

var _StoreHOC = require('./StoreHOC');

var _StoreHOC2 = _interopRequireDefault(_StoreHOC);

var _actionCreators = require('../actionCreators');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreDetail = function (_Component) {
  _inherits(StoreDetail, _Component);

  function StoreDetail(props) {
    _classCallCheck(this, StoreDetail);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  StoreDetail.prototype.componentWillMount = function componentWillMount() {
    var storeId = this.props.match.params.id;
    this.props.dispatch((0, _actionCreators.selectStoreIdToView)(storeId));
  };

  StoreDetail.prototype.renderContainer = function renderContainer(data) {
    return _react2.default.createElement(
      _reactBootstrap.Container,
      null,
      _react2.default.createElement(
        _reactBootstrap.Card,
        { style: { width: '18rem' } },
        _react2.default.createElement(
          _reactBootstrap.Card.Body,
          null,
          _react2.default.createElement(
            _reactBootstrap.Card.Title,
            null,
            'Card Title'
          ),
          _react2.default.createElement(
            _reactBootstrap.Card.Text,
            null,
            'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            { variant: 'primary' },
            'Go somewhere'
          )
        )
      )
    );
  };

  StoreDetail.prototype.render = function render() {
    var data = this.props.selectedStore && Object.keys(this.props.selectedStore).length ? this.props.selectedStore : null;
    return this.renderContainer(data);
  };

  return StoreDetail;
}(_react.Component);

exports.default = (0, _StoreHOC2.default)(StoreDetail);