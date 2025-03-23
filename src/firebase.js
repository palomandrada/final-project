import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh9hrU7194yU6FGszpiIdQ8o7W6sIFZU0",
  authDomain: "recipeapp-bf3cc.firebaseapp.com",
  projectId: "recipeapp-bf3cc",
  storageBucket: "recipeapp-bf3cc.appspot.com",
  messagingSenderId: "675873179689",
  appId: "1:675873179689:web:dc2000c88e37ed1753b438"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
