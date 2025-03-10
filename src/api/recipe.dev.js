"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRecipes = exports.fetchRecipes = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API_KEY = "44123451b6b1434896b7920b7b68173f";
var API_URL = "https://api.spoonacular.com/recipes";
/**
 * Fetch recipes based on multiple ingredients
 * @param {string} ingredients - Comma-separated list of ingredients
 */

var fetchRecipes = function fetchRecipes(ingredients) {
  var response;
  return regeneratorRuntime.async(function fetchRecipes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/findByIngredients"), {
            params: {
              ingredients: ingredients,
              // Supports multiple ingredients
              number: 10,
              // Number of results to fetch
              apiKey: API_KEY
            }
          }));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data || []);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error fetching recipes:", _context.t0);
          return _context.abrupt("return", []);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * Fetch popular recipes of the week
 */


exports.fetchRecipes = fetchRecipes;

var fetchPopularRecipes = function fetchPopularRecipes() {
  var response;
  return regeneratorRuntime.async(function fetchPopularRecipes$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/random"), {
            params: {
              number: 3,
              // Get 3 random popular recipes
              apiKey: API_KEY
            }
          }));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data.recipes || []);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching popular recipes:", _context2.t0);
          return _context2.abrupt("return", []);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.fetchPopularRecipes = fetchPopularRecipes;