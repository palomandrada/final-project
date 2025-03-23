"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFavorite = exports.toggleFavorite = void 0;

var _firebase = require("../firebase");

var _firestore = require("firebase/firestore");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toggleFavorite = function toggleFavorite(userId, recipe) {
  var docRef, existing;
  return regeneratorRuntime.async(function toggleFavorite$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          docRef = (0, _firestore.doc)(_firebase.db, "favorites", "".concat(userId, "_").concat(recipe.id));
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(docRef));

        case 3:
          existing = _context.sent;

          if (!existing.exists()) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap((0, _firestore.deleteDoc)(docRef));

        case 7:
          return _context.abrupt("return", false);

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(docRef, _objectSpread({
            userId: userId
          }, recipe, {
            savedAt: new Date()
          })));

        case 12:
          return _context.abrupt("return", true);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.toggleFavorite = toggleFavorite;

var isFavorite = function isFavorite(userId, recipeId) {
  var docRef, snapshot;
  return regeneratorRuntime.async(function isFavorite$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          docRef = (0, _firestore.doc)(_firebase.db, "favorites", "".concat(userId, "_").concat(recipeId));
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(docRef));

        case 3:
          snapshot = _context2.sent;
          return _context2.abrupt("return", snapshot.exists());

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.isFavorite = isFavorite;