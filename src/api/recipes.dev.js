"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRecipes = exports.fetchRecipes = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var API_KEY = "44123451b6b1434896b7920b7b68173f";
var API_URL = "https://api.spoonacular.com/recipes";
/**
 * ✅ Utility function to remove HTML tags
 */

var stripHtml = function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ""); // Removes all HTML tags
};
/**
 * Fetch recipes based on ingredients
 * @param {string} ingredients - Comma-separated list of ingredients
 */


var fetchRecipes = function fetchRecipes(ingredients) {
  var response, detailedRecipes;
  return regeneratorRuntime.async(function fetchRecipes$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/findByIngredients"), {
            params: {
              ingredients: ingredients,
              number: 10,
              apiKey: API_KEY
            }
          }));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Promise.all(response.data.map(function _callee(recipe) {
            var detailsResponse;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/").concat(recipe.id, "/information"), {
                      params: {
                        apiKey: API_KEY
                      }
                    }));

                  case 2:
                    detailsResponse = _context.sent;
                    return _context.abrupt("return", {
                      id: recipe.id,
                      title: stripHtml(detailsResponse.data.title),
                      // ✅ Strips any HTML tags from title
                      image: recipe.image,
                      description: stripHtml(detailsResponse.data.summary) || "No description available",
                      // ✅ Cleans description
                      readyInMinutes: detailsResponse.data.readyInMinutes,
                      // ✅ Prep Time
                      servings: detailsResponse.data.servings,
                      // ✅ Servings
                      tags: [].concat(_toConsumableArray(detailsResponse.data.diets), _toConsumableArray(detailsResponse.data.dishTypes), _toConsumableArray(detailsResponse.data.cuisines)).filter(function (tag) {
                        return tag;
                      })
                    });

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 6:
          detailedRecipes = _context2.sent;
          return _context2.abrupt("return", detailedRecipes);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching recipes:", _context2.t0);
          return _context2.abrupt("return", []);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**
 * Fetch random popular recipes
 */


exports.fetchRecipes = fetchRecipes;

var fetchPopularRecipes = function fetchPopularRecipes() {
  var response;
  return regeneratorRuntime.async(function fetchPopularRecipes$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/random"), {
            params: {
              number: 9,
              apiKey: API_KEY
            }
          }));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data.recipes.map(function (recipe) {
            return {
              id: recipe.id,
              title: stripHtml(recipe.title),
              // ✅ Fix title formatting in popular recipes too
              image: recipe.image,
              description: stripHtml(recipe.summary) || "No description available",
              readyInMinutes: recipe.readyInMinutes,
              servings: recipe.servings,
              tags: [].concat(_toConsumableArray(recipe.diets), _toConsumableArray(recipe.dishTypes), _toConsumableArray(recipe.cuisines)).filter(function (tag) {
                return tag;
              })
            };
          }));

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error fetching popular recipes:", _context3.t0);
          return _context3.abrupt("return", []);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.fetchPopularRecipes = fetchPopularRecipes;