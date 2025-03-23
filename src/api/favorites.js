import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

export const toggleFavorite = async (userId, recipe) => {
  const docRef = doc(db, "favorites", `${userId}_${recipe.id}`);
  const existing = await getDoc(docRef);

  if (existing.exists()) {
    await deleteDoc(docRef);
    return false; // removed
  } else {
    await setDoc(docRef, {
      userId,
      ...recipe,
      savedAt: new Date(),
    });
    return true; // added
  }
};

export const isFavorite = async (userId, recipeId) => {
  const docRef = doc(db, "favorites", `${userId}_${recipeId}`);
  const snapshot = await getDoc(docRef);
  return snapshot.exists();
};
