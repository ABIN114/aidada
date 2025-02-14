"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = foldLine;
var _runes = _interopRequireDefault(require("runes2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function foldLine(line) {
  var parts = [];
  var length = 75;
  while ((0, _runes["default"])(line).length > length) {
    parts.push(_runes["default"].substring(line, 0, length));
    line = _runes["default"].substring(line, length);
    length = 74;
  }
  parts.push(line);
  return parts.join('\r\n\t');
}