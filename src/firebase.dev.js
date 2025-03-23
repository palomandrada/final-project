"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyAh9hrU7194yU6FGszpiIdQ8o7W6sIFZU0",
  authDomain: "recipeapp-bf3cc.firebaseapp.com",
  projectId: "recipeapp-bf3cc",
  storageBucket: "recipeapp-bf3cc.appspot.com",
  messagingSenderId: "675873179689",
  appId: "1:675873179689:web:dc2000c88e37ed1753b438"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;
var db = (0, _firestore.getFirestore)(app);
exports.db = db;