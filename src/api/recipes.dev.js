"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchRecipesByTags = exports.fetchPopularRecipes = exports.fetchRecipeDetails = exports.fetchRecipes = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var API_KEY = "52629ed0202749539cb832fe52e74cf2";
var API_URL = "https://api.spoonacular.com/recipes";
/**
 * ✅ Utility function to remove HTML tags
 */

var stripHtml = function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ""); // Removes all HTML tags
};
/**
 * ✅ Fetch recipes based on ingredients
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
            var detailsResponse, recipeTags;
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
                    recipeTags = [].concat(_toConsumableArray(detailsResponse.data.diets || []), _toConsumableArray(detailsResponse.data.dishTypes || []), _toConsumableArray(detailsResponse.data.cuisines || [])).filter(Boolean);
                    return _context.abrupt("return", {
                      id: recipe.id,
                      title: recipe.title,
                      image: recipe.image,
                      readyInMinutes: detailsResponse.data.readyInMinutes,
                      servings: detailsResponse.data.servings,
                      tags: recipeTags
                    });

                  case 5:
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
 * ✅ Fetch full recipe details by ID
 */


exports.fetchRecipes = fetchRecipes;

var fetchRecipeDetails = function fetchRecipeDetails(id) {
  var response, data;
  return regeneratorRuntime.async(function fetchRecipeDetails$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/").concat(id, "/information"), {
            params: {
              apiKey: API_KEY
            }
          }));

        case 3:
          response = _context3.sent;
          data = response.data;
          return _context3.abrupt("return", {
            id: data.id,
            title: data.title,
            image: data.image,
            readyInMinutes: data.readyInMinutes,
            servings: data.servings,
            tags: [].concat(_toConsumableArray(data.diets || []), _toConsumableArray(data.dishTypes || []), _toConsumableArray(data.cuisines || [])).filter(Boolean),
            ingredients: data.extendedIngredients.map(function (ingredient) {
              return ingredient.original;
            }),
            instructions: data.analyzedInstructions.length ? data.analyzedInstructions[0].steps.map(function (step) {
              return step.step;
            }) : ["No instructions available."]
          });

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error("Error fetching recipe details:", _context3.t0);
          return _context3.abrupt("return", null);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};
/**
 * ✅ Fetch random popular recipes
 */


exports.fetchRecipeDetails = fetchRecipeDetails;

var fetchPopularRecipes = function fetchPopularRecipes() {
  var response;
  return regeneratorRuntime.async(function fetchPopularRecipes$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/random"), {
            params: {
              number: 9,
              apiKey: API_KEY
            }
          }));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data.recipes.map(function (recipe) {
            return {
              id: recipe.id,
              title: stripHtml(recipe.title),
              image: recipe.image,
              description: stripHtml(recipe.summary) || "No description available",
              readyInMinutes: recipe.readyInMinutes,
              servings: recipe.servings,
              tags: [].concat(_toConsumableArray(recipe.diets), _toConsumableArray(recipe.dishTypes), _toConsumableArray(recipe.cuisines)).filter(Boolean)
            };
          }));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error("Error fetching popular recipes:", _context4.t0);
          return _context4.abrupt("return", []);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * ✅ Fetch recipes by tags (e.g., dish types or diets)
 */


exports.fetchPopularRecipes = fetchPopularRecipes;

var fetchRecipesByTags = function fetchRecipesByTags() {
  var tags,
      response,
      _args5 = arguments;
  return regeneratorRuntime.async(function fetchRecipesByTags$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          tags = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : [];
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API_URL, "/complexSearch"), {
            params: {
              number: 4,
              addRecipeInformation: true,
              tags: tags.join(","),
              apiKey: API_KEY
            }
          }));

        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", response.data.results.map(function (recipe) {
            return {
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              readyInMinutes: recipe.readyInMinutes,
              servings: recipe.servings,
              tags: [].concat(_toConsumableArray(recipe.diets), _toConsumableArray(recipe.dishTypes), _toConsumableArray(recipe.cuisines)).filter(Boolean)
            };
          }));

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error("Error fetching similar recipes by tags:", _context5.t0);
          return _context5.abrupt("return", []);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.fetchRecipesByTags = fetchRecipesByTags;